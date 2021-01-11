'use strict';
// import Chips from './chips.js';

export default class BJLucky {

    MAINBET_STACK_UP_CHIP_POS_X = 49.3;
    MAINBET_STACK_UP_CHIP_POS_Y = 23;
    SIDEBET_STACK_UP_CHIP_POS_X = 56.5;
    SIDEBET_STACK_UP_CHIP_POS_Y = 36;

    bet = 0;
    BJLuckyMainBet = 0;
    BJLuckySideBet = 0;
    //betStack = [];   
    
    heightForStackChip = 0; 

    constructor() {
        console.log("BJ lucky initialized...");

        this.playField = document.querySelector('.playField');
        
        this.mainbetSpot = document.createElement('input');
        this.mainbetSpot.setAttribute('class', 'BJbet BJmainbet');
        this.mainbetSpot.type = "image";
        this.mainbetSpot.src = 'img/mainbet.png';
        this.mainbetSpot.style.position = 'absolute';
        this.mainbetSpot.style.left = `45%`;
        this.mainbetSpot.style.bottom = `22%`;

        this.sidebetSpot = document.createElement('input');
        this.sidebetSpot.setAttribute('class', 'BJbet BJsidebet');
        this.sidebetSpot.type = "image";
        this.sidebetSpot.src = 'img/sidebet_lucky.png';
        this.sidebetSpot.style.position = 'absolute';
        this.sidebetSpot.style.left = `55%`;
        this.sidebetSpot.style.bottom = `35%`;
        
        this.playField.appendChild(this.mainbetSpot);
        this.playField.appendChild(this.sidebetSpot);

        this.mainbetSpot.addEventListener('click', this.onclickMainbet);
        this.sidebetSpot.addEventListener('click', this.onclickSidebet);


    }

    test(a, b, c) {
        console.log(a, b, c);
    }
 
    setBJluckyBet(item) {        
        this.bet = item;        
    }

    setBJluckyMainBet(item) {        
        this.BJLuckyMainBet = item;        
    }

    setBJluckySideBet(item) {        
        this.BJLuckySideBet = item;        
    }

    setMainBetClickListener = function(click) {
        this.onClickMainItem = click;
        //console.log(this.onClickItem);
    }

    setSideBetClickListener = function(click) {
        this.onClickSideItem = click;
        //console.log(this.onClickItem);
    }

    

    onclickMainbet = (event) => {

        console.log("main bet");
        const target = event.target;
        
        
        if (target.matches('.BJmainbet')) {
            
            this.onClickMainItem && this.onClickMainItem(this.bet);
            
        }        
    }

    onclickSidebet = (event) => {
        console.log("side Bet");
        const target = event.target;

        if (target.matches('.BJsidebet')) {
            console.log("side Bet target");
            this.onClickSideItem && this.onClickSideItem(this.bet);
        }
    }


    stackUpChip(bet, index) {
        let spotX, spotY;
        let chipIndex;
         
        if (index === 'main') {
            spotX = this.MAINBET_STACK_UP_CHIP_POS_X;
            spotY = this.MAINBET_STACK_UP_CHIP_POS_Y;
            chipIndex = 'mainBetStackUPChip';
            console.log(chipIndex);
        } else if(index === 'side') {
            spotX = this.SIDEBET_STACK_UP_CHIP_POS_X;
            spotY = this.SIDEBET_STACK_UP_CHIP_POS_Y;
            chipIndex = 'sideBetStackUPChip';
        }
             

        const quo1000 = Math.floor(bet / 1000);
        const remainder1000 = bet % 1000;
        const quo500 = Math.floor(remainder1000 / 500);
        const remainder500 = remainder1000 % 500;
        const quo100 = Math.floor(remainder500 / 100);
        const remainder100 = remainder500 % 100;
        const quo25 = Math.floor(remainder100 / 25);
        const remainder25 = remainder100 % 25;
        const quo5 = Math.floor(remainder25 / 5);
        const remainder5 = remainder25 % 5;

        //this.heightForStackChip = 0;
        // console.log(`stackbet : ${quo1000}, ${quo500}, ${quo100}, ${quo25}, ${quo5}, ${remainder25} `);
        
        
        // this.loopForStackChip(quo100, 'stackUpChip100', this.heightForStackChip);
        // this.loopForStackChip(quo25, 'stackUpChip25', this.heightForStackChip);
        // this.loopForStackChip(quo5, 'stackUpChip5', this.heightForStackChip);
        // this.loopForStackChip(remainder5, 'stackUpChip1', this.heightForStackChip);

        let high = 0;
        

        for (let i = 0 ; i < quo1000 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackUpChip ${chipIndex} stackUpChip1000`);
            test.type = "image";
            test.src = 'img/chips/stackUpChip1000.png';
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < quo500 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackUpChip ${chipIndex} stackUpChip500`);
            test.type = "image";
            test.src = 'img/chips/stackUpChip500.png';           
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < quo100 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackUpChip ${chipIndex} stackUpChip100`);
            test.type = "image";
            test.src = 'img/chips/stackUpChip100.png';            
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
            
        }

        for (let i = 0 ; i < quo25 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackUpChip ${chipIndex} stackUpChip25`);
            test.type = "image";
            test.src = 'img/chips/stackUpChip25.png';            
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < quo5 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackUpChip ${chipIndex} stackUpChip5`);
            test.type = "image";
            test.src = 'img/chips/stackUpChip5.png';
            console.log("testbet25");
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < remainder5 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackUpChip ${chipIndex} stackUpChip1`);
            test.type = "image";
            test.src = 'img/chips/stackUpChip1.png';            
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }
        
    }

    /*
    loopForStackChip(qunatity, stackUpChip, height) {
        //let height = high;
        for (let i = 0 ; i < qunatity ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackUpChip ${stackUpChip}`);
            test.type = "image";
            test.src = `img/chips/${stackUpChip}.png`;            
            test.style.position = 'absolute';
            test.style.left = `49%`;
            test.style.bottom = `${25 + height}%`;

            this.playField.appendChild(test);
            this.heightForStackChip = this.heightForStackChip + 0.7;
        }
        
    }*/

    offBet() {
        this.mainbetSpot.disabled = true;
        this.sidebetSpot.disabled = true;
    }

    onBet() {
        this.mainbetSpot.disabled = false;
        this.sidebetSpot.disabled = false;
    }





}