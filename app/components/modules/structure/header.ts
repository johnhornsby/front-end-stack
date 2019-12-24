import IComponent from '../../IComponent';

class Header implements IComponent {
  constructor(private element: HTMLElement) {
    this.init();
  }

  private init(): void {
    console.log('Header.init()');
  }
}

export default Header;
