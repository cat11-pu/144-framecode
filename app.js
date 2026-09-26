// app.js：渲染结果
import { toCode } from "./frames.js";
import { toFrame } from "./code.js";

export function render(spec) {
  const frame = spec.frame || 0;
  const fps = spec.fps || 1;
  const parts = toCode(frame, fps);
  const text = parts.hours + ":" + String(parts.minutes).padStart(2, "0") + ":"
    + String(parts.seconds).padStart(2, "0") + ":" + String(parts.frames).padStart(2, "0");
  const sample = spec.sample_code || text;
  const back = toFrame(sample, fps);
  return { code: text, hours: parts.hours, minutes: parts.minutes, seconds: parts.seconds,
           frames: parts.frames, seconds_total: Math.floor(frame / fps),
           sample_code: sample, sample_frame: back, round_trip: toFrame(text, fps) === frame };
}
