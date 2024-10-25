import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type Item = {
  name: string;
  qt: number;
  price: number;
  total: number;
};

// Total items
const items: Item[] = [];
let totalPrice: number = 0;
let payableTotal: number = 0;
let totalPayments: number = 0;

function askForItem(): void {
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

function addMoreItemWarning(): void {
  console.log(" ");
  rl.question(`Do you want to add more? (y/n) `, (cm) => {
    if (cm.toLowerCase() === 'y') {
      askForItem();
    } else if (cm.toLowerCase() === 'n') {
      askForPayment();
    } else {
      addMoreItemWarning();
    }
  });
}

function askForPayment(): void {
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
    } else {
      console.log(" ");
      console.log("Total Price: ", totalPrice);
      console.log("Keep change: ", totalPayments - totalPrice);
      console.log("\x1b[32mPayment successful\x1b[0m");

      rl.close();
    }
  });
}

askForItem();
