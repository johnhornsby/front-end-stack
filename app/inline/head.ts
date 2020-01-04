// // This is a script inlined inside the head element before css is included.
// // Be sure not to include any large libraries here.

class Head {
  constructor() {
    this.init();
  }

  private init(): void {
    const isPageEditor = document.documentElement.classList.contains('page-editor');
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
    setTimeout(() => {
      if (!window.isJsLoaded && !isPageEditor) {
        // We're unable to load the page's javascript for whatever reason, so
        // allow the CSS to display content without the need for it.
        document.documentElement.classList.add('no-js');
        document.documentElement.classList.remove('js');
      }
    }, 30000);
  }
}

export default new Head();
