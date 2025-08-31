import './commands/api';
import './commands/cart';
import './commands/home';
import './commands/login';
import './commands/registration';

declare global {
    namespace Cypress {
        interface Chainable {
            registerClient(): Chainable<string>;

            openCartAndValidateTotalOrderPrice(numberOfProductsAddedToCart?: number): Chainable<void>;

            deleteProductFromCartAndValidateProductsSumPriceAndCartPrice(numberOfProductsInCart?: number): Chainable<void>;

            validateProductsSumPriceAndCartPrice(): Chainable<void>;

            fillOrderInfo(): Chainable<void>;

            submitOderAndConfirmSuccessfulPurchase(): Chainable<void>;

            addProductsToCart(numberOfProductsToAdd?: number): Chainable<void>;

            login(username: string, password: string): Chainable<void>;

            signup(u?: string, p?: string): Chainable<{username:string,password:string}>;
        }
    }
}

export {};