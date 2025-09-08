import { createThemeSwitcher, createUserProfileIcon, showScreen } from './ui.js';

function handleLogout() {
    window.location.reload();
}

function attachNavEventListeners() {
    // Logout buttons
    document.getElementById('profile-menu-logout-btn')?.addEventListener('click', handleLogout);
    document.getElementById('menu-logout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });

    // User Data screen buttons
    const showUserData = (e: Event) => {
        e.preventDefault();
        showScreen('userDataEdit');
    };
    const viewUserData = (e: Event) => {
        e.preventDefault();
        showScreen('userDataView');
    };
    document.getElementById('profile-menu-user-data')?.addEventListener('click', showUserData);
    document.getElementById('menu-user-data-edit')?.addEventListener('click', showUserData);
    document.getElementById('menu-user-data-view')?.addEventListener('click', viewUserData);

    // Back button from user data screen
    // This listener is attached to the body because the button doesn't exist on page load
    document.body.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).id === 'back-to-main-btn') {
            showScreen('main');
        }
    });
}

function showMainApp(userInitial: string) {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');

    if (authContainer && appContainer) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');

        // Initialize the main app UI
        createThemeSwitcher();
        createUserProfileIcon(userInitial);

        // Attach all navigation event listeners
        attachNavEventListeners();
        showScreen('main'); // Show the main content by default
    }
}

export function handleAuth() {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const registerForm = document.getElementById('register-form') as HTMLFormElement;

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifierInput = loginForm.querySelector('#login-identifier') as HTMLInputElement;
        const initial = identifierInput.value.charAt(0).toUpperCase() || 'U';
        showMainApp(initial);
    });

    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nicknameInput = registerForm.querySelector('#register-nickname') as HTMLInputElement;
        const initial = nicknameInput.value.charAt(0).toUpperCase() || 'U';
        showMainApp(initial);
    });
}