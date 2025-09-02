const homePage = {
    // Navigation
    websiteLogo: '[id="nava"]',
    contactButton: '#navbarExample > ul > li:nth-child(2) > a',
    cartButton: '[id="cartur"]',
    naviLogoutButton: '[id="logout2"]',
    naviLoginButton: '[id="login2"]',
    naviSignupButton: '[id="signin2"]',
    naviNameOfUserButton: '[id="nameofuser"]',

    // Contact Overlay
    contactEmailField: '[id="recipient-email"]',
    contactNameField: '[id="recipient-name"]',
    contactMessageField: '[id="message-text"]',

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

    productTitle: '.card-title a'
};

export default homePage;