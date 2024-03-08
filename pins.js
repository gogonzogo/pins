// sorted by relevance descending
// Qualifying Criteria
// link is https || http
// relevance_score score > 95 || >=85 && avg quality_scores >95
// quality_score avg > 85 || >=75 avg relevance_score >95
// tie breaker is notable score

function avgQualScore(scores) {
  let scoreTotal = 0;

  // sum the quality scores
  for (let i = 0; i < scores.length; i++) {
    scoreTotal += scores[i];
  }

  return scoreTotal / scores.length;
};

function validLink(link) {
  let linkSubStr;
  let linkComparison;

  // determine if link is https or http and set the variables declared above
  if (link[0] !== 'h') {
    return false;
  } else if (link[4] !== 's') {
    linkSubStr = link.substring(0, 7);
    linkComparison = 'http://';
  } else {
    linkSubStr = link.substring(0, 8);
    linkComparison = 'https://';
  };

  // confirm link is valid
  for (let i = 0; i < linkSubStr.length; i++) {
    if (linkSubStr[i] !== linkComparison[i]) {
      return false;
    };
  };

  return true;
};

function filterPins(pinsArr) {
  let filteredPinArr = [];

  // access each pin in array
  for (let i = 0; i < pinsArr.length; i++) {
    let pin = pinsArr[i];
    let pinLinkValid = validLink(pin.link);
    let pinAvgQualScore = avgQualScore(pin.quality_scores);
    let pinRelScore = pin.relevance_score;

    // evaluate each pin meets the specified criteria to be considered
    if (pinLinkValid && pinAvgQualScore > 85 && pinRelScore > 95) {
      filteredPinArr.push(pin);
    } else if (pinLinkValid && pinAvgQualScore >= 95 && pinRelScore >= 85) {
      filteredPinArr.push(pin);
    } else if (pinLinkValid && pinAvgQualScore >= 75 && pinRelScore >= 95)
      filteredPinArr.push(pin);
  };

  sortPins(filteredPinArr)
  return filteredPinArr;
};

function sortPins(pinsArr) {
  // standard bubble sort method to sort pins descending

  // establish variable to assit in determining the sort is complete
  let swapped;

  do {
    // set variable to false
    swapped = false

    // access each pin
    for (let i = 0; i < pinsArr.length - 1; i++) {
      // set the current and next pins to a variable
      let currentPin = pinsArr[i];
      let nextPin = pinsArr[i + 1];

      // inital criteria for swapping current pin with next pin
      if (currentPin.relevance_score < nextPin.relevance_score) {
        // swap pins
        let temp = currentPin;
        pinsArr[i] = nextPin;
        pinsArr[i + 1] = temp;

        // set variable to true to execute do block again
        swapped = true;

        // check for ties
      } else if (currentPin.relevance_score === nextPin.relevance_score) {

        // criteria for breaking ties
        if (currentPin.notable < nextPin.notable) {
          let temp = currentPin;
          pinsArr[i] = nextPin;
          pinsArr[i + 1] = temp;
          swapped = true;
        };
      };
    };
    // continue if swapped is ture
  } while (swapped);
  console.log(pinsArr)
};

// 7 pins
/* const pinsArray = [
  { link: "https://example.com/page1", relevance_score: 95, quality_scores: [95, 95, 92, 95, 97], notableScore: 2 },
  { link: "http://example.com/page2", relevance_score: 92, quality_scores: [95, 95, 97, 98, 94], notableScore: 1 },
  { link: "example.com/page3", relevance_score: 91, quality_scores: [92, 97, 95, 93, 96], notableScore: 0 },
  { link: "https://example.com/page4", relevance_score: 93, quality_scores: [95, 96, 93, 96, 98], notableScore: 3 },
  { link: "http://example.com/page5", relevance_score: 90, quality_scores: [95, 99, 90, 92, 94], notableScore: 1 },
  { link: "example.com/page6", relevance_score: 94, quality_scores: [95, 95, 94, 96, 98], notableScore: 0 },
  { link: "https://example.com/page7", relevance_score: 96, quality_scores: [95, 99, 95, 97, 99], notableScore: 2 },
];
*/

// 10 pins
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

// 15 pins
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

filterPins(pinsArray);