import './commands/api';
import './commands/cart';
import './commands/home';
import './commands/login';
import './commands/registration';
import './commands/selector-utils';

declare global {
    namespace Cypress {
        interface Chainable {
            registerClient(): Chainable<string>;

            openCartAndValidateTotalOrderPrice(numberOfProductsAddedToCart: number): Chainable<void>;

            deleteProductFromCartAndValidateProductsSumPriceAndCartPrice(numberOfProductsInCart: number): Chainable<void>;

            validateProductsSumPriceAndCartPrice(): Chainable<void>;

            fillOrderInfo(): Chainable<void>;

            submitOderAndConfirmSuccessfulPurchase(): Chainable<void>;

            addProductsToCart(numberOfProductsToAdd?: number): Chainable<void>;

            fillLoginModalAndSubmit(username: string, password: string): Chainable<void>;

            login(username: string, password: string): Chainable<void>;

            loginWithInvalidCredentials(username: string, password: string, errMsg: string): Chainable<void>;

            signup(u?: string, p?: string): Chainable<{username:string,password:string}>;

            fillInput(selector: string, value: string): Chainable<void>;

            clickButton(selector: string, text?: string): Chainable<void>;

            clickButtonContainsTxt(text: string): Chainable<void>;
        }
    }
}

export {};