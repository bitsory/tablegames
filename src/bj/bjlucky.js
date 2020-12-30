'use strict';
// import Chips from './chips.js';

export default class BJLucky {

    bet = 0;
    BJLuckyMainBet = 0;
    BJLuckySideBet = 0;
    betStack = [];
    t = 1;
    

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

        this.mainbet.addEventListener('click', this.onclickMainbet);
        this.sidebet.addEventListener('click', this.onclickSidebet);

        this.testbet = document.createElement('input');
        this.testbet.setAttribute('class', 'BJbet testchip');
        this.testbet.type = "image";
        this.testbet.src = '/table_games/img/chips/testchip1.png';
        this.testbet.style.position = 'absolute';
        this.testbet.style.left = `47%`;
        this.testbet.style.bottom = `25%`;

        this.playField.appendChild(this.testbet);
        
    

    }

    setBJluckyBet(item) {        
        this.bet = item;
        
    }

    setClickListener = function(click) {
        this.onClickItem = click;
    }

    

    onclickMainbet = (event) => {

        console.log("main bet");
        const target = event.target;
        
        
        if (target.matches('.BJmainbet')) {
            
            this.onClickItem && this.onClickItem(this.bet);
            
        }        
    }

    onclickSidebet = (event) => {
        console.log("side Bet");
        const target = event.target;

        if (target.matches('.BJsidebet')) {
            this.onClickItem && this.onClickItem(this.bet);
        }
    }

    setBetStack(bet) {
        let array = ['a', 'b', 'ac'];
        console.log(`array Length : ${array.length}`);

        let betStackLen = this.betStack.length;
        let index = 0;

        console.log(`betstack Length : ${betStackLen}`);
        
        if (betStackLen === 0) {
            console.log("betStack initialized...");
            this.betStack.push(bet);
        } else {

            for (let i = 0 ; i < betStackLen  ; i++) {  /// serch loop
                console.log(`betstack Length : ${betStackLen}`);
                if (bet < this.betStack[i] || bet == this.betStack[i]) {
                    console.log(`setBetStack : i = ${i}`);
                    index = i;
                    break;
                }
            }
            console.log(`setBetStack : index = ${index}`);

            if (index === 0 && betStackLen === 1 && this.betStack[0] < bet ) { 
                console.log("betStack push");
                this.betStack.push(bet)
            } else {
                console.log("betStack splice");
                this.betStack.splice(index, 0 , bet);
            }
            
        }
        

        console.log(this.betStack);
        console.log(betStackLen);

        for (let i = 0 ; i < this.betStack.length  ; i++) {
            //console.log("putTestChip");
            this.putTestChip(this.betStack[i]);
        }

        
    }

    putTestChip(item) {
        let test;

        switch(item) {
            case 1 : {
                test = document.createElement('input');
                test.setAttribute('class', 'BJbet testchip1');
                test.type = "image";
                test.src = '/table_games/img/chips/testchip1.png';
                console.log("testbet1");
                break;
                
            }

            case 5 : {
                test = document.createElement('input');
                test.setAttribute('class', 'BJbet testchip5');
                test.type = "image";
                test.src = '/table_games/img/chips/testchip5.png';
                console.log("testbet5");
                break;
        
            }

            case 25 : {
                test = document.createElement('input');
                test.setAttribute('class', 'BJbet testchip25');
                test.type = "image";
                test.src = '/table_games/img/chips/testchip25.png';
                console.log("testbet25");
                break;
            }

            case 100 : {
                test = document.createElement('input');
                test.setAttribute('class', 'BJbet testchip100');
                test.type = "image";
                test.src = '/table_games/img/chips/testchip100.png';
                console.log("testbet100");
                break;
            }
        }

        test.style.position = 'relative';
        test.style.left = `47%`;
        test.style.bottom = `25+${this.t}%`;

        this.playField.appendChild(test);
        this.t++;

    }






    offBet() {
        this.mainbet.disabled = true;
        this.sidebet.disabled = true;
    }

    onBet() {
        this.mainbet.disabled = false;
        this.sidebet.disabled = false;
    }





}