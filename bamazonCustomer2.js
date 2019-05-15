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
    initialConnect();
});
    
    //function to display everything for purchase
    function initialConnect() {
        
        connection.query('SELECT * FROM products', function (error, results, fields) {
            
            myChoices = results.map(element => {
                return (element.item_id + ": " + element.product_name + ": " + element.price);
            })
            console.log(myChoices);
            
            orderRequested(results);
            
        });}
        
        function orderRequested(dbItems) {
            
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
        ])
        
        .then(function(answer) {

            let itemChosenID;
            
           let userIDChosen = parseInt(answer.choose_item.split(":")[0]);
           //console.log("ID of chosen choice: " + userIDChosen)
           
           dbItems.forEach((element, index) => {
               if (element.item_id == userIDChosen) { itemChosenID = element.item_id - 1;
        console.log("Item selected: " + itemChosenID);
        }})

        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) throw error;

            console.log(results[itemChosenID]);

            var customerQuantity = parseInt(answer.choose_amount)
            console.log("Customer quantity: " + customerQuantity);

            var dbItemQuantity = parseInt(results[itemChosenID].stock_quantity);
            console.log("Warehouse quantity: " + dbItemQuantity);

            var newQuantity = dbItemQuantity - customerQuantity;
            console.log("New quantity: "+newQuantity);

            if (dbItemQuantity >= customerQuantity) {
                console.log("We have your items in stock. Please wait while we process your order.");
                
                connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity:newQuantity},{item_id: itemChosenID}], function(err, qData){
                    console.log("Quantity Updated: "+qData);
                })
            } 
            else {
                console.log("Sorry, we're currently out of stock.")
                return 
            }

            let priceToMultiply = (results[itemChosenID].price);
           // console.log("Price to multiply: " + priceToMultiply);
            
            let checkoutTotal = customerQuantity;
           // console.log("Quantity purchased: " + checkoutTotal);

            let customerTotal = priceToMultiply * checkoutTotal;
            console.log("Your total: " + "$" + customerTotal);
           
        })

        connection.end();
    })}