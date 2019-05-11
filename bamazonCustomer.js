var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Gators14!',
    database : 'bamazon_db'
  });
   
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM products', function (error, results, fields) {
        for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id + " | " + "Item: " + results[i].product_name + " | " + "Item price: " + results[i].price);
          }
          console.log("-----------------------------------");

          connection.end();

       });})

       inquirer
       .prompt([{
           type: "list",
           name: "choose_item",
           message: "What is the ID of the product you would like to buy?",
           choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
       }, {
           type: "number",
           name: "choose_amount",
           message: "what quantity would you like?"
       }
         /* Pass your questions in here */
       ])
       .then(answers => {
           console.log("this is working");
         // Use user feedback for... whatever!!
       });
