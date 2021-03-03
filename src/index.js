'use strict';
import Baccarat from './baccarat.js';
import BlackJack from './blackjack.js';

let totalChecked = 0;
const maxCheck = 2;

window.BJdropDown = function() {
    document.getElementById("BJsubgameDropDown").classList.toggle("show");
}

window.BCdropDown = function() {
    document.getElementById("BCsubgameDropDown").classList.toggle("show");
}

window.CRdropDown = function() {
    document.getElementById("CRsubgameDropDown").classList.toggle("show");
}

window.CVdropDown = function() {
    document.getElementById("CVsubgameDropDown").classList.toggle("show");
}
  
  // Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.BJdrop')) {
    let myDropdown = document.getElementById("BJsubgameDropDown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    } 
    if (!e.target.matches('.BCdrop')) {
    let myDropdown = document.getElementById("BCsubgameDropDown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    } 
    if (!e.target.matches('.CRdrop')) {
        let myDropdown = document.getElementById("CRsubgameDropDown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    } 
    if (!e.target.matches('.CVdrop')) {
        let myDropdown = document.getElementById("CVsubgameDropDown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }


}

window.test = function() {
    console.log("dropdown test");
}

window.blackjack = function(subgame) {
    console.log('BJluckylucky game started...');
    //const blackjack = new BlackJack();
    makeField('blackjack', subgame);
}

window.baccarat = (subgame) => {
    console.log("BC BCdragonBonus game started...");
    makeField('baccarat', subgame);
}

// const dropdown = document.querySelector('.dropdown');

// dropdown.addEventListener('click', () => {
//     console.log('dropdown eventlistener');
//     document.getElementById("subgameDropDown").classList.toggle("show");
    

// });

window.makeField = (maingame, subgame1, subgame2) => {
    console.log('field maker initialized...');

    const mainField = document.querySelector('.mainField');
    mainField.innerHTML='';
    const playField = document.createElement('div');
    const insurance = document.createElement('div');
    const playControlField = document.createElement('div');
    const chipControlField = document.createElement('div');
   
    
    playField.setAttribute('class', 'playField');
    insurance.setAttribute('class', 'insurance');
    chipControlField.setAttribute('class', 'chipControlField');
    playControlField.setAttribute('class', 'playControlField');
    
    const startBtn = document.createElement('input');
    const settingBtn = document.createElement('div');
    
    
    settingBtn.setAttribute('class', 'settingBtn');
    settingBtn.innerHTML = '<i class="fas fa-cog fa-3x" onClick="test()"></i>'
    startBtn.setAttribute('class', 'playBtn startBtn animated css');
    startBtn.type = "image";

    switch(maingame) {
        case 'blackjack': {
            startBtn.src = 'img/blackjack/bjstart.png';
            break;
        }
        case 'baccarat': {
            startBtn.src = 'img/baccarat/bcstart.png';
            break;
        }
    }

    
    
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
    startBtn.style.left = `43%`;
    startBtn.style.bottom = `50%`;
    //startBtn.innerHTML = 'start';

    settingBtn.style.position = 'absolute';
    settingBtn.style.right = `3%`;
    settingBtn.style.top = `10%`;

    mainField.appendChild(playField);
    mainField.appendChild(chipControlField);
    mainField.appendChild(playControlField);
    
    playField.appendChild(insurance);

    playField.appendChild(startBtn);
    playField.appendChild(settingBtn);

    startBtn.addEventListener('click', () => {
        if (maingame === 'blackjack') {
            console.log("BJ start");

            const blackjack = new BlackJack(subgame1, subgame2);
        
            // console.log(subgame);
            // switch(subgame) {
            //     case 'lucky': {
            //         console.log("switch");
            //         const blackjackLucky = new BlackJack('BJlucky');
            //         break;
            //     }
            //     case 'BJkings': {
            //         const blackjackKings = new BlackJack('BJkings');
            //         break;
            //     }
            // }
            
        } else if (maingame === 'baccarat') {
            console.log("BC start");
            console.log(subgame);
            switch (subgame) {  
                case 'BCdragonbonus': {
                    const baccaratDragonBonus = new Baccarat();
                    break;
                }
            }
        }
    });
}

// window.BJstart = () => {
//     console.log("BJ start");
    
//     const blackjack = new BlackJack();
// }

window.selectedGameStart = (maingame, subgame1, subgame2) => {
    console.log('field maker initialized...');

    const mainField = document.querySelector('.mainField');
    mainField.innerHTML='';
    const playField = document.createElement('div');
    // const insurance = document.createElement('div');
    
    const chipControlField = document.createElement('div');
    const labelField = document.createElement('div');
    const playControlField = document.createElement('div');
   
    
    playField.setAttribute('class', 'playField');
    // insurance.setAttribute('class', 'insurance');
    chipControlField.setAttribute('class', 'chipControlField');
    labelField.setAttribute('class', 'labelField');
    playControlField.setAttribute('class', 'playControlField');
    playField.style.position = 'absolute';
    // insurance.style.position = 'absolute';
    chipControlField.style.position = 'absolute';
    labelField.style.position = 'absolute';
    playControlField.style.position = 'absolute';
    
    // insurance.style.bottom = `50%`;
    // insurance.style.left = `10%`;
    chipControlField.style.bottom = `50px`;
    labelField.style.bottom = `20px`;
    playControlField.style.bottom = `0px`;
    mainField.appendChild(playField);
    mainField.appendChild(chipControlField);
    mainField.appendChild(labelField);
    mainField.appendChild(playControlField);
    // mainField.appendChild(insurance);

    switch(maingame) {
        case 'blackjack': {
            const blackjack = new BlackJack(subgame1, subgame2);
            break;
        }
        case 'baccarat': {
            startBtn.src = 'img/baccarat/bcstart.png';
            break;
        }
    }

    

}

window.setButtons = (name, attribute, url) => {
    const playField = document.querySelector('.playField');
    name.setAttribute('class', attribute);
    name.type = "image";
    name.src = url;
    playField.appendChild(name);
}


window.bjCheckedValue = () => {

    const query = 'input[name="bjchoice"]:checked';
    const selectedEls = document.querySelectorAll(query);
    let selectedSubgame = [];
    
    selectedEls.forEach((item) => selectedSubgame.push(item.value));
    console.log(selectedSubgame);
    selectedGameStart('blackjack', selectedSubgame);
    //const blackjack = new BlackJack( result[0], result[1]);
    // makeField('blackjack', result[0], result[1]);
}

window.countCheck = (item) => {
    
    console.log(item.value);
    console.log(item.checked);
    if (item.checked) {
        totalChecked += 1;
        
    } else {
        totalChecked -= 1;
    }

    if (totalChecked > maxCheck) {
        alert ("최대 2개 까지만 가능합니다.");
        item.checked = false;
        totalChecked -= 1;
    }
    console.log(totalChecked);
}


