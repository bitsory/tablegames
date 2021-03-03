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
    winningForLeftSideBet = 0;
    winningForRightSideBet = 0;
    winningForLeftTieSideBet = 0;
    winningForRightTieSideBet = 0;
    winIndex = '';
    leftSideBetWinIndex = '';
    rightSideBetWinIndex = '';
    leftTieSideBetWinIndex = '';
    rightTieSideBetWinIndex = '';

    mainBet = 0;
    sideBet = 0;
    rightSideBet = 0;
    leftSideBet = 0;
    tmpTieBet = 0;
    tieReturn = 0;

    init() {
        this.hand = [];
        this.total = 0;
        this.handCount = 0;
        this.isDouble = false;
        this.splitCount = 1;
        this.winIndex = '';
        this.leftSideBetWinIndex = '';
        this.rightSideBetWinIndex = '';
        this.leftTieSideBetWinIndex = '';
        this.rightTieSideBetWinIndex = '';
        this.winning = 0;
        this.winningForLeftSideBet = 0;
        this.winningForRightSideBet = 0;
        this.winningForLeftTieSideBet = 0;
        this.winningForRightTieSideBet = 0;
        this.tieReturn = 0;
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

    setWinningForSideBet(winning, bet, direction) {
        if (direction === 'leftSide') {
            this.winningForLeftSideBet = this.winningForLeftSideBet + winning + bet;
            this.leftSideBetWinIndex = 'win';
        } else if (direction === 'rightSide') {
            this.winningForRightSideBet = this.winningForRightSideBet + winning + bet;
            this.rightSideBetWinIndex = 'win';
        } else if (direction === 'leftTie') {
            this.winningForLeftTieSideBet = this.winningForLeftTieSideBet + winning + bet;
            this.leftTieSideBetWinIndex = 'win';
        } else if (direction === 'rightTie') {
            this.winningForRightTieSideBet = this.winningForRightTieSideBet + winning + bet;
            this.rightTieSideBetWinIndex = 'win';
        }
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

    setInsurance(amount) {
        let tmpBalance = this.balance;
        this.balance = tmpBalance - amount;
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
        this.tieReturn = this.mainBet;
    }

    lose() {     
        this.winIndex = 'lose';
    }

    getInsurance(amount) {
        this.balance = this.balance + amount + amount * 2;
    }

    

    initBetAndWinning() {
        this.balance = this.balance + this.winningForLeftSideBet + this.winningForRightSideBet;
        this.mainBet = 0;
        this.sideBet = 0;
        this.rightSideBet = 0;
        this.leftSideBet = 0;
        this.tmpTieBet = 0;
        this.winning = 0;
        this.winningForSideBet = 0;
    }
    



}