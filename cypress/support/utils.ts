import { faker } from '@faker-js/faker';

export function generateOrderInfo() {
    return {
        customerFullName: faker.person.fullName(),
        country: faker.location.country(),
        city: faker.location.city(),
        creditCardNumber: faker.finance.creditCardNumber('####-####-####-####'),
        expiryMonth: String(faker.date.future().getMonth() + 1),
        expiryYear: String(faker.date.future().getFullYear())
    };
}