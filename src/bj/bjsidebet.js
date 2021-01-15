'use strict';

import BJPublic from "./bjpublic.js";

export default class BJSidebet extends BJPublic {

    rightSubgame ='';
    leftSubgame = '';

    // constructor() {
    
    //     console.log("bjsidebet initialized...");
    //     // console.log(right);
    //     // console.log(left);
    //     // this.rightSubgame = right;
    //     // this.leftSubgame = left;        

    // }

    checkSubgame(index, subgameParam, bet) {
        switch (index) {
            case 'lucky' : {    
                return this.subgameLucky(subgameParam, bet);
                                
            }
            case 'kings' : {
                return this.subgameKings(subgameParam, bet);
                
            }
            case 'trilux' : {
                return this.subgameTrilux(subgameParam, bet);
                              
            }
        }

    }

    subgameLucky = (subgameParam, bet) => {
        //const luckyTotal = playerDeck1;
        const luckyTotal = this.numberRecognize(subgameParam[0]) + this.numberRecognize(subgameParam[1]) + this.numberRecognize(subgameParam[2]);
        const playerFirstSuit = this.suitRecognize(subgameParam[0]);
        const playerSecondSuit = this.suitRecognize(subgameParam[1]);
        const dealerFirstSuit = this.suitRecognize(subgameParam[2]);
        
        console.log(luckyTotal);
        console.log(playerFirstSuit, playerSecondSuit, dealerFirstSuit);

        switch (luckyTotal) {
            case 19 : {
                console.log("any 19");
                return bet * 2;                
            }
            case 20: {
                console.log("any 20");
                return bet * 2;
            }
            case 21: {
                console.log("any 21");
                return bet * 3;               
            }
            default : {
                console.log("nothing on lucky lucky");
                return;
            }
        }

    }

    subgameKings = (subgameParam, bet) => {
        const kingsTotal = this.numberRecognize(subgameParam[0]) + this.numberRecognize(subgameParam[1]);
        const playerFirstSuit = this.suitRecognize(subgameParam[0]);
        const playerSecondSuit = this.suitRecognize(subgameParam[1]);

        switch (kingsTotal) {
            
            case 20: {
                console.log("kings 20");
                return bet * 4;
            }
            
            default : {
                console.log("nothing on kings");
                return;
            }
        }
    }

    subgameTrilux = (subgameParam, bet) => {
        const luckyTotal = this.numberRecognize(subgameParam[0]) + this.numberRecognize(subgameParam[1]) + this.numberRecognize(subgameParam[2]);
        const playerFirstSuit = this.suitRecognize(subgameParam[0]);
        const playerSecondSuit = this.suitRecognize(subgameParam[1]);
        const dealerFirstSuit = this.suitRecognize(subgameParam[2]);
        
        console.log(luckyTotal);
        console.log(playerFirstSuit, playerSecondSuit, dealerFirstSuit);
    }



    
}

