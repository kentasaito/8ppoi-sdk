import { playerGraphic } from "./graphics/playerGraphic.js";
import { bulletGraphic } from "./graphics/bulletGraphic.js";
import { targetGraphic } from "./graphics/targetGraphic.js";
import { shotSound } from "./sounds/shotSound.js";
import { hitSound } from "./sounds/hitSound.js";
import { missSound } from "./sounds/missSound.js";
import { IndexState } from "./states/IndexState.js";
import { ResultState } from "./states/ResultState.js";

export const uiConfig = {
  screen: {
    scale: 16,
    palettes: {
      defaultPalette: [null, ...[...new Array(13)].map((_, i) => (i + 1) * 4)],
      playerPalette: [null, 8],
      bulletPalette: [null, 16],
      targetPalette: [null, 24],
    },
    backgroundColorId: 0,
  },
};

export const graphics = {
  playerGraphic,
  bulletGraphic,
  targetGraphic,
};

export const sounds = {
  shotSound,
  hitSound,
  missSound,
};

export const states = {
  IndexState,
  ResultState,
};
