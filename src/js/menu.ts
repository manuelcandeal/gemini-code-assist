import { generateEvent, defineTemplate } from './zs3-common.js';
import { $BaseComponent } from './zs3-base-component.js';

type MenuItem = {
    name: string;
    href?: string;
    id?: string;
    children?: MenuItem[];
};

export class $Menu extends $BaseComponent {
    private menuData: MenuItem[] = [];

    constructor() {
        super()
        const template = defineTemplate(this, { name: 'zs3-menu-template', id: 'zs3-menu-template', css: this.css(), html: this.html() }) as HTMLTemplateElement
        this.shadowRoot?.appendChild(template)
        generateEvent({ name: 'zs3-built', htmlElement: this, detail: { phase: 'end' } })
    }

    static get observedAttributes(): string[] {
        return ['zs3-created', 'zs3-destroyed', 'zs3-moved', 'zs3-modified', 'zs3-rendered', 'data'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.render();
        generateEvent({ name: 'zs3-created', htmlElement: this, detail: { phase: 'end' } })
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        generateEvent({ name: 'zs3-destroyed', htmlElement: this, detail: { phase: 'end' } })
    }

    adoptedCallback(): void {
        super.adoptedCallback();
        generateEvent({ name: 'zs3-moved', htmlElement: this, detail: { phase: 'end' } })
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === 'data' && newValue) {
            this.menuData = JSON.parse(newValue);
            this.render();
        }
        generateEvent({ name: 'zs3-modified', htmlElement: this, detail: { name, oldValue, newValue, phase: 'end' } })
    }

    render(): void {
        super.render();
        const menuContainer = this.qs('.menu-container');
        if (menuContainer) {
            menuContainer.innerHTML = this.createMenuHtml(this.menuData, 0);
        }
        generateEvent({ name: 'zs3-rendered', htmlElement: this, detail: { phase: 'end' } })
    }

    css(): string {
        return `
            :host {
                display: block;
            }
            ul {
                list-style: none;
                display: flex;
                align-items: center;
                margin: 0;
                padding: 0;
            }
            li {
                position: relative;
            }
            a {
                display: block;
                padding: 0.5rem 1rem;
                text-decoration: none;
                color: var(--text-color);
                transition: background-color 0.2s;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 0.5rem;
            }
            a:hover {
                background-color: var(--primary-color);
                color: #fff;
            }
            ul ul {
                display: none;
                position: absolute;
                left: 0;
                top: 100%;
                background-color: var(--surface-color);
                border: 1px solid var(--border-color);
                min-width: 200px;
                flex-direction: column;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                padding: 0;
            }
            li:hover > ul {
                display: flex;
            }
            ul ul li {
                width: 100%;
            }
            ul ul ul {
                left: 100%;
                top: 0;
            }
            .menu-arrow {
                width: 16px;
                height: 16px;
                fill: currentColor;
                flex-shrink: 0;
            }
            li.has-submenu:hover > a .menu-arrow.down {
                transform: rotate(-180deg);
            }
        `;
    }

    html(): string {
        return `
            <div class="menu-container">
                <slot></slot>
            </div>
        `;
    }

    private createMenuHtml(items: MenuItem[], level: number = 0): string {
        let html = '<ul>';
        for (const item of items) {
            const hasChildren = item.children && item.children.length > 0;
            const idAttr = item.id ? `id="${item.id}"` : '';
            html += `<li class="${hasChildren ? 'has-submenu' : ''}">`;
            html += `<a href="${item.href || '#'}" ${idAttr}>${item.name}`;
            if (hasChildren) {
                const arrowIcon = level === 0
                    ? `<svg class="menu-arrow down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                       </svg>`
                    : `<svg class="menu-arrow right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                       </svg>`;
                html += arrowIcon;
            }
            html += `</a>`;
            if (hasChildren) {
                html += this.createMenuHtml(item.children!, level + 1);
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    }
}

window.customElements.define('zs3-menu', $Menu);