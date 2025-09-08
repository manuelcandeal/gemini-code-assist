export function generateEvent(detail) {
    const event = new CustomEvent(detail.name, {
        bubbles: true,
        composed: true,
        detail: detail.detail
    });
    detail.htmlElement.dispatchEvent(event);
}
export function defineTemplate(context, detail) {
    let template = document.getElementById(detail.id);
    if (!template) {
        template = document.createElement('template');
        template.id = detail.id;
        template.innerHTML = `
      <style>
        ${detail.css}
      </style>
      ${detail.html}
    `;
        document.head.appendChild(template);
    }
    return template.content.cloneNode(true);
}
export function float(context, selector) {
    const element = context.shadowRoot?.querySelector(selector);
    if (element) {
        const floatAttr = context.getAttribute('zs3-float');
        if (floatAttr) {
            element.classList.add(`float-${floatAttr}`);
        }
    }
}
//# sourceMappingURL=zs3-common.js.map