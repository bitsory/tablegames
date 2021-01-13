'use strict';

import BJPublic from "./bjpublic.js";

export default class BJSidebet extends BJPublic {


    checkSideLucky(playerDeck1, playerDeck2, dealerDeck1) {
        //const luckyTotal = playerDeck1;
        const luckyTotal = this.numberRecognize(playerDeck1) + this.numberRecognize(playerDeck2) + this.numberRecognize(dealerDeck1);
        const playerFirstSuit = this.suitRecognize(playerDeck1);
        const playerSecondSuit = this.suitRecognize(playerDeck2);
        const dealerFirstSuit = this.suitRecognize(dealerDeck1);
        
        console.log(luckyTotal);
        console.log(playerFirstSuit, playerSecondSuit, dealerFirstSuit);

        switch (luckyTotal) {
            case 19 : {
                console.log("any 19");
                return 'any19';                
            }
            case 20: {
                console.log("any 20");
                return 'any20';
            }
            case 21: {
                console.log("any 21");
                return 'any21';               
            }
            default : {
                console.log("nothing on lucky lucky");
                return;
            }
        }

    }

    


}