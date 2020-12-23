'use strict';

import BJPublic from "./bjpublic.js";

export default class BJDealer extends BJPublic{
    hand = [];
    total = 0;
    handCount = 0;

    init() {
        this.hand = [];
        this.total = 0;
        this.handCount = 0;
        
    }

    setHand(hand) {
        this.hand.push(hand);

    }

    setTotal(index) {
        this.total = super.getTotal(index);
    }

    // getTotal(index) {
    //     let total = 0;
    //     for (let i = 0; i < index.length; i++) {
    //       total = total + super.numberRecognize(index[i]);
    //     }
    //     return total;
    // }


}