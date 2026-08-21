"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  /** Rendered height (px) of each figure, scaled down from the sprite sheet's native cell size. */
  peepHeight?: number;
  /** Optional tint palette applied per-figure. Omit to keep the source black/white line art. */
  colors?: string[];
  /** How many walking instances to spawn per unique figure, to pack the crowd tighter. */
  density?: number;
}

type Peep = {
  image: CanvasImageSource;
  rect: number[];
  baseWidth: number;
  baseHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  setRect: (rect: number[]) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
};

export default function CrowdCanvas({ src, rows = 15, cols = 7, peepHeight = 90, colors = [], density = 1 }: CrowdCanvasProps) {
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

    const BOB_AMPLITUDE = 10;
    // Our figures are bust-only art (no legs) with a flat bottom cut, same as
    // the upstream skiper39 sheet. In the reference, that cut is invisible
    // because the crowd is dense and multi-layered: heads and shoulders at
    // every depth overlap, so no single figure's edge is ever isolated
    // against open background. A uniform random Y still reads as "one line"
    // because every figure is the same size — depth (far = small/near the
    // top, near = large/near the bottom) plus jitter is what actually breaks
    // the crowd into the uneven, some-above-some-below layers in the
    // reference, combined with high density (see Footer's density prop) so
    // there's always overlap to hide the cut in.
    const resetPeep = ({ peep }: { peep: Peep }) => {
      const depth = Math.random();
      const sizeScale = 0.65 + depth * 0.6;
      peep.width = peep.baseWidth * sizeScale;
      peep.height = peep.baseHeight * sizeScale;

      const topBound = BOB_AMPLITUDE;
      const bottomBound = Math.max(stage.height - peep.height, topBound);
      const center = topBound + depth * (bottomBound - topBound);
      const jitter = randomRange(-0.35, 0.35) * (bottomBound - topBound);
      const startY = Math.min(bottomBound, Math.max(topBound, center + jitter));
      const direction = Math.random() > 0.5 ? 1 : -1;
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
      // Constant walking speed (px/sec) so the crossing time — and how visible
      // the step bob is — scales with viewport width instead of always taking
      // a fixed duration regardless of how far a peep actually has to travel.
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

    const tintSheet = (source: HTMLImageElement, color: string): HTMLCanvasElement => {
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

    const createPeep = ({ image, rect, scale }: { image: CanvasImageSource; rect: number[]; scale: number }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        baseWidth: 0,
        baseHeight: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect(r) {
          peep.rect = r;
          peep.baseWidth = r[2] * scale;
          peep.baseHeight = r[3] * scale;
          peep.width = peep.baseWidth;
          peep.height = peep.baseHeight;
        },
        render(context) {
          context.save();
          context.translate(peep.x, peep.y);
          context.scale(peep.scaleX, 1);
          context.drawImage(
            peep.image,
            peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3],
            0, 0, peep.width, peep.height,
          );
          context.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    const img = document.createElement("img");

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = (effectiveDensity: number, effectivePeepHeight: number) => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const unique = rows * cols;
      const total = Math.round(unique * effectiveDensity);
      const rectWidth = width / rows;
      const rectHeight = height / cols;
      const scale = effectivePeepHeight / rectHeight;
      const tintedSheets = colors.map((color) => tintSheet(img, color));

      for (let i = 0; i < total; i++) {
        const cell = i % unique;
        allPeeps.push(
          createPeep({
            image: tintedSheets.length ? getRandomFromArray(tintedSheets) : img,
            rect: [
              (cell % rows) * rectWidth,
              ((cell / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
            scale,
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
      // Narrow (mobile) viewports get smaller figures than the desktop strip,
      // but a similar density — too few peeps left wide gaps of empty black
      // between small clumps instead of a continuous crowd line. This threshold
      // must match the .footer-crowd CSS breakpoint (globals.css) — otherwise,
      // in the gap between the two breakpoints, the container shrinks to its
      // short mobile height while figures are still sized for the tall desktop
      // stage, so every figure overflows the same way and clamps to one flat line.
      const compact = canvas.clientWidth < 860;
      const effectiveDensity = compact ? Math.min(density, 5) : density;
      const effectivePeepHeight = compact ? Math.min(peepHeight, 70) : peepHeight;

      createPeeps(effectiveDensity, effectivePeepHeight);
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, rows, cols, peepHeight, colors, density]);

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
