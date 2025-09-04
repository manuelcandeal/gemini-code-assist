// --- AUTH FORM ---
export function createAuthForm() {
    const container = document.getElementById('auth-container');
    if (!container)
        return;
    container.innerHTML = `
        <div class="form-container">
            <div id="form-toggle">
                <button id="show-login-btn" class="active">Login</button>
                <button id="show-register-btn">Registrarse</button>
            </div>

            <form id="login-form" class="auth-form">
                <h2>Login</h2>
                <div class="form-group">
                    <label for="login-identifier">Email o Nickname</label>
                    <input type="text" id="login-identifier" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Contraseña</label>
                    <input type="password" id="login-password" required>
                </div>
                <button type="submit">Login</button>
            </form>

            <form id="register-form" class="auth-form hidden">
                <h2>Registro</h2>
                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input type="email" id="register-email" required>
                </div>
                <div class="form-group">
                    <label for="register-nickname">Nickname</label>
                    <input type="text" id="register-nickname" required>
                </div>
                <div class="form-group">
                    <label for="register-password">Contraseña</label>
                    <input type="password" id="register-password" required>
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    `;
    const showLoginBtn = document.getElementById('show-login-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    if (showLoginBtn && showRegisterBtn && loginForm && registerForm) {
        showLoginBtn.addEventListener('click', () => {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
        });
        showRegisterBtn.addEventListener('click', () => {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            showLoginBtn.classList.remove('active');
            showRegisterBtn.classList.add('active');
        });
    }
}
// --- THEME SWITCHER ---
export function createThemeSwitcher() {
    const container = document.getElementById('theme-switcher');
    if (!container)
        return;
    const themes = {
        'default': 'Claro',
        'theme-dark': 'Oscuro',
        'theme-high-contrast': 'Alto Contraste',
        'theme-blue': 'Azul',
        'theme-green': 'Verde'
    };
    const select = document.createElement('select');
    select.id = 'theme-select';
    for (const [value, text] of Object.entries(themes)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }
    container.innerHTML = '';
    container.appendChild(select);
    select.addEventListener('change', (e) => {
        const target = e.target;
        document.body.className = '';
        if (target.value !== 'default') {
            document.body.classList.add(target.value);
        }
    });
}
// --- DYNAMIC MENU ---
const menuData = [
    { name: 'Inicio', href: '#' },
    {
        name: 'Ficheros',
        children: [
            { name: 'Nuevo', href: '#' },
            { name: 'Abrir', href: '#' },
            {
                name: 'Recientes',
                children: [
                    { name: 'File1.txt', href: '#' },
                    { name: 'File2.txt', href: '#' },
                ]
            }
        ]
    },
    { name: 'Editar', href: '#' },
    { name: 'Ayuda', href: '#' },
];
function createMenuHtml(items) {
    let html = '<ul>';
    for (const item of items) {
        const hasChildren = item.children && item.children.length > 0;
        html += `<li class="${hasChildren ? 'has-submenu' : ''}">`;
        html += `<a href="${item.href || '#'}">${item.name}</a>`;
        if (hasChildren) {
            html += createMenuHtml(item.children);
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
}
export function createMainMenu() {
    const nav = document.getElementById('main-nav');
    if (!nav)
        return;
    nav.innerHTML = createMenuHtml(menuData);
}
//# sourceMappingURL=ui.js.map