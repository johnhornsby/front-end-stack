import ViewManager from './view';

const DEFAULT_IN_VIEW_BOUNDARY_SIZE: number = 15; // in vh

interface ICallBack {
  (element: HTMLElement): void;
}

interface IInViewOptions {
  ignoreHeight?: boolean;
}

class InViewManager {
  static get instance(): InViewManager {
    /* eslint-disable no-underscore-dangle */
    if (!window.__seqInViewManager) {
      window.__seqInViewManager = new InViewManager('singleton');
    }

    return window.__seqInViewManager;
    /* eslint-enable no-underscore-dangle */
  }

  elementsMap = new Map();

  updateQueue: Array<HTMLElement> = [];

  constructor(string: string) {
    this.init();

    if (string !== 'singleton') throw new Error('Cannot construct singleton');
  }

  static isInView(element: HTMLElement, options?: IInViewOptions) {
    const { top, bottom, height } = element.getBoundingClientRect();
    let boundary = DEFAULT_IN_VIEW_BOUNDARY_SIZE;
    if (element.dataset.inViewBoundarySize) {
      boundary = parseInt(element.dataset.inViewBoundarySize, 10);
    }
    boundary = (boundary / 100) * window.innerHeight;

    const hasHeight = options?.ignoreHeight ? true : height;

    return hasHeight && bottom > -boundary && top < window.innerHeight + boundary;
  }

  init() {
    // event phase to make measurements of the dom
    ViewManager.on(ViewManager.EVENT_WILL_UPDATE, this.onViewWillUpdate);
    // event phase to actually manipulate the dom
    ViewManager.on(ViewManager.EVENT_UPDATE, this.onViewUpdate);
    ViewManager.invalidate();
  }

  add(element: HTMLElement, callback: ICallBack, options: IInViewOptions = {}) {
    if (this.elementsMap.has(element)) {
      const elementData = this.elementsMap.get(element);
      const { callbacksSet } = elementData;
      let { currentOptions } = elementData;

      currentOptions = {
        ...currentOptions,
        ...options,
      };

      if (!callbacksSet.has(callback)) {
        callbacksSet.add(callback);
      }
    } else {
      const callbacksSet = callback ? new Set([callback]) : new Set();
      this.elementsMap.set(element, {
        callbacksSet,
        options,
      });
    }
  }

  remove(element: HTMLElement, callback?: ICallBack) {
    if (this.elementsMap.has(element)) {
      const { callbacksSet } = this.elementsMap.get(element);

      if (callback && callbacksSet.has(callback)) {
        callbacksSet.delete(callback);

        if (callbacksSet.size === 0) {
          this.elementsMap.delete(element);
        }
      } else {
        callbacksSet.clear();
        this.elementsMap.delete(element);
      }
    }
  }

  /**
   * onViewWillUpdate ascertain if the element is within the view.
   * Remember, when using the ViewManager.EVENT_WILL_UPDATE to only
   * read measurements from the dom not manipulate.
   */
  onViewWillUpdate = () => {
    this.updateQueue = [];

    this.elementsMap.forEach((_setValue, element: HTMLElement) => {
      const { options } = this.elementsMap.get(element);
      if (InViewManager.isInView(element, options)) {
        this.updateQueue.push(element);
      }
    });
  };

  /**
   * onViewUpdate if we have any elements in the queue, then we are good
   * to update the dom. Remember, the ViewManager.EVENT_UPDATE event phase
   * is for manipulating the dom.
   */
  onViewUpdate = () => {
    this.updateQueue.forEach(element => {
      element.classList.add('js-in-view-triggered');
      const { callbacksSet } = this.elementsMap.get(element);
      callbacksSet.forEach((callback: ICallBack) => callback(element));
      this.remove(element);
    });
  };
}

export default InViewManager.instance;
