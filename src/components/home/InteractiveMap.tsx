import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Hand, Lock, Camera, X, ArrowRight } from 'lucide-react';

// --- 📸 CAMERA DATA ---
const CAMERA_POINTS = [
  {
    id: 1,
    position: [2, 1.5, 0],
    label: 'Udsigt over Værftet',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    position: [-3, 1.5, 2],
    label: 'Hyggehjørnet',
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop',
  },
];

// --- 🎨 THEME CONFIGURATION ---
const PALETTE = {
  background: 'hsl(40, 75%, 55%)',
  walls: '#e5e5e5',
  floor: '#d4d4d8',
  hover: 'hsl(40, 75%, 35%)',
};

// --- COMPONENT: The Camera Marker Button ---
function CameraMarker({
  position,
  onClick,
}: {
  position: number[];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

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
        className={`
          flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all duration-300 border-2 border-white
          ${hovered ? 'bg-primary text-white scale-125' : 'bg-primary/80 text-white scale-100'}
        `}
        title='Se billede'
      >
        <Camera className='w-4 h-4' />
      </button>

      <div
        className={`
        absolute top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none transition-opacity duration-200
        ${hovered ? 'opacity-100' : 'opacity-0'}
      `}
      >
        Se billede
      </div>
    </Html>
  );
}

function VenueModel({ onOpenImage }: { onOpenImage: (img: string) => void }) {
  const { nodes } = useGLTF('/aeklaeg_layout.glb');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <group dispose={null}>
      {CAMERA_POINTS.map((point) => (
        <CameraMarker
          key={point.id}
          position={point.position}
          onClick={() => onOpenImage(point.image)}
        />
      ))}

      {Object.entries(nodes).map(([name, node]) => {
        if (node.type !== 'Mesh') return null;
        const meshNode = node as THREE.Mesh;
        const isInteractive = name === 'Værftet';

        return (
          <mesh
            key={name}
            geometry={meshNode.geometry}
            position={meshNode.position}
            rotation={meshNode.rotation}
            scale={meshNode.scale}
            onPointerOver={(e) => {
              if (isInteractive) {
                e.stopPropagation();
                setHovered(name);
                document.body.style.cursor = 'pointer';
              }
            }}
            onPointerOut={() => {
              if (isInteractive) {
                setHovered(null);
                document.body.style.cursor = 'auto';
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (isInteractive) {
                console.log(
                  `📌 Coordinates: [${e.point.x.toFixed(2)}, ${e.point.y.toFixed(2) + 1.5}, ${e.point.z.toFixed(2)}]`,
                );
              }
            }}
          >
            <meshStandardMaterial
              color={
                isInteractive && hovered === name
                  ? PALETTE.hover
                  : isInteractive
                    ? PALETTE.floor
                    : PALETTE.walls
              }
              roughness={1}
              metalness={0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function InteractiveMap() {
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className='py-20 md:py-32 bg-background border-b border-border/10'>
      {/* LAYOUT CHANGE:
        We use 'grid-cols-1' (mobile) and 'lg:grid-cols-2' (desktop)
        to place text and map side-by-side.
      */}
      <div className='container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* --- LEFT COLUMN: TEXT CONTENT --- */}
        <div className='space-y-6 text-center lg:text-left'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
            </span>
            Interaktiv Oversigt
          </div>

          <h2 className='font-typewriter text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight'>
            Gå på opdagelse i <br />
            <span className='text-foreground'>vores rammer</span>
          </h2>

          <p className='font-sans text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0'>
            Værftet er hjertet af Æ Klæg. Et sted hvor rustikke bjælker møder
            moderne hygge. Brug kortet til at udforske indretningen, finde de
            bedste spots, og få en fornemmelse af stemningen før du ankommer.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Camera className='w-4 h-4 text-primary' />
              <span>Klik på ikonerne for at se billeder</span>
            </div>
            <div className='hidden sm:block w-px h-4 bg-border'></div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Hand className='w-4 h-4 text-primary' />
              <span>Klik og træk for at rotere</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: THE MAP --- */}
        <div
          className='relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-border/20 shadow-2xl'
          style={{ backgroundColor: PALETTE.background }}
        >
          {/* OVERLAY */}
          {!isInteracting && (
            <div
              onClick={() => setIsInteracting(true)}
              className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/10 hover:bg-black/5 transition-colors cursor-pointer group'
            >
              <div className='bg-white text-black px-8 py-4 rounded-full shadow-xl flex items-center gap-3 transform group-hover:scale-105 transition-all duration-300 border border-white/20'>
                <Hand className='w-5 h-5' />
                <span className='font-sans text-lg font-medium'>
                  Klik for at udforske
                </span>
              </div>
            </div>
          )}

          {isInteracting && (
            <button
              onClick={() => setIsInteracting(false)}
              className='absolute top-6 right-6 z-30 bg-white/90 backdrop-blur text-black border border-border px-4 py-2 rounded-full shadow-md text-sm font-medium hover:bg-gray-100 transition-all flex items-center gap-2'
            >
              <Lock className='w-4 h-4' />
              <span>Lås kort</span>
            </button>
          )}

          {/* IMAGE MODAL */}
          {activeImage && (
            <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200'>
              <div className='relative max-w-2xl w-full bg-white rounded-xl overflow-hidden shadow-2xl p-1'>
                <button
                  onClick={() => setActiveImage(null)}
                  className='absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-50 backdrop-blur-sm'
                >
                  <X className='w-4 h-4' />
                </button>
                <img
                  src={activeImage}
                  alt='Preview'
                  className='w-full h-auto max-h-[60vh] object-cover rounded-lg'
                />
              </div>
              <div
                className='absolute inset-0 -z-10'
                onClick={() => setActiveImage(null)}
              />
            </div>
          )}

          <Canvas camera={{ position: [0, 15, 15], fov: 45 }}>
            <color attach='background' args={[PALETTE.background]} />
            <fog attach='fog' args={[PALETTE.background, 50, 100]} />
            <ambientLight intensity={2.0} />
            <pointLight
              position={[10, 20, 10]}
              intensity={1.0}
              color='#ffffff'
            />

            <Stage
              environment='city'
              intensity={0.5}
              adjustCamera={1.2}
              shadows={false}
            >
              <VenueModel onOpenImage={setActiveImage} />
            </Stage>

            <OrbitControls
              makeDefault
              enabled={isInteracting}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2.2}
              enablePan={false}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
