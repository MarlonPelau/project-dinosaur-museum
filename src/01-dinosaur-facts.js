/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require('../data/dinosaurs');
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  //immediate I'm thinking the .forEach method and numericals and comparisons
  let longestDino = dinosaurs[0];
  //create my variable, compare it starting off at zero
  dinosaurs.forEach((dinosaur) => {
    //this is where you iterate through the array of different dinosaur objects
    if(dinosaur.lengthInMeters > longestDino.lengthInMeters) {
      //now for the logic, the real test of your code - using the key keys and dotting into info
      longestDino = dinosaur;
    }
  });
  return {[longestDino.name]: longestDino.lengthInMeters * 3.281};
  //now it's about specifics and instructions, using proper format, punctuation and calculations
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  //this function has two parameters this time, and the formatted detailed description is one option, as well is an error message
  let dinoDetails = "A dinosaur with an ID of '" + id + "' cannot be found.";
  //logically, the .forEach method seemed most appropriate to use to iterate through the array of objects 
  dinosaurs.forEach((dinosaur) => {
    //and so the logic begins, to make an absolute true match of correct id to each dinosaur description, or not if there isn't
    if(dinosaur.dinosaurId === id && !dinosaur.mya.includes(undefined)) {
      //the shape, format and order of the description must be adhered to by the examples, which is why this deserves the strictest code, syntax and particular return to follow
      dinoDetails = `${dinosaur.name} (${dinosaur.pronunciation}) 
      \n${dinosaur.info} 
      It lived in the ${dinosaur.period} period, over ${dinosaur.mya[0]} million years ago.`;
    }
  });
  return dinoDetails;
}  


/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` argument is provided when the function is called, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  const dinoLife = dinosaurs.filter((dinosaur) => {
    if(dinosaur.mya.length === 1) {
      return dinosaur.mya[0] === mya || dinosaur.mya[0] === mya - 1;
    } else {
      return mya >= dinosaur.mya[1] && mya <= dinosaur.mya[0];
    }
  });
  if(!key) {
    return dinoLife.map((dinosaur) => dinosaur.dinosaurId);
  } else {
    return dinoLife.map((dinosaur) => dinosaur[key] || null);
  }
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya
};
