'use strict';

export default class BJLucky {

    constructor() {
        console.log("BJ lucky initialized...");

        this.playField = document.querySelector('.playField');
        
        this.mainbet = document.createElement('input');
        this.mainbet.setAttribute('class', 'BJbet BJmainbet');
        this.mainbet.type = "image";
        this.mainbet.src = '/table_games/img/mainbet.png';
        this.mainbet.style.position = 'absolute';
        this.mainbet.style.left = `47%`;
        this.mainbet.style.bottom = `25%`;

        this.sidebet = document.createElement('input');
        this.sidebet.setAttribute('class', 'BJbet BJsidebet');
        this.sidebet.type = "image";
        this.sidebet.src = '/table_games/img/sidebet_lucky.png';
        this.sidebet.style.position = 'absolute';
        this.sidebet.style.left = `55%`;
        this.sidebet.style.bottom = `35%`;
        
        this.playField.appendChild(this.mainbet);
        this.playField.appendChild(this.sidebet);

    }


}