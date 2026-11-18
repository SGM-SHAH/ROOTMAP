import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { geoMercator, geoCentroid } from 'd3-geo';
import { getStateColor } from '../utils/helpers';

const Map3D = forwardRef(function Map3D(
  {
    geoData,
    statesData,
    selectedState,
    selectedDistrict,
    onSelectState,
    onSelectDistrict,
    onHoverChange,
    layerSettings
  },
  ref
) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  
  // Collections for meshes & interactivity
  const stateGroupsMapRef = useRef(new Map()); // stateId -> THREE.Group
  const clickableMeshesRef = useRef([]); // list of meshes for raycaster
  const districtPinsRef = useRef([]); // active 3D district pin meshes
  const hoveredGroupRef = useRef(null);
  const activeGroupRef = useRef(null);

  // India Centroid in projected coordinates: Center X ~ 6, Center Y ~ 16
  // Distance 960 gives perfect framing of all 28 states & 8 UTs (from Ladakh to Kanyakumari, Gujarat to Arunachal)
  const defaultCameraPos = new THREE.Vector3(6, -95, 960);
  const defaultControlsTarget = new THREE.Vector3(6, 16, 0);

  // Camera animation target values for smooth lerp
  const animTargetRef = useRef({
    cameraPos: defaultCameraPos.clone(),
    controlsTarget: defaultControlsTarget.clone(),
    isAnimating: false,
  });

  const mouseRef = useRef(new THREE.Vector2());
  const raycasterRef = useRef(new THREE.Raycaster());

  // Setup Projection
  // Centered on India: [82.5, 22.0]
  const projection = geoMercator()
    .center([82.5, 22.0])
    .scale(1200)
    .translate([0, 0]);

  // Expose camera actions to parent via ref
  useImperativeHandle(ref, () => ({
    resetView: () => {
      animTargetRef.current.cameraPos.copy(defaultCameraPos);
      animTargetRef.current.controlsTarget.copy(defaultControlsTarget);
      animTargetRef.current.isAnimating = true;
    },
    zoomIn: () => {
      if (!cameraRef.current) return;
      const dir = new THREE.Vector3();
      cameraRef.current.getWorldDirection(dir);
      animTargetRef.current.cameraPos.addScaledVector(dir, 80);
      animTargetRef.current.isAnimating = true;
    },
    zoomOut: () => {
      if (!cameraRef.current) return;
      const dir = new THREE.Vector3();
      cameraRef.current.getWorldDirection(dir);
      animTargetRef.current.cameraPos.addScaledVector(dir, -80);
      animTargetRef.current.isAnimating = true;
    },
    focusDistrict: (district) => {
      if (!district || !district.coordinates) return;
      const [lng, lat] = district.coordinates;
      const [px, py] = projection([lng, lat]);
      animTargetRef.current.cameraPos.set(px, -py - 40, 160);
      animTargetRef.current.controlsTarget.set(px, -py, 10);
      animTargetRef.current.isAnimating = true;
    },
    setTopDown: (isTopDown) => {
      if (isTopDown) {
        animTargetRef.current.cameraPos.set(
          controlsRef.current.target.x,
          controlsRef.current.target.y,
          950
        );
      } else {
        animTargetRef.current.cameraPos.set(
          controlsRef.current.target.x,
          controlsRef.current.target.y - 120,
          880
        );
      }
      animTargetRef.current.isAnimating = true;
    }
  }));

  // Initial Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth || 1280;
    const height = container.clientHeight || window.innerHeight || 800;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x070d18, 0.0006);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3500);
    camera.position.copy(defaultCameraPos);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minDistance = 60;
    controls.maxDistance = 1600;
    controls.target.copy(defaultControlsTarget);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x60a5fa, 0x0f172a, 0.65);
    hemiLight.position.set(0, 50, 400);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 1.3);
    dirLight1.position.set(200, -150, 450);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.9);
    dirLight2.position.set(-250, 200, 350);
    scene.add(dirLight2);

    // 6. Ground Decor / Ambient Halo
    const groundGeo = new THREE.RingGeometry(250, 600, 64);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.set(6, 16, -6);
    scene.add(groundMesh);

    // Grid helper under India
    const gridHelper = new THREE.GridHelper(1200, 40, 0x1e3a8a, 0x0f172a);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.set(6, 16, -7);
    scene.add(gridHelper);

    // Animation Loop using performance.now()
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Camera lerp animation
      if (animTargetRef.current.isAnimating) {
        camera.position.lerp(animTargetRef.current.cameraPos, 0.07);
        controls.target.lerp(animTargetRef.current.controlsTarget, 0.07);

        if (
          camera.position.distanceTo(animTargetRef.current.cameraPos) < 0.2 &&
          controls.target.distanceTo(animTargetRef.current.controlsTarget) < 0.2
        ) {
          animTargetRef.current.isAnimating = false;
        }
      }

      // Optional Country View Auto-Rotate
      if (layerSettings.autoRotate && !selectedState && !animTargetRef.current.isAnimating) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      } else {
        controls.autoRotate = false;
      }

      controls.update();

      // Animate active district pins (pulsing rings & spinning diamonds)
      districtPinsRef.current.forEach((pinGroup) => {
        if (pinGroup.userData.gem) {
          pinGroup.userData.gem.rotation.z += 0.02;
          pinGroup.userData.gem.position.z = pinGroup.userData.baseZ + Math.sin(elapsedTime * 3) * 0.8;
        }
        if (pinGroup.userData.ring) {
          const s = 1 + 0.25 * Math.sin(elapsedTime * 4);
          pinGroup.userData.ring.scale.set(s, s, s);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler with ResizeObserver support
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth || 1280;
      const h = containerRef.current.clientHeight || window.innerHeight || 800;
      if (w === 0 || h === 0) return;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  // Build 3D Extruded Map from GeoJSON
  useEffect(() => {
    if (!geoData || !sceneRef.current || !statesData) return;

    const scene = sceneRef.current;
    
    // Clear old state groups if any
    stateGroupsMapRef.current.forEach((group) => scene.remove(group));
    stateGroupsMapRef.current.clear();
    clickableMeshesRef.current = [];

    // Map statesData by lower-case names and aliases for fast lookup
    const stateDataMap = new Map();
    statesData.forEach((s) => {
      stateDataMap.set(s.name.toLowerCase(), s);
      if (s.aliases) {
        s.aliases.forEach((a) => stateDataMap.set(a.toLowerCase(), s));
      }
    });

    const extrusionScale = layerSettings.extrusionScale || 1.0;
    const baseDepth = 4.5 * extrusionScale;

    geoData.features.forEach((feature) => {
      const rawName = feature.properties.st_nm || feature.properties.NAME_1 || feature.properties.name;
      if (!rawName) return;

      const stateInfo = stateDataMap.get(rawName.toLowerCase()) || {
        id: rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: rawName,
        type: 'State',
        capital: 'Administrative Center'
      };

      const stateGroup = new THREE.Group();
      stateGroup.name = stateInfo.name;

      // Calculate state centroid using d3.geoCentroid
      const [lngCentroid, latCentroid] = geoCentroid(feature);
      const [cx, cy] = projection([lngCentroid, latCentroid]);
      stateGroup.userData = {
        stateId: stateInfo.id,
        stateName: stateInfo.name,
        stateData: stateInfo,
        centroid: { x: cx, y: -cy },
        baseElevation: 0,
      };

      const stateColorHex = getStateColor(stateInfo);
      const stateColor = new THREE.Color(stateColorHex);

      // Process Polygons (handles both Polygon and MultiPolygon)
      const geomType = feature.geometry.type;
      const coords = feature.geometry.coordinates;

      let polygonList = [];
      if (geomType === 'Polygon') {
        polygonList = [coords];
      } else if (geomType === 'MultiPolygon') {
        polygonList = coords;
      }

      polygonList.forEach((polyCoords) => {
        const outerRing = polyCoords[0];
        if (!outerRing || outerRing.length < 3) return;

        const shape = new THREE.Shape();
        outerRing.forEach(([lng, lat], i) => {
          const [x, y] = projection([lng, lat]);
          if (i === 0) shape.moveTo(x, -y);
          else shape.lineTo(x, -y);
        });

        // Add holes if present
        for (let h = 1; h < polyCoords.length; h++) {
          const holeRing = polyCoords[h];
          if (!holeRing || holeRing.length < 3) continue;
          const holePath = new THREE.Path();
          holeRing.forEach(([lng, lat], i) => {
            const [x, y] = projection([lng, lat]);
            if (i === 0) holePath.moveTo(x, -y);
            else holePath.lineTo(x, -y);
          });
          shape.holes.push(holePath);
        }

        // Extrude geometry
        const extrudeSettings = {
          depth: baseDepth,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.35,
          bevelThickness: 0.35,
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        // Standard Material
        const material = new THREE.MeshStandardMaterial({
          color: stateColor,
          roughness: 0.45,
          metalness: 0.22,
          flatShading: false,
          emissive: new THREE.Color(0x000000),
          emissiveIntensity: 0.0,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.userData = {
          parentGroup: stateGroup,
          stateData: stateInfo,
          originalColor: stateColor,
        };

        // Glowing Wireframe Edge Lines
        const edgesGeom = new THREE.EdgesGeometry(geometry, 28);
        const edgesMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.35,
        });
        const edgeLines = new THREE.LineSegments(edgesGeom, edgesMat);
        mesh.add(edgeLines);

        stateGroup.add(mesh);
        clickableMeshesRef.current.push(mesh);
      });

      scene.add(stateGroup);
      stateGroupsMapRef.current.set(stateInfo.name.toLowerCase(), stateGroup);
    });
  }, [geoData, statesData, layerSettings.extrusionScale]);

  // Handle State Selection (Elevation, Camera Zoom, & Highlighting)
  useEffect(() => {
    if (!stateGroupsMapRef.current) return;

    // Reset previous active group
    if (activeGroupRef.current) {
      activeGroupRef.current.position.z = 0;
      activeGroupRef.current.children.forEach((mesh) => {
        if (mesh.material && mesh.userData.originalColor) {
          mesh.material.color.copy(mesh.userData.originalColor);
          mesh.material.emissive.setHex(0x000000);
          mesh.material.emissiveIntensity = 0;
        }
      });
      activeGroupRef.current = null;
    }

    if (!selectedState) {
      // Returned to country overview: smooth camera reset
      animTargetRef.current.cameraPos.copy(defaultCameraPos);
      animTargetRef.current.controlsTarget.copy(defaultControlsTarget);
      animTargetRef.current.isAnimating = true;
      return;
    }

    // Find state group
    const stateGroup = stateGroupsMapRef.current.get(selectedState.name.toLowerCase());
    if (!stateGroup) return;

    activeGroupRef.current = stateGroup;

    // Elevate active state by 7 units
    stateGroup.position.z = 7;

    stateGroup.children.forEach((mesh) => {
      if (mesh.material) {
        mesh.material.emissive.setHex(0xffaa22);
        mesh.material.emissiveIntensity = 0.35;
      }
    });

    // Smoothly animate camera to center on state centroid
    const { x, y } = stateGroup.userData.centroid;
    animTargetRef.current.cameraPos.set(x, y - 60, 240);
    animTargetRef.current.controlsTarget.set(x, y, 5);
    animTargetRef.current.isAnimating = true;
  }, [selectedState]);

  // Render 3D District/City Beacons when State is selected (Hierarchy Level 3)
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing district pins
    districtPinsRef.current.forEach((pin) => scene.remove(pin));
    districtPinsRef.current = [];

    if (!selectedState || !layerSettings.showDistricts) return;

    const districts = selectedState.majorDistricts;
    if (!districts || districts.length === 0) return;

    const stateGroup = stateGroupsMapRef.current.get(selectedState.name.toLowerCase());
    const baseZ = (stateGroup ? stateGroup.position.z : 0) + (4.5 * (layerSettings.extrusionScale || 1)) + 1;

    districts.forEach((dist) => {
      const [lng, lat] = dist.coordinates;
      const [x, y] = projection([lng, lat]);

      const pinGroup = new THREE.Group();
      pinGroup.position.set(x, -y, baseZ);
      pinGroup.userData = {
        isDistrictPin: true,
        district: dist,
        stateName: selectedState.name,
        baseZ: baseZ + 3,
      };

      // 1. Glowing Vertical Column
      const colGeo = new THREE.CylinderGeometry(0.5, 0.5, 7, 16);
      colGeo.rotateX(Math.PI / 2);
      const colMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.7,
      });
      const colMesh = new THREE.Mesh(colGeo, colMat);
      colMesh.position.z = 3.5;
      pinGroup.add(colMesh);

      // 2. Floating Diamond Gem Marker
      const gemGeo = new THREE.OctahedronGeometry(2.2, 0);
      const gemMat = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x0891b2,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      const gemMesh = new THREE.Mesh(gemGeo, gemMat);
      gemMesh.position.z = baseZ + 3;
      gemMesh.userData = { isInteractive: true };
      pinGroup.add(gemMesh);
      pinGroup.userData.gem = gemMesh;

      // 3. Ground Pulsing Ring
      const ringGeo = new THREE.RingGeometry(1.8, 2.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.z = 0.2;
      pinGroup.add(ringMesh);
      pinGroup.userData.ring = ringMesh;

      // 4. City Light
      const pointLight = new THREE.PointLight(0x06b6d4, 1.5, 30);
      pointLight.position.z = 5;
      pinGroup.add(pointLight);

      scene.add(pinGroup);
      districtPinsRef.current.push(pinGroup);
      clickableMeshesRef.current.push(gemMesh);
    });
  }, [selectedState, layerSettings.showDistricts, layerSettings.extrusionScale]);

  // Dynamically Highlight Selected District / City Pin
  useEffect(() => {
    districtPinsRef.current.forEach((pinGroup) => {
      const isSelected = selectedDistrict && pinGroup.userData.district?.name === selectedDistrict.name;
      if (pinGroup.userData.gem && pinGroup.userData.gem.material) {
        if (isSelected) {
          pinGroup.userData.gem.material.color.setHex(0xfbbf24);
          pinGroup.userData.gem.material.emissive.setHex(0xf59e0b);
          pinGroup.userData.gem.material.emissiveIntensity = 1.3;
          pinGroup.userData.gem.scale.set(1.6, 1.6, 1.6);
        } else {
          pinGroup.userData.gem.material.color.setHex(0x22d3ee);
          pinGroup.userData.gem.material.emissive.setHex(0x0891b2);
          pinGroup.userData.gem.material.emissiveIntensity = 0.8;
          pinGroup.userData.gem.scale.set(1.0, 1.0, 1.0);
        }
      }
    });
  }, [selectedDistrict]);

  // Raycasting (Hover & Click detection)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!cameraRef.current || !sceneRef.current) return;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(clickableMeshesRef.current, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;

        // Check if hit a District Pin Gem
        if (hit.parent && hit.parent.userData?.isDistrictPin) {
          container.style.cursor = 'pointer';
          onHoverChange({
            isDistrict: true,
            district: hit.parent.userData.district,
            stateName: hit.parent.userData.stateName,
          }, { x: e.clientX, y: e.clientY });
          return;
        }

        // Hit a State Mesh
        const stateGroup = hit.userData.parentGroup;
        if (stateGroup) {
          container.style.cursor = 'pointer';

          if (hoveredGroupRef.current !== stateGroup) {
            // Reset previous hover
            if (hoveredGroupRef.current && hoveredGroupRef.current !== activeGroupRef.current) {
              hoveredGroupRef.current.position.z = 0;
              hoveredGroupRef.current.children.forEach((mesh) => {
                if (mesh.material) {
                  mesh.material.emissiveIntensity = 0;
                }
              });
            }

            hoveredGroupRef.current = stateGroup;

            // Hover elevate unless it's already active
            if (stateGroup !== activeGroupRef.current) {
              stateGroup.position.z = 2.5;
              stateGroup.children.forEach((mesh) => {
                if (mesh.material) {
                  mesh.material.emissive.setHex(0xffffff);
                  mesh.material.emissiveIntensity = 0.22;
                }
              });
            }
          }

          onHoverChange({
            isDistrict: false,
            state: hit.userData.stateData,
          }, { x: e.clientX, y: e.clientY });
          return;
        }
      }

      // Nothing hit
      container.style.cursor = 'default';
      if (hoveredGroupRef.current) {
        if (hoveredGroupRef.current !== activeGroupRef.current) {
          hoveredGroupRef.current.position.z = 0;
          hoveredGroupRef.current.children.forEach((mesh) => {
            if (mesh.material) {
              mesh.material.emissiveIntensity = 0;
            }
          });
        }
        hoveredGroupRef.current = null;
      }
      onHoverChange(null, null);
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!cameraRef.current) return;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(clickableMeshesRef.current, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;

        // Check if clicked District Pin
        if (hit.parent && hit.parent.userData?.isDistrictPin) {
          onSelectDistrict(hit.parent.userData.district);
          return;
        }

        // Clicked State
        const stateGroup = hit.userData.parentGroup;
        if (stateGroup && stateGroup.userData.stateData) {
          onSelectState(stateGroup.userData.stateData);
        }
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleClick);
    };
  }, [onSelectState, onSelectDistrict, onHoverChange]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden select-none outline-none"
    />
  );
});

export default Map3D;
