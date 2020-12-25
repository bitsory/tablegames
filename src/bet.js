'use strict';

export default class Bet {
    
    balance = 1000;
    bet = 0;

    constructor() {
        //this.balance = 1000;
        this.chipControlField = document.querySelector('.chipControlField');
        this.showBalance = document.createElement('span');
        this.showBet = document.createElement('span');
        this.showWinning = document.createElement('span');
        
        this.showBalance.setAttribute('class', 'balance');
        this.showBet.setAttribute('class', 'bet');
        this.showWinning.setAttribute('class', 'winning');
        this.chipControlField.appendChild(this.showBalance);
        this.chipControlField.appendChild(this.showBet); 
        this.chipControlField.appendChild(this.showWinning);     
        
        

    }


    textUp(x, bet, index, name) {
        //const name = name2;
        this.playField = document.querySelector('.playField');
        name = document.createElement('span');
        console.log(`textup: ${name}`);
        name.setAttribute('class', `textUp ${index}`);

        switch(index) {
            case 'win' : {
                name.innerHTML = `+$${bet}`;
                break;
            } case 'lose' : {
                name.innerHTML = `-$${bet}`;
                break;
            } case 'tie' : {
                name.innerHTML = `0`;
                break;
            } case 'blackjack' : {
                name.innerHTML = `+$${bet*1.5}`;
                break;
            }
        }

        //this.text.innerHTML = `$${bet}`;
        name.style.position = 'absolute';
        name.style.left = `${x}%`;
        name.style.bottom = '180px';
        this.playField.appendChild(name);

        let start = Date.now();

        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
            //console.log(`timepaseed : ${timePassed}`);

            name.style.bottom =  timePassed / 10 + 180 +'px'; // digit : as fast as low digit
            

            if (timePassed > 600) { // digit : duration
                clearInterval(timer);
                //this.playField.removeChild(name);
                
            }
        }, 1); 
    }


    modifyBalance(balance, bet, winning, index) {

        if (index) {
        this.chipControlField = document.querySelector('.chipControlField');
        this.test = document.createElement('span');
        this.test2 = document.createElement('span');

        this.test.setAttribute('class', `moneyAnimation ${index}`);
        this.test2.setAttribute('class', `moneyAnimation ${index} winning`);
                
        switch(index) {
            case 'blackjack' : {
                this.test.innerHTML = `+$${ bet + winning }`;
                this.test2.innerHTML = `+$${winning}`;
                break;
            } case 'win' : {
                this.test.innerHTML = `+$${ bet + winning }`;
                this.test2.innerHTML = `+$${winning}`;
                break;
            } case 'lose' : {
                this.test.innerHTML = `-$${bet}`;
                this.test2.innerHTML = `0`;
                break;
            } case 'tie' : {
                this.test.innerHTML = `0`;
                this.test2.innerHTML = `0`;
                break;
            } case 'split' : {
                if (winning > 0 && winning === bet) {
                    this.test.setAttribute('class', `moneyAnimation ${index} win`);
                    this.test2.setAttribute('class', `moneyAnimation ${index} win`);
                    this.test.innerHTML = `+$${ bet + winning }`;
                    this.test2.innerHTML = `+$${winning}`;
                    break;
                } else if (winning === 0 && winning < bet) {
                    console.log("bet split test");
                    this.test.setAttribute('class', `moneyAnimation ${index} lose`);
                    this.test2.setAttribute('class', `moneyAnimation ${index} lose`);
                    this.test.innerHTML = `-$${bet}`;
                    this.test2.innerHTML = `$${winning}`;
                    break;
                } else {
                    this.test.innerHTML = `0`;
                    this.test2.innerHTML = `0`;
                    break;
                }
            }
        }
        //this.test.innerHTML = `+$${winning}`;
        
        this.test.style.position = 'absolute';
        this.test.style.left = `57%`;
        this.test.style.bottom = `30%`;
        this.chipControlField.appendChild(this.test);

        this.test2.style.position = 'absolute';
        this.test2.style.left = `90%`;
        this.test2.style.bottom = `30%`;
        this.chipControlField.appendChild(this.test2);

        let start = Date.now();

        let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        this.test.style.bottom = timePassed / 20 + 'px'; // digit : as fast as low digit
        this.test2.style.bottom = timePassed / 20 + 'px';

        if (timePassed > 700) { // digit : duration
            clearInterval(timer);
            this.chipControlField.removeChild(this.test);
            this.chipControlField.removeChild(this.test2);
            }
        }, 1); // digit : as slow as smooth
    }

        this.showbalance = document.querySelector('.balance');
        this.showbalance.innerHTML = `Balance : $${balance}`;
        this.showbet = document.querySelector('.bet');
        this.showbet.innerHTML = `Bet : $${bet}`;
        this.showWinning = document.querySelector('.winning');
        this.showWinning.innerHTML = `Win : $${winning}`;
        
        console.log("modify bal");
    }
}