export class $BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    render() {
    }
    qs(selector) {
        return this.shadowRoot?.querySelector(selector) ?? null;
    }
    qsa(selector) {
        return this.shadowRoot?.querySelectorAll(selector) ?? null;
    }
}
//# sourceMappingURL=zs3-base-component.js.map