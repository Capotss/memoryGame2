let gameBoard = document.getElementById('gb')
var cards = [
    'golvroger',
    'Ckukktukmass',
    'mrkings',
    'mrqueens',
    'Ryze',
    'Shen',
    'Tyler',
    'zed',
    'golvroger',
    'Ckukktukmass',
    'mrkings',
    'mrqueens',
    'Ryze',
    'Shen',
    'Tyler',
    'zed'
]

let points = 0
let clickedCards = []
let cardIds = []
cards = cards.sort(function () {
    return Math.random() - 0.5;
});
let lockBoard = () => {
    for (let i = 0; i < gameBoard.children.length; i++) {
        document.querySelectorAll('.card')[i].removeAttribute("onclick");
    }

    setTimeout(() => {
        for (let i = 0; i < gameBoard.children.length; i++) {
            document.querySelectorAll('.card')[i].setAttribute("onclick", "flipCard(this)");
        }
    }, 555);
}

let isMatch = (a) => {
    cardIds.push(a.id)
    let imgName = a.firstChild.firstChild.src
    if (clickedCards.length < 2) {
        clickedCards.push(imgName)
    }
    if (clickedCards.length == 2) {
        if (clickedCards[0] == clickedCards[1]) {
            points++
            clickedCards = []
            cardIds = []
        }
        if (clickedCards[0] != clickedCards[1]) {
            lockBoard()
            let card1 = document.getElementById(cardIds[0])
            let card2 = document.getElementById(cardIds[1])
            setTimeout(() => {
                card1.classList.toggle('flip')
                card1.dataset.locked = 'free'
                card2.classList.toggle('flip')
                card2.dataset.locked = 'free'

                cardIds = []
                clickedCards = []
            }, 550);
            console.log(cardIds)
        }
    }
    if (points==8){console.log('Voce venceu')}
    console.log(clickedCards)
}

let flipCard = (a) => {
    // console.log(a)
    if (a.dataset.locked == 'free') {
        a.classList.toggle('flip')
    }
    if (a.dataset.locked == 'free') {
        isMatch(a)
    }
    a.dataset.locked == 'free' ? a.dataset.locked = 'locked' : console.log('Você já clicou nessa carta')
}



let createCards = () => {
    for (let i = 0; i < 16; i++) {
        gameBoard.innerHTML += `<div id="card${i}" class="card" data-locked='free' onclick="flipCard(this)"><div class="front"><img src='./assets/Token-${cards[i]}.png' class="img"></img></div><div class="back">◐</div></div>`
    }
}

createCards()