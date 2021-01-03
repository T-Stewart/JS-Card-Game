//board
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(container, e.clientY, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y, x) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y + x - box.top - box.left - box.height - box.width / 30;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//creating deck

let cardGame = {
  cardDivs: [
    "#clubs-2",
    "#clubs-3",
    "#clubs-4",
    "#clubs-5",
    "#clubs-6",
    "#clubs-7",
    "#clubs-8",
    "#clubs-9",
    "#clubs-10",
    "#clubs-jack",
    "#clubs-queen",
    "#clubs-king",
    "#clubs-ace",
    "#spades-2",
    "#spades-3",
    "#spades-4",
    "#spades-5",
    "#spades-6",
    "#spades-7",
    "#spades-8",
    "#spades-9",
    "#spades-10",
    "#spades-jack",
    "#spades-queen",
    "#spades-king",
    "#spades-ace",
    "#hearts-2",
    "#hearts-3",
    "#hearts-4",
    "#hearts-5",
    "#hearts-6",
    "#hearts-7",
    "#hearts-8",
    "#hearts-9",
    "#hearts-10",
    "#hearts-jack",
    "#hearts-queen",
    "#hearts-king",
    "#hearts-ace",
    "#diamonds-2",
    "#diamonds-3",
    "#diamonds-4",
    "#diamonds-5",
    "#diamonds-6",
    "#diamonds-7",
    "#diamonds-8",
    "#diamonds-9",
    "#diamonds-10",
    "#diamonds-jack",
    "#diamonds-queen",
    "#diamonds-king",
    "#diamonds-ace",
  ],

  cardPlacement: [
    "#card-spot-1",
    "#card-spot-2",
    "#card-spot-3",
    "#card-spot-4",
    "#card-spot-5",
    "#card-spot-6",
    "#card-spot-7",
    "#card-spot-8",
    "#card-spot-9",
    "#card-spot-10",
  ],

  addCardPlacement: [
    "#card-spot-11",
    "#card-spot-12",
    "#card-spot-13",
    "#card-spot-14",
    "#card-spot-15",
    "#card-spot-16",
    "#card-spot-17",
    "#card-spot-18",
    "#card-spot-19",
    "#card-spot-20",
    "#card-spot-21",
    "#card-spot-22",
    "#card-spot-23",
    "#card-spot-24",
    "#card-spot-25",
    "#card-spot-26",
    "#card-spot-27",
    "#card-spot-28",
    "#card-spot-29",
    "#card-spot-30",
    "#card-spot-31",
    "#card-spot-32",
    "#card-spot-33",
    "#card-spot-34",
    "#card-spot-35",
    "#card-spot-36",
    "#card-spot-37",
    "#card-spot-38",
    "#card-spot-39",
    "#card-spot-49",
    "#card-spot-41",
    "#waste-pile",
  ],
};

class Card {
  constructor(suit, rank, value, id, div) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.id = id;
    this.div = div;
  }
}
class Deck {
  constructor() {
    this.cards = [];
    this.pictureValue = [];
    this.cardDiv = [];
  }
  createDeck() {
    let suits = [
      "clubs",
      "diamonds",
      "hearts",
      "spades",
      "bclubs",
      "bdiamonds",
      "bhearts",
      "bspades",
    ];
    let ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
      "ace",
    ];

    let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let id = suits[i] + "-" + ranks[j];
        let div = "#" + suits[i] + "-" + ranks[j];
        this.cards.push(new Card(suits[i], ranks[j], values[j], id, div));
        this.pictureValue.push(id);
        this.cardDiv.push(div);
      }
    }
  }
}

const d = new Deck();
d.createDeck();
console.log(d.cards);

//create random deal

document
  .querySelector("#game-deal-button")
  .addEventListener("click", showCards);

function randomDeck() {
  let deck = [];
  for (let i = 0; i < 104; i++) {
    let randomIndex = Math.floor(Math.random() * 104);
    deck.push(d.pictureValue[randomIndex]);
    // console.log(dealCards[randomIndex]);
    // randomCards = randomIndex;
  }
  return deck;
}

let deck = [...randomDeck()];

console.log(deck);

function showCards() {
  let cardOne = document.createElement("img");
  cardOne.src = `images/cards/deck1/${deck[0]}.png`;
  document.querySelector(cardGame["cardPlacement"][0]).appendChild(cardOne);

  let cardTwo = document.createElement("img");
  cardTwo.src = `images/cards/deck1/${deck[1]}.png`;
  document.querySelector(cardGame["cardPlacement"][1]).appendChild(cardTwo);

  let cardThree = document.createElement("img");
  cardThree.src = `images/cards/deck1/${deck[2]}.png`;
  document.querySelector(cardGame["cardPlacement"][2]).appendChild(cardThree);

  let cardFour = document.createElement("img");
  cardFour.src = `images/cards/deck1/${deck[3]}.png`;
  document.querySelector(cardGame["cardPlacement"][3]).appendChild(cardFour);

  let cardFive = document.createElement("img");
  cardFive.src = `images/cards/deck1/${deck[4]}.png`;
  document.querySelector(cardGame["cardPlacement"][4]).appendChild(cardFive);

  let cardSix = document.createElement("img");
  cardSix.src = `images/cards/deck1/${deck[5]}.png`;
  document.querySelector(cardGame["cardPlacement"][5]).appendChild(cardSix);

  let cardSeven = document.createElement("img");
  cardSeven.src = `images/cards/deck1/${deck[6]}.png`;
  document.querySelector(cardGame["cardPlacement"][6]).appendChild(cardSeven);

  let cardEight = document.createElement("img");
  cardEight.src = `images/cards/deck1/${deck[7]}.png`;
  document.querySelector(cardGame["cardPlacement"][7]).appendChild(cardEight);

  let cardNine = document.createElement("img");
  cardNine.src = `images/cards/deck1/${deck[8]}.png`;
  document.querySelector(cardGame["cardPlacement"][8]).appendChild(cardNine);

  let cardTen = document.createElement("img");
  cardTen.src = `images/cards/deck1/${deck[9]}.png`;
  document.querySelector(cardGame["cardPlacement"][9]).appendChild(cardTen);
}

//pick up fuction

let usableDeck = deck.slice(10);

console.log(usableDeck);

let button = document.querySelector("#pick-up");

function takeCard() {
  let randomIndex = Math.floor(Math.random() * 94);
  button.removeEventListener("click", takeCard);
  let cardImage = document.createElement("img");
  cardImage.src = `images/cards/deck1/${usableDeck[randomIndex]}.png`;
  let posRandomIndex = Math.floor(Math.random() * 20);
  document
    .querySelector(cardGame["addCardPlacement"][posRandomIndex])
    .appendChild(cardImage);
};

button.addEventListener("click", takeCard);

document
  .querySelector(cardGame["addCardPlacement"][31])
  .addEventListener("drop", wastePileDrop);

function wastePileDrop() {
  if ($("#wastepile").is(":empty")) {
  } else {
    button.addEventListener("click", takeCard);
  }
};
