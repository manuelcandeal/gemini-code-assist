import { getCookie, setCookie } from './utils.js';

export function applyInitialTheme() {
    const savedTheme = getCookie('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // No cookie, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('theme-dark');
        } else {
            setTheme('default');
        }
    }
}

export function setTheme(theme: string) {
    document.body.className = '';
    if (theme !== 'default') {
        document.body.classList.add(theme);
    }
    setCookie('theme', theme, 365);
}
