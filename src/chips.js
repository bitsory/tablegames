'use strict';

export default class Chips {
   
    betSpot = '';

    constructor() {
        console.log("chips initialized...");
       
        this.chipControlField = document.querySelector('.chipControlField');

        this.chipBtn1 = document.createElement('input');
        this.chipBtn5 = document.createElement('input');
        this.chipBtn25 = document.createElement('input');
        this.chipBtn100 = document.createElement('input');
        this.rebetBtn = document.createElement('input');
        this.resetBetBtn = document.createElement('input');
        this.shuffleBtn = document.createElement('input');
        this.configBtn = document.createElement('input');       
        
        this.setChipButtons(this.chipBtn1, "chipBtn chipBtn1", "img/chips/chip_one.png", 0);
        this.setChipButtons(this.chipBtn5, "chipBtn chipBtn5", "img/chips/chip_five.png", 10);
        this.setChipButtons(this.chipBtn25, "chipBtn chipBtn25", "img/chips/chip_quater.png", 20);
        this.setChipButtons(this.chipBtn100, "chipBtn chipBtn100", "img/chips/chip_hundred.png", 30);
        this.setChipButtons(this.rebetBtn, "chipBtn rebetBtn", "img/chips/rebet.png", 60);
        this.setChipButtons(this.resetBetBtn, "chipBtn resetBetBtn", "img/chips/reset.png", 70);
        this.setChipButtons(this.shuffleBtn, "chipBtn shuffleBtn", "img/chips/shuffle.png", 80);
        this.setChipButtons(this.configBtn, "chipBtn configBtn", "img/chips/config.png", 90);
        
        this.chipControlField.addEventListener('click', this.onClickChip);
    }

    setChipButtons(name, attribute, url, posx) {
        name.setAttribute('class', attribute);
        name.type = "image";
        name.src = url;
        name.style.position = 'absolute';
        name.style.left = `${posx}%`
        this.chipControlField.appendChild(name);
    }

    setChipClickListener = function(click) { 
        console.log("chips: setclicklistener before");       
        this.onClickItem = click;        
        console.log("chips: setclicklistener after")
    }

    setBetSpot = (item) => {        
        this.betSpot = item;        
    }


    onClickChip = (event) => {        
        const target = event.target;        
        if (target.matches('.chipBtn1')) {
            this.onClickItem && this.onClickItem(1);
            this.chipBtnTransform(this.chipBtn1);            
        } else if (target.matches('.chipBtn5')) {
            this.onClickItem && this.onClickItem(5);
            this.chipBtnTransform(this.chipBtn5);
        } else if (target.matches('.chipBtn25')) {
            this.onClickItem && this.onClickItem(25);
            this.chipBtnTransform(this.chipBtn25);
        } else if (target.matches('.chipBtn100')) {
            this.onClickItem && this.onClickItem(100);  
            this.chipBtnTransform(this.chipBtn100);          
        } else if (target.matches('.rebetBtn')) {            
            this.onClickItem && this.onClickItem('rebet');
            this.chipBtnTransform(this.rebetBtn);                        
        } else if (target.matches('.resetBetBtn')) {            
            this.onClickItem && this.onClickItem('reset');    
            this.chipBtnTransform(this.resetBetBtn);         
        } else if (target.matches('.shuffleBtn')) {            
            this.onClickItem && this.onClickItem('shuffle');    
            this.chipBtnTransform(this.shuffleBtn);         
        } else if (target.matches('.configBtn')) {            
            this.onClickItem && this.onClickItem('config');    
            this.chipBtnTransform(this.configBtn);
        }
    }

    chipBtnTransform(index) {
        setTimeout(() => {
            index.style.transform = "";
          }, 120);          
        index.style.transform = "rotate(180deg)";
    }

    offReset() {        
        //const resetBet = document.querySelector('.resetBetBtn');
        this.resetBet.disabled = true;
        console.log("offReset");
    }

    onReset() {        
        //const resetBet = document.querySelector('.resetBetBtn');
        this.resetBet.disabled = false;
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