import { handleAuth } from './auth.js';
import { createAuthForm } from './ui.js';
import { applyInitialTheme } from './theme.js';
import './menu.js';
document.addEventListener('DOMContentLoaded', () => {
    applyInitialTheme();
    createAuthForm();
    handleAuth();
});
//# sourceMappingURL=app.js.map