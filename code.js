// code.js：时间码转帧号（小时:分钟:秒:帧，加权求和）
function badTimecode() {
  const error = new Error("E_BAD_TIMECODE");
  error.code = "E_BAD_TIMECODE";
  return error;
}

export function toFrame(code, fps) {
  const parts = typeof code === "string" ? code.split(":") : [];
  if (parts.length !== 4 || !parts.every((part) => /^\d+$/.test(part))) {
    throw badTimecode();
  }
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);
  const seconds = Number(parts[2]);
  const frames = Number(parts[3]);
  if (minutes >= 60 || seconds >= 60 || frames >= fps) {
    throw badTimecode();
  }
  return ((hours * 60 + minutes) * 60 + seconds) * fps + frames;
}
