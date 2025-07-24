"use client";

import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import type { CSSProperties } from "react";

type AmbientElement = {
  id: string;
  shape: "rectangle" | "circle";
  size: number;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  color: string;
  opacity: number;
  animation: {
    type: "float" | "pulse" | "drift";
    duration: number;
    delay?: number;
    rotation?: number;
    direction?: "normal" | "reverse" | "alternate";
  };
};

type GridConfig = {
  cellSize: number;
  lineColor: string;
  lineWidth: number;
  opacity: number;
};

const AMBIENT_ELEMENTS: AmbientElement[] = [
  {
    id: "elem-1",
    shape: "rectangle",
    size: 80,
    position: { top: "15%", left: "10%" },
    color: "rgba(37, 99, 235, 0.05)", // blue-600
    opacity: 0.05,
    animation: {
      type: "float",
      duration: 25,
      delay: 0,
      rotation: 12,
      direction: "alternate"
    },
  },
  {
    id: "elem-2",
    shape: "circle",
    size: 120,
    position: { top: "65%", right: "15%" },
    color: "rgba(31, 41, 55, 0.03)", // gray-800
    opacity: 0.03,
    animation: {
      type: "drift",
      duration: 30,
      delay: 3,
    },
  },
  {
    id: "elem-3",
    shape: "rectangle",
    size: 60,
    position: { bottom: "20%", left: "20%" },
    color: "rgba(96, 165, 250, 0.04)", // blue-400
    opacity: 0.04,
    animation: {
      type: "pulse",
      duration: 15,
      delay: 5,
      rotation: -12,
    },
  },
];

const GRID_CONFIG: GridConfig = {
  cellSize: 40,
  lineColor: "rgba(0, 0, 0, 0.02)",
  lineWidth: 1,
  opacity: 1,
};

const generateGridStyle = (config: GridConfig): CSSProperties => ({
  backgroundImage: `
    linear-gradient(to right, ${config.lineColor} ${config.lineWidth}px, transparent ${config.lineWidth}px),
    linear-gradient(to bottom, ${config.lineColor} ${config.lineWidth}px, transparent ${config.lineWidth}px)
  `,
  backgroundSize: `${config.cellSize}px ${config.cellSize}px`,
  opacity: config.opacity,
});

const getBorderRadius = (shape: AmbientElement["shape"]): string => 
  shape === "circle" ? "50%" : "8px";

const AmbientElement = ({ element }: { element: AmbientElement }) => {
  const baseTransition: Transition = {
    duration: element.animation.duration,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut",
    delay: element.animation.delay
  };

  const floatVariants: Variants = {
    hidden: { y: 0, x: 0 },
    visible: {
      y: [0, -15, 0, 5, 0],
      x: [0, 5, 0, -5, 0],
      transition: baseTransition
    }
  };

  const pulseVariants: Variants = {
    hidden: { scale: 1, opacity: element.opacity },
    visible: {
      scale: [1, 1.05, 1],
      opacity: [element.opacity, element.opacity * 1.5, element.opacity],
      transition: baseTransition
    }
  };

  const driftVariants: Variants = {
    hidden: { x: 0, rotate: 0 },
    visible: {
      x: [0, 10, 0, -10, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: baseTransition
    }
  };

  const variants = {
    float: floatVariants,
    pulse: pulseVariants,
    drift: driftVariants
  }[element.animation.type];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: `${element.size}px`,
        height: `${element.size}px`,
        backgroundColor: element.color,
        borderRadius: getBorderRadius(element.shape),
        ...element.position,
      }}
      variants={variants}
      initial="hidden"
      animate="visible"
    />
  );
};

export default function AmbientElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Floating elements */}
      {AMBIENT_ELEMENTS.map((element) => (
        <AmbientElement key={element.id} element={element} />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={generateGridStyle(GRID_CONFIG)} 
      />
    </div>
  );
}