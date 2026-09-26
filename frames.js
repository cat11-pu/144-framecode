// frames.js：帧号转时间码（一次算完，不逐个累加）
export function toCode(frame, fps) {
  const frames = frame % fps;
  const secondsTotal = Math.floor(frame / fps);
  const seconds = secondsTotal % 60;
  const minutes = Math.floor(secondsTotal / 60) % 60;
  const hours = Math.floor(secondsTotal / 3600);
  return { hours: hours, minutes: minutes, seconds: seconds, frames: frames };
}
