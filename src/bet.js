'use strict';

export default class Bet {

    MAINBET_STACK_UP_CHIP_POS_X = 48.3;
    MAINBET_STACK_UP_CHIP_POS_Y = 27;
    RIGHT_SIDEBET_STACK_UP_CHIP_POS_X = 55.5;
    RIGHT_SIDEBET_STACK_UP_CHIP_POS_Y = 38;
    LEFT_SIDEBET_STACK_UP_CHIP_POS_X = 40.5;
    LEFT_SIDEBET_STACK_UP_CHIP_POS_Y = 38;
    
    heightForStackChip = 0; 
        
    constructor(right, left) {

        const rightSubgameImage = this.whatIsSubgame(right);
        const leftSubgameImage = this.whatIsSubgame(left);
        
        
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
        this.rightSidebetSpot = document.createElement('input');
        this.leftSidebetSpot = document.createElement('input');

        this.makeBetSpot(this.mainbetSpot, 'BJmainbet', 'mainbet', 44, 24);
        this.makeBetSpot(this.rightSidebetSpot, 'BJsidebet BJRightSidebet', rightSubgameImage, 54, 37);
        this.makeBetSpot(this.leftSidebetSpot, 'BJsidebet BJLeftSidebet', leftSubgameImage, 39, 37);

        this.mainbetSpot.addEventListener('click', this.onclickBet);
        this.rightSidebetSpot.addEventListener('click', this.onclickBet);
        this.leftSidebetSpot.addEventListener('click', this.onclickBet);
        
    }

    makeBetSpot(name, classname, image, left, bottom) {
        
        name.setAttribute('class', `BJbet ${classname}`);
        name.type = "image";
        name.src = `img/blackjack/bet/${image}.png`;
        name.style.position = 'absolute';
        name.style.left = `${left}%`;
        name.style.bottom = `${bottom}%`;
        image && this.playField.appendChild(name);
    }

    whatIsSubgame(item) {
        switch (item) {
            case "lucky" : {
                return 'sidebet_lucky';
                
            }
            case "kings" : {
                return 'sidebet_kings';
                
            }
            case "trilux" : {
                return 'sidebet_trilux';
                
            }
            case "pair" : {
                return 'sidebet_pair';
                
            }
            case "tie" : {
                return 'sidebet_tie';
                
            }
        }
    }


    setBetClickListener = function(click) {
        
        this.onClickItem = click; 
    }

    onclickBet = (event) => {

        console.log("onclick bet");
        const target = event.target;        
        
        if (target.matches('.BJmainbet')) {  
            console.log("main Bet target");          
            this.onClickItem && this.onClickItem('main');            
        } else if (target.matches('.BJRightSidebet')) {
            console.log("right side Bet target");
            this.onClickItem && this.onClickItem('rightSide');
        } else if (target.matches('.BJLeftSidebet')) {
            console.log("left side Bet target");
            this.onClickItem && this.onClickItem('leftSide');
        }       
    }

    stackUpChip(amount, index, bet) {

        let spotX, spotY;
        let chipIndex;
        let extraX = 0;

        let parentPos = document.querySelector('.playField').getBoundingClientRect();
        let relativePos = {};
        
        switch (index) {
            case 'set' : {
                if (bet === 'main') {
                    spotX = this.MAINBET_STACK_UP_CHIP_POS_X;
                    spotY = this.MAINBET_STACK_UP_CHIP_POS_Y;
                    chipIndex = 'mainBetStackChip';
                    console.log(chipIndex);
                    

                } else if (bet === 'rightside') {
                    spotX = this.RIGHT_SIDEBET_STACK_UP_CHIP_POS_X;
                    spotY = this.RIGHT_SIDEBET_STACK_UP_CHIP_POS_Y;
                    chipIndex = 'sideBetStackChip rightSideBetStackChip';
                    console.log("stackup set rightside")

                } else if (bet === 'leftside') {
                    spotX = this.LEFT_SIDEBET_STACK_UP_CHIP_POS_X;
                    spotY = this.LEFT_SIDEBET_STACK_UP_CHIP_POS_Y;
                    chipIndex = 'sideBetStackChip leftSideBetStackChip';
                    console.log("stackup set leftside")
                }             
                break;
            }

            case 'double' : {
                if (bet === 'main') {                    
                    this.childPos = document.querySelector(`.mainBetStackChip`).getBoundingClientRect();
                    chipIndex = 'mainBetStackChip';
                    

                }  else if (bet === 'splitChipLeft') {                    
                    this.childPos = document.querySelector(`.splitChipLeft`).getBoundingClientRect();
                    chipIndex = 'splitChipLeft';

                } else if (bet === 'splitChipRight') {
                    this.childPos = document.querySelector(`.splitChipRight`).getBoundingClientRect();
                    chipIndex = 'splitChipRight';
                    extraX = 15;
                }
                relativePos.left = (this.childPos.left - parentPos.left) / parentPos.width * 100;
                spotX = relativePos.left - 5 - extraX;
                spotY = this.MAINBET_STACK_UP_CHIP_POS_Y;

                break;
            }

            case 'win' : {
                if (bet === 'main') {                    
                    this.childPos = document.querySelector(`.mainBetStackChip`).getBoundingClientRect();
                    chipIndex = 'winMainBetStackChip';

                }  else if (bet === 'splitChipLeft') {                    
                    this.childPos = document.querySelector(`.splitChipLeft`).getBoundingClientRect();
                    chipIndex = 'winMainBetStackChipLeft';

                } else if (bet === 'splitChipRight') {
                    this.childPos = document.querySelector(`.splitChipRight`).getBoundingClientRect();
                    chipIndex = 'winMainBetStackChipRight';

                }
                relativePos.left = (this.childPos.left - parentPos.left) / parentPos.width * 100;
                spotX = relativePos.left + 5;
                spotY = this.MAINBET_STACK_UP_CHIP_POS_Y;
                break;
            }

            case 'winSidebet' : {
                if (bet === 'rightSide') {
                this.childPos = document.querySelector(`.rightSideBetStackChip`).getBoundingClientRect();
                chipIndex = 'rightSideBetStackChip';
                relativePos.left = (this.childPos.left - parentPos.left) / parentPos.width * 100;
                spotX = relativePos.left + 5;
                spotY = this.RIGHT_SIDEBET_STACK_UP_CHIP_POS_Y;
                
                } else if (bet === 'leftSide') {
                this.childPos = document.querySelector(`.leftSideBetStackChip`).getBoundingClientRect();
                chipIndex = 'leftSideBetStackChip';
                relativePos.left = (this.childPos.left - parentPos.left) / parentPos.width * 100;
                spotX = relativePos.left - 5;
                spotY = this.LEFT_SIDEBET_STACK_UP_CHIP_POS_Y;
                
                }                            
                
                break;
            }
        }

        const quo1000 = Math.floor(amount / 1000);
        const remainder1000 = amount % 1000;
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
            test.setAttribute('class', `stackChip ${chipIndex} stackChip1000`);
            test.type = "image";
            test.src = 'img/chips/stackChip1000.png';
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < quo500 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackChip ${chipIndex} stackChip500`);
            test.type = "image";
            test.src = 'img/chips/stackChip500.png';           
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < quo100 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackChip ${chipIndex} stackChip100`);
            test.type = "image";
            test.src = 'img/chips/stackChip100.png';            
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
            
        }

        for (let i = 0 ; i < quo25 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackChip ${chipIndex} stackChip25`);
            test.type = "image";
            test.src = 'img/chips/stackChip25.png';            
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < quo5 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackChip ${chipIndex} stackChip5`);
            test.type = "image";
            test.src = 'img/chips/stackChip5.png';
            console.log("testbet25");
            test.style.position = 'absolute';
            test.style.left = `${spotX}%`;
            test.style.bottom = `${spotY + high}%`;

            this.playField.appendChild(test);
            high = high + 0.7;
        }

        for (let i = 0 ; i < remainder5 ; i++) {
            test = document.createElement('img');
            test.setAttribute('class', `stackChip ${chipIndex} stackChip1`);
            test.type = "image";
            test.src = 'img/chips/stackChip1.png';            
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

            name.style.bottom =  (timePassed / 10 + 235) /10 + 14+ '%'; // digit : as fast as low digit
            

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


