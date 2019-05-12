var mysql = require("mysql");
var inquirer = require("inquirer");


// connection to mySQL
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Gators14!',
    database : 'bamazon_db'
  });
  
  // if error connecting to mySQL
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    
    //displays mySQL connection ID
    console.log('connected as id ' + connection.threadId);

    //function to display everything for purchase
    function initialConnect() {

    connection.query('SELECT * FROM products', function (error, results, fields) {

myChoices = results.map(element => {
  return (element.item_id + ": " + element.product_name + ": " + element.price);
})
console.log(myChoices);

orderRequested();

// then put it in choices of list type
       /* for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id + " | " + "Item: " + results[i].product_name + " | " + "Item price: " + results[i].price);
          }
          console.log("-----------------------------------"); */

          connection.end();

       });}

       initialConnect();})

       function orderRequested() {
         
        inquirer
        .prompt([{
          type: "list",
          name: "choose_item",
          message: "What is the ID of the product you would like to buy?",
          choices: myChoices
         }, {
           type: "input",
           name: "choose_amount",
           message: "what quantity would you like?"
         }
         /* Pass your questions in here */
       ])

       .then(function(answer) {
         var query = "SELECT * FROM products WHERE item_id = '7'";
         connection.query(query, {choose_item: answer.choose_item}, function (err, res) {
           console.log(res.product_name[i])
         })

         console.log("made it here");

       })}

/* like the db query
let queryResult = [{id: results.item_id, name: results.product_name, results: results.price}]

myChoices = queryResult.map(element => {
  return (element.id + ": " + element.name + ": " + element.results);
})

// then put it in choices of list type
console.log(myChoices);*/