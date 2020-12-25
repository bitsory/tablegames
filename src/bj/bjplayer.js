'use strict';

import BJPublic from "./bjpublic.js";

export default class BJPlayer extends BJPublic{
    hand = [];
    total = 0;
    handCount = 0;
    isDouble = false;
    splitCount = 1;
    
    balance = 1000;
    bet = 0;
    winning = 0;
    winIndex = 0;

    mainBet = 0;
    subBet = 0;


    // constructor() {
    //     //console.log('BJ Player initialized...');
    // }

    init() {
        this.hand = [];
        this.total = 0;
        this.handCount = 0;
        this.isDouble = false;
        this.splitCount = 1;

    }

    setHand(hand) {
        this.hand.push(hand);
        
    }

    setTotal(index) {
        this.total = super.getTotal(index);
    }

    setBalance(bet) {
        this.balance = this.balance - bet;
    }

    setBet(bet) {
        this.bet = this.bet + bet;
    }

    setWinning(bet) {
        this.winning = bet;
    }

    

    setDouble() {
        let tmpBet = this.bet;
        let tmpBalance = this.balance;
        this.bet = this.bet*2;
        this.balance = tmpBalance - tmpBet;
        console.log(`setdouble : ${this.bet}, ${this.balance}`);
    }

    blackjack() {
        this.setWinning(this.bet*1.5);
        this.balance = this.balance + this.bet + this.winning;
        this.winIndex = 'blackjack';
        
    }

    win() {
        this.setWinning(this.bet);
        this.balance = this.balance + this.bet + this.winning ;
        this.winIndex = 'win';
    }

    tie() {
        this.balance = this.balance + this.bet;
        this.winIndex = 'tie';
    }

    lose() {
        this.balance = this.balance;
        this.winIndex = 'lose';
    }

    initBetAndWinning() {
        this.bet = 0
        this.winning = 0;
    }
    



}