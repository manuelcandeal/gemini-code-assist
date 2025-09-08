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
import { setTheme } from './theme.js';
// --- THEME SWITCHER ---
export function createThemeSwitcher() {
    const header = document.getElementById('main-header');
    if (!header)
        return;
    let rightContainer = document.getElementById('header-right-container');
    if (!rightContainer) {
        rightContainer = document.createElement('div');
        rightContainer.id = 'header-right-container';
        rightContainer.className = 'header-right';
        header.appendChild(rightContainer);
    }
    const themeContainer = document.createElement('div');
    themeContainer.id = 'theme-switcher';
    const themeButton = document.createElement('button');
    themeButton.id = 'theme-switcher-button';
    themeButton.innerHTML = `
        <span>Temas</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
    `;
    const themes = {
        'default': 'Claro',
        'theme-dark': 'Oscuro',
        'theme-high-contrast': 'Alto Contraste',
        'theme-blue': 'Azul',
        'theme-green': 'Verde'
    };
    const themeList = document.createElement('ul');
    themeList.className = 'theme-list hidden';
    for (const [value, text] of Object.entries(themes)) {
        const listItem = document.createElement('li');
        listItem.className = 'theme-list-item';
        listItem.dataset.theme = value;
        const colorDot = document.createElement('div');
        colorDot.className = 'theme-color-dot';
        colorDot.dataset.theme = value;
        const themeName = document.createElement('span');
        themeName.className = 'theme-name';
        themeName.textContent = text;
        listItem.appendChild(colorDot);
        listItem.appendChild(themeName);
        themeList.appendChild(listItem);
    }
    themeContainer.appendChild(themeButton);
    themeContainer.appendChild(themeList);
    themeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        themeList.classList.toggle('hidden');
    });
    themeList.addEventListener('click', (e) => {
        const target = e.target;
        const themeItem = target.closest('.theme-list-item');
        if (themeItem) {
            const theme = themeItem.dataset.theme;
            if (theme) {
                setTheme(theme);
                themeList.classList.add('hidden');
            }
        }
    });
    document.addEventListener('click', (e) => {
        if (!themeContainer.contains(e.target)) {
            themeList.classList.add('hidden');
        }
    });
    rightContainer.appendChild(themeContainer);
}
// --- USER PROFILE ICON ---
export function createUserProfileIcon(initial) {
    const rightContainer = document.getElementById('header-right-container');
    if (!rightContainer)
        return;
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-container';
    profileContainer.innerHTML = `
        <div class="profile-icon" tabindex="0">
            <span>${initial}</span>
        </div>
        <div class="profile-menu hidden">
            <ul>
                <li><a href="#" id="profile-menu-user-data">Datos de Usuario</a></li>
                <li><button id="profile-menu-logout-btn">Logout</button></li>
            </ul>
        </div>
    `;
    rightContainer.appendChild(profileContainer);
    const profileIcon = profileContainer.querySelector('.profile-icon');
    const profileMenu = profileContainer.querySelector('.profile-menu');
    profileIcon?.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu?.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!profileContainer.contains(e.target)) {
            profileMenu?.classList.add('hidden');
        }
    });
}
// --- DYNAMIC MENU ---
const menuData = [
    { name: 'Inicio', href: '#', id: 'menu-home' },
    {
        name: 'Ficheros',
        children: [
            {
                name: 'Nuevo',
                children: [
                    { name: 'Tipo 1', href: '#' },
                    { name: 'Tipo 2', href: '#' },
                ]
            },
            { name: 'Abrir', href: '#' },
        ]
    },
    {
        name: 'Mi Perfil',
        children: [
            { name: 'Modificar', href: '#', id: 'menu-user-data-edit' },
            { name: 'Ver', href: '#', id: 'menu-user-data-view' },
        ]
    },
    { name: 'Logout', href: '#', id: 'menu-logout-btn' },
];
function createMenuHtml(items, level = 0) {
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
            html += createMenuHtml(item.children, level + 1);
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
    nav.innerHTML = createMenuHtml(menuData, 0); // Pass initial level as 0
}
// --- SCREEN MANAGEMENT ---
export function createUserDataScreen(isReadonly = false) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent)
        return;
    // Crear la pantalla de datos de usuario si no existe
    let userDataScreen = document.getElementById('user-data-screen');
    if (userDataScreen) {
        userDataScreen.remove(); // Remove to recreate with correct readonly state
    }
    userDataScreen = document.createElement('div');
    userDataScreen.id = 'user-data-screen';
    userDataScreen.className = 'content-screen';
    userDataScreen.innerHTML = `
        <div class="form-container" style="max-width: 600px;">
            <h2>Datos de Usuario</h2>
            <form id="user-data-form">
                <div class="form-group">
                    <label for="user-email">Email</label>
                    <input type="email" id="user-email" value="test@example.com" readonly>
                </div>
                <div class="form-group">
                    <label for="user-nickname">Nickname</label>
                    <input type="text" id="user-nickname" value="testuser" ${isReadonly ? 'readonly' : ''}>
                </div>
                <hr>
                <p style="margin-top: 1rem;">Cambiar Contraseña</p>
                <div class="form-group">
                    <label for="current-password">Contraseña Actual</label>
                    <input type="password" id="current-password" ${isReadonly ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label for="new-password">Nueva Contraseña</label>
                    <input type="password" id="new-password" ${isReadonly ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirmar Nueva Contraseña</label>
                    <input type="password" id="confirm-password" ${isReadonly ? 'readonly' : ''}>
                </div>
                <div class="form-actions">
                    ${!isReadonly ? '<button type="submit">Guardar Cambios</button>' : ''}
                    <button type="button" id="back-to-main-btn">Volver</button>
                </div>
            </form>
        </div>
    `;
    mainContent.appendChild(userDataScreen);
}
export function showScreen(screenId) {
    const defaultContent = document.getElementById('default-content-wrapper');
    const userDataScreen = document.getElementById('user-data-screen');
    if (screenId === 'userDataEdit') {
        createUserDataScreen(false);
        defaultContent?.classList.add('hidden');
        document.getElementById('user-data-screen')?.classList.remove('hidden');
    }
    else if (screenId === 'userDataView') {
        createUserDataScreen(true);
        defaultContent?.classList.add('hidden');
        document.getElementById('user-data-screen')?.classList.remove('hidden');
    }
    else { // main
        userDataScreen?.classList.add('hidden');
        defaultContent?.classList.remove('hidden');
    }
}
//# sourceMappingURL=ui.js.map