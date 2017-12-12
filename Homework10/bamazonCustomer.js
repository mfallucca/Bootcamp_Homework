var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "mfallucca",

  // Your password
  password: "password",
  database: "bamazon"
});

var userSelectedID = 0;
var userQuantity = 0;
var currentStock = 0;


listallItems();

function CLI() {
inquirer
  .prompt([
    // Here we create a basic text prompt
    {
      type: "input",
      message: "\nWelcome to Bamazon!\nWhich item ID would you like to buy?",
      name: "getID"
    },
    {
      type: "input",
      message: "\nHow many items would you like to buy?",
      name: "quantity"
    },
    // Here we ask the user to confirm.
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    console.log(inquirerResponse.getID);
    userSelectedID = inquirerResponse.getID;
	console.log(inquirerResponse.quantity);
	userQuantity = inquirerResponse.quantity;
	checkQuantity();
  });
};

  function listallItems () {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    var itemArray = [];
    
    for (i = 0; i < res.length; i++) {
        itemArray.push({
        item_id : res[i].item_id,
        product_name : res[i].product_name,
        price : res[i].price,
      });
    }
    
    console.log("\nCurrent items for sale...")
    
    for (i=0; i < itemArray.length;i++) {
    	console.log("Item ID: " + itemArray[i].item_id + " | Product Name: " + itemArray[i].product_name + " | Price: " + itemArray[i].price);
    }

    CLI();
  });
}

function checkQuantity() {
	var query = "SELECT stock_quantity FROM products WHERE ?";
	connection.query(query, { item_id: userSelectedID }, function(err, res) {
		currentStock = res[0].stock_quantity;

		if (currentStock >= userQuantity) {
			console.log("\nCongratulations, we have enough in stock!");
			updateStock();
		}
		else {
			console.log("\nSorry, we don't have enough in stock");
			CLI();
		}

	});
}

function updateStock() {
	connection.query(
		"UPDATE products SET ? WHERE ?",
		[
      		{
        		stock_quantity: (currentStock - userQuantity)
      		},
      		{
        		item_id: userSelectedID
      		}
    	],
    function(error) {
      	if (error) throw err;
      	console.log("\nOrder completed");
      	CLI();
    }
  	);
}

