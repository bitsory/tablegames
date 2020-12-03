'use strict';
import Chips from './chips.js';
import Deck from './deck.js';

export default class Baccarat {
    constructor() {
        console.log("baccarat initialized...");
        this.chips = new Chips();
        this.deck = new Deck();

    }

}
