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
        
       

        this.setChipButtons(this.chipBtn1, "chipBtn chipBtn1", "/table_games/img/chip_one.png");
        this.setChipButtons(this.chipBtn5, "chipBtn chipBtn5", "/table_games/img/chip_five.png");
        this.setChipButtons(this.chipBtn25, "chipBtn chipBtn25", "/table_games/img/chip_quater.png");
        this.setChipButtons(this.chipBtn100, "chipBtn chipBtn100", "/table_games/img/chip_hundred.png");
        // this.chipControlField.appendChild(this.showBalance);
        // this.chipControlField.appendChild(this.showBet);       
        // this.showBalance.innerHTML = `Balance : $${this.balance}`;
        // this.showBet.innerHTML = `Bet : $${this.bet}`;        
        this.setChipButtons(this.resetBetBtn, "resetBetBtn", "/table_games/img/reset.png");
        
        // this.chipBtn1.addEventListener('click', this.onChipBtn1);
        // this.chipBtn5.addEventListener('click', this.onChipBtn5);
        // this.chipBtn25.addEventListener('click', this.onChipBtn25);
        //this.chipBtn100.addEventListener('click', this.onChipBtn100);
        //this.resetBetBtn.addEventListener('click', this.onClickResetBet);
        this.chipControlField.addEventListener('click', this.onClick);
    }

    setChipButtons(name, attribute, url) {
        name.setAttribute('class', attribute);
        name.type = "image";
        name.src = url;
        this.chipControlField.appendChild(name);
    }

    setClickListener = (click) => { 
        console.log("chips: setclicklistener before");       
        this.onClickItem = click;        
        console.log("chips: setclicklistener after")
    }


    onClick = (event) => {
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
            
            /*
            let tmp = this.bet;
            this.balance = this.balance + tmp;
            this.bet = this.bet - tmp;
            this.modifyBalance(this.balance, this.bet);
            */
           
            // test code for animation
            this.chipControlField = document.querySelector('.chipControlField');
            this.test = document.createElement('img');
            this.test.setAttribute('class', 'test');
            this.test.src = "/table_games/img/back.png";
            this.test.style.position = 'absolute';
            this.chipControlField.appendChild(this.test);

            let start = Date.now();

            let timer = setInterval(() => {
            let timePassed = Date.now() - start;

            this.test.style.bottom = timePassed / 2 + 'px';
            //this.test.style.left = timePassed / 2 + 'px';

            if (timePassed > 400) {
                clearInterval(timer);
                this.chipControlField.removeChild(this.test);
                }
            }, 20);
        }
    }


    onChipBtn1 = () => {
        console.log("chips : one");
        // this.chipBtn1.style.border = 'solid #0000FF';
        // this.balance = this.balance - 1;
        // this.bet = this.bet + 1;
        // this.modifyBalance(this.balance, this.bet);
        this.chip1 = true;
        
    };
    onChipBtn5 = () => {
        console.log("chips : five");
        // this.chipBtn5.style.border = 'solid #0000FF';
        this.balance = this.balance - 5;
        this.bet = this.bet + 5;
        this.modifyBalance(this.balance, this.bet);
    };
    onChipBtn25 = () => {
        console.log("chips : quater");
        // this.chipBtn25.style.border = 'solid #0000FF';
        this.balance = this.balance - 25;
        this.bet = this.bet + 25;
        this.modifyBalance(this.balance, this.bet);
    };
    onChipBtn100 = (event) => {
        console.log("chips : hundred");
        // this.chipBtn100.style.border = 'solid #0000FF';
        this.balance = this.balance - 100;
        this.bet = this.bet + 100;
        this.modifyBalance(this.balance, this.bet);

        this.tmp = 100;
        console.log(`chips : ${this.tmp}`);
        console.log("onclick");
        const target = event.target;
        console.log(target);
        this.onClickItem && this.onClickItem(this.tmp);
    };

    onClickResetBet = () =>{
        console.log("chips : reset");
        let tmp = this.bet;
        
        this.balance = this.balance + tmp;
        this.bet = this.bet - tmp;
        this.modifyBalance(this.balance, this.bet);

        // test code for animation
        this.chipControlField = document.querySelector('.chipControlField');
        this.test = document.createElement('img');
        this.test.setAttribute('class', 'test');
        this.test.src = "/table_games/img/back.png";
        this.test.style.position = 'absolute';
        this.chipControlField.appendChild(this.test);

        let start = Date.now();

        let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        this.test.style.bottom = timePassed / 2 + 'px';
        //this.test.style.left = timePassed / 2 + 'px';

        if (timePassed > 400) {
            clearInterval(timer);
            this.chipControlField.removeChild(this.test);
        }
      }, 20);
        //
        
    }

    draw(timePassed) {
        resetBetBtn.style.left = timePassed / 5 + 'px';
    }
    /*
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
    */

    

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