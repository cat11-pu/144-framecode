import assert from "node:assert";
import { toCode } from "../frames.js";
import { toFrame } from "../code.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("toCode returns parts", () => {
  assert.strictEqual(typeof toCode(25, 25).frames, "number");
});

check("toFrame returns a number", () => {
  assert.strictEqual(typeof toFrame("0:00:01:00", 25), "number");
});

check("render returns a code string", () => {
  assert.strictEqual(typeof render({ frame: 25, fps: 25 }).code, "string");
});

check("render exposes seconds", () => {
  assert.strictEqual(typeof render({ frame: 25, fps: 25 }).seconds_total, "number");
});

check("render exposes round trip flag", () => {
  assert.strictEqual(typeof render({ frame: 25, fps: 25 }).round_trip, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
