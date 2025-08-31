const cartPage = {
    // Place Order Overlay
    placeOrder: {
        overlay: 'div[id="orderModal"]',
        nameField: '[id="name"]',
        countryField: '[id="country"]',
        cityField: '[id="city"]',
        creditCardField: '[id="card"]',
        expiryMonthField: '[id="month"]',
        expiryYearField: '[id="year"]',
        PurchaseButton: "#orderModal > div > div > div.modal-footer > button.btn.btn-primary:contains('Purchase')",
    },
};

export default cartPage;