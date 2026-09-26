// frames.js：帧号转时间码（整除与取模直接分解，不逐帧累加）
export function toCode(frame, fps) {
  const totalSeconds = Math.floor(frame / fps);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
    frames: frame % fps
  };
}
