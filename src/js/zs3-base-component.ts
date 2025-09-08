export class $BaseComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback (): void {
  }

  disconnectedCallback (): void {
  }

  adoptedCallback (): void {
  }

  attributeChangedCallback (name: string, oldValue: string, newValue: string): void {
  }

  render (): void {
  }

  qs (selector: string): HTMLElement | null {
    return this.shadowRoot?.querySelector(selector) ?? null
  }

  qsa (selector: string): NodeListOf<HTMLElement> | null {
    return this.shadowRoot?.querySelectorAll(selector) ?? null
  }
}
