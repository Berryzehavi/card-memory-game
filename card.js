var errors = 0;
var cardList = [
  "pics/tree1.png",
  "pics/tree2.png",
  "pics/tree3.png",
  "pics/tree4.png",
  "pics/tree5.png",
  "pics/tree6.png",
  "pics/tree7.png",
  "pics/tree8.png",
  "pics/tree9.png",
  "pics/tree10.png",
];

var cardSet;
var board = [];
var rows = 4;
var colums = 5;

var card1Selected;
var card2Selected;

window.onload = function () {
  shuffleCard();
  startGame();
};

function shuffleCard() {
  cardSet = cardList.concat(cardList);
  console.log(cardSet);
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
  console.log(cardSet);
}

function startGame() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < colums; j++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      let card = document.createElement("img");
      card.id = i.toString() + "-" + j.toString();
      card.src = "pics/back.png";
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  console.log(board);
  setTimeout(hideCards, 1000);
}

function hideCards() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums; j++) {
      let card = document.getElementById(i.toString() + "-" + j.toString());
      card.src = "pics/back.png";
    }
  }
}

function selectCard() {
  if (this.src.includes("back")) {
    if (!card1Selected) {
      card1Selected = this;

      let coords = card1Selected.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Selected.src = board[r][c];
    } else if (!card2Selected && this !== card1Selected) {
      card2Selected = this;

      let coords = card2Selected.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Selected.src = board[r][c];
      setTimeout(update, 1000);
    }
  }
}

function update() {
  // if cards aren't the same, flip both back
  if (card1Selected.src != card2Selected.src) {
    card1Selected.src = "back.jpg";
    card2Selected.src = "back.jpg";
    errors += 1;
    document.getElementById("errors").innerText = errors;
  }

  card1Selected = null;
  card2Selected = null;
}
