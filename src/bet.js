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
        this.bet = 0;
        
    }

    win(bet) {
        this.balance = this.balance + (bet * 2) ;
        console.log(`chips : win ${this.balance}`);
        this.modifyBalance(this.balance, 0);
        this.bet = 0;        
    }

    tie(bet) {
        this.balance = this.balance + bet ;
        this.modifyBalance(this.balance, 0);
        this.bet = 0;
    }    

    lose() {
        this.balance = this.balance;
        console.log(`chips : lose ${this.balance}`);
        this.modifyBalance(this.balance, 0);
        this.bet = 0;        
    }

}