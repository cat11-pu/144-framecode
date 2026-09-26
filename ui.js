// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let frame = spec.frame || 0;
  parts.log.textContent = "帧率 " + (spec.fps || 0) + "，起始帧 " + frame + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { frame: frame }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const line = document.createElement("div");
    line.className = "row";
    line.textContent = "第 " + frame + " 帧 = " + view.code;
    parts.stage.appendChild(line);
    const back = document.createElement("div");
    back.className = "row";
    back.textContent = "时间码 " + view.sample_code + " = 第 " + view.sample_frame + " 帧";
    parts.stage.appendChild(back);
    parts.legend.textContent = "往返一致 " + view.round_trip + "，秒数 " + view.seconds;
    parts.log.textContent = "帧率 " + (spec.fps || 0);
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "互转一次";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "帧号加二十四";
  moreButton.addEventListener("click", function () {
    frame = frame + 24;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "帧号减二十四";
  lessButton.addEventListener("click", function () {
    frame = Math.max(0, frame - 24);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "试一个帧号";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(frame);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 0) { frame = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看时间码";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { frame: frame }));
    parts.out.textContent = "时间码 " + view.code + "，秒数 " + view.seconds;
  });
  parts.controls.appendChild(readButton);

  draw();
}
