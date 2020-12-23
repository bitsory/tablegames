'use strict';

export default class BJController {

    constructor() {

        this.playControlField = document.querySelector('.playControlField');
        this.chipControlField = document.querySelector('.chipControlField');

        this.dealBtn = document.createElement('button');
        this.dealBtn.setAttribute('class', 'ctlBtn dealBtn');        
        //this.dealBtn.style.position = 'absolute';
        this.dealBtn.innerHTML = 'DEAL START';
        this.dealBtn.style.left = `100px`;

        this.hitBtn = document.createElement('button');
        this.hitBtn.setAttribute('class', 'ctlBtn hitBtn');
        //this.hitBtn.style.position = 'absolute';
        this.hitBtn.innerHTML = 'HIT';
        this.hitBtn.style.left = `200px`;

        this.doubleBtn = document.createElement('button');
        this.doubleBtn.setAttribute('class', 'ctlBtn doubleBtn');
        //this.hitBtn.style.position = 'absolute';
        this.doubleBtn.innerHTML = 'Double Down! X2';
        this.doubleBtn.style.left = `200px`;

        this.splitBtn = document.createElement('button');
        this.splitBtn.setAttribute('class', 'ctlBtn splitBtn');
        //this.hitBtn.style.position = 'absolute';
        this.splitBtn.innerHTML = 'Split';
        this.splitBtn.style.left = `200px`;

        this.stayBtn = document.createElement('button');
        this.stayBtn.setAttribute('class', 'ctlBtn stayBtn');
        //this.stayBtn.style.position = 'absolute';
        this.stayBtn.innerHTML = 'STAY';
        this.stayBtn.style.left = `300px`;

    
        this.playControlField.appendChild(this.dealBtn);
        this.playControlField.appendChild(this.hitBtn);
        this.playControlField.appendChild(this.doubleBtn);
        this.playControlField.appendChild(this.splitBtn);
        this.playControlField.appendChild(this.stayBtn);

        


    }
}