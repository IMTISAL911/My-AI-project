// import { Canvas } from "@react-three/fiber";
// import { Stars } from "@react-three/drei";



// export default function StarsBackground() {
//   return (
//     <div className="fixed inset-0 -z-10">
//       <Canvas>
//         <Stars
//           radius={100}
//           depth={50}
//           count={5000}
//           factor={4}
//           fade
//           speed={1}
//         />
//       </Canvas>
//     </div>
//   );
// }



// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { Stars } from "@react-three/drei";
// import { useRef } from "react";

// function MovingStars() {
//   const ref = useRef();

//   useFrame(({ mouse }) => {
//     if (!ref.current) return;

//     // Smooth cursor-based rotation
//     ref.current.rotation.y = mouse.x * 0.5;
//     ref.current.rotation.x = -mouse.y * 0.5;
//   });

//   return (
//     <Stars
//       ref={ref}
//       radius={100}
//       depth={60}
//       count={8000}
//       factor={6}
//       fade
//       speed={2}
//     />
//   );
// }

// export default function StarsBackground() {
//   return (
//     <div className="fixed inset-0 -z-10">
//       <Canvas camera={{ position: [0, 0, 1] }}>
//         <MovingStars />
//       </Canvas>
//     </div>
//   );
// }



"use client";

export default function NasaBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <iframe
        src="https://eyes.nasa.gov/apps/solar-system/#/home"
        className="w-full h-full pointer-events-none"
        allowFullScreen
      />
    </div>
  );
}
