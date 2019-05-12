// like the db query
let queryResult = [{id: 1, name: "Dan", units: 2, price: 2.05},{id: 2, name: "Sam", units: 3, price: 4.07}]

myChoices = queryResult.map(element => {
  return (element.id + ": " + element.name);
})

// then put it in choices of list type
console.log(myChoices);