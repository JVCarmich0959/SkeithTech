import type { CSSProperties } from "react";

// Type definitions
type AmbientElement = {
  shape: "rectangle" | "circle";
  size: number;
  position: {
    top: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  color: string;
  opacity: number;
  animation: {
    type: "float-slow" | "float-delay";
    delay: string;
    rotation?: number;
  };
};

type GridConfig = {
  cellSize: number;
  lineColor: string;
  opacity: number;
};

// Configuration
const AMBIENT_ELEMENTS: AmbientElement[] = [
  {
    shape: "rectangle",
    size: 80,
    position: { top: "15%", left: "10%" },
    color: "bg-blue-600",
    opacity: 0.05,
    animation: {
      type: "float-slow",
      delay: "0s",
      rotation: 12,
    },
  },
  {
    shape: "circle",
    size: 120,
    position: { top: "65%", right: "15%" },
    color: "bg-gray-800",
    opacity: 0.03,
    animation: {
      type: "float-delay",
      delay: "3s",
    },
  },
  {
    shape: "rectangle",
    size: 60,
    position: { bottom: "20%", left: "20%" },
    color: "bg-blue-400",
    opacity: 0.04,
    animation: {
      type: "float-delay",
      delay: "5s",
      rotation: -12,
    },
  },
];

const GRID_CONFIG: GridConfig = {
  cellSize: 40,
  lineColor: "rgba(0,0,0,0.02)",
  opacity: 1,
};

// Utility functions
const getShapeClass = (shape: AmbientElement["shape"]) => 
  shape === "circle" ? "rounded-full" : "rounded-lg";

const getAnimationClass = (animation: AmbientElement["animation"]) => 
  `animate-${animation.type} delay-[${animation.delay}]`;

const getRotationStyle = (rotation?: number): CSSProperties => 
  rotation ? { transform: `rotate(${rotation}deg)` } : {};

const generateGridStyle = (config: GridConfig): CSSProperties => ({
  backgroundImage: `
    linear-gradient(to right, ${config.lineColor} 1px, transparent 1px),
    linear-gradient(to bottom, ${config.lineColor} 1px, transparent 1px)
  `,
  backgroundSize: `${config.cellSize}px ${config.cellSize}px`,
  opacity: config.opacity,
});

// Main Component
export default function AmbientElements() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {/* Floating elements */}
      {AMBIENT_ELEMENTS.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.color}`}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            top: element.position.top,
            left: element.position.left,
            right: element.position.right,
            bottom: element.position.bottom,
            opacity: element.opacity,
            ...getRotationStyle(element.animation.rotation),
          }}
          className={[
            "absolute",
            element.color,
            getShapeClass(element.shape),
            getAnimationClass(element.animation),
          ].join(" ")}
        />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0" 
        style={generateGridStyle(GRID_CONFIG)} 
      />
    </div>
  );
}