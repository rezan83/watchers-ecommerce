import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { useCursor, MeshReflectorMaterial, Image, Environment, Text } from '@react-three/drei';
import { easing } from 'maath';
import { useNavigate, useParams } from 'react-router-dom';
import useCartStore from 'store/cartStore';

import './three-gallery.css';

const GOLDENRATIO = 1.61803398875;

export const ThreeGallery = ({ images }: { images: any }) => (
  <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    {/* <color attach="background" args={['dodgerblue']} /> */}
    {/* <fog attach="fog" args={['white', 0, 15]} /> */}
    <group position={[0, -0.5, 0]}>
      <Frames images={images} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          mirror={1}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </group>
    <Environment preset="city" />
  </Canvas>
);

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3()
}: {
  images: any;
  q?: THREE.Quaternion | undefined;
  p?: THREE.Vector3 | undefined;
}) {
  const ref = useRef<any>();
  const clicked = useRef<any>();
  const params = useParams();
  const setLocation = useNavigate();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params['*']);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 0.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.5, dt);
  });
  return (
    <group
      ref={ref}
      onClick={e => (
        e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : e.object.name)
      )}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props:any) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  );
}

function Frame({
  url,
  title,
  price,
  id,
  colr = new THREE.Color(),
  ...props
}: {
  [x: string]: any;
  url: string;
  title: string;
  price: number;
  id: string;
  // c?: THREE.Color | undefined;
}): any {
  const setProductDetails = useCartStore(state => state.setProductDetails);
  const navigate = useNavigate();
  const showProductDetails = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setProductDetails(id);
    navigate('/product-details');
  };

  const image = useRef<any>();
  const params = useParams();
  const [hovered, hover] = useState(false);
  const name = title;
  const isActive = params?.id === name;

  useCursor(hovered);
  useFrame((state, dt) => {
    image.current.material.zoom = 0.7;
    easing.damp3(
      image.current.scale,
      [0.93 * (!isActive && hovered ? 1.05 : 1), 0.8 * (!isActive && hovered ? 1.05 : 1), 1],
      0.1,
      dt
    );
  });

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={e => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1.4, GOLDENRATIO, 0.01]}
        position={[0, GOLDENRATIO / 2, -1]}>
        <boxGeometry />
        <meshStandardMaterial color="white" envMapIntensity={20} />
        <Image raycast={() => null} ref={image} position={[0, +0.05, 0.7]} url={url} />
        <Text
          onClick={showProductDetails}
          fontSize={0.04}
          color={'dodgerblue'}
          position={[0, -0.43, 0.51]}>
          {`${title}: $${price}  ->`}
        </Text>
      </mesh>
    </group>
  );
}
