'use strict';

import BJPublic from "./bjpublic.js";

export default class BJPlayer extends BJPublic{
    hand = [];
    total = 0;
    handCount = 0;
    isDouble = false;
    splitCount = 1;
    
    balance = 5000;
    BalanceOfBeginningRound = 0;
    mainRebet = 0;
    rightSideRebet = 0;
    leftSideRebet = 0;
    bet = 0;
    winning = 0;
    winningForSideBet = 0;
    winIndex = '';
    leftSideBetWinIndex = false;
    rightSideBetWinIndex = false;


    mainBet = 0;
    sideBet = 0;
    rightSideBet = 0;
    leftSideBet = 0;
    tmpTieBet = 0;


    // constructor() {
    //     //console.log('BJ Player initialized...');
    // }

    init() {
        this.hand = [];
        this.total = 0;
        this.handCount = 0;
        this.isDouble = false;
        this.splitCount = 1;
        this.winIndex = '';
        this.leftSideBetWinIndex = false;
        this.rightSideBetWinIndex = false;
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

    

    setMainBet(bet) {
        this.mainBet = this.mainBet + bet;        
    }

    setRightSideBet(bet) {
        this.rightSideBet = this.rightSideBet + bet;
    }

    setLeftSideBet(bet) {
        this.leftSideBet = this.leftSideBet + bet;
    }

    setSideBet() {
       this.sideBet = this.rightSideBet + this.leftSideBet;
    }

    setTempTieBet(bet) {
        this.tmpTieBet = bet;
    }

    setWinning(bet) {
        this.winning = bet;
    }

    setWinningForSideBet(winning, bet) {
        this.winningForSideBet = this.winningForSideBet + winning + bet;

    }

    setBalanceOfBeginningRound() {
        this.BalanceOfBeginningRound = this.balance;

    }    

    setRebet() {
        this.mainRebet = this.mainBet;
        this.rightSideRebet = this.rightSideBet;
        this.leftSideRebet = this.leftSideBet;
    }

    setDouble() {
        let tmpBet = this.mainBet;
        let tmpBalance = this.balance;
        this.mainBet = this.mainBet*2;
        this.balance = tmpBalance - tmpBet;
        console.log(`setdouble : ${this.bet}, ${this.balance}`);
    }

    blackjack() {
        let winning = this.mainBet*2.5;
        this.setWinning(winning);
        this.balance = this.balance + this.winning;
        this.winIndex = 'blackjack';        
    }

    win() {
        let winning = this.mainBet*2;
        this.setWinning(winning);
        this.balance = this.balance + this.winning ;
        this.winIndex = 'win';
    }

    tie() {
        this.balance = this.balance + this.mainBet;
        this.winIndex = 'tie';
    }

    lose() {     
        this.winIndex = 'lose';
    }

    initBetAndWinning() {
        this.balance = this.balance + this.winningForSideBet;
        this.mainBet = 0;
        this.sideBet = 0;
        this.rightSideBet = 0;
        this.leftSideBet = 0;
        this.tmpTieBet = 0;
        this.winning = 0;
        this.winningForSideBet = 0;
    }
    



}