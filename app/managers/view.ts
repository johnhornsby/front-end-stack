import EventEmitter from 'wolfy87-eventemitter';
import { breakpoints } from '../constants/breakpoints';

class ViewManager extends EventEmitter {
  public readonly EVENT_WILL_UPDATE = 'eventWillUpdate';

  public readonly EVENT_UPDATE = 'eventUpdate';

  public readonly EVENT_DID_UPDATE = 'eventDidUpdate';

  public readonly EVENT_TICK = 'eventTick';

  public readonly EVENT_RESIZE = 'eventResize';

  public readonly EVENT_SCROLL = 'eventScroll';

  private breakpoint: any;

  private rafID: number | null = null;

  private lastUpdateTime: number | null = null;

  private scrollHeight: number = 0;

  private scrollTop: number = 0;

  private viewHeight: number = 0;

  private viewWidth: number = 0;

  private active: boolean = false;

  private scrollInvalid: boolean = true;

  private resizeInvalid: boolean = true;

  static get instance(): ViewManager {
    /* eslint-disable no-underscore-dangle */
    if (!window.__seqViewManager) {
      window.__seqViewManager = new ViewManager('singleton');
    }

    return window.__seqViewManager;
    /* eslint-enable no-underscore-dangle */
  }

  static calculateBreakpoint(viewWidth: number) {
    return breakpoints.reduce((breakpointPrev, breakpointNext) =>
      viewWidth >= breakpointPrev.value && viewWidth < breakpointNext.value
        ? breakpointPrev
        : breakpointNext
    );
  }

  constructor(string: string) {
    super();

    this.init();

    if (string !== 'singleton') throw new Error('Cannot construct singleton');
  }

  public invalidate() {
    this.scrollInvalid = true;
    this.resizeInvalid = true;
  }

  public getViewWidth() {
    return this.viewWidth;
  }

  public getViewHeight() {
    return this.viewHeight;
  }

  public getScrollTop() {
    return this.scrollTop;
  }

  public getScrollHeight() {
    return this.scrollHeight;
  }

  public getBreakpoint() {
    return this.breakpoint.value;
  }

  public activate() {
    if (this.active === false) {
      this.active = true;

      window.addEventListener('scroll', this.onScroll, { passive: true, capture: true }); // capture to ensure scroll event from scrolling in all containers.
      window.addEventListener('resize', this.onResize);

      if (this.rafID === null) {
        this.lastUpdateTime = new Date().getTime();
        this.rafID = window.requestAnimationFrame(this.onUpdate);
      }
    }
  }

  public deactivate() {
    this.active = false;

    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);

    if (this.rafID) window.cancelAnimationFrame(this.rafID);

    this.rafID = null;
    this.lastUpdateTime = null;
  }

  private init() {
    this.bind();

    this.scrollHeight = document.body.scrollHeight; //  forces layout / reflow
    this.viewHeight = window.innerHeight; //  forces layout / reflow
    this.viewWidth = window.innerWidth; //  forces layout / reflow
    this.scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; //  forces layout / reflow
    this.breakpoint = ViewManager.calculateBreakpoint(this.viewWidth);
  }

  private bind() {
    this.onScroll = this.onScroll.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  private onUpdate() {
    const now: number = new Date().getTime();
    let delta: number = 0;
    if (this.lastUpdateTime !== null) {
      delta = now - this.lastUpdateTime;
    }
    this.lastUpdateTime = now;

    const scrollElement: Element = document.scrollingElement || document.documentElement;

    const scrollTop: number = scrollElement.scrollTop || 0;
    if (scrollTop !== this.scrollTop) {
      this.scrollInvalid = true;
      this.scrollTop = scrollTop;
    }

    let data: any = {
      delta,
    };

    if (this.scrollInvalid || this.resizeInvalid) {
      if (this.resizeInvalid) {
        this.scrollHeight = document.body.scrollHeight; //  forces layout / reflow
        this.viewHeight = window.innerHeight; //  forces layout / reflow
        this.viewWidth = window.innerWidth; //  forces layout / reflow

        this.breakpoint = ViewManager.calculateBreakpoint(this.viewWidth);
      }

      data = {
        ...data,
        scrollTop,
        scrollUpdate: this.scrollInvalid,
        resizeUpdate: this.resizeInvalid,
        scrollHeight: this.scrollHeight,
        viewHeight: this.viewHeight,
        viewWidth: this.viewWidth,
      };

      this.scrollInvalid = false;
      this.resizeInvalid = false;

      this.emit(this.EVENT_WILL_UPDATE, data);
      this.emit(this.EVENT_UPDATE, data);
      this.emit(this.EVENT_DID_UPDATE, data);
    }

    this.emit(this.EVENT_TICK, data);

    this.rafID = window.requestAnimationFrame(this.onUpdate);
  }

  private onScroll() {
    this.scrollInvalid = true;

    this.emit(this.EVENT_SCROLL);
  }

  private onResize() {
    this.resizeInvalid = true;

    this.emit(this.EVENT_RESIZE);
  }
}

export default ViewManager.instance;
