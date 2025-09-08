export function generateEvent(detail: { name: string, htmlElement: HTMLElement, detail: any }): void {
  const event = new CustomEvent(detail.name, {
    bubbles: true,
    composed: true,
    detail: detail.detail
  });
  detail.htmlElement.dispatchEvent(event);
}

export function defineTemplate(context: HTMLElement, detail: { name: string, id: string, css: string, html: string }): HTMLTemplateElement {
  let template = document.getElementById(detail.id) as HTMLTemplateElement;
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
  return template.content.cloneNode(true) as unknown as HTMLTemplateElement;
}

export function float(context: HTMLElement, selector: string): void {
    const element = context.shadowRoot?.querySelector(selector) as HTMLElement;
    if (element) {
        const floatAttr = context.getAttribute('zs3-float');
        if (floatAttr) {
            element.classList.add(`float-${floatAttr}`);
        }
    }
}
