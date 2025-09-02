const cartPage = {
    // Order Overview
    orderOverview: {
        productsRows: '#tbodyid tr',
        productsPriceCells: '#tbodyid tr td:nth-child(3)',
    },

    totalOrderPrice: '#totalp',
    placeOrderButton: '#page-wrapper > div > div.col-lg-1 > button.btn.btn-success',

    // Place Order Overlay
    placeOrderOverlay: {
        overlay: 'div[id="orderModal"]',
        nameField: '[id="name"]',
        countryField: '[id="country"]',
        cityField: '[id="city"]',
        creditCardField: '[id="card"]',
        expiryMonthField: '[id="month"]',
        expiryYearField: '[id="year"]',
        purchaseButton: "#orderModal > div > div > div.modal-footer > button.btn.btn-primary:contains('Purchase')",
    },
};

export default cartPage;