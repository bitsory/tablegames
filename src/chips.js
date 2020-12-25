'use strict';

export default class Chips {
    
    balance = 1000;
    bet = 0;
    chip1 = false;

    tmp = 0;

    constructor() {
        console.log("chips initialized...");

        //this.mainField = document.querySelector('.mainField');
        this.chipControlField = document.querySelector('.chipControlField');

        this.chipBtn1 = document.createElement('input');
        this.chipBtn5 = document.createElement('input');
        this.chipBtn25 = document.createElement('input');
        this.chipBtn100 = document.createElement('input');
        this.resetBetBtn = document.createElement('input');
        // this.showBalance = document.createElement('span');
        // this.showBet = document.createElement('span');
        
        // this.showBalance.setAttribute('class', 'balance');
        // this.showBet.setAttribute('class', 'bet');
        
       

        this.setChipButtons(this.chipBtn1, "chipBtn chipBtn1", "/table_games/img/chips/chip_one.png");
        this.setChipButtons(this.chipBtn5, "chipBtn chipBtn5", "/table_games/img/chips/chip_five.png");
        this.setChipButtons(this.chipBtn25, "chipBtn chipBtn25", "/table_games/img/chips/chip_quater.png");
        this.setChipButtons(this.chipBtn100, "chipBtn chipBtn100", "/table_games/img/chips/chip_hundred.png");
        this.setChipButtons(this.resetBetBtn, "resetBetBtn", "/table_games/img/reset.png");
        
        this.chipControlField.addEventListener('click', this.onChipClick);
    }

    setChipButtons(name, attribute, url) {
        name.setAttribute('class', attribute);
        name.type = "image";
        name.src = url;
        this.chipControlField.appendChild(name);
    }

    setClickListener = function(click) { 
        console.log("chips: setclicklistener before");       
        this.onClickItem = click;        
        console.log("chips: setclicklistener after")
    }


    onChipClick = (event) => {
        console.log("onclick");
        const target = event.target;
        console.log(target);
        if (target.matches('.chipBtn1')) {
            // this.balance = this.balance - 5;
            // this.bet = this.bet + 5;
            // this.modifyBalance(this.balance, this.bet);
            this.onClickItem && this.onClickItem(1);
        } else if (target.matches('.chipBtn5')) {
            // this.balance = this.balance - 5;
            // this.bet = this.bet + 5;
            // this.modifyBalance(this.balance, this.bet);
            this.onClickItem && this.onClickItem(5);
        } else if (target.matches('.chipBtn25')) {
            // this.balance = this.balance - 25;
            // this.bet = this.bet + 25;
            // this.modifyBalance(this.balance, this.bet);
            this.onClickItem && this.onClickItem(25);
        } else if (target.matches('.chipBtn100')) {
            // this.balance = this.balance - 100;
            // this.bet = this.bet + 100;
            // this.modifyBalance(this.balance, this.bet);
            this.onClickItem && this.onClickItem(100);
            
        } else if (target.matches('.resetBetBtn')) {
            console.log("chips : reset");
            this.onClickItem && this.onClickItem('reset');            
        }
    }

    offReset() {        
        const resetBet = document.querySelector('.resetBetBtn');
        resetBet.disabled = true;
        console.log("offReset");
    }

    onReset() {        
        const resetBet = document.querySelector('.resetBetBtn');
        resetBet.disabled = false;
        console.log("onReset");
    }

    offChip() {
        const chip = document.querySelectorAll('.chipBtn');        
        chip.forEach ((item) => item.disabled = true);        
    }

    onChip() {
        const chip = document.querySelectorAll('.chipBtn');        
        chip.forEach ((item) => item.disabled = false);        
    }

    
}