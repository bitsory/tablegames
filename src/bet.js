'use strict';

export default class Bet {
        
    constructor() {
        
        this.chipControlField = document.querySelector('.chipControlField');
        this.showBalance = document.createElement('span');
        this.showBet = document.createElement('span');
        this.showWinning = document.createElement('span');
        
        this.showBalance.setAttribute('class', 'balance');
        this.showBet.setAttribute('class', 'bet');
        this.showWinning.setAttribute('class', 'winning');
        this.chipControlField.appendChild(this.showBalance);
        this.chipControlField.appendChild(this.showBet); 
        this.chipControlField.appendChild(this.showWinning);  
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


    modifyBalance(balance, bet, winning, index) {
           
        this.showbalance = document.querySelector('.balance');
        this.showbalance.innerHTML = `Balance : $${balance}`;
        this.showbet = document.querySelector('.bet');
        this.showbet.innerHTML = `Bet : $${bet}`;
        this.showWinning = document.querySelector('.winning');
        this.showWinning.innerHTML = `Win : $${winning}`;
        
    }

    animateBalance(start, end, duration) {
        if (start === end) return;
        var range = end - start;
        var current = start;
        var increment = end > start? 1 : -1;
        var stepTime = Math.abs(Math.floor(duration / range));
        
        let balance = document.querySelector('.balance');
        var timer = setInterval(function() {
            current += increment;
            balance.innerHTML = `Balance : $${current}`;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    
}


