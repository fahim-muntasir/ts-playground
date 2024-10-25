"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_readline_1 = __importDefault(require("node:readline"));
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const items = [];
let totalPrice = 0;
let payableTotal = 0;
let totalPayments = 0;
function askForItem() {
    rl.question(`Item name: `, (name) => {
        rl.question(`Quantity: `, (qt) => {
            rl.question(`Price: `, (price) => {
                const intQt = parseInt(qt);
                const intPrice = parseInt(price);
                const intTotal = intPrice * intQt;
                items.push({ name, qt: intQt, price: intPrice, total: intTotal });
                addMoreItemWarning();
            });
        });
    });
}
function addMoreItemWarning() {
    console.log(" ");
    rl.question(`Do you want to add more? (y/n) `, (cm) => {
        if (cm.toLowerCase() === 'y') {
            askForItem();
        }
        else if (cm.toLowerCase() === 'n') {
            askForPayment();
        }
        else {
            addMoreItemWarning();
        }
    });
}
function askForPayment() {
    totalPrice = items.reduce((curr, accu) => curr + accu.total, 0);
    payableTotal = totalPrice - totalPayments;
    console.log(" ");
    console.log("Total Price: ", totalPrice);
    console.log("Payable Total: ", payableTotal);
    rl.question(`Pay now: `, (payment) => {
        const intPayment = parseInt(payment);
        totalPayments += intPayment;
        if (totalPayments < totalPrice) {
            const duePayment = totalPrice - totalPayments;
            console.log("Due Payment: ", duePayment);
            askForPayment();
        }
        else {
            console.log(" ");
            console.log("Total Price: ", totalPrice);
            console.log("Keep change: ", totalPayments - totalPrice);
            console.log("\x1b[32mPayment successful\x1b[0m");
            rl.close();
        }
    });
}
askForItem();
//# sourceMappingURL=shopping_cart.js.map