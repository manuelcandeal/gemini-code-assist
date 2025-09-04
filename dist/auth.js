import { createMainMenu, createThemeSwitcher } from './ui.js';
function showMainApp() {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    if (authContainer && appContainer) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        // Initialize the main app UI
        createMainMenu();
        createThemeSwitcher();
    }
}
export function handleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // TODO: Add actual validation
        console.log('Login attempt');
        showMainApp();
    });
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // TODO: Add actual validation
        console.log('Register attempt');
        showMainApp(); // For now, just log in after registering
    });
}
//# sourceMappingURL=auth.js.map