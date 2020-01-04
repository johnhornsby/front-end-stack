import ViewManager from '../managers/view';
import {
  loadImageBackground,
  updateImageSrcString,
  getBoundsData,
  isStillLazy,
  IPayload,
} from './image-load-helpers';

export default class LazyImage {
  element: HTMLElement;

  backgroundElement: HTMLElement | null;

  proceedToLoadImage: boolean = false;

  src: string = '';

  constructor(element: HTMLElement) {
    this.element = element;

    if (!this.element.dataset.src) {
      if (__DEVELOPMENT__) {
        throw Error('LazyImage has no data-src attribute');
      }
    }

    this.backgroundElement = element.querySelector('.LazyImage_background');

    if (!this.backgroundElement) {
      if (__DEVELOPMENT__) {
        throw Error('LazyImage has no child div with class LazyImage_background');
      }
    }

    this.proceedToLoadImage = false;

    this.initLazyImage();
  }

  initLazyImage(): void {
    // listen to EVENT_WILL_UPDATE update to make dom measurements ONLY
    ViewManager.on(ViewManager.EVENT_WILL_UPDATE, this.onViewWillUpdate);
    ViewManager.invalidate();
  }

  initLoad = (): void => {
    loadImageBackground(this.src, this.onImageLoad);
  };

  onViewWillUpdate = (data: any): void => {
    if (data.scrollUpdate || data.resizeUpdate) {
      if (this.backgroundElement !== null) {
        const { isWithinBounds, width, height } = getBoundsData(this.backgroundElement);
        const isElementStillLazy = isStillLazy(this.element);

        if (isWithinBounds && isElementStillLazy) {
          this.src = updateImageSrcString(this.element.dataset.src!, width, height);
          this.proceedToLoadImage = true;
          ViewManager.off(ViewManager.EVENT_WILL_UPDATE, this.onViewWillUpdate);
          // listen to EVENT_UPDATE to then dom updated via the loading of image
          ViewManager.on(ViewManager.EVENT_UPDATE, this.onViewUpdate);
        }
      }
    }
  };

  onViewUpdate = (): void => {
    if (this.proceedToLoadImage) {
      this.proceedToLoadImage = false;
      this.element.classList.add('LazyImage--loading');

      ViewManager.off(ViewManager.EVENT_UPDATE, this.onViewUpdate);
      this.initLoad();
    }
  };

  onImageLoad = (payload: IPayload) => {
    this.element.classList.remove('LazyImage--loading');
    this.element.classList.add(`LazyImage--${payload.loadState}`); // error or loaded
    if (this.backgroundElement)
      this.backgroundElement.style.backgroundImage = `url('${payload.src}')`;
    if (__DEVELOPMENT__) {
      console.log(`LazyImage loaded: ${this.src}`);
    }
  };
}
