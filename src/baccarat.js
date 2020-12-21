'use strict';
import Chips from './chips.js';
import Deck from './deck.js';

export default class Baccarat {
    constructor() {
        console.log("baccarat initialized...");
        //console.log(playField);
        //this.mainField = document.querySelector('.mainField');
        this.playField = document.querySelector('.playField');
        this.playField.innerHTML = '';
        this.BCchips = new Chips();
        this.deck = new Deck(8);

    }

}
