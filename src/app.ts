import Builder from './controllers/Builder';
import { orm } from './models';
// import User from './models/User';
// import Account from './models/Account';
// import Invoice from './models/Invoice';

/**
 * Task description
 *
 * create database with 10 users where every user have hiw own account and has made some purchases using his account.
 * business accounts can make more then 10 purchases, personal ones up to 10
 */

// const database = {
//   users: [],
//   accounts: [],
//   invoices: [],
// };

// const user = User.create();
// const account = Account.create();
// const invoice = Invoice.create();

// console.log(user);
// console.log(account);
// console.log(invoice);
// User.createBulk(10);
// const usersModel = new User();
// console.log(usersModel.getAll());

orm.databaseInit();

const builder = new Builder(1);
builder.makeDatabase();
