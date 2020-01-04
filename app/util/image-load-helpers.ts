import Utils from './Utils';

// The pixel size between image requests made to save server stress
const imageGranularity: number = 64;

const IMAGE_STATE = {
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
  initialised: 'initialised',
};

function destroy(image: HTMLImageElement | null): void {
  if (image === null) return;

  image.onload = null;
  image.onerror = null;
}

function load(src: string, callback: { (error: any): any }) {
  let image: HTMLImageElement | null = new Image();

  image.onload = () => {
    destroy(image);
    image = null;
    callback(null);
  };

  image.onerror = () => {
    destroy(image);
    image = null;
    callback(IMAGE_STATE.error);
  };

  image.src = src;
}

export function updateImageSrcString(imageSrc: string, width: number, height: number): string {
  let src = Utils.updateQueryStringParameter(imageSrc, 'w', width);
  src = Utils.updateQueryStringParameter(src, 'h', height);

  return src;
}

export interface IPayload {
  src: string;
  loadState: string;
}

export function loadImageBackground(src: string, callback: (payload: IPayload) => void): void {
  const payload: IPayload = {
    src,
    loadState: IMAGE_STATE.loaded,
  };

  load(src, (error: Error) => {
    const stateString = error !== null ? IMAGE_STATE.error : IMAGE_STATE.loaded;
    payload.loadState = stateString;

    callback(payload);
  });
}

export function getBoundsData(element: HTMLElement) {
  // Test image is within viewport range
  const bounds = element.getBoundingClientRect();

  const width: number = Math.ceil(bounds.width / imageGranularity) * imageGranularity;
  const height: number = Math.ceil(bounds.height / imageGranularity) * imageGranularity;

  return {
    width,
    height,
    isWithinBounds:
      bounds.height > 0 &&
      bounds.width > 0 &&
      bounds.top < window.innerHeight + 200 &&
      bounds.bottom > -200,
  };
}

export function isStillLazy(element: HTMLElement) {
  return (
    !element.classList.contains('LazyImage--loaded') &&
    !element.classList.contains('LazyImage--loading')
  );
}
