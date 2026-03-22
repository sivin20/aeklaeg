import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin, Info, X } from 'lucide-react';
import MapMarker from '@/components/home/map_components/MapMarker.tsx';

// --- 🎨 GLOBAL BACKGROUND (THE YELLOW YOU LIKE) ---
const BACKGROUND_COLOR = 'hsl(40, 75%, 55%)';

// --- 🎨 3D MODEL BASE COLORS ---
const BASE_COLORS = {
  walls: '#e5e5e5', // Inactive Room Walls (Grey)
  floor: '#d4d4d8', // Inactive Room Floor (Darker Grey)
};

// --- 📸 CAMERA MARKER DATA ---
export type MarkerType = 'image' | 'handicap' | 'toilet';

const CAMERA_POINTS: {
  id: number;
  position: number[];
  label: string;
  type: MarkerType;
  image: string;
}[] = [
  // VÆRFTET
  {
    id: 2,
    position: [-2, 1.5, 3],
    label: 'Værftet Upper 1',
    type: 'image',
    image: '/public/img/map_imgs/vaerftet_upper_1.jpg',
  },
  {
    id: 21,
    position: [-2, 1.5, 0],
    label: 'Værftet Upper 2',
    type: 'image',
    image: '/public/img/map_imgs/vaerftet_upper_2.jpg',
  },
  {
    id: 22,
    position: [0, 1.5, -3],
    label: 'Værftet Upper 3',
    type: 'image',
    image: '/public/img/map_imgs/vaerftet_upper_3.jpg',
  },
  {
    id: 23,
    position: [2, 1.5, -6],
    label: 'Værftet Lower 1',
    type: 'image',
    image: '/public/img/map_imgs/vaerftet_lower_1.jpg',
  },
  {
    id: 24,
    position: [0, 1.5, -8],
    label: 'Værftet lower 2',
    type: 'image',
    image: '/public/img/map_imgs/vaerftet_lower_2.jpg',
  },
  {
    id: 3,
    position: [0.5, 1.5, 4],
    label: 'Værftet Indgang 1',
    type: 'handicap',
    image: '/public/img/map_imgs/handicap/vaerftet_entrance_1.jpg',
  },
  {
    id: 6,
    position: [0.5, 1.5, -10],
    label: 'Værftet Indgang 2',
    type: 'handicap',
    image: '/public/img/map_imgs/handicap/vaerftet_entrance_2.jpg',
  },
  {
    id: 8,
    position: [4, 1.5, 0],
    label: 'Værftet Toilet 1',
    type: 'toilet',
    image: '/public/img/map_imgs/toilets/vaerftet_toilet_1.jpg',
  },

  {
    id: 9,
    position: [-4.5, 1.5, -11],
    label: 'Værftet Toilet 2',
    type: 'toilet',
    image: '/public/img/map_imgs/toilets/vaerftet_toilet_2.jpg',
  },

  // ELSES GAB
  {
    id: 5,
    position: [0.5, 1.5, -18],
    label: 'Elses Gab Indgang 1',
    type: 'handicap',
    image: '/public/img/map_imgs/handicap/elses_gab_entrance_1.jpg',
  },
  {
    id: 7,
    position: [8, 1.5, -25.5],
    label: 'Elses Gab Indgang 2',
    type: 'handicap',
    image: '/public/img/map_imgs/handicap/elses_gab_entrance_2.jpg',
  },
  {
    id: 10,
    position: [7, 1.5, -17],
    label: 'Elses Gab Toilet',
    type: 'toilet',
    image: '/public/img/map_imgs/toilets/elses_gab_toilet.jpg',
  },
];

// --- 📍 VENUE CONFIGURATION ---
// --- 📍 VENUE CONFIGURATION ---
const VENUES = [
  {
    id: 'overview',
    label: 'Æ Klæg',
    title: 'Æ Klæg',
    position: [-0.34, 25.07, 26.42],
    target: [-0.34, 0.07, 1.42],
    blenderParent: null,
    color: null,
  },
  {
    id: 'vaerftet',
    label: 'Værftet',
    title: 'Værftet',
    position: [2.52, 14.5, 18.87],
    target: [0.87, 6.94, 13.47],
    blenderParent: 'Vaerftet',
    color: '#4f4537',
  },
  {
    id: 'elsesgab',
    label: 'Elses Gab',
    title: 'Elses Gab',
    position: [17.33, 10.77, -21.59],
    target: [-0.57, -8.24, 2.25],
    blenderParent: 'Elses_Gab',
    color: '#4f4537',
  },
  {
    id: 'kaedekassen',
    label: 'Kædekassen',
    title: 'Kædekassen',
    position: [-6.65, 11.49, -4.14],
    target: [-0.03, 5.03, -2.29],
    blenderParent: 'Kaedekassen',
    color: '#4f4537',
  },
  {
    id: 'toerw',
    label: 'Tørw',
    title: 'Tørw',
    position: [-15.46, 14.97, -4.15],
    target: [-10.04, 7.8, -1.28],
    blenderParent: 'Toerw',
    color: '#4f4537',
  },
];

// --- 🛠️ HELPER TOOL: CAMERA LOGGER ---
function CameraLogger({
  controlsRef,
}: {
  controlsRef: React.RefObject<CameraControls>;
}) {
  const [info, setInfo] = useState<{ pos: number[]; tgt: number[] } | null>(
    null,
  );

  const logView = () => {
    if (!controlsRef.current) return;
    const p = controlsRef.current.camera.position;
    // @ts-ignore
    const t = controlsRef.current._target;
    const posArray = [
      Number(p.x.toFixed(2)),
      Number(p.y.toFixed(2)),
      Number(p.z.toFixed(2)),
    ];
    const tgtArray = [
      Number(t.x.toFixed(2)),
      Number(t.y.toFixed(2)),
      Number(t.z.toFixed(2)),
    ];
    setInfo({ pos: posArray, tgt: tgtArray });
    console.log(
      `position: [${posArray.join(', ')}],\ntarget: [${tgtArray.join(', ')}],`,
    );
  };

  return (
    <div className='absolute bottom-4 left-4 z-50 bg-black/90 text-white p-4 rounded-lg text-xs font-mono shadow-xl border border-white/20'>
      <p className='mb-2 text-yellow-400 font-bold flex items-center gap-2'>
        <Info className='w-3 h-3' /> DEBUG MODE
      </p>
      <button
        onClick={logView}
        className='w-full bg-primary text-primary-foreground py-2 rounded mb-4 font-bold hover:brightness-110 transition-all border border-white/10'
      >
        📸 CAPTURE COORDINATES
      </button>
      {info && (
        <div className='select-all bg-white/10 p-2 rounded break-all'>
          <p className='mb-1'>
            <span className='text-blue-300'>pos:</span> [{info.pos.join(', ')}]
          </p>
          <p>
            <span className='text-green-300'>tgt:</span> [{info.tgt.join(', ')}]
          </p>
        </div>
      )}
    </div>
  );
}

// --- COMPONENT: Camera Rig ---
function CameraRig({
  activeVenue,
  isDebug,
  setControlsRef,
}: {
  activeVenue: (typeof VENUES)[0];
  isDebug: boolean;
  setControlsRef: (ref: any) => void;
}) {
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (cameraControlsRef.current) setControlsRef(cameraControlsRef);
  }, []);

  useEffect(() => {
    if (!isDebug && cameraControlsRef.current) {
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
  }, [activeVenue, isDebug]);

  return (
    <CameraControls
      ref={cameraControlsRef}
      enabled={true}
      dollyToCursor={true}
      mouseButtons={{
        left: isDebug ? 1 : 0,
        middle: isDebug ? 4 : 0,
        right: isDebug ? 2 : 0,
        wheel: isDebug ? 4 : 0,
      }}
      touches={{
        one: isDebug ? 1 : 0,
        two: isDebug ? 4 : 0,
        three: isDebug ? 2 : 0,
      }}
      smoothTime={1.2}
    />
  );
}

// --- COMPONENT: The 3D Scene ---
function VenueModel({
  onOpenImage,
  activeVenueId,
  isDebug,
}: {
  onOpenImage: (img: string) => void;
  activeVenueId: string;
  isDebug: boolean;
}) {
  const { scene } = useGLTF('/aeklaeg_layout.glb');

  // Create materials for Base walls/floors AND unique materials for each venue color.
  const materials = useMemo(() => {
    const mats: Record<string, THREE.MeshStandardMaterial> = {
      wall: new THREE.MeshStandardMaterial({
        color: BASE_COLORS.walls,
        roughness: 1,
        metalness: 0,
      }),
      floor: new THREE.MeshStandardMaterial({
        color: BASE_COLORS.floor,
        roughness: 1,
        metalness: 0,
      }),
    };

    VENUES.forEach((venue) => {
      if (venue.color && venue.id !== 'overview') {
        mats[venue.id] = new THREE.MeshStandardMaterial({
          color: venue.color,
          roughness: 1,
          metalness: 0,
        });
      }
    });
    return mats;
  }, []);

  useEffect(() => {
    const activeVenue = VENUES.find((v) => v.id === activeVenueId);
    const targetParentName = activeVenue?.blenderParent;

    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;

        let isHighlighted = false;
        const myParentName = mesh.parent?.name;

        if (targetParentName && myParentName) {
          if (
            myParentName
              .toLowerCase()
              .startsWith(targetParentName.toLowerCase())
          ) {
            isHighlighted = true;
          }
        }

        if (isHighlighted) {
          mesh.material = materials[activeVenueId];
        } else {
          // Fallback
          const isFloor =
            mesh.name.toLowerCase().includes('floor') ||
            mesh.name.toLowerCase().includes('plane');
          mesh.material = isFloor ? materials.floor : materials.wall;
        }
      }
    });
  }, [activeVenueId, scene, materials]);

  return (
    <group dispose={null}>
      {CAMERA_POINTS.map((point) => {
        return (
          <MapMarker
            key={point.id}
            position={point.position}
            onClick={() => onOpenImage(point.image)}
            type={point.type}
          />
        );
      })}

      <primitive
        object={scene}
        onClick={(e: any) => {
          if (isDebug) {
            e.stopPropagation();
            const pName = e.object.parent?.name || 'None';
            console.log(`Clicked: ${e.object.name}, Parent: ${pName}`);
            alert(`Clicked: ${e.object.name}\nParent: ${pName}`);
          }
        }}
      />
    </group>
  );
}

export default function InteractiveMap() {
  const [activeTabId, setActiveTabId] = useState('overview');
  const activeVenue = VENUES.find((v) => v.id === activeTabId) || VENUES[0];
  const [debugMode, setDebugMode] = useState(false);
  const [controlsRef, setControlsRef] =
    useState<React.RefObject<CameraControls> | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const renderDescription = () => {
    switch (activeTabId) {
      case 'overview':
        return (
          <div className='flex flex-col gap-2 text-md'>
            <p>
              Mange spørger til hvor navnene vi bruger om vores sted kommer fra.
            </p>
            <p>
              Vi bruger navne som Æ Klæg, Elses Gab, Værftet og Kædekassen, og
              de er måske ikke helt almindelige, men de har alle en historie.
            </p>
            <p>
              Æ Klæg er opkaldt efter det vadehavsslik/mudder der dukkker op ved
              ebbe langs "Svenskeren", og her ved man som fannik, at skulle man
              driste sig til at gå ud i det - så koster det minimum den ene sko
              pga. det stærkt sugende mudder.
            </p>
            <p>Derfra har vi også mottoet: Æ KLÆG - Bliv hængende</p>
          </div>
        );
      case 'vaerftet':
        return (
          <div className='flex flex-col gap-2 text-md'>
            <p>
              Værftet er opkaldt efter det sidste fungerende træskibsværft på
              Fanø, som var beliggende på p-pladsen lige her udenfor døren på
              vejen "Ved Skibsværftet"
            </p>
            <p>
              Fanø havde ved århundredeskiftet år 1900, Danmarks næststørste
              handelsflåde, kun overgået af København
            </p>
          </div>
        );
      case 'elsesgab':
        return (
          <div className='flex flex-col gap-2 text-md'>
            <p>
              Elses Gab tager navn bl.a. fra historien om, at det i Ribe står
              skrevet, at en af Veldemarerne i Middelalderen angiveligt havde et
              hus på Fanø.
            </p>
            <p>
              Det var før, der var noget, der hed Nordby og Sønderho, og huset
              lå nok i en bebyggelse der hed Kirkeby ca. midt på øen. For at
              komme derind, sejlede man ad en rende sytd for Halen. Renden hed
              Elses Gab. En af ejerne af Æ Klæg hedder Else, man stopper maden i
              gabet, derfor hedder caféen Elses Gab
            </p>
          </div>
        );
      case 'kaedekassen':
        return (
          <div className='flex flex-col gap-2 text-md'>
            <p>
              Før Æ Klæg holdt til her, drev Villy Christensen cykelhandlen
              “Nordby Knallert- og Motorservice”, hvor han reparerede knallerter
              og motorcykler. Kædekassen er opkaldt efter det originale værksted
              – og når du besøger Kædekassen i dag, kan du stadig se de gamle
              cykelophængere i loftet.
            </p>
            <p>
              I dag byder stedet på den fedeste live-musik med upcoming artister
              i en intim og gennemført atmosfære.
            </p>
          </div>
        );
      case 'toerw':
        return (
          <div className='flex flex-col gap-2 text-md'>
            <p>
              TØRW er en lille mandebutik i Æ’ Klæg med fokus på slidstærkt
              arbejdstøj og maritim elegance. Her hyldes det gode håndværk med
              tøj og accessories inspireret af 1920–1960’erne, hvor kvalitet og
              holdbarhed var en selvfølge.
            </p>
            <p>
              Sortimentet er nøje kurateret med brands, der har historie og sjæl
              – suppleret af eksklusive grooming- og plejeprodukter til manden
              med og uden skæg.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className='pb-20 bg-background border-b border-border/10'>
      <div className='sticky top-0 z-40 bg-background/95 backdrop-blur py-6 border-b border-border/10 mb-10'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='font-typewriter text-3xl md:text-5xl font-bold text-primary mb-6'>
            Oplev Rammerne
          </h2>
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
            {VENUES.map((venue) => {
              const activeColor = venue.color || 'currentColor';
              return (
                <button
                  key={venue.id}
                  onClick={() => setActiveTabId(venue.id)}
                  className={`relative pb-2 text-sm md:text-lg font-medium transition-colors duration-300 ${activeTabId === venue.id ? '' : 'text-muted-foreground'}`}
                  style={{
                    color: activeTabId === venue.id ? activeColor : undefined,
                  }}
                >
                  {venue.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 ${activeTabId === venue.id ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{ backgroundColor: activeColor }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto'>
          <div className='lg:col-span-1 h-full'>
            <div className='bg-card p-8 rounded-2xl border border-border/10 shadow-sm h-full flex flex-col justify-center'>
              <div
                className='flex items-center gap-2 mb-4'
                style={{ color: activeVenue.color || 'inherit' }}
              >
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
                  Kortet roterer automatisk.
                </p>
              </div>
            </div>
          </div>

          <div
            className='lg:col-span-2 relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-border/20 shadow-2xl'
            style={{ backgroundColor: BACKGROUND_COLOR }}
          >
            {debugMode && controlsRef && (
              <CameraLogger controlsRef={controlsRef} />
            )}
            {activeImage && (
              <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4'>
                <div className='relative max-w-2xl w-full bg-white rounded-xl overflow-hidden'>
                  <button
                    onClick={() => setActiveImage(null)}
                    className='absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full'
                  >
                    <X className='w-4 h-4' />
                  </button>
                  <img
                    src={activeImage}
                    className='w-full h-auto max-h-[60vh] object-cover'
                  />
                </div>
                <div
                  className='absolute inset-0 -z-10'
                  onClick={() => setActiveImage(null)}
                />
              </div>
            )}

            <Canvas camera={{ fov: 45 }}>
              {/* USE GLOBAL YELLOW BACKGROUND HERE */}
              <color attach='background' args={[BACKGROUND_COLOR]} />
              <fog attach='fog' args={[BACKGROUND_COLOR, 50, 100]} />

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
                <VenueModel
                  onOpenImage={setActiveImage}
                  activeVenueId={activeTabId}
                  isDebug={debugMode}
                />
              </Stage>

              <CameraRig
                activeVenue={activeVenue}
                isDebug={debugMode}
                setControlsRef={setControlsRef}
              />
            </Canvas>

            <button
              onClick={() => setDebugMode(!debugMode)}
              className='absolute bottom-2 right-2 text-[10px] bg-black/20 text-white/50 px-2 py-1 rounded hover:bg-black/50 hover:text-white transition-colors z-40'
            >
              {debugMode ? 'Exit Debug' : 'Debug'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
