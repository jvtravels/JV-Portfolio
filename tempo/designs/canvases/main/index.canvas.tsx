import { Canvas, RouteStoryboard } from "tempo-sdk/canvas";
// @tempo-home — Tempo home canvas (the workspace Run button opens this). Managed marker; do not remove.

export default function MainCanvas() {
  return (
    <Canvas name="main" backgroundColor="rgb(35, 35, 35)">
      <RouteStoryboard
        id="Main"
        route="/"
        layout={{ x: 0, y: 0, width: 1728, height: 960 }}
      />
    </Canvas>
  );
}
