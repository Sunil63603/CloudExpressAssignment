//This is a Lit component file.Reusable building block(Lego piece)
import { LitElement, html, css } from "lit";
//LitElement is a class template for creating custom HTML Elements.
//Here,html and css are functions that let you write HTML and CSS inside JavaScript.
import { customElement } from "lit/decorators.js";
//customElement is a decorator that registers your component with the browser(like giving it a name)

@customElement("hello-world") //This line is giving name to the component.

//exporting this class so that it can be reused.
export class HelloWorld extends LitElement {
  //This is a built-in way to style this component only.
  //css`` is a tagged template literal function that allows you to write CSS inside JavaScript.
  static styles = css`
    p {
      color: blue;
    }
  `;

  render() { //function that controls what appears on screen.
    return html`<p>Hello from Lit + Tailwind + Storybook!</p>`;
  }
}
