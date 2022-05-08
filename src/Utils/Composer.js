export const Composer = (className, styles) =>
  className?.split(' ').map((e) => styles[e]);
