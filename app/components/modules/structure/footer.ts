import IComponent from '../../IComponent';

class Footer implements IComponent {
  constructor(private element: HTMLElement) {
    this.init();
  }

  private init(): void {
    console.log('Footer.init()');
  }
}

export default Footer;
