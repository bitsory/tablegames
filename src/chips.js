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
        this.rebetBtn = document.createElement('input');
        this.resetBetBtn = document.createElement('input');
        this.configBtn = document.createElement('input');
       
        this.setChipButtons(this.chipBtn1, "chipBtn chipBtn1", "/table_games/img/chips/chip_one.png", 0);
        this.setChipButtons(this.chipBtn5, "chipBtn chipBtn5", "/table_games/img/chips/chip_five.png", 10);
        this.setChipButtons(this.chipBtn25, "chipBtn chipBtn25", "/table_games/img/chips/chip_quater.png", 20);
        this.setChipButtons(this.chipBtn100, "chipBtn chipBtn100", "/table_games/img/chips/chip_hundred.png", 30);
        this.setChipButtons(this.rebetBtn, "chipBtn rebetBtn", "/table_games/img/chips/rebet.png", 60);
        this.setChipButtons(this.resetBetBtn, "chipBtn resetBetBtn", "/table_games/img/chips/reset.png", 70);
        this.setChipButtons(this.configBtn, "chipBtn configBtn", "/table_games/img/chips/config.png", 80);
        this.chipControlField.addEventListener('click', this.onChipClick);
    }

    setChipButtons(name, attribute, url, posx) {
        name.setAttribute('class', attribute);
        name.type = "image";
        name.src = url;
        name.style.position = 'absolute';
        name.style.left = `${posx}%`
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
            this.onClickItem && this.onClickItem(1);
            //console.log(this.onClickItem);
        } else if (target.matches('.chipBtn5')) {
            this.onClickItem && this.onClickItem(5);
        } else if (target.matches('.chipBtn25')) {
            this.onClickItem && this.onClickItem(25);
        } else if (target.matches('.chipBtn100')) {
            this.onClickItem && this.onClickItem(100);
        } else if (target.matches('.rebetBtn')) {
            console.log("chips : rebet");
            this.onClickItem && this.onClickItem('rebet');                        
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

    offRebet() {        
        //const resetBet = document.querySelector('.rebetBtn');
        this.rebetBet.disabled = true;
        console.log("offReset");
    }

    onRebet() {        
        //const resetBet = document.querySelector('.resetBetBtn');
        this.rebetBet.disabled = false;
        console.log("onReset");
    }

    
}