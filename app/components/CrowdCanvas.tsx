"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  /** Full-body figure images (SVG/PNG), one per unique figure. */
  srcs: string[];
  /** Rendered height (px) of each figure. */
  peepHeight?: number;
  /** Optional tint palette applied per-figure. Omit to keep the source black/white line art. */
  colors?: string[];
  /** How many walking instances to spawn per unique figure, to pack the crowd tighter. */
  density?: number;
}

type Peep = {
  image: CanvasImageSource;
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  render: (ctx: CanvasRenderingContext2D) => void;
};

export default function CrowdCanvas({ srcs, peepHeight = 90, colors = [], density = 1 }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: unknown[]) => (randomRange(0, array.length) | 0);
    const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = <T,>(array: T[], item: T) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = <T,>(array: T[]) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = <T,>(array: T[]) => array[randomIndex(array)];

    const stage = { width: 0, height: 0 };
    let isCompact = false;

    const BOB_AMPLITUDE = 6;

    // Full-body figures stand on the stage floor; only a small random lift
    // keeps the crowd from looking like it's pinned to one exact baseline.
    const resetPeep = ({ peep }: { peep: Peep }) => {
      const floatRange = isCompact ? 10 : 16;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = -floatRange * Math.random();
      const startY = Math.max(stage.height - peep.height + offsetY, BOB_AMPLITUDE);
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }: { peep: Peep; props: { startX: number; startY: number; endX: number } }) => {
      const { startX, startY, endX } = props;
      const speed = 55;
      const xDuration = Math.abs(endX - startX) / speed;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.4, 0.9));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: Math.round(xDuration / yDuration), yoyo: true, y: startY - BOB_AMPLITUDE }, 0);

      return tl;
    };

    const walks = [normalWalk];

    const tintImage = (source: HTMLImageElement, color: string): HTMLCanvasElement => {
      const tinted = document.createElement("canvas");
      tinted.width = source.naturalWidth;
      tinted.height = source.naturalHeight;
      const tctx = tinted.getContext("2d")!;
      tctx.drawImage(source, 0, 0);
      tctx.globalCompositeOperation = "multiply";
      tctx.fillStyle = color;
      tctx.fillRect(0, 0, tinted.width, tinted.height);
      tctx.globalCompositeOperation = "destination-in";
      tctx.drawImage(source, 0, 0);
      return tinted;
    };

    const createPeep = ({ image, width, height }: { image: CanvasImageSource; width: number; height: number }): Peep => {
      const peep: Peep = {
        image,
        width,
        height,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        render(context) {
          context.save();
          context.translate(peep.x, peep.y);
          context.scale(peep.scaleX, 1);
          context.drawImage(peep.image, 0, 0, peep.width, peep.height);
          context.restore();
        },
      };

      return peep;
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];
    let sourceImages: HTMLImageElement[] = [];

    const createPeeps = (effectiveDensity: number, effectivePeepHeight: number) => {
      const total = Math.round(sourceImages.length * effectiveDensity);

      for (let i = 0; i < total; i++) {
        const source = sourceImages[i % sourceImages.length];
        const scale = effectivePeepHeight / source.naturalHeight;
        const image = colors.length ? tintImage(source, getRandomFromArray(colors)) : source;

        allPeeps.push(
          createPeep({
            image,
            width: source.naturalWidth * scale,
            height: source.naturalHeight * scale,
          }),
        );
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk?.progress(Math.random());
      }
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => peep.render(ctx));

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => peep.walk?.kill());

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      // Must match the .footer-crowd CSS breakpoint (globals.css) — otherwise
      // the container switches to its short mobile height before the figures
      // shrink to match, and every figure overflows identically.
      const compact = canvas.clientWidth < 860;
      isCompact = compact;
      const effectiveDensity = compact ? Math.min(density, 2.2) : density;
      const effectivePeepHeight = compact ? Math.min(peepHeight, 70) : peepHeight;

      createPeeps(effectiveDensity, effectivePeepHeight);
      resize();
      gsap.ticker.add(render);
    };

    let cancelled = false;
    Promise.all(
      srcs.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const image = document.createElement("img");
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = src;
          }),
      ),
    ).then((images) => {
      if (cancelled) return;
      sourceImages = images;
      init();
    });

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcs, peepHeight, colors, density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
