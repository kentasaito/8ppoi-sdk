export const inputConfig = {
  pads: [
    {
      left: {
        axis: [0, -1],
        touchArea: "M12,12 l-5,-10 h-5 v28 h5 l5,-10 z",
        key: "ArrowLeft",
      },
      right: {
        axis: [0, 1],
        touchArea: "M20,20 l5,10 h5 v-28 h-5 l-5,10 z",
        key: "ArrowRight",
      },
      up: {
        axis: [1, -1],
        touchArea: "M20,12 l10,-5 v-5 h-28 v5 l10,5 z",
        key: "ArrowUp",
      },
      down: {
        axis: [1, 1],
        touchArea: "M12,20 l-10,5 v5 h28 v-5 l-10,-5 z",
        key: "ArrowDown",
      },
      b: {
        button: 0,
        touchArea: "M34,18 v12 h16 v-12 z",
        key: "z",
      },
      a: {
        button: 1,
        touchArea: "M46,18 v12 h16 v-12 z",
        key: "x",
      },
      select: {
        button: 8,
        touchArea: "M34,4 v8 h16 v-8 z",
        key: "c",
      },
      start: {
        button: 9,
        touchArea: "M46,4 v8 h16 v-8 z",
        key: "v",
      },
    },
    {
      left: {
        axis: [0, -1],
        key: "j",
      },
      right: {
        axis: [0, 1],
        key: "l",
      },
      up: {
        axis: [1, -1],
        key: "i",
      },
      down: {
        axis: [1, 1],
        key: "k",
      },
      b: {
        button: 0,
        key: "d",
      },
      a: {
        button: 1,
        key: "f",
      },
      select: {
        button: 8,
        key: "g",
      },
      start: {
        button: 9,
        key: "h",
      },
    },
  ],
};
