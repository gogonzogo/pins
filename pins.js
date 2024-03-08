/* There are three sets of test data below. You can 
delete the comment tags and run the code if you like

I tried recalling the critera as best I could.

For a pin to be considered it must meet the following criteria...
1. link starts with https:// || http://
2. relevance score > 95 || >=85 && avg quality scores >95
3. quality score avg > 85 || >=75 avg relevance score >95

Sort the pins that meet the above criteria from highest relevance score to lowest.
Ties are to be broken with the notable score.*/

// Calculates the average quality score from an array of quality scores.
function avgQualScore(scores) {
  // Check for empty array.
  if (scores.length < 1) {
    console.log('No scores to average!');
    return '';
  }

  // Initialize the total score.
  let scoreTotal = 0;

  // sum the quality scores
  for (let i = 0; i < scores.length; i++) {
    scoreTotal += scores[i];
  }

  // Return the average.
  return scoreTotal / scores.length;
};

// Checks if a given link is valid (starts with 'http://' or 'https://').
function validLink(link) {
  let linkSubStr;
  let linkComparison;

  // Determine if the link starts with 'http://' or 'https://'.
  if (link[0] !== 'h') {
    return false;
  } else if (link[4] !== 's') {
    linkSubStr = link.substring(0, 7);
    linkComparison = 'http://';
  } else {
    linkSubStr = link.substring(0, 8);
    linkComparison = 'https://';
  };

  // Confirm if the link is valid.
  for (let i = 0; i < linkSubStr.length; i++) {
    if (linkSubStr[i] !== linkComparison[i]) {
      return false;
    };
  };

  return true;
};

// Filters pins that meet specified criteria and sorts them based on relevance score.
function filterPins(pinsArr) {
  // Check for empty array.
  if (pinsArr.length < 1) {
    console.log("No pins to filter.");
    return [];
  }
  // Initalize filtered array
  let filteredPinArr = [];

  // Access each pin in the array.
  for (let i = 0; i < pinsArr.length; i++) {
    let pin = pinsArr[i];
    let pinLinkValid = validLink(pin.link);
    let pinAvgQualScore = avgQualScore(pin.quality_scores);
    let pinRelScore = pin.relevance_score;

    // Evaluate if each pin meets the specified criteria to be considered.
    if (pinLinkValid && pinAvgQualScore > 85 && pinRelScore > 95) {
      filteredPinArr.push(pin);
    } else if (pinLinkValid && pinAvgQualScore >= 95 && pinRelScore >= 85) {
      filteredPinArr.push(pin);
    } else if (pinLinkValid && pinAvgQualScore >= 75 && pinRelScore >= 95)
      filteredPinArr.push(pin);
  };

  // Sort the filtered pins based on relevance score and notable score.
  sortPins(filteredPinArr)
  return filteredPinArr;
};

// Sorts an array of pins in descending order based on relevance score.
function sortPins(pinsArr) {
  // Check for empty array.
  if (pinsArr.length < 1) {
    console.log("No pins to sort.");
    return [];
  }
  // Standard bubble sort method to sort pins in descending order.

  // Establish a variable to assist in determining if the sort is complete.
  let swapped;

  do {
    // Set the variable to false.
    swapped = false

    // Access each pin.
    for (let i = 0; i < pinsArr.length - 1; i++) {
      // Set the current and next pins to variables.
      let currentPin = pinsArr[i];
      let nextPin = pinsArr[i + 1];

      // Initial criteria for swapping the current pin with the next pin.
      if (currentPin.relevance_score < nextPin.relevance_score) {
        // Swap the pins.
        let temp = currentPin;
        pinsArr[i] = nextPin;
        pinsArr[i + 1] = temp;

        // Set the variable to true to execute the do block again.
        swapped = true;

        // Check for ties.
      } else if (currentPin.relevance_score === nextPin.relevance_score) {

        // Criteria for breaking ties.
        if (currentPin.notable < nextPin.notable) {
          let temp = currentPin;
          pinsArr[i] = nextPin;
          pinsArr[i + 1] = temp;
          swapped = true;
        };
      };
    };
    // Continue if swapped is true.
  } while (swapped);
  console.log(pinsArr);
  return pinsArr;
};

// Uncomment a set of test data and function call to test the code.
// Array of 7 objects/pins.
/* const pinsArray = [
  { link: "https://example.com/page1", relevance_score: 95, quality_scores: [95, 95, 92, 95, 97], notableScore: 2 },
  { link: "http://example.com/page2", relevance_score: 92, quality_scores: [95, 95, 97, 98, 94], notableScore: 1 },
  { link: "example.com/page3", relevance_score: 91, quality_scores: [92, 97, 95, 93, 96], notableScore: 0 },
  { link: "https://example.com/page4", relevance_score: 93, quality_scores: [95, 96, 93, 96, 98], notableScore: 3 },
  { link: "http://example.com/page5", relevance_score: 90, quality_scores: [95, 99, 90, 92, 94], notableScore: 1 },
  { link: "example.com/page6", relevance_score: 94, quality_scores: [95, 95, 94, 96, 98], notableScore: 0 },
  { link: "https://example.com/page7", relevance_score: 96, quality_scores: [95, 99, 95, 97, 99], notableScore: 2 },
]; */

// Array of 10 objects/pins.
/* const pinsArray = [
  { link: "https://example.com/page1", relevance_score: 95, quality_scores: [95, 95, 92, 95, 97], notableScore: 2 },
  { link: "http://example.com/page2", relevance_score: 92, quality_scores: [95, 95, 97, 98, 94], notableScore: 1 },
  { link: "example.com/page3", relevance_score: 91, quality_scores: [92, 97, 95, 93, 96], notableScore: 0 },
  { link: "https://example.com/page4", relevance_score: 93, quality_scores: [95, 96, 93, 96, 98], notableScore: 3 },
  { link: "http://example.com/page5", relevance_score: 90, quality_scores: [95, 99, 90, 92, 94], notableScore: 1 },
  { link: "example.com/page6", relevance_score: 94, quality_scores: [95, 95, 94, 96, 98], notableScore: 0 },
  { link: "https://example.com/page7", relevance_score: 96, quality_scores: [95, 99, 95, 97, 99], notableScore: 2 },
  { link: "https://example.com/page8", relevance_score: 97, quality_scores: [95, 93, 96, 98, 100], notableScore: 3 },
  { link: "https://example.com/page9", relevance_score: 98, quality_scores: [95, 94, 97, 99, 100], notableScore: 1 },
  { link: "http://example.com/page10", relevance_score: 97, quality_scores: [95, 90, 94, 95, 97], notableScore: 2 },
];
*/

// Array of 15 objects/pins.
/* const pinsArray = [
  { link: "https://example.com/page1", relevance_score: 95, quality_scores: [95, 95, 92, 95, 97], notableScore: 2 },
  { link: "http://example.com/page2", relevance_score: 92, quality_scores: [95, 95, 97, 98, 94], notableScore: 1 },
  { link: "example.com/page3", relevance_score: 91, quality_scores: [92, 97, 95, 93, 96], notableScore: 0 },
  { link: "https://example.com/page4", relevance_score: 93, quality_scores: [95, 96, 93, 96, 98], notableScore: 3 },
  { link: "http://example.com/page5", relevance_score: 90, quality_scores: [95, 99, 90, 92, 94], notableScore: 1 },
  { link: "example.com/page6", relevance_score: 94, quality_scores: [95, 95, 94, 96, 98], notableScore: 0 },
  { link: "https://example.com/page7", relevance_score: 96, quality_scores: [95, 99, 95, 97, 99], notableScore: 2 },
  { link: "https://example.com/page8", relevance_score: 97, quality_scores: [95, 93, 96, 98, 100], notableScore: 3 },
  { link: "https://example.com/page9", relevance_score: 98, quality_scores: [95, 94, 97, 99, 100], notableScore: 1 },
  { link: "http://example.com/page10", relevance_score: 97, quality_scores: [95, 90, 94, 95, 97], notableScore: 2 },
  { link: "https://example.com/page11", relevance_score: 97, quality_scores: [95, 92, 95, 97, 99], notableScore: 2 },
  { link: "http://example.com/page12", relevance_score: 99, quality_scores: [95, 94, 97, 99, 100], notableScore: 3 },
  { link: "https://example.com/page13", relevance_score: 93, quality_scores: [95, 89, 93, 96, 98], notableScore: 1 },
  { link: "https://example.com/page14", relevance_score: 85, quality_scores: [95, 97, 98, 96, 98], notableScore: 2 },
  { link: "example.com/page15", relevance_score: 100, quality_scores: [95, 95, 95, 95, 99], notableScore: 2 },
];
*/

// filterPins(pinsArray);
