import IComponent from '../IComponent';

export default class DynamicWidget implements IComponent {
  constructor(private element: HTMLElement) {
    this.init();
  }

  private init(): void {
    console.log('DynamicWidget.init()');
  }
}
