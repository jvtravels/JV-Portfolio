"use client";

import React, { useMemo } from "react";
import "./GradualBlur.css";

interface GradualBlurProps {
  position?: "top" | "bottom" | "left" | "right";
  strength?: number;
  height?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  opacity?: number;
  curve?: "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
  className?: string;
  style?: React.CSSProperties;
}

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  "ease-in": p => p * p,
  "ease-out": p => 1 - Math.pow(1 - p, 2),
  "ease-in-out": p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const GRADIENT_DIRECTION: Record<string, string> = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
};

export default function GradualBlur({
  position = "bottom",
  strength = 2,
  height = "6rem",
  divCount = 5,
  exponential = false,
  zIndex = 1000,
  opacity = 1,
  curve = "linear",
  className = "",
  style = {},
}: GradualBlurProps) {
  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / divCount;
    const curveFunc = CURVE_FUNCTIONS[curve] ?? CURVE_FUNCTIONS.linear;
    const direction = GRADIENT_DIRECTION[position] ?? "to bottom";

    for (let i = 1; i <= divCount; i++) {
      const progress = curveFunc(i / divCount);
      const blurValue = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * divCount + 1) * strength;

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const maskImage = `linear-gradient(${direction}, ${gradient})`;

      divs.push(
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage,
            WebkitMaskImage: maskImage,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity,
          }}
        />
      );
    }
    return divs;
  }, [position, strength, divCount, exponential, opacity, curve]);

  const isVertical = position === "top" || position === "bottom";

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    zIndex,
    height: isVertical ? height : "100%",
    width: isVertical ? "100%" : height,
    [position]: 0,
    left: isVertical ? 0 : undefined,
    right: isVertical ? 0 : undefined,
    top: !isVertical ? 0 : undefined,
    bottom: !isVertical ? 0 : undefined,
    ...style,
  };

  return (
    <div className={`gradual-blur ${className}`} style={containerStyle}>
      <div className="gradual-blur-inner">{blurDivs}</div>
    </div>
  );
}
