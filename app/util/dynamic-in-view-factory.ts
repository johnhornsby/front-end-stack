// Factory helper to reduce boiler plate when creating dynamicly loaded components.
// @example
// import DynamicInViewFactory from '../../util/dynamic-in-view-factory';
//
// export default DynamicInViewFactory.create(() => (
//   import(/*webpackChunkName: "PermanentCta"*/ '../modules/global/permanent-cta')
// ));

import InViewManager from '../managers/in-view';

export interface ILoadCreatorFunc {
  (): Promise<any>;
}

class DynamicInViewFactory {
  /**
   * factory method to create a class that executes a function to
   * dynamically import a class, which is then executed and its element
   * @static
   * @param { function } loadCreatorFunc function should return a promise from an import
   * @returns { class } return a class from which component is instantiated in app
   */
  static create(loadCreatorFunc: ILoadCreatorFunc, inViewOptions = {}, triggerImmediately = false) {
    return class {
      constructor(element: HTMLElement) {
        if (triggerImmediately || document.body.classList.contains('ExperienceEdit')) {
          this.loadDynamicComponent(element);
        } else {
          InViewManager.add(element, this.loadDynamicComponent, inViewOptions);
        }
      }

      /**
       * Event handler called when element comes into view
       * element must have dimensions, loadCreatorFunc is called
       * and upon receiving imported class in default, this is
       * instantiated and element is passed into it.
       *
       * @param { HTMLElement } element the html element of the component.
       */
      loadDynamicComponent = (element: HTMLElement) => {
        setTimeout(() => {
          loadCreatorFunc().then((data: any) => new data.default(element));
        }, 0);
      };
    };
  }
}

export default DynamicInViewFactory;
