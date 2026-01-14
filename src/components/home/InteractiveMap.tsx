import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, CameraControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin, Info, Camera, X } from 'lucide-react';

// --- 📸 CAMERA MARKER DATA ---
// Add your points here. You can use the "Debug Mode" to find coordinates.
const CAMERA_POINTS = [
  {
    id: 1,
    // Adjust these positions to match where they should be in the room
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

// --- 📍 VENUE CONFIGURATION ---
const VENUES = [
  {
    id: 'overview',
    label: 'Æ Klæg',
    title: 'Hele Værftet',
    position: [0, 25, 25],
    target: [0, 0, 0],
  },
  {
    id: 'vaerftet',
    label: 'Værftet',
    title: 'Det Gamle Værft',
    position: [5, 8, 8],
    target: [2, 0, 0],
  },
  {
    id: 'elsesgab',
    label: 'Elses Gab',
    title: 'Elses Gab',
    position: [-10, 5, 5],
    target: [-5, 0, 2],
  },
  {
    id: 'kaedekassen',
    label: 'Kædekassen',
    title: 'Kædekassen',
    position: [0, 5, -10],
    target: [0, 0, -2],
  },
  {
    id: 'toerw',
    label: 'Tørw',
    title: 'Tørw',
    position: [8, 4, -5],
    target: [5, 0, -3],
  },
];

// --- 🎨 THEME ---
const PALETTE = {
  background: 'hsl(40, 75%, 55%)',
  walls: '#e5e5e5',
  floor: '#d4d4d8',
};

// --- COMPONENT: Camera Rig ---
function CameraRig({
  activeVenue,
  isDebug,
}: {
  activeVenue: (typeof VENUES)[0];
  isDebug: boolean;
}) {
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        activeVenue.position[0],
        activeVenue.position[1],
        activeVenue.position[2],
        activeVenue.target[0],
        activeVenue.target[1],
        activeVenue.target[2],
        true,
      );
    }
  }, [activeVenue]);

  return (
    <CameraControls
      ref={cameraControlsRef}
      enabled={true}
      mouseButtons={{
        left: isDebug ? 1 : 0,
        middle: isDebug ? 1 : 0,
        right: isDebug ? 1 : 0,
        wheel: isDebug ? 1 : 0,
      }}
      touches={{
        one: isDebug ? 1 : 0,
        two: isDebug ? 1 : 0,
        three: isDebug ? 1 : 0,
      }}
      smoothTime={1.2}
    />
  );
}

// --- COMPONENT: Single Camera Marker ---
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

      {/* Label on Hover */}
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

// --- COMPONENT: The 3D Scene ---
function VenueModel({ onOpenImage }: { onOpenImage: (img: string) => void }) {
  const { nodes } = useGLTF('/aeklaeg_layout.glb');

  return (
    <group dispose={null}>
      {/* 1. Render the Camera Markers */}
      {CAMERA_POINTS.map((point) => (
        <CameraMarker
          key={point.id}
          position={point.position}
          onClick={() => onOpenImage(point.image)}
        />
      ))}

      {/* 2. Render the Room Mesh */}
      {Object.entries(nodes).map(([name, node]) => {
        if (node.type !== 'Mesh') return null;
        const meshNode = node as THREE.Mesh;
        return (
          <mesh
            key={name}
            geometry={meshNode.geometry}
            position={meshNode.position}
            rotation={meshNode.rotation}
            scale={meshNode.scale}
          >
            <meshStandardMaterial
              color={name === 'Værftet' ? PALETTE.floor : PALETTE.walls}
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
  const [activeTabId, setActiveTabId] = useState('overview');
  const activeVenue = VENUES.find((v) => v.id === activeTabId) || VENUES[0];
  const [debugMode, setDebugMode] = useState(false);

  // State for the Image Modal
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // --- CONTENT RENDERER ---
  const renderDescription = () => {
    switch (activeTabId) {
      case 'overview':
        return (
          <>
            <p className='mb-4'>
              Få det fulde overblik over vores historiske rammer. Fra det gamle
              bådværft til de nye hyggelige kroge.
            </p>
            <p>
              Her forenes <strong>natur, historie og kultur</strong> i ét samlet
              udtryk.
            </p>
          </>
        );
      case 'vaerftet':
        return (
          <>
            <p className='mb-4'>
              Værftet er hjertet af Æ Klæg. Et sted hvor rustikke bjælker møder
              moderne hygge.
            </p>
            <p>
              Her har vi bevaret den originale <em>industri-stemning</em>.
            </p>
          </>
        );
      case 'elsesgab':
        return (
          <>
            <p className='mb-4'>
              Opkaldt efter den lokale naturperle. Dette lokale byder på en
              intim atmosfære med masser af lysindfald.
            </p>
            <ul className='list-disc list-inside space-y-1 ml-2'>
              <li>Direkte udgang til naturen</li>
              <li>Plads til 40 gæster</li>
            </ul>
          </>
        );
      case 'kaedekassen':
        return (
          <p>
            Vores dedikerede musik- og eventrum. Her er akustikken i højsædet.
          </p>
        );
      case 'toerw':
        return (
          <p>
            Det nyeste skud på stammen. Tørw er indrettet med fokus på
            bæredygtige materialer og ro.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <section className='pb-20 bg-background border-b border-border/10'>
      {/* --- 1. STICKY HEADER --- */}
      <div className='sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 border-b border-border/10 mb-10 shadow-sm'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='font-typewriter text-3xl md:text-5xl font-bold text-primary mb-6'>
            Oplev Rammerne
          </h2>
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
            {VENUES.map((venue) => (
              <button
                key={venue.id}
                onClick={() => setActiveTabId(venue.id)}
                className={`
                  relative pb-2 text-sm md:text-lg font-medium transition-colors duration-300
                  ${activeTabId === venue.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                {venue.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ${activeTabId === venue.id ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto'>
          {/* --- LEFT: TEXT CARD --- */}
          <div className='lg:col-span-1 h-full'>
            <div className='bg-card p-8 rounded-2xl border border-border/10 shadow-sm h-full flex flex-col justify-center animate-in fade-in slide-in-from-left-4 duration-500 key={activeTabId}'>
              <div className='flex items-center gap-2 text-primary mb-4'>
                <MapPin className='w-5 h-5' />
                <span className='text-sm font-bold tracking-widest uppercase opacity-70'>
                  Lokation
                </span>
              </div>

              <h3 className='font-typewriter text-3xl font-bold text-foreground mb-6'>
                {activeVenue.title}
              </h3>

              <div className='font-sans text-lg text-muted-foreground leading-relaxed'>
                {renderDescription()}
              </div>

              <div className='mt-auto pt-8 border-t border-border/20 mt-8'>
                <p className='text-xs text-muted-foreground italic flex items-center gap-2'>
                  <Info className='w-4 h-4' />
                  Kortet roterer automatisk. Klik på ikonerne for billeder.
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT: 3D MAP --- */}
          <div
            className='lg:col-span-2 relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-border/20 shadow-2xl'
            style={{ backgroundColor: PALETTE.background }}
          >
            {/* IMAGE MODAL (z-50 puts it on top of everything) */}
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

            <Canvas camera={{ fov: 45 }}>
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
                adjustCamera={false}
                shadows={false}
              >
                {/* We pass the 'setActiveImage' function down to the model */}
                <VenueModel onOpenImage={setActiveImage} />
              </Stage>

              <CameraRig activeVenue={activeVenue} isDebug={debugMode} />
            </Canvas>

            <button
              onClick={() => setDebugMode(!debugMode)}
              className='absolute bottom-2 right-2 text-[10px] bg-black/20 text-white/50 px-2 py-1 rounded hover:bg-black/50 hover:text-white transition-colors'
            >
              {debugMode ? 'Exit Debug' : 'Debug'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
