import { createAuthForm } from './ui.js';
import { handleAuth } from './auth.js';
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render the initial authentication form
    createAuthForm();
    // 2. Attach event listeners for login/registration
    handleAuth();
});
//# sourceMappingURL=app.js.map