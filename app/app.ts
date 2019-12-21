import "@babel/polyfill";

class App {
  constructor() {
    this.init();
  }

  private init(): void {
    window.addEventListener('resize', () => {});
    const allMains: HTMLElement[] = [...document.querySelectorAll('main')];

    allMains.forEach((element: HTMLElement) => {
      console.log(element.nodeName);
    })
  }
}

export default new App();
