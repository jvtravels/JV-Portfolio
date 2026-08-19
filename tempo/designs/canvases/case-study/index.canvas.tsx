import type { TempoCanvasConfig, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';

const config: TempoCanvasConfig = {
  name: "Case Study",
};

export default config;

export const EnrouteHealth: TempoRouteStoryboard = {
  route: "/work/enroute-health",
  name: "Enroute Health — Case Study",
  layout: { x: 0, y: 0, width: 1440, height: 900 },
};

export const Tractorbeam: TempoRouteStoryboard = {
  route: "/work/tractorbeam",
  name: "Tractorbeam — Case Study",
  layout: { x: 1490, y: 0, width: 1440, height: 900 },
};
