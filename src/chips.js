'use strict';

export default class Chips {

    // chip = {
    //     one : '/table_games/img/chip_one.png',
    //     five : '/table_games/img/chip_five.png',
    //     quater : '/table_games/img/chip_quater.png',
    //     hundred : '/table_games/img/chip_hundred.png'
    // };
    balance = 1000;
    bet = 0;

    constructor() {
        console.log("chips initialized...");

        //this.mainField = document.querySelector('.mainField');
        this.chipControlField = document.querySelector('.chipControlField');

        this.chipBtn1 = document.createElement('div');
        this.chipBtn5 = document.createElement('div');
        this.chipBtn25 = document.createElement('div');
        this.chipBtn100 = document.createElement('div');
        this.resetBetBtn = document.createElement('div');
        this.showBalance = document.createElement('span');
        this.showBet = document.createElement('span');
        
        this.showBalance.setAttribute('class', 'balance');
        this.showBet.setAttribute('class', 'bet');
        
        this.chipBtn1.innerHTML = '<img class="chipBtn" src="/table_games/img/chip_one.png" width="50" height="50">';        
        this.chipBtn5.innerHTML = '<img class="chipBtn" src="/table_games/img/chip_five.png" width="50" height="50">';
        this.chipBtn25.innerHTML = '<img class="chipBtn" src="/table_games/img/chip_quater.png" width="50" height="50">';        
        this.chipBtn100.innerHTML = '<img class="chipBtn" src="/table_games/img/chip_hundred.png" width="50" height="50">';        
        this.resetBetBtn.innerHTML = '<img class="resetBetBtn" src="/table_games/img/reset.png" width="50" height="50">';
        
        //this.balance.innerText = this.balance;
        // this.chipBtn1.style.position = 'absolute';
        // this.chipBtn5.style.position = 'absolute';
        // this.chipBtn25.style.position = 'absolute';
        // this.chipBtn100.style.position = 'absolute';
        
        this.chipControlField.appendChild(this.chipBtn1);
        this.chipControlField.appendChild(this.chipBtn5);
        this.chipControlField.appendChild(this.chipBtn25);
        this.chipControlField.appendChild(this.chipBtn100);
        this.chipControlField.appendChild(this.showBalance);
        this.chipControlField.appendChild(this.showBet);
        this.chipControlField.appendChild(this.resetBetBtn);
        
        this.showBalance.innerHTML = `Balance : $${this.balance}`;
        this.showBet.innerHTML = `Bet : $${this.bet}`;

        // let balance = this.balance;
        // this.modifyBalance(balance);

        this.chipBtn1.addEventListener('click', this.onClick1);
        this.chipBtn5.addEventListener('click', this.onClick2);
        this.chipBtn25.addEventListener('click', this.onClick3);
        this.chipBtn100.addEventListener('click', this.onClick4);
        this.resetBetBtn.addEventListener('click', this.onClickResetBet);


    }


    onClick1 = () => {
        console.log("chips : one");
        this.balance = this.balance - 1;
        this.bet = this.bet + 1;
        this.modifyBalance(this.balance, this.bet);
        
    };
    onClick2 = () => {
        console.log("chips : five");
        this.balance = this.balance - 5;
        this.bet = this.bet + 5;
        this.modifyBalance(this.balance, this.bet);
    };
    onClick3 = () => {
        console.log("chips : quater");
        this.balance = this.balance - 25;
        this.bet = this.bet + 25;
        this.modifyBalance(this.balance, this.bet);
    };
    onClick4 = () => {
        console.log("chips : hundred");
        this.balance = this.balance - 100;
        this.bet = this.bet + 100;
        this.modifyBalance(this.balance, this.bet);
    };

    onClickResetBet = () =>{
        console.log("chips : reset");
        let tmp = this.bet;
        
        this.balance = this.balance + tmp;
        this.bet = this.bet - tmp;
        this.modifyBalance(this.balance, this.bet);
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

    tie() {
        this.balance = this.balance + bet ;
        this.modifyBalance(this.balance, 0);
        this.bet = 0;
    }

    win(bet) {
        console.log(`chips : win bet ${bet}`);
        //let tmp = this.balance;
        this.balance = this.balance + (bet * 2) ;
        console.log(`chips : win ${this.balance}`);
        this.modifyBalance(this.balance, 0);
        this.bet = 0;
        
    }

    lose() {
        this.balance = this.balance;
        console.log(`chips : lose ${this.balance}`);
        this.modifyBalance(this.balance, 0);
        this.bet = 0;
        
    }

    test(test) {
        console.log(test);
    }
}