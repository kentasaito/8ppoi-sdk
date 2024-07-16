export class InputTouch {
  static touches;

  static setup(config) {
    this.touches = [];
    const pad = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    pad.id = "pad";
    pad.setAttribute("viewBox", "0 0 64 32");
    pad.style.verticalAlign = "top";
    pad.style.backgroundColor = "hsl(0, 0%, 80%)";
    pad.style.fill = "hsl(0, 0%, 60%)";
    pad.style.width = "320px";
    pad.style.height = "160px";
    document.getElementById("ui").append(pad);
    pad.append(this.renderShapes());
    const touchAreas = this.renderTouchAreas(config.pads[0]);
    pad.append(touchAreas);
    pad.append(this.renderDirection());
    document.getElementById("ui").append(this.renderLabels());
    pad.ontouchstart = (e) => this.onTouch(e);
    pad.ontouchmove = (e) => this.onTouch(e);
    pad.ontouchend = (e) => this.onRelease(e);
  }

  static getPressed(padId, buttonName) {
    return !!(this.touches) && padId === 0 &&
      this.touches.flat().includes(buttonName);
  }

  static renderShapes() {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute(
        "d",
        "M12,3 q-1,0 -1,1 v6 q0,1 -1,1 h-6 q-1,0 -1,1 v8 q0,1 1,1 h6 q1,0 1,1 v6 q0,1 1,1 h8 q1,0 1,-1 v-6 q0,-1 1,-1 h6 q1,0 1,-1 v-8 q0,-1 -1,-1 h-6 q-1,0 -1,-1 v-6 q0,-1 -1,-1 z",
      );
      element.append(path);
    }
    {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", "40");
      circle.setAttribute("cy", "24");
      circle.setAttribute("r", "6");
      element.append(circle);
    }
    {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", "56");
      circle.setAttribute("cy", "24");
      circle.setAttribute("r", "6");
      element.append(circle);
    }
    {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute(
        "d",
        "M35,4 q-1,0 -1,1 v6 q0,1 1,1 h10 q1,0 1,-1 v-6 q0,-1 -1,-1 z",
      );
      element.append(path);
    }
    {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute(
        "d",
        "M51,4 q-1,0 -1,1 v6 q0,1 1,1 h10 q1,0 1,-1 v-6 q0,-1 -1,-1 z",
      );
      element.append(path);
    }
    return element;
  }

  static renderTouchAreas(pad) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    element.id = "padTouchAreas";
    element.style.fill = "hsla(0, 0%, 0%, 0%)";
    for (const buttonName in pad) {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.classList.add("touchArea");
      path.id = buttonName;
      path.setAttribute("d", pad[buttonName].touchArea);
      element.append(path);
    }
    return element;
  }

  static renderDirection() {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    element.id = "padDirection";
    element.style.fill = "none";
    element.style.stroke = "hsl(0, 0%, 80%)";
    element.style.strokeWidth = "0.16";
    {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", "16");
      circle.setAttribute("cy", "16");
      circle.setAttribute("r", "2.5");
      element.append(circle);
    }
    {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", "M6,16 m-0.25,0 l4,-2 v4 z");
      element.append(path);
    }
    {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", "M26,16 m0.25,0 l-4,2 v-4 z");
      element.append(path);
    }
    {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", "M16,6 m0,-0.25 l-2,4 h4 z");
      element.append(path);
    }
    {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", "M16,26 m0,0.25 l2,-4 h-4 z");
      element.append(path);
    }
    {
      const div = document.createElement("div");
      div.style.left = "170px";
      div.style.top = "30px";
      div.innerText = "SELECT";
      element.append(div);
    }
    {
      const div = document.createElement("div");
      div.style.left = "250px";
      div.style.top = "30px";
      div.innerText = "START";
      element.append(div);
    }
    return element;
  }

  static renderLabels() {
    const element = document.createElement("div");
    element.id = "padLabels";
    element.style.marginTop = "-160px";
    element.style.width = "320px";
    element.style.height = "160px";
    element.style.position = "relative";
    element.style.pointerEvents = "none";
    [
      {
        left: 170,
        top: 110,
        fontSize: 1.1,
        innerText: "B",
      },
      {
        left: 250,
        top: 110,
        fontSize: 1.1,
        innerText: "A",
      },
      {
        left: 170,
        top: 30,
        fontSize: 0.9,
        innerText: "SELECT",
      },
      {
        left: 250,
        top: 30,
        fontSize: 0.9,
        innerText: "START",
      },
    ].forEach((label) => {
      const div = document.createElement("div");
      div.style.width = "60px";
      div.style.height = "20px";
      div.style.color = "hsl(0, 0%, 80%)";
      div.style.position = "absolute";
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.left = `${label.left}px`;
      div.style.top = `${label.top}px`;
      div.style.fontSize = `${label.fontSize}rem`;
      div.innerText = label.innerText;
      element.append(div);
    });
    return element;
  }

  static onTouch(e) {
    e.preventDefault();
    for (const touch of e.changedTouches) {
      this.touches[touch.identifier] = [];
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY)
        .filter((element) => element.classList.contains("touchArea"));
      for (const element of elements) {
        this.touches[touch.identifier].push(element.id);
      }
    }
  }

  static onRelease(e) {
    e.preventDefault();
    for (const touch of e.changedTouches) {
      delete this.touches[touch.identifier];
    }
  }
}
