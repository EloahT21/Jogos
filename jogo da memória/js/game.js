const audio = document.getElementById('audio');
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const characters = [
  
    'chaengvely',
    'davely',
    'jeongvely',
    'jively',
    'mively',
    'movely',
    'navely',
    'savely',
    'tzuvely',
    'twaice',
];


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';


const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('desabled-card');
        secondCard.firstChild.classList.add('desabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame()

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';


        }, 500);
    }

}

const checkEndGame = () => {
    const desabledCards = document.querySelectorAll('.desabled-card');

    if (desabledCards.length== 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }

}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard == '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();    
    }
    audio.play()

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    duplicateCharacters.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);

    });

}

const starTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    starTimer();
    loadGame();
}

