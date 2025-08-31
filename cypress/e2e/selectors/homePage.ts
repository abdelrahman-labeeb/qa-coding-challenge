const homePage = {
    // Navigation
    websiteLogo: '[id="nava"]',
    cartButton: '[id="cartur"]',
    naviLoginButton: '[id="login2"]',
    naviSignupButton: '[id="signin2"]',
    naviNameOfUserButton: '[id="nameofuser"]',

    // Login Overlay
    loginOverlay: '[id="logInModal"]',
    loginOverlayUsernameField: '[id="loginusername"]',
    loginOverlayPasswordField: '[id="loginpassword"]',
    loginOverlayLoginButton: '#logInModal .modal-footer .btn.btn-primary',

    // Signup Overlay
    signupOverlay: '[id="signInModal"]',
    signupOverlayUsernameField: '[id="sign-username"]',
    signupOverlayPasswordField: '[id="sign-password"]',
    signupOverlayLoginButton: '#signInModal > div > div > div.modal-footer > button.btn.btn-primary',

    // Categories
    categoriesButton: '[id="cat"]',
};

export default homePage;