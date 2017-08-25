// Write your JavaScript here

function calculateChange(due, received){

    var change = {
        dollars: 0,
        quarters: 0,
        nickels: 0,
        dimes: 0,
        pennies: 0
    }

    

    var changeDue = received - due;

    
    change.dollars = Math.floor(changeDue);
    

    var centsDue = Math.round((changeDue - change.dollars) * 100);
    // console.log("centsDue", centsDue);

    

// QUARTERS FORMULA
    if (centsDue / 25 >= 1) {
        var quarters = Math.floor(centsDue / 25);
        
        change.quarters = quarters;

        centsDue = centsDue - (quarters * 25);
        // console.log("new centsDue for quarters value", centsDue);
    }

// DIMES FORMULA
    if (centsDue / 10 >= 1) {
        var dimes = Math.floor(centsDue / 10);

        change.dimes = dimes;

        centsDue = centsDue - (dimes * 10);
        // console.log("new centsDue for dimes value", centsDue);
    }

// NICKELS FORMULA
    if (centsDue / 5 >= 1) {
        var nickels = Math.floor(centsDue / 5);

        change.nickels = nickels;

        centsDue = centsDue - (nickels * 5);
        // console.log("new centsDue for nickels value", centsDue);
    }

// PENNIES FORMULA
    if (centsDue / 1 >= 1) {
        var pennies = Math.floor(centsDue / 1);

        change.pennies = pennies;

        centsDue = centsDue - (pennies * 1);
        // console.log("new centsDue for pennies value", centsDue);
    }




    // takes in amount-due first
    // then amount-received
    // return object with dollars, quarters, nickels, dimes, pennies

    return change;


}



$("#calculate-change").click(handleClickEvent);


function handleClickEvent(){

    // use the values we get back in calculateChange function

    var amountDue = parseFloat($("#amount-due").val());
    // console.log("Amount Due w/ parse float",amountDue);

    var amountReceived = parseFloat($("#amount-received").val());
    // console.log("Amount Received w/ parse float",amountReceived);

    var change = calculateChange(amountDue, amountReceived);

    $("#dollars-output").text(change.dollars);

    $("#quarters-output").text(change.quarters);

    $("#dimes-output").text(change.dimes);

    $("#nickels-output").text(change.nickels);

    $("#pennies-output").text(change.pennies);

}