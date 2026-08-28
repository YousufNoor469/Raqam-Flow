import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground({ isDark }: { isDark: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particles (Glowing Emerald Dust)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // Spread particles across a wide volume
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create a circular texture for particles procedurally
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x10b981, // Emerald Green
      map: texture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating Cubes (Glassy/Emerald look)
    const cubes: THREE.Mesh[] = [];
    const cubeGeometry = new THREE.IcosahedronGeometry(0.3, 0); // Using icosahedrons for a cooler crystal look
    
    const cubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.9, // glass-like
      ior: 1.5,
      thickness: 0.5,
      emissive: 0x064e3b,
      emissiveIntensity: 0.2,
    });

    for (let i = 0; i < 15; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10 - 2;
      
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      
      // Store random rotation speeds
      cube.userData = {
        rx: (Math.random() - 0.5) * 0.01,
        ry: (Math.random() - 0.5) * 0.01,
        dy: (Math.random() - 0.5) * 0.005,
      };
      
      scene.add(cube);
      cubes.push(cube);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x10b981, 2, 20);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      // Slowly rotate particles mesh based on mouse
      particlesMesh.rotation.y += 0.001 + (targetX - particlesMesh.rotation.y) * 0.05;
      particlesMesh.rotation.x += 0.0005 + (targetY - particlesMesh.rotation.x) * 0.05;

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += cube.userData.rx;
        cube.rotation.y += cube.userData.ry;
        // Floating up and down
        cube.position.y += Math.sin(elapsedTime * 0.5 + i) * cube.userData.dy;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose materials/geometries
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      cubeGeometry.dispose();
      cubeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 ${
        isDark 
          ? 'bg-[radial-gradient(circle_at_center,#022c22_0%,#020617_100%)]' 
          : 'bg-[radial-gradient(circle_at_center,#d1fae5_0%,#f8fafc_100%)]'
      }`}
    />
  );
}
