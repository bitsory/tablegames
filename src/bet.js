'use strict';

export default class Bet {
        
    constructor() {
        
        this.playControlField = document.querySelector('.playControlField');
        this.showBalance = document.createElement('span');
        this.showMainBet = document.createElement('span');
        this.showSideBet = document.createElement('span');
        this.showWinning = document.createElement('span');
        
        this.showBalance.setAttribute('class', 'balance');
        this.showMainBet.setAttribute('class', 'bet mainBet');
        this.showSideBet.setAttribute('class', 'bet sideBet');
        this.showWinning.setAttribute('class', 'winning');
        this.playControlField.appendChild(this.showBalance);
        this.playControlField.appendChild(this.showMainBet); 
        this.playControlField.appendChild(this.showSideBet); 
        this.playControlField.appendChild(this.showWinning);  
        
        //this.chipControlField.addEventListener('click', this.test);
        
    }


    textUp(x, bet, index, name) {
        
        this.playField = document.querySelector('.playField');
        name = document.createElement('span');        
        name.setAttribute('class', `textUp ${index}`);

        switch(index) {
            case 'win' : {
                name.innerHTML = `+$${bet}`;
                break;
            } case 'lose' : {
                name.innerHTML = `-$${bet}`;
                break;
            } case 'tie' : {
                name.innerHTML = `PUSH`;
                break;
            } case 'blackjack' : {
                name.innerHTML = `+$${bet*1.5}`;
                break;
            }
        }
        
        name.style.position = 'absolute';
        name.style.left = `${x}%`;
        name.style.bottom = '180px';
        this.playField.appendChild(name);

        let start = Date.now();

        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
            //console.log(`timepaseed : ${timePassed}`);

            name.style.bottom =  (timePassed / 10 + 195) /10 + 14+ '%'; // digit : as fast as low digit
            

            if (timePassed > 600) { // digit : duration
                clearInterval(timer);
                //this.playField.removeChild(name);
                
            }
        }, 1); 
    }


    modifyBalance(balance, mainbet, sidebet, winning) {
           
        this.showbalance = document.querySelector('.balance');
        this.showbalance.innerHTML = `Balance : $${balance}`;
        this.showMainbet = document.querySelector('.mainBet');
        this.showMainbet.innerHTML = `MainBet : $${mainbet}`;
        this.showSidebet = document.querySelector('.sideBet');
        this.showSidebet.innerHTML = `SideBet : $${sidebet}`;
        this.showWinning = document.querySelector('.winning');
        this.showWinning.innerHTML = `Win : $${winning}`;
        
    }

    animateBalance = (start, end, duration) => {
        if (start === end) return;
        var range = end - start;
        var current = start;
        var increment = end > start? 1 : -1;
        var stepTime = Math.abs(Math.floor(duration / range));
              
        let balance = document.querySelector('.balance');
        var timer = setInterval(function() {
            if (end - current > 1000) {
                current += 100;
                
            } else if (end - current > 500) {
                current += 10;
                
            } else {           
                current += increment;
                
            }
            balance.innerHTML = `Balance : $${current}`;
            if (current == end) {
                clearInterval(timer);
            } 
            
        }, stepTime);
    }
    
}


