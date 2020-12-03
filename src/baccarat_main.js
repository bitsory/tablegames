'use strict';
import Baccarat from './baccarat.js';

const playBtnBCDragon = document.querySelector('.playbtn');
const mainField = document.querySelector('.mainField');
const subGameSelectView = document.querySelector('.subGameSelectView');

playBtnBCDragon.addEventListener('click', () => {
    console.log('baccarat btn');
    console.log(mainField);

    fieldMake('baccarat dragon');

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
    const settingBtn = document.createElement('div');
    settingBtn.setAttribute('class', 'settingBtn');
    settingBtn.innerHTML = '<i class="fas fa-cog fa-3x" onClick="test()"></i>'
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

    settingBtn.style.position = 'absolute';
    settingBtn.style.right = `3%`;
    settingBtn.style.top = `10%`;

    mainField.appendChild(playField);
    mainField.appendChild(chipControlField);
    mainField.appendChild(playControlField);
    
    mainField.removeChild(subGameSelectView);
    playField.appendChild(startBtn);
    playField.appendChild(settingBtn);
}

function start() {
    console.log('baccarat game started...');
    const baccarat = new Baccarat();

}