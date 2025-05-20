//LitElement is base class for making custom elements.
import { LitElement, html } from "lit"; //html`` is helper that lets you write HTML in JavaScript.
import { customElement } from "lit/decorators.js";

//It tells the browser,"register this class with a name like <product-page>"
@customElement("product-page") //This binds the class to the custom HTML tag <product-page>.
//ProductPage is name of class.
export class ProductPage extends LitElement {
  imageUrl: string | null = null;
  customText: string = ""; //Initialize customText to an empty string.
  productType: string = "T-shirt";
  layoutMode: number = 0;

  handleImageUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.imageUrl = URL.createObjectURL(file);
      this.requestUpdate(); //Tells Lit to re-render
    }
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
      this.requestUpdate();
    }
  }

  firstUpdated() {
    const textarea = this.renderRoot.querySelector("textarea");
    textarea?.addEventListener("input", () => {
      this.customText = (textarea as HTMLTextAreaElement).value;
      this.requestUpdate();
    });
  }

  handleProductChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.productType = target.value;
    this.requestUpdate();
  }

  constructor() {
    super();
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "q") {
        this.layoutMode = (this.layoutMode + 1) % 3;
        console.log(`Alt+Q pressed,layoutMode:`, this.layoutMode);
        this.requestUpdate();
      }
    });
  }

  render() {
    //this function tells browser what to show.

    //Lit syntax for writing HTML
    return html`
    <div class="w-full min-h-screen flex items-center justify-center">
      <div class=${`w-full p-4 ${
        this.layoutMode === 0
          ? "max-w-6xl ml-0"
          : this.layoutMode === 1
          ? "max-w-4xl bg-blue-100"
          : "max-w-3xl bg-green-100 rounded-xl shadow-lg"
      }`}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="bg-gray-100 p-4 rounded flex flex-col items-center justify-center h-96"
          >
            <div
              class="w-64 h-64 bg-white border border-dashed border-gray-400 flex items-center justify-center"
            >
              ${
                this.imageUrl
                  ? html`<img src=${this.imageUrl} class="w-24 h-24 object-contain"></img>`
                  : html`<span className="text-gray-500"
                      >[3D T-Shirt Preview]</span
                    >`
              }
            </div>
            <div class="mt-4">
              <input type="file" @change=${this.handleImageUpload}></input>
              ${
                this.imageUrl
                  ? html`<img src=${this.imageUrl} class="mt-2 w-32 h-32 object-contain border"></img>`
                  : null
              }
              <div class="w-32 h-32 mt-2 border-2 border-dashed flex items-center justify-center text-xs text-gray-500"
                @dragover=${(e: DragEvent) => e.preventDefault()}
                @drop=${this.handleDrop}
              >Drag & drop image here</div>
              
            </div>
            <p class="text-sm text-gray-400 mt-2">
              Image will appear inside the 3D shirt
            </p>
            ${
              this.customText
                ? html`<div
                    class="mt-2 text-center text-xs text-black whitespace-pre-line"
                  >
                    ${this.customText}
                  </div>`
                : null
            }
          </div>

          <div class="bg-gray-200 p-4 rounded space-y-4">
            <div>
              <label class="block text-sm mb-1">Height(cm)</label>
              <input type="number" class="w-full p-2 rounded border" placeholder="180"></input>
            </div>

            <div>
              <label class="block text-sm mb-1">Weight (kg)</label>
              <input type="number" class="w-full p-2 rounded border" placeholder="80"></input>
            </div>

            <div>
              <label class="block text-sm mb-1">Build</label>
              <select class="w-full p-2 rounded border">
                <option>Lean</option>
                <option>Regular</option>
                <option selected>Athletic</option>
                <option>Big</option>
              </select>
            </div>

            <div>
              <label class="block text-sm mb-1">Product Type</label>
              <select class="w-full p-2 rounded border" @change=${
                this.handleProductChange
              }>
                <option selected>T-shirt</option>
                <option>Hoodie</option>
                <option>Sleevie</option>
                <option>Cap</option>
              </select>
            </div>

            <div>
              <label class="block text-sm mb-1">Text to print(max 3 lines)</label>
              <textarea
                rows="3"
                maxlength="150"
                class="w-full p-2 rounded border resize-none"
                placeholder="Type your custom message here..."
              ></textarea>
            </div>
            <p class="text-xs text-gray-500 mt-2">Selected:${
              this.productType
            }</p>
            <p class="text-xs text-gray-400">Layout Mode:${
              this.layoutMode + 1
            }</p>
          
          </div>
        </div>
      </div>
    `;
  }
}
