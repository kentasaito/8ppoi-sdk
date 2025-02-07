let Console;
document.getElementById("step").disabled = true;
document.getElementById("resume").disabled = true;
document.getElementById("fps").onchange = (e) => {
  Console.fps = parseFloat(e.target.value);
};
document.getElementById("pause").onclick = () => {
  Console.fps = 0;
  document.getElementById("pause").disabled = true;
  document.getElementById("step").disabled = false;
  document.getElementById("resume").disabled = false;
};
document.getElementById("step").onclick = () => {
  Console.onFrame();
};
document.getElementById("resume").onclick = () => {
  Console.fps = parseFloat(document.getElementById("fps").value);
  document.getElementById("pause").disabled = false;
  document.getElementById("step").disabled = true;
  document.getElementById("resume").disabled = true;
  Console.onFrame();
};
document.getElementById("fullscreen").onclick = () => {
  document.getElementById("screen-container").requestFullscreen();
};
document.onfullscreenchange = () => {
  if (document.fullscreenElement !== null) {
    document.getElementById("screen-container").style.scale =
      globalThis.innerHeight / 240;
    document.getElementById("screen-container").style.paddingLeft = `${
      (globalThis.innerWidth / (globalThis.innerHeight / 240) - 320) / 2
    }px`;
    document.querySelector(".ace_text-input").focus();
  } else {
    document.getElementById("screen-container").style.scale = 1;
    document.getElementById("screen-container").style.paddingLeft = "0";
  }
};

alert();
document.addEventListener("keydown", (e) => {
  if (e.altKey) {
    if (e.key === "p") {
      e.preventDefault();
      document.getElementById("pause").click();
    }
    if (e.key === "s") {
      e.preventDefault();
      document.getElementById("step").click();
    }
    if (e.key === "r") {
      e.preventDefault();
      document.getElementById("resume").click();
    }
    if (e.key === "f") {
      e.preventDefault();
      document.getElementById("fullscreen").click();
    }
    if (e.key === "c") {
      e.preventDefault();
      document.getElementById("run-cartridge").click();
      if (document.fullscreenElement !== null) {
        document.getElementById("fullscreen").click();
      }
    }
    if (e.key === "e") {
      e.preventDefault();
      document.getElementById("fullscreen-editor").click();
    }
  }
});
