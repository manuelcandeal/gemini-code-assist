
// --- TYPES ---
type MenuItem = {
    name: string;
    href?: string;
    id?: string; // <--- AÑADIR ESTA LÍNEA
    children?: MenuItem[];
};

// --- AUTH FORM ---

export function createAuthForm() {
    const container = document.getElementById('auth-container');
    if (!container) return;

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
    if (!header) return;

    // Crear un contenedor para los elementos de la derecha si no existe
    let rightContainer = document.getElementById('header-right-container');
    if (!rightContainer) {
        rightContainer = document.createElement('div');
        rightContainer.id = 'header-right-container';
        rightContainer.className = 'header-right';
        header.appendChild(rightContainer);
    }

    const themeContainer = document.createElement('div');
    themeContainer.id = 'theme-switcher';

    const themes = {
        'default': 'Claro',
        'theme-dark': 'Oscuro',
        'theme-high-contrast': 'Alto Contraste',
        'theme-blue': 'Azul',
        'theme-green': 'Verde'
    };

    for (const [value, text] of Object.entries(themes)) {
        const button = document.createElement('button');
        button.className = 'theme-btn';
        button.title = text;
        button.dataset.theme = value;
        themeContainer.appendChild(button);
    }

    themeContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('theme-btn')) {
            const theme = target.dataset.theme;
            if (theme) {
                setTheme(theme);
            }
        }
    });

    rightContainer.appendChild(themeContainer);
}


// --- USER PROFILE ICON ---

export function createUserProfileIcon(initial: string) {
    const rightContainer = document.getElementById('header-right-container');
    if (!rightContainer) return;

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
        if (!profileContainer.contains(e.target as Node)) {
            profileMenu?.classList.add('hidden');
        }
    });
}


// --- DYNAMIC MENU ---

const menuData: MenuItem[] = [
    { name: 'Inicio', href: '#', id: 'menu-home' },
    {
        name: 'Ficheros',
        children: [
            { name: 'Nuevo', href: '#' },
            { name: 'Abrir', href: '#' },
        ]
    },
    { name: 'Mi Perfil', href: '#', id: 'menu-user-data' },
    { name: 'Logout', href: '#', id: 'menu-logout-btn' },
];

function createMenuHtml(items: MenuItem[]): string {
    let html = '<ul>';
    for (const item of items) {
        const hasChildren = item.children && item.children.length > 0;
        const idAttr = item.id ? `id="${item.id}"` : '';
        html += `<li class="${hasChildren ? 'has-submenu' : ''}">`;
        html += `<a href="${item.href || '#'}" ${idAttr}>${item.name}</a>`;
        if (hasChildren) {
            html += createMenuHtml(item.children!);
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
}

export function createMainMenu() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    nav.innerHTML = createMenuHtml(menuData);
}

// --- SCREEN MANAGEMENT ---

export function createUserDataScreen() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Crear la pantalla de datos de usuario si no existe
    let userDataScreen = document.getElementById('user-data-screen');
    if (userDataScreen) {
        userDataScreen.classList.remove('hidden');
        return;
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
                    <input type="text" id="user-nickname" value="testuser">
                </div>
                <hr>
                <p style="margin-top: 1rem;">Cambiar Contraseña</p>
                <div class="form-group">
                    <label for="current-password">Contraseña Actual</label>
                    <input type="password" id="current-password">
                </div>
                <div class="form-group">
                    <label for="new-password">Nueva Contraseña</label>
                    <input type="password" id="new-password">
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirmar Nueva Contraseña</label>
                    <input type="password" id="confirm-password">
                </div>
                <div class="form-actions">
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" id="back-to-main-btn">Volver</button>
                </div>
            </form>
        </div>
    `;
    mainContent.appendChild(userDataScreen);
}

export function showScreen(screenId: 'main' | 'userData') {
    const defaultContent = document.getElementById('default-content-wrapper');
    const userDataScreen = document.getElementById('user-data-screen');

    if (screenId === 'userData') {
        createUserDataScreen(); // La crea si no existe
        defaultContent?.classList.add('hidden');
        document.getElementById('user-data-screen')?.classList.remove('hidden');
    } else { // main
        userDataScreen?.classList.add('hidden');
        defaultContent?.classList.remove('hidden');
    }
}

