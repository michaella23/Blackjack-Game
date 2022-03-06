let deckId
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
const play = document.getElementById("play")
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let placeholder = document.querySelector(".placeholder")
const cardBtn = document.getElementById("card-button")
const hitBtn = document.getElementById("hit-me")

cardBtn.disabled = true
hitBtn.disabled = true

cardBtn.addEventListener("click", newCards)
hitBtn.addEventListener("click", drawCard)

function startGame() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
        })
    messageEl.style.visibility = "visible"
    messageEl.textContent = "Alright!"
    play.style.visibility = "hidden"
    sumEl.textContent = "Sum:"
    cardBtn.disabled = false
    isAlive = true
    cardsEl.innerHTML = `
            <div class="placeholder"></div>
            <div class="placeholder"></div>
    `
}

function newCards() {
     fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsEl.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card">
            `
            cardsEl.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card">
            `
        for (let i=0; i < data.cards.length; i++) {
         if (data.cards[i].value == "JACK" || data.cards[i].value == "QUEEN" || data.cards[i].value == "KING") {
            data.cards[i].value = 10
            } else if (data.cards[i].value == "ACE") {
            data.cards[i].value = 11
            } else {
            data.cards[i].value = parseInt(data.cards[i].value)
            } 
        let firstCard = data.cards[0].value
        let secondCard = data.cards[1].value
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        sumEl.textContent = "Sum: " + sum
        if (sum < 21) {
            message = "Do you want to draw a new card?"
            cardsEl.innerHTML += `<div class="placeholder"></div>` 
        } else if (sum === 21) {
            message = "You've got Blackjack!"
            hasBlackJack = true
            
        } else {
            message = "You're out of the game!"
            isAlive = false 
        }
        messageEl.textContent = message
        play.style.visibility = "visible"
        play.textContent = "Start over?"
        cardBtn.disabled = true
        hitBtn.disabled = false
        }
    })

}

function drawCard() {
    isAlive = true
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=1`)
            .then(res => res.json())
            .then(data => {
                cardsEl.children[cards.length].innerHTML = `
                <img src=${data.cards[0].image} class="card">
                `
            for (let i=0; i < data.cards.length; i++) {
                if (data.cards[i].value == "JACK" || data.cards[i].value == "QUEEN" || data.cards[i].value     == "KING") {
                data.cards[i].value = 10
                } else if (data.cards[i].value == "ACE") {
                data.cards[i].value = 11
                } else {
                data.cards[i].value = parseInt(data.cards[i].value)
                } 
            let newCard = data.cards[0].value
            cards.push(newCard)
            sum += newCard
            sumEl.textContent = "Sum: " + sum
            if (sum < 21) {
                message = "Do you want to draw a new card?"
                cardsEl.innerHTML += `<div class="placeholder"></div>` 
            } else if (sum === 21) {
                message = "You've got Blackjack!"
                hasBlackJack = true
                hitBtn.disabled = true
            } else {
                message = "You're out of the game!"
                isAlive = false
                hitBtn.disabled = true
            }
            messageEl.textContent = message
            play.style.visibility = "visible"
            play.textContent = "Start over?"
            }      
    })
}
