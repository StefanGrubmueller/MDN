export enum ScreenSize {
  SMALL = 680,
  MEDIUM = 1024,
  LARGE,
}

export function getScreenSize(): ScreenSize {
  if (window.innerWidth <= ScreenSize.SMALL) {
    return ScreenSize.SMALL;
  } else if (window.innerWidth <= ScreenSize.MEDIUM) {
    return ScreenSize.MEDIUM;
  } else {
    return ScreenSize.LARGE;
  }
}
