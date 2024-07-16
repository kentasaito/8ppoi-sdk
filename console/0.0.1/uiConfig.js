export const uiConfig = {
  screen: {
    width: 320,
    height: 240,
    scale: 1,
    colors: [
      "hsl(0, 0%, 0%)",
      ...[...Array(4)].map((_, l) => `hsl(0, 0%, ${(l + 1) * 20}%)`),
      ...[...Array(12)].map((_, h) =>
        [...Array(4)].map((_, l) => `hsl(${h * 30}, 50%, ${(l + 1) * 20}%)`)
      ).flat(),
      "hsl(0, 0%, 100%)",
    ],
    palettes: {
      defaultPalette: [null, ...[...Array(13)].map((_, i) => (i + 1) * 4)],
    },
    backgroundColorId: 0,
  },
};
