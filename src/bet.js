'use strict';

export default class Bet {

    MAINBET_STACK_UP_CHIP_POS_X = 49.3;
    MAINBET_STACK_UP_CHIP_POS_Y = 23;
    SIDEBET_STACK_UP_CHIP_POS_X = 56.5;
    SIDEBET_STACK_UP_CHIP_POS_Y = 36;

    selectedBet = 0;
    BJMainBet = 0;
    BJRightSideBet = 0;
    BJLeftSideBet = 0;
    //betStack = [];   
    
    heightForStackChip = 0; 
        
    constructor() {
        
        this.playControlField = document.querySelector('.playControlField');
        this.playField = document.querySelector('.playField');
        this.showBalance = document.createElement('span');
        this.showMainBet = document.createElement('span');
        this.showSideBet = document.createElement('span');
        this.showWinning = document.createElement('span');
        
        this.showBalance.setAttribute('class', 'bet balance');
        this.showMainBet.setAttribute('class', 'bet mainBet');
        this.showSideBet.setAttribute('class', 'bet sideBet');
        this.showWinning.setAttribute('class', 'bet winning');
        this.playControlField.appendChild(this.showBalance);
        this.playControlField.appendChild(this.showMainBet); 
        this.playControlField.appendChild(this.showSideBet); 
        this.playControlField.appendChild(this.showWinning);  
        
        this.mainbetSpot = document.createElement('input');
        this.mainbetSpot.setAttribute('class', 'BJbet BJmainbet');
        this.mainbetSpot.type = "image";
        this.mainbetSpot.src = '/table_games/img/mainbet.png';
        this.mainbetSpot.style.position = 'absolute';
        this.mainbetSpot.style.left = `45%`;
        this.mainbetSpot.style.bottom = `22%`;

        this.rightSidebetSpot = document.createElement('input');
        this.rightSidebetSpot.setAttribute('class', 'BJbet BJsidebet BJRightSidebet');
        this.rightSidebetSpot.type = "image";
        this.rightSidebetSpot.src = '/table_games/img/sidebet_lucky.png';
        this.rightSidebetSpot.style.position = 'absolute';
        this.rightSidebetSpot.style.left = `55%`;
        this.rightSidebetSpot.style.bottom = `35%`;
        
        this.playField.appendChild(this.mainbetSpot);
        this.playField.appendChild(this.rightSidebetSpot);

        this.mainbetSpot.addEventListener('click', this.onclickBet);
        this.rightSidebetSpot.addEventListener('click', this.onclickBet);
        //this.chipControlField.addEventListener('click', this.test);
        
    }

    setMainBetClickListener = function(click) {
        this.onClickMainItem = click;
        //console.log(this.onClickItem);
    }

    setRightSideBetClickListener = function(click) {
        this.onClickRightSideItem = click;
        //console.log(this.onClickItem);
    }

    setLeftSideBetClickListener = function(click) {
        this.onClickLeftSideItem = click;
        //console.log(this.onClickItem);
    }

    setSelectedBet(item) {        
        this.selectedBet = item;        
    }

    setMainBet(item) {        
        this.BJMainBet = item;        
    }

    setRightSideBet(item) {        
        this.BJRightSideBet = item;        
    }

    setLeftSideBet(item) {        
        this.BJLeftSideBet = item;        
    }

    onclickBet = (event) => {

        console.log("onclick bet");
        const target = event.target;
        
        
        if (target.matches('.BJmainbet')) {  
            console.log("main Bet target");          
            this.onClickMainItem && this.onClickMainItem(this.selectedBet);            
        } else if (target.matches('.BJRightSidebet')) {
            console.log("right side Bet target");
            this.onClickRightSideItem && this.onClickRightSideItem(this.selectedBet);
        } else if (target.matches('.BJLeftSidebet')) {
            console.log("left side Bet target");
            this.onClickLeftSideItem && this.onClickLeftSideItem(this.selectedBet);
        }       
    }

    onclickMainbet = (event) => {

        console.log("main bet");
        const target = event.target;
        
        
        if (target.matches('.BJmainbet')) {
            
            this.onClickMainItem && this.onClickMainItem(this.selectedBet);
            
        }        
    }

    onclickRightSidebet = (event) => {
        console.log("right side Bet");
        const target = event.target;

        if (target.matches('.BJRightSidebet')) {
            console.log("right side Bet target");
            this.onClickRightSideItem && this.onClickRightSideItem(this.selectedBet);
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
        } else if(index === 'rightside') {
            spotX = this.SIDEBET_STACK_UP_CHIP_POS_X;
            spotY = this.SIDEBET_STACK_UP_CHIP_POS_Y;
            chipIndex = 'rightSideBetStackUPChip';
        } else if (index === 'double') {
            spotX = this.MAINBET_STACK_UP_CHIP_POS_X - 5;
            spotY = this.MAINBET_STACK_UP_CHIP_POS_Y;
            chipIndex = 'doubleDownStackUPChip';
            console.log(chipIndex);
        } else if (index === 'win') {
            spotX = this.MAINBET_STACK_UP_CHIP_POS_X + 5;
            spotY = this.MAINBET_STACK_UP_CHIP_POS_Y;
            chipIndex = 'winMainBetStackUPChip';
            console.log(chipIndex);
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
            test.src = '/table_games/img/chips/stackUpChip1000.png';
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
            test.src = '/table_games/img/chips/stackUpChip500.png';           
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
            test.src = '/table_games/img/chips/stackUpChip100.png';            
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
            test.src = '/table_games/img/chips/stackUpChip25.png';            
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
            test.src = '/table_games/img/chips/stackUpChip5.png';
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
            test.src = '/table_games/img/chips/stackUpChip1.png';            
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }
        
    }



    textUp(x, bet, index, name) {
        
        this.playField = document.querySelector('.playField');
        name = document.createElement('span');        
        name.setAttribute('class', `textUp ${index}`);

        switch(index) {
            case 'win' : {
                name.innerHTML = `+$${bet}`;
                break;
            } case 'lose' : {
                name.innerHTML = `-$${bet}`;
                break;
            } case 'tie' : {
                name.innerHTML = `PUSH`;
                break;
            } case 'blackjack' : {
                name.innerHTML = `+$${bet*1.5}`;
                break;
            }
        }
        
        name.style.position = 'absolute';
        name.style.left = `${x}%`;
        name.style.bottom = '180px';
        this.playField.appendChild(name);

        let start = Date.now();

        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
            //console.log(`timepaseed : ${timePassed}`);

            name.style.bottom =  (timePassed / 10 + 195) /10 + 14+ '%'; // digit : as fast as low digit
            

            if (timePassed > 600) { // digit : duration
                clearInterval(timer);
                //this.playField.removeChild(name);
                
            }
        }, 1); 
    }


    modifyBalance(balance, mainbet, sidebet, winning) {
           
        this.showbalance = document.querySelector('.balance');
        this.showbalance.innerHTML = `Balance : $${balance}`;
        this.showMainbet = document.querySelector('.mainBet');
        this.showMainbet.innerHTML = `MainBet : $${mainbet}`;
        this.showSidebet = document.querySelector('.sideBet');
        this.showSidebet.innerHTML = `SideBet : $${sidebet}`;
        this.showWinning = document.querySelector('.winning');
        this.showWinning.innerHTML = `Win : $${winning}`;
        
    }

    animateBalance = (start, end, duration) => {
        if (start === end) return;
        var range = end - start;
        var current = start;
        var increment = end > start? 1 : -1;
        var stepTime = Math.abs(Math.floor(duration / range));
              
        let balance = document.querySelector('.balance');
        var timer = setInterval(function() {
            if (end - current > 1000) {
                current += 100;
                
            } else if (end - current > 500) {
                current += 10;
                
            } else {           
                current += increment;
                
            }
            balance.innerHTML = `Balance : $${current}`;
            if (current == end) {
                clearInterval(timer);
            } 
            
        }, stepTime);
    }

    offBet() {
        this.mainbetSpot.disabled = true;
        this.rightSidebetSpot.disabled = true;
    }

    onBet() {
        this.mainbetSpot.disabled = false;
        this.rightSidebetSpot.disabled = false;
    }

    
}


