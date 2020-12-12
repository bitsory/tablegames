'use strict';
// import Chips from './chips.js';

export default class BJLucky {

    mainBet = 0;
    BJLuckyMainBet = 0;
    BJLuckySideBet = 0;

    constructor() {
        console.log("BJ lucky initialized...");

        this.playField = document.querySelector('.playField');
        
        this.mainbet = document.createElement('input');
        this.mainbet.setAttribute('class', 'BJbet BJmainbet');
        this.mainbet.type = "image";
        this.mainbet.src = '/table_games/img/mainbet.png';
        this.mainbet.style.position = 'absolute';
        this.mainbet.style.left = `47%`;
        this.mainbet.style.bottom = `25%`;

        this.sidebet = document.createElement('input');
        this.sidebet.setAttribute('class', 'BJbet BJsidebet');
        this.sidebet.type = "image";
        this.sidebet.src = '/table_games/img/sidebet_lucky.png';
        this.sidebet.style.position = 'absolute';
        this.sidebet.style.left = `55%`;
        this.sidebet.style.bottom = `35%`;
        
        this.playField.appendChild(this.mainbet);
        this.playField.appendChild(this.sidebet);

        this.mainbet.addEventListener('click', this.onMainbet);
        this.sidebet.addEventListener('click', this.onSidebet);
    

    }

    setMainBet(item) {
        
        this.mainBet = item;
    }

    setClickListener = (click) => {
        this.onClickItem = click;
    }
    


    onMainbet = (event) => {

        console.log("main bet");
        const target = event.target;
        const chipControlField = document.querySelector('.chipControlField');
        const chipBtn25 = document.querySelector('.chipBtn25');
        const chipBtn100 = document.querySelector('.chipBtn100');

        //this.BJLuckyMainBet = this.BJLuckyMainBet + this.bet;
        console.log(`bjlucky : ${this.BJLuckyMainBet}`);

        if (target.matches('.BJmainbet')) {
            this.onClickItem && this.onClickItem(this.mainBet);
            //this.onClickItem && this.onClickItem(this.bet);
        }
        // if (this.bet === 25) {
            
        //     chipBtn25.style.width = '55px';
        //     chipBtn25.style.height = '55px';
        //     chipBtn25.style.outline = 'solid yellow 2px';
        // }

        // else if (this.bet === 100) {
            
        //     chipBtn100.style.width = '55px';
        //     chipBtn100.style.height = '55px';
        //     chipBtn100.style.outline = 'solid yellow 2px';
        // } else {
        //     chipBtn25.style.width = '50px';
        //     chipBtn25.style.height = '50px';
        //     chipBtn25.style.outline = 'none';

        //     chipBtn100.style.width = '50px';
        //     chipBtn100.style.height = '50px';
        //     chipBtn100.style.outline = 'none';
        // }

            
        
    }

    // onSidebet() {

    // }


}