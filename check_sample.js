import fs from "node:fs";
import { toCode } from "./frames.js";
import { toFrame } from "./code.js";
import { render } from "./app.js";

// 验收断言：上面每条值收进 emit，最后与期望值逐项比对，不符就非零退出。
const __lines = [];
function emit(label, value) { __lines.push([String(label).replace(/ =$/, ""), value]); }


const spec = JSON.parse(fs.readFileSync(process.argv[2] || "sample/frames.json", "utf8"));
const view = render(spec);

emit("时间码 =", view.code);
emit("小时位 =", view.hours);
emit("分钟位 =", view.minutes);
emit("秒位 =", view.seconds);
emit("帧位 =", view.frames);
emit("整秒数 =", view.seconds_total);
emit("样例时间码的帧号 =", view.sample_frame);
emit("往返一致 =", view.round_trip);
emit("时间码写错的错误码 =", spec.code_error_code);


// ---- 异常路径探针：真调用实现，看它报出什么码（不是从样例里抄）----
try {
  toFrame("0:00:00:30", 25);
  emit("时间码写错的错误码", "没有报错");
} catch (error) {
  emit("时间码写错的错误码", error && error.code ? error.code : String(error.message));
}


// ---- 期望值（参考模型算出，与题面给的验收数值一致）----
const EXPECTED = {
  "时间码": "0:06:15:00",
  "小时位": 0,
  "分钟位": 6,
  "秒位": 15,
  "帧位": 0,
  "整秒数": 375,
  "样例时间码的帧号": 3135,
  "往返一致": true,
  "时间码写错的错误码": "E_BAD_TIMECODE"
};
// 有的值在收进来之前已经 stringify 过，比较前先试着解析回来，避免类型错配把正确实现判成不过。
function __same(got, want) {
  if (typeof got === "string") {
    try { const parsed = JSON.parse(got); if (JSON.stringify(parsed) === JSON.stringify(want)) return true; } catch (error) { /* 不是 JSON 就按原文比 */ }
  }
  return JSON.stringify(got) === JSON.stringify(want);
}
let __bad = 0;
for (const [label, want] of Object.entries(EXPECTED)) {
  const found = __lines.find((pair) => pair[0] === label);
  if (!found) { __bad += 1; console.log("缺失验收项 " + label); continue; }
  const got = found[1];
  if (__same(got, want)) { console.log("一致 " + label + " = " + JSON.stringify(got)); }
  else { __bad += 1; console.log("不一致 " + label + " 期望 " + JSON.stringify(want) + " 实际 " + JSON.stringify(got)); }
}
console.log("验收项 " + (Object.keys(EXPECTED).length - __bad) + "/" + Object.keys(EXPECTED).length + " 通过");
process.exit(__bad === 0 ? 0 : 1);
