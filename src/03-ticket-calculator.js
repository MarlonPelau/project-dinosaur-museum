/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  const {ticketType, entrantType, extras} = ticketInfo;
  //five parameters for this function, and similarly to previous ones, an error message is generated if info is off 
  if(!ticketData[ticketType]) {
    return `Ticket type '${ticketType}' cannot be found.`;
    //for the next three forms of logic, the 'no' symbol is used within each 'if' statement, to purposefully generate an error message for each of the three ticket type values
  }
  if(!ticketData[ticketType].priceInCents[entrantType]) {
    return `Entrant type '${entrantType}' cannot be found.`;
  }
  const tixCosts = extras.reduce((sum, extra) => {
    if(!ticketData.extras[extra]) {
      return `Extra type '${extra}' cannot be found.`;
      //creating a new variable above, the focus to decifer a sum of the costs, we use the .reduce method, still factoring the error message if the extras value isn't correct or missing
    }
    return sum + ticketData.extras[extra].priceInCents[entrantType];
  }, 0);
  //to calculate the total cost with extras, initialize the 0 within that extras.reduce function above. Kinda got stuck here for a while.
  return tixCosts + ticketData[ticketType].priceInCents[entrantType];
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  let fullReceipt = 0
   const dinoHeader = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
   let receipt = ''
   for(let purchase of purchases){
 
     const entrantInfo = purchase.entrantType
     const ticketTypeInfo = purchase.ticketType
     let purchaseCost = calculateTicketPrice(ticketData, purchase)
     
     if(typeof purchaseCost === 'string'){
       return purchaseCost
     }
     fullReceipt += purchaseCost;
     const extrasDescript = [];
     for(let extra of purchase.extras) {
      if(ticketData.extras[extra]) {
        extrasDescript.push(ticketData.extras[extra].description);
      }
     }
     if(purchase.extras.length > 0) {
      receipt += `${entrantInfo.charAt(0).toUpperCase()}${entrantInfo.slice(1)} ${ticketData[ticketTypeInfo].description}: $${(purchaseCost/100).toFixed(2)} (${extrasDescript.join(", ")})\n`
    } else {
      receipt += `${entrantInfo.charAt(0).toUpperCase()}${entrantInfo.slice(1)} ${ticketData[ticketTypeInfo].description}: $${(purchaseCost/100).toFixed(2)}\n`

     }

}
const receiptTotal = `-------------------------------------------\nTOTAL: $${(fullReceipt/100).toFixed((2))}`;
return `${dinoHeader}${receipt}${receiptTotal}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
