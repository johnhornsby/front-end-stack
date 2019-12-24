import * as components from './components';

import ViewManager from './managers/view';

import { hasKey } from './util/typescript-helpers';
import { IComponentConstructable, IHTMLComponentElement } from './components/IComponent';

class App {
  constructor() {
    this.init();
  }

  private init(): void {
    this.initComponents();
    ViewManager.activate();
  }

  private initComponents(): void {
    // Search the DOM for components
    const dataComponentNodes: IHTMLComponentElement[] = [
      ...document.querySelectorAll<any>('[data-component]'),
    ];

    dataComponentNodes.forEach(element => {
      const componentName: keyof typeof components = (element.getAttribute('data-component') ||
        '') as keyof typeof components;

      const isValidName = Object.prototype.hasOwnProperty.call(components, componentName);
      if (!isValidName) {
        const error = `Invalid component: ${componentName}`;
        if (__DEVELOPMENT__) {
          console.warn(error);
        } else {
          throw Error(error);
        }
        return;
      }

      let isValidConstructor: boolean = false;
      if (hasKey(components, componentName)) {
        isValidConstructor = typeof components[componentName] === 'function';
        if (!isValidConstructor) {
          const error = `Invalid component: ${componentName}`;
          if (__DEVELOPMENT__) {
            console.warn(error);
          } else {
            throw Error(error);
          }
        }
      }

      if (isValidName && isValidConstructor) {
        const componentConstructor: IComponentConstructable = components[componentName];
        element.component = new componentConstructor(element);
      }
    });
  }
}

export default new App();
