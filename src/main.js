'use strict';
import BlackJack from './blackjack.js';

const playBtnBjLucky = document.querySelector('.playbtn');
const mainField = document.querySelector('.mainField');
const subGameSelectView = document.querySelector('.subGameSelectView');




playBtnBjLucky.addEventListener('click', () => {
    console.log('btn');
    console.log(mainField);

    fieldMake('blackjack BJlucky');

    // playField.setAttribute('class', 'className');
    // gameField.appendChild(playField);

});

mainField.addEventListener('click', (event) => {
    const target = event.target;

    if (target.matches('.startBtn')) {
        console.log('target');
        start();
    }
});

function fieldMake(className) {
    const playField = document.createElement('div');
    const playControlField = document.createElement('div');
    const chipControlField = document.createElement('div');
    //const startBtn = document.createElement('button');

    
    const x = subGameSelectView.clientLeft+30;
    const y = mainField.clientHeight -100 ;
    
    playField.setAttribute('class', 'playField');
    chipControlField.setAttribute('class', 'chipControlField');
    playControlField.setAttribute('class', 'playControlField');
    
    const startBtn = document.createElement('div');
    startBtn.setAttribute('class', 'ctlBtn startBtn');
    startBtn.innerHTML = '<img class="startBtn" src="/table_games/img/spadebtn.png" width="100" height="100">';
    
    
    subGameSelectView.style.visibility = 'hidden';

    playField.style.position = 'absolute';
    // playField.style.left = `${x}px`;
    // playField.style.top = `${y}px`;
    //mainField.style.backgroundColor = "#006400";
    chipControlField.style.position = 'absolute';
    playControlField.style.position = 'absolute';
    
    //playControlField.style.left = `${x}px`;
    chipControlField.style.bottom = `50px`;
    playControlField.style.bottom = `0px`;
    

    startBtn.style.position = 'absolute';
    startBtn.style.left = `44%`;
    startBtn.style.bottom = `40%`;
    //startBtn.innerHTML = 'start';

    mainField.appendChild(playField);
    mainField.appendChild(chipControlField);
    mainField.appendChild(playControlField);
    
    mainField.removeChild(subGameSelectView);
    playField.appendChild(startBtn);
}



function start() {
    console.log('game started...');
    const blackjack = new BlackJack();
    //playControlField.removeChild(startBtn);
    
/*
    const item = document.createElement('img');
    item.setAttribute('class', 'deck');
    item.setAttribute('src', card.back);

    const item2 = document.createElement('img');
    item2.setAttribute('class', 'deck');
    item2.setAttribute('src', card.SnA);

    item.style.position = 'absolute';
    item.style.left = `10px`;
    item.style.top = `10px`;

    item2.style.position = 'absolute';
    item2.style.left = `20px`;
    item2.style.top = `20px`;

    mainField.appendChild(item);
    mainField.appendChild(item2);
    //mainField.appendChild(img2);
*/
    
    

}