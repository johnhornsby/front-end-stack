export default interface IComponent {}

export interface IComponentConstructable {
  new (n: HTMLElement): IComponent;
}

export interface IHTMLComponentElement extends HTMLElement {
  component?: IComponent;
}
