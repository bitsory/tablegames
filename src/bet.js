'use strict';

export default class Bet {
    balance = 1000;
    bet = 0;

    constructor() {
        //this.balance = 1000;
        this.chipControlField = document.querySelector('.chipControlField');
        this.showBalance = document.createElement('span');
        this.showBet = document.createElement('span');
        
        this.showBalance.setAttribute('class', 'balance');
        this.showBet.setAttribute('class', 'bet');
        this.chipControlField.appendChild(this.showBalance);
        this.chipControlField.appendChild(this.showBet);   
        this.showBalance.innerHTML = `Balance : $${this.balance}`;
        this.showBet.innerHTML = `Bet : $${this.bet}`; 
        
    }

    setBalance(bet) {
        this.balance = this.balance - bet;
    }

    setBet(bet) {
        this.bet = this.bet + bet;

    }

    modifyBalance(balance, bet) {
        this.showbalance = document.querySelector('.balance');
        this.showbalance.innerHTML = `Balance : $${balance}`;
        this.showbet = document.querySelector('.bet');
        this.showbet.innerHTML = `Bet : $${bet}`;
        console.log("modify bal");
    }

    blackjack(bet) {
        this.balance = this.balance + (bet * 2.5) ;
        console.log(`chips : blackjack ${this.balance}`);
        this.modifyBalance(this.balance, 0);
        

        //animation test code
        this.chipControlField = document.querySelector('.chipControlField');
        this.test = document.createElement('span');
        this.test.setAttribute('class', 'moneyAnimation blackjack');
        //this.test.src = "/table_games/img/deck/back.png";
        this.test.innerHTML = `+$${this.bet*2.5}`;
        this.test.style.position = 'absolute';
        this.test.style.left = `63%`;
        this.test.style.bottom = `30%`;
        this.chipControlField.appendChild(this.test);

        let start = Date.now();

        let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        this.test.style.bottom = timePassed / 20 + 'px'; // digit : as fast as low digit
        //this.test.style.left = timePassed / 2 + 'px';

        if (timePassed > 700) { // digit : duration
            clearInterval(timer);
            this.chipControlField.removeChild(this.test);
            }
        }, 1); // digit : as slow as smooth
        this.bet = 0;
        
    }

    win(bet) {
        this.balance = this.balance + (bet * 2) ;
        console.log(`chips : win ${this.balance}`);
        this.modifyBalance(this.balance, 0);
         
        
        //animation test code
        this.chipControlField = document.querySelector('.chipControlField');
        this.test = document.createElement('span');
        this.test.setAttribute('class', 'moneyAnimation win');
        //this.test.src = "/table_games/img/deck/back.png";
        this.test.innerHTML = `+$${this.bet*2}`;
        this.test.style.position = 'absolute';
        this.test.style.left = `63%`;
        this.test.style.bottom = `30%`;
        this.chipControlField.appendChild(this.test);

        let start = Date.now();

        let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        this.test.style.bottom = timePassed / 20 + 'px'; // digit : as fast as low digit
        //this.test.style.left = timePassed / 2 + 'px';

        if (timePassed > 700) { // digit : duration
            clearInterval(timer);
            this.chipControlField.removeChild(this.test);
            }
        }, 1); // digit : as slow as smooth
        this.bet = 0;
    }

    tie(bet) {
        this.balance = this.balance + bet ;
        this.modifyBalance(this.balance, 0);
        

        //animation test code
        this.chipControlField = document.querySelector('.chipControlField');
        this.test = document.createElement('span');
        this.test.setAttribute('class', 'moneyAnimation tie');
        //this.test.src = "/table_games/img/deck/back.png";
        this.test.innerHTML = `+${this.bet}`;
        this.test.style.position = 'absolute';
        this.test.style.left = `63%`;
        this.test.style.bottom = `30%`;
        this.chipControlField.appendChild(this.test);

        let start = Date.now();

        let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        this.test.style.bottom = timePassed / 20 + 'px'; // digit : as fast as low digit
        //this.test.style.left = timePassed / 2 + 'px';

        if (timePassed > 700) { // digit : duration
            clearInterval(timer);
            this.chipControlField.removeChild(this.test);
            }
        }, 1); // digit : as slow as smooth
        this.bet = 0;
    }    

    lose() {
        this.balance = this.balance;
        console.log(`chips : lose ${this.balance}`);
        this.modifyBalance(this.balance, 0);
               

        //animation test code
        this.chipControlField = document.querySelector('.chipControlField');
        this.test = document.createElement('span');
        this.test.setAttribute('class', 'moneyAnimation lose');
        //this.test.src = "/table_games/img/deck/back.png";
        this.test.innerHTML = `-$${this.bet}`;
        this.test.style.position = 'absolute';
        this.test.style.left = `63%`;
        this.test.style.bottom = `30%`;
        this.chipControlField.appendChild(this.test);

        let start = Date.now();

        let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        this.test.style.bottom = timePassed / 20 + 'px'; // digit : as fast as low digit
        //this.test.style.left = timePassed / 2 + 'px';

        if (timePassed > 700) { // digit : duration
            clearInterval(timer);
            this.chipControlField.removeChild(this.test);
            }
        }, 1); // digit : as slow as smooth
        this.bet = 0;
    }

}