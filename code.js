// code.js：时间码转帧号（四段数字，加权求和；非法写法报 E_BAD_TIMECODE）
const TIMECODE_RE = /^(\d+):(\d+):(\d+):(\d+)$/;

export function toFrame(code, fps) {
  const match = TIMECODE_RE.exec(String(code));
  if (!match) {
    const error = new Error("bad timecode: " + code);
    error.code = "E_BAD_TIMECODE";
    throw error;
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3]);
  const frames = Number(match[4]);
  if (minutes >= 60 || seconds >= 60 || frames >= fps) {
    const error = new Error("bad timecode: " + code);
    error.code = "E_BAD_TIMECODE";
    throw error;
  }
  return ((hours * 60 + minutes) * 60 + seconds) * fps + frames;
}
