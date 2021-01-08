'use strict';

import BJPublic from "./bjpublic.js";

export default class BJSidebet extends BJPublic {


    lucky(playerDeck1, playerDeck2, dealerDeck1) {
        //const luckyTotal = playerDeck1;
        const luckyTotal = this.numberRecognize(playerDeck1) + this.numberRecognize(playerDeck2) + this.numberRecognize(dealerDeck1);
        console.log(luckyTotal);
    }


}