'use strict';
import Chips from './chips.js';
import Deck from './deck.js';
import BJLucky from './bj/bjlucky.js';
import Bet from './bet.js';

export default class BlackJack {
  
  currentCardCount = 0;
   
  playerHand = [];
  dealerHand = [];
  playerTotal = 0;
  dealerTotal = 0;
  playerHandCount = 2;
  dealerHandCount = 2;
  //bet = 0; 
  isDouble = false; 
  
  constructor() {
    

    console.log("blackjack initialized...");
    
    this.mainField = document.querySelector('.mainField');
    
    //this.makeField();
    
    this.playField = document.querySelector('.playField');
    this.playField.innerHTML = '';

    
    this.chips = new Chips();
    this.bet = new Bet();
    this.deck = new Deck();
    this.bjlucky = new BJLucky();
    
    console.log(this.deck);
    console.log(this.deck.shuffledCard[0]);

    

    
    
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
    this.hitBtn.innerHTML = 'HIT ME';
    this.hitBtn.style.left = `200px`;

    this.doubleBtn = document.createElement('button');
    this.doubleBtn.setAttribute('class', 'ctlBtn doubleBtn');
    //this.hitBtn.style.position = 'absolute';
    this.doubleBtn.innerHTML = 'Double Down! X2';
    this.doubleBtn.style.left = `200px`;

    this.stayBtn = document.createElement('button');
    this.stayBtn.setAttribute('class', 'ctlBtn stayBtn');
    //this.stayBtn.style.position = 'absolute';
    this.stayBtn.innerHTML = 'STAY';
    this.stayBtn.style.left = `300px`;

   
    this.playControlField.appendChild(this.dealBtn);
    this.playControlField.appendChild(this.hitBtn);
    this.playControlField.appendChild(this.doubleBtn);
    this.playControlField.appendChild(this.stayBtn);

    

    this.offHitAndStay();
    
    
    

    this.dealBtn.addEventListener('click', () => {
      //this.bet = this.bet.bet;
      if (this.bet.bet === 0) {
        this.showText(350, 400, 'placebet', 'PLACE YOUR BET PLEASE');
        return;
      } else {
        
        let deck = document.querySelectorAll('.deck, .soft, .judgement, .placebet');
        deck.forEach( (item) => this.playField.removeChild(item));
        
        if (this.init()==='blackjack') {
          return;
        } else {
          this.offDealBtn();
          this.onHitAndStay();
          this.chips.offReset();
          this.chips.offChip();
        } 
      }
    });
    
    this.hitBtn.addEventListener('click', () => this.hit());

    this.doubleBtn.addEventListener('click', () => this.doubleDown());

    this.stayBtn.addEventListener('click', () => this.stay());
   
    this.chips.setClickListener(item => {
      console.log("blackjack : setclicklistener")
      this.clickItem(item)
    });

    this.bjlucky.setClickListener(item => this.BJClickItem(item));
    
  }  // constructor


  clickItem(item) {
    console.log(`clickitem : ${item}`);
    this.bjlucky.setMainBet(item);
  }

  BJClickItem(item) {
    this.bet.setBet(item);
    this.bet.setBalance(item);
    this.bet.modifyBalance(this.bet.balance, this.bet.bet);
  }
      
  




  showText(x,y,name,text) {
    this.item = document.createElement('span');
    this.item.setAttribute('class',name);
    this.item.style.position = 'absolute';
    this.item.style.left = `${x}px`;
    this.item.style.top = `${y}px`;
    this.item.style.color = '#ffffff';

    this.playField.appendChild(this.item);

    this.count = document.querySelector(`.${name}`);
    this.count.innerHTML = text;

  }

  modifyScore(score) {
    this.item = document.querySelector('.playerTotal');
    this.item.innerText = score;
  }


  dealValueInit() {
    this.px = 450;
    this.py = 260;
    this.dx = 450;
    this.dy = 80;
    
    this.playerHand = [];
    this.dealerHand = [];
    this.playerTotal = 0;
    this.dealerTotal = 0;
    this.playerHandCount = 2;
    this.dealerHandCount = 2;
    this.isDouble = false;
  }


  putCard(x, y, card) {

    this.item = document.createElement('img');
    this.item.setAttribute('class', 'deck');
    //this.item.setAttribute('src', this.card[this.shuffledCard[this.currentCardCount]]);
    this.item.setAttribute('src', card);

    this.item.style.position = 'absolute';
    this.item.style.left = `${x}px`;
    this.item.style.top = `${y}px`;

    this.playField.appendChild(this.item);

    this.currentCardCount++;

    
  }

  

  init() {

    this.dealValueInit();
    
    setTimeout(() => {
      this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(350,260, this.deck.card[this.playerHand[0]]);  // player first card

    }, 0);
    
    setTimeout(() => {
      this.dealerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(350,80, this.deck.card.back);  // dealer first card : shows back side
      
    },300);

    setTimeout(() => {
      this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(400,260, this.deck.card[this.playerHand[1]]);  // player second
    },600);

    setTimeout(() => {
      this.dealerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(400,80, this.deck.card[this.dealerHand[1]]);  // dealer second
    },900);

    /*
    this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
    this.putCard(350,260, this.card[this.playerHand[0]]);  // player first card
    
    this.dealerHand.push(this.deck.shuffledCard[this.currentCardCount]);
    this.putCard(350,80, this.card.back);  // dealer first card : shows back side
    
    this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
    this.putCard(400,260, this.card[this.playerHand[1]]);  // player second
    
    this.dealerHand.push(this.deck.shuffledCard[this.currentCardCount]);
    this.putCard(400,80, this.card[this.dealerHand[1]]);  // dealer second
    
    */
    setTimeout(() => {
      console.log(`player hand : ${this.playerHand}`);
      console.log(`dealer hand : ${this.dealerHand}`);

      this.playerTotal = this.getTotal(this.playerHand);
      this.dealerTotal = this.getTotal(this.dealerHand);

      console.log(`player total : ${this.playerTotal}`);
      console.log(`dealer total : ${this.dealerTotal}`);

      this.showText(250,90,'dealerHand', 'Dealer Hand');
      //this.showText(40,130,'dealerTotal', this.dealerTotal);
      this.showText(250,270,'playerHand', 'Player Hand');
      this.showText(280,290,'playerTotal', this.playerTotal);

      if (this.isBlackjack(this.dealerTotal, this.dealerHand, this.playerTotal, this.playerHand)) {
        return 'blackjack';
        
      } else if (this.isSoftHand(this.playerTotal, this.playerHand)) {
        this.playerTotal = this.playerTotal + 10;
        this.showText(30,240,'soft', 'SOFT');
      } else {
        this.showText(30,240,'soft', '');
        return;
        
      }
    }, 1000);
    
  }

  hit() {
    
    this.getNextCard(this.px, this.py);
    
    this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
    console.log(`player hand : ${this.playerHand}`);
    
    this.playerTotal = this.getTotal(this.playerHand); 
    this.currentCardCount++;
    this.playerHandCount++;
    this.px = this.px + 50;

    if (!this.isDouble) {
      this.hitAndJudge(this.playerTotal, this.playerHand);
    } else {
      this.hitAndJudge(this.playerTotal, this.playerHand);
      this.stay();
    }
  }

  getTotal(index) {
    let total = 0;
    for (let i = 0; i < index.length; i++) {
      total = total + this.numberRecognize(index[i]);
    }
    return total;
  }


  hitAndJudge(total, hand) {
    
    if (this.isSoftHand(total, hand)) {
      this.playerTotal = this.playerTotal + 10;
      this.showText(40,220,'playerTotal', this.playerTotal);
      return;
    } else if (total <= 21) {
      this.showText(40,220,'playerTotal', this.playerTotal);
      return;
    } else { // player bust
      this.judge();
      return;
    }
    
  }

  doubleDown() {
    this.isDouble = true;
    this.hit();
    
    let tmpBet = this.bet.bet;
    let tmpBalance = this.bet.balance;
    this.bet.modifyBalance(tmpBalance-tmpBet, tmpBet*2);

    this.bet.bet = this.bet.bet + tmpBet;
    this.bet.balance = tmpBalance - tmpBet;
    
  }

  isSoftHand(total, hand) {    
    
    if (total <= 11 && (hand.indexOf("SA") !== -1 || hand.indexOf("CA") !== -1 || hand.indexOf("DA") !== -1 || hand.indexOf("HA") !== -1)) {
      //this.showText(30,240,'soft', 'SOFT');
      return true;
      
    } else {
      // this.$soft = document.querySelector('.soft');
      // this.playField.removeChild(this.$soft);
      return false;
    }
  }

  openDealerBackSideCard() {
    this.putCard(350,80, this.deck.card[this.dealerHand[0]]);
  }

  

  isBlackjack(dealerTotal, dealerHand, playerTotal, playerHand) {
    if ((dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) && (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand))) {
      this.showText(350,200,'judgement', 'BlackJack Tie!!');
      this.onDealBtn();
      this.offHitAndStay();
      this.bet.tie();
      this.chips.onChip();
      return true;

    } else if (dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) {
      this.showText(350,200,'judgement', 'Dealer BlackJack!!');                
      this.openDealerBackSideCard();
      //this.putCard(350,80, this.card[this.dealerHand[0]]); // dealer back-side card open
      this.onDealBtn();
      this.offHitAndStay();
      this.bet.lose();
      this.chips.onChip();
      return true;

    } else if (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand)) {
      this.showText(350,200,'judgement', 'BlackJack!!');
      this.openDealerBackSideCard();
      //this.putCard(350,80, this.card[this.dealerHand[0]]);  // dealer back-side card open
      this.$playerTotal = document.querySelector('.playerTotal');
      this.playField.removeChild(this.$playerTotal);
      this.onDealBtn();
      this.offHitAndStay();
      this.bet.blackjack(this.bet.bet);
      this.chips.onChip();
      return true;

    } else {
      return false;
    }      
  }

  isSoftSeventeen(total, hand) {

    if (total <= 7 && (hand.indexOf("SA") !== -1 || hand.indexOf("CA") !== -1 || hand.indexOf("DA") !== -1 || hand.indexOf("HA") !== -1)) {
      console.log("soft17");
      return total; // soft 17

    } else if (total > 7 && total <= 11 && (hand.indexOf("SA") !== -1 || hand.indexOf("CA") !== -1 || hand.indexOf("DA") !== -1 || hand.indexOf("HA") !== -1)) {
      console.log("soft18");
      return total + 10; // soft 18~20

    } else { 
      console.log("hard");
      return total; // hard number
    }
  }


  stay() {
    this.openDealerBackSideCard();
    //this.putCard(350,80, this.card[this.dealerHand[0]]); // dealer back-side card open
    let timer = setInterval(() => { // finish condition : dealer total is higher than 17 and not soft
      let tmp = this.isSoftSeventeen(this.dealerTotal, this.dealerHand);

      if (tmp >= 17) {
        this.dealerTotal = tmp;
        this.showText(280,110,'dealerTotal', this.dealerTotal);
        clearInterval(timer);
        
        this.judge(); // check win or lose 

      } else { // dealer must hit under 17
        this.getNextCard(this.dx, this.dy);        
        this.dealerHand.push(this.deck.shuffledCard[this.currentCardCount]);
        this.dealerTotal = this.getTotal(this.dealerHand);
        this.showText(280,110,'dealerTotal', this.dealerTotal);
        this.currentCardCount++;
        this.dealerHandCount++;
        this.dx = this.dx + 50;

        console.log(`dealer hand : ${this.dealerHand}`);
        console.log(`dealer total : ${this.dealerTotal}`);
      }
    }, 500);    
  }

  judge() {
    
    if (this.dealerTotal === this.playerTotal) { //tie
      this.showText(350,200,'judgement','Tie!!');
      this.bet.tie(this.bet.bet);
           
    } else if (this.playerTotal > 21) { // player bust
      
      this.showText(40,220,'playerTotal', this.playerTotal);
      this.showText(350,200,'judgement','player bust!! dealer win');  
      this.openDealerBackSideCard();  
      this.bet.lose();

    } else if (this.dealerTotal > 21) { // dealer bust       
      this.showText(350,200,'judgement','dealer bust!! player win');
      this.bet.win(this.bet.bet);      
    
    } else if (this.playerTotal > this.dealerTotal) { // player win        
      this.showText(350,200,'judgement','Player Win');
      this.bet.win(this.bet.bet);

    } else {
      this.showText(350,200,'judgement','Dealer Win'); // dealer win
      this.bet.lose();
    }

    // round finish and prepare next round
    this.onDealBtn();
    this.offHitAndStay();
    this.chips.onReset();
    this.chips.onChip();
  }

  getNextCard(x, y) {
    this.item = document.createElement('img');
    this.item.setAttribute('class', 'deck');
    this.item.setAttribute('src', this.deck.card[this.deck.shuffledCard[this.currentCardCount]]);

    this.item.style.position = 'absolute';
    this.item.style.left = `${x}px`;
    this.item.style.top = `${y}px`;

    this.playField.appendChild(this.item);

  }
  
  numberRecognize(item) {
    let result = item.slice(1,3);
    if (result ==='10' || result === 'J' || result === 'Q' || result === 'K') {
      result = 10;
    } else if (result === 'A') {
      result = 1;
    }
    console.log(result);
    return parseInt(result);
  }

  onDealBtn() {
    const dealBtn = document.querySelector('.dealBtn');
    dealBtn.disabled = false;
  }

  offDealBtn() {
    const dealBtn = document.querySelector('.dealBtn');
    dealBtn.disabled = true;
    
  }

  onHitAndStay() {
    const hitBtn = document.querySelector('.hitBtn');
    const doubleBtn = document.querySelector('.doubleBtn');
    const stayBtn = document.querySelector('.stayBtn');
    hitBtn.disabled = false;
    doubleBtn.disabled = false;
    stayBtn.disabled = false;
  }

  offHitAndStay() { // after round, wait for bet and deal
    const hitBtn = document.querySelector('.hitBtn');
    const doubleBtn = document.querySelector('.doubleBtn');
    const stayBtn = document.querySelector('.stayBtn');
    hitBtn.disabled = true;
    doubleBtn.disabled = true;
    stayBtn.disabled = true;
    
  }


}
