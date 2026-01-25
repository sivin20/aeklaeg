import { Camera, Accessibility, Toilet } from 'lucide-react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useState } from 'react';
import { MarkerType } from '@/components/home/InteractiveMap.tsx';

const markerConfig: Record<
  MarkerType,
  { icon: React.ElementType; bg: string; hoverBg: string }
> = {
  image: { icon: Camera, bg: 'bg-primary/80', hoverBg: 'bg-primary' },
  handicap: { icon: Accessibility, bg: 'bg-blue-600', hoverBg: 'bg-blue-700' },
  toilet: { icon: Toilet, bg: 'bg-red-600', hoverBg: 'bg-red-700' },
};

function MapMarker({
  position,
  onClick,
  type,
}: {
  position: number[];
  onClick: () => void;
  type: MarkerType;
}) {
  const [hovered, setHovered] = useState(false);
  const { icon: Icon, bg, hoverBg } = markerConfig[type];

  return (
    <Html
      position={new THREE.Vector3(...position)}
      center
      zIndexRange={[20, 0]}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={`flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all duration-300 border-2 border-white ${
          hovered
            ? `${hoverBg} text-white scale-125`
            : `${bg} text-white scale-100`
        }`}
      >
        <Icon className='w-4 h-4' />
      </button>
    </Html>
  );
}

export default MapMarker;
