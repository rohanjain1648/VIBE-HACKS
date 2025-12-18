import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableKeyboardControls?: boolean;
  disabled?: boolean; // Add option to disable the controller
}

export const CameraController: React.FC<CameraControllerProps> = ({
  autoRotate = false,
  autoRotateSpeed = 0.5,
  enableKeyboardControls = true,
  disabled = false
}) => {
  const { camera, gl } = useThree();
  const keysPressed = useRef<Set<string>>(new Set());
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());
  const isUserControlling = useRef(false);
  const lastCameraPosition = useRef(new THREE.Vector3());
  const userControlTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initialize target positions
  useEffect(() => {
    targetPosition.current.copy(camera.position);
    targetLookAt.current.set(0, 0, 0);
    currentLookAt.current.set(0, 0, 0);
    lastCameraPosition.current.copy(camera.position);
  }, [camera]);

  // Detect user camera control (mouse interaction)
  useEffect(() => {
    const handleMouseDown = () => {
      isUserControlling.current = true;
      if (userControlTimeout.current) {
        clearTimeout(userControlTimeout.current);
      }
    };

    const handleMouseUp = () => {
      // Give a short delay before resuming automatic control
      userControlTimeout.current = setTimeout(() => {
        isUserControlling.current = false;
        // Update target position to current camera position to avoid jumping
        targetPosition.current.copy(camera.position);
        targetLookAt.current.copy(currentLookAt.current);
      }, 1000); // 1 second delay after mouse release
    };

    const canvas = gl.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchend', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchend', handleMouseUp);
      if (userControlTimeout.current) {
        clearTimeout(userControlTimeout.current);
      }
    };
  }, [gl, camera]);

  // Keyboard event handlers
  useEffect(() => {
    if (!enableKeyboardControls) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current.add(event.code);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enableKeyboardControls]);

  // Predefined camera positions for different views
  const cameraPresets = {
    overview: { position: [0, 80, 120] as [number, number, number], lookAt: [0, 0, 0] as [number, number, number] },
    ground: { position: [0, 5, 20] as [number, number, number], lookAt: [0, 5, 0] as [number, number, number] },
    aerial: { position: [50, 100, 50] as [number, number, number], lookAt: [0, 0, 0] as [number, number, number] },
    forest: { position: [20, 15, 30] as [number, number, number], lookAt: [0, 10, 0] as [number, number, number] },
    sunset: { position: [-80, 30, 40] as [number, number, number], lookAt: [0, 0, 0] as [number, number, number] }
  };

  // Smooth camera transition function
  const transitionToPreset = (presetName: keyof typeof cameraPresets) => {
    const preset = cameraPresets[presetName];
    targetPosition.current.set(...preset.position);
    targetLookAt.current.set(...preset.lookAt);
  };

  // Handle keyboard controls
  const handleKeyboardControls = (delta: number) => {
    if (!enableKeyboardControls) return;

    const moveSpeed = 30 * delta;

    // Movement controls
    if (keysPressed.current.has('KeyW') || keysPressed.current.has('ArrowUp')) {
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(camera.quaternion);
      targetPosition.current.add(forward.multiplyScalar(moveSpeed));
    }

    if (keysPressed.current.has('KeyS') || keysPressed.current.has('ArrowDown')) {
      const backward = new THREE.Vector3(0, 0, 1);
      backward.applyQuaternion(camera.quaternion);
      targetPosition.current.add(backward.multiplyScalar(moveSpeed));
    }

    if (keysPressed.current.has('KeyA') || keysPressed.current.has('ArrowLeft')) {
      const left = new THREE.Vector3(-1, 0, 0);
      left.applyQuaternion(camera.quaternion);
      targetPosition.current.add(left.multiplyScalar(moveSpeed));
    }

    if (keysPressed.current.has('KeyD') || keysPressed.current.has('ArrowRight')) {
      const right = new THREE.Vector3(1, 0, 0);
      right.applyQuaternion(camera.quaternion);
      targetPosition.current.add(right.multiplyScalar(moveSpeed));
    }

    // Vertical movement
    if (keysPressed.current.has('KeyQ')) {
      targetPosition.current.y += moveSpeed;
    }

    if (keysPressed.current.has('KeyE')) {
      targetPosition.current.y -= moveSpeed;
    }

    // Preset camera positions
    if (keysPressed.current.has('Digit1')) {
      transitionToPreset('overview');
      keysPressed.current.delete('Digit1');
    }

    if (keysPressed.current.has('Digit2')) {
      transitionToPreset('ground');
      keysPressed.current.delete('Digit2');
    }

    if (keysPressed.current.has('Digit3')) {
      transitionToPreset('aerial');
      keysPressed.current.delete('Digit3');
    }

    if (keysPressed.current.has('Digit4')) {
      transitionToPreset('forest');
      keysPressed.current.delete('Digit4');
    }

    if (keysPressed.current.has('Digit5')) {
      transitionToPreset('sunset');
      keysPressed.current.delete('Digit5');
    }

    // Constrain camera position to reasonable bounds
    targetPosition.current.x = THREE.MathUtils.clamp(targetPosition.current.x, -200, 200);
    targetPosition.current.y = THREE.MathUtils.clamp(targetPosition.current.y, 2, 150);
    targetPosition.current.z = THREE.MathUtils.clamp(targetPosition.current.z, -200, 200);
  };

  // Auto-rotation logic
  const handleAutoRotation = () => {
    if (!autoRotate) return;

    const radius = targetPosition.current.distanceTo(targetLookAt.current);
    const angle = Date.now() * 0.001 * autoRotateSpeed;

    targetPosition.current.x = Math.cos(angle) * radius;
    targetPosition.current.z = Math.sin(angle) * radius;
  };

  useFrame((_state, delta) => {
    // Skip all automatic control if disabled
    if (disabled) {
      return;
    }

    // Detect if camera position changed due to user interaction
    const currentPos = camera.position;
    const positionChanged = !lastCameraPosition.current.equals(currentPos);

    if (positionChanged && !isUserControlling.current) {
      // Camera moved but we're not tracking user control - likely OrbitControls
      isUserControlling.current = true;
      if (userControlTimeout.current) {
        clearTimeout(userControlTimeout.current);
      }
      userControlTimeout.current = setTimeout(() => {
        isUserControlling.current = false;
        targetPosition.current.copy(camera.position);
      }, 1000);
    }

    lastCameraPosition.current.copy(currentPos);

    // Only apply automatic controls if user is not manually controlling
    if (!isUserControlling.current) {
      // Handle controls
      handleKeyboardControls(delta);
      handleAutoRotation();

      // Smooth camera position interpolation
      camera.position.lerp(targetPosition.current, delta * 2);

      // Smooth look-at interpolation
      currentLookAt.current.lerp(targetLookAt.current, delta * 2);
      camera.lookAt(currentLookAt.current);
    }

    // Always update camera matrix
    camera.updateMatrixWorld();
  });

  // Expose control functions for external use
  useEffect(() => {
    // Add methods to window for debugging/external control
    (window as any).cameraControls = {
      setPreset: transitionToPreset,
      setPosition: (x: number, y: number, z: number) => {
        targetPosition.current.set(x, y, z);
      },
      setLookAt: (x: number, y: number, z: number) => {
        targetLookAt.current.set(x, y, z);
      },
      getCurrentPosition: () => camera.position.clone(),
      getAvailablePresets: () => Object.keys(cameraPresets)
    };

    return () => {
      delete (window as any).cameraControls;
    };
  }, [camera]);

  return null; // This component doesn't render anything visible
};