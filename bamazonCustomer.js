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
        for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id + " | " + "Item: " + results[i].product_name + " | " + "Item price: " + results[i].price);
          }
          console.log("-----------------------------------");

          orderRequested();

          connection.end();

       });}

       //end of initial connect function

      //calling initialConnect function
       initialConnect();
       
       //function to ask users what they want to purchase 

       function orderRequested() {
         
         inquirer
         .prompt([{
           type: "list",
           name: "choose_item",
           message: "What is the ID of the product you would like to buy?",
           choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
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

        })}})