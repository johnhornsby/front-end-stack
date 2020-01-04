import ViewManager from '../managers/view';
import LazyImage from '../util/LazyImage';

class Body {
  constructor() {
    this.init();
  }

  private init(): void {
    ViewManager.activate();
    const imagesElements = [].slice.call(document.querySelectorAll('.LazyImage'));
    imagesElements.forEach(imagesElement => {
      new LazyImage(imagesElement);
    });
  }
}

export default new Body();
