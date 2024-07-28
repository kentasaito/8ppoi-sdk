import { Graphic } from "./Graphic.js";

export class GraphicManager {
  static graphicSizes;
  static caches;
  static graphics;

  static setup(graphics) {
    this.graphicSizes = {};
    for (const graphicName in graphics) {
      this.graphicSizes[graphicName] = {
        width: graphics[graphicName].filter((scene) =>
          Array.isArray(scene)
        )[0][0].length,
        height: graphics[graphicName].filter((scene) =>
          Array.isArray(scene)
        )[0].length,
      };
    }
    this.caches = this.renderCaches(graphics);
    this.graphics = [];
  }

  static renderCaches(graphics) {
    const caches = {};
    for (const graphicName in graphics) {
      caches[graphicName] = [];
      let params = {
        sceneId: 0,
      };
      graphics[graphicName].forEach((scene) => {
        if (Array.isArray(scene)) {
          caches[graphicName][params.sceneId] = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );
          caches[graphicName][params.sceneId].dataset.sceneId = params.sceneId;
          for (const paletteColorId of [...new Set(scene.flat())].sort()) {
            if (paletteColorId === 0) continue;
            caches[graphicName][params.sceneId].append(
              this.renderLayer(scene, paletteColorId),
            );
          }
          params.sceneId++;
        } else {
          params = Object.assign(params, scene.render);
        }
      });
    }
    return caches;
  }

  static renderLayer(scene, paletteColorId) {
    const layer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    layer.dataset.paletteColorId = paletteColorId;
    let d = "";
    scene.forEach((line, y) => {
      line.forEach((value, x) => {
        if (value === paletteColorId) {
          d += `M${x},${y} v1 h1 v-1 z `;
        }
      });
    });
    layer.setAttribute("d", d);
    return layer;
  }

  static createGraphic(graphicName) {
    const graphic = new Graphic(graphicName, [[0]]);
    graphic.graphicId = this.graphics.length;
    this.graphics.push(graphic);
    return graphic;
  }

  static deleteGraphic(obj, keys) {
    if (!obj) return;
    while (keys.length > 1) {
      obj = obj[keys.shift()];
      if (!obj) return;
    }
    if (!obj[keys[0]]) return;
    this.graphics[obj[keys[0]].graphicId].element.remove();
    delete this.graphics[obj[keys[0]].graphicId];
    delete obj[keys[0]];
  }
}
