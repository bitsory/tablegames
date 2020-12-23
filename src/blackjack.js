'use strict';
import Chips from './chips.js';
import Deck from './deck.js';
import BJLucky from './bj/bjlucky.js';
import Bet from './bet.js';
import BJPlayer from './bj/bjPlayer.js';
import BJDealer from './bj/bjdealer.js';

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
  isSplit = false;
  isSplitAndLeftHand = true;
  
  constructor(subgame) {
    

    console.log("blackjack initialized...");
    
    this.mainField = document.querySelector('.mainField');
    
    //this.makeField();
    
    this.playField = document.querySelector('.playField');
    this.playField.innerHTML = '';

    
    this.chips = new Chips();
    this.bet = new Bet();
    this.deck = new Deck(2);

    if (subgame === 'BJlucky') {
      this.bjlucky = new BJLucky();
    } else if (subgame === 'BJkings') {
      this.bjkings = new BJLucky();
    }

    this.bjplayer = new BJPlayer();
    this.bjdealer = new BJDealer();
    
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

    

    this.offHitAndStay();
    
    
    

    this.dealBtn.addEventListener('click', () => {
      //this.bet = this.bet.bet;
      if (this.bet.bet === 0) {
        this.showText(350, 400, 'placebet', 'PLACE YOUR BET PLEASE');
        return;
      } else {
        
        let deck = document.querySelectorAll('.deck, .soft, .judgement, .judgement2, .placebet, .dealerTotal, .playerTotal, .playerTotal2, .pointer');
        deck.forEach( (item) => this.playField.removeChild(item));
        
        if (this.init()==='blackjack') {
          return;
        } else {
          this.offDealBtn();
          this.onHitAndStay();
          //this.onSplitBtn();
          this.chips.offReset();
          this.chips.offChip();
        } 
      }
    });
    
    this.hitBtn.addEventListener('click', () => this.hit());

    this.doubleBtn.addEventListener('click', () => this.doubleDown());

    this.splitBtn.addEventListener('click', () => this.split());

    this.stayBtn.addEventListener('click', () => this.stay());
   
    this.chips.setClickListener(item => {
      console.log("blackjack : setclicklistener")
      if (item === 'reset') {
        this.reset();
      } else 
      this.clickItem(item)
    });

    this.bjlucky.setClickListener(item => this.BJClickItem(item));
    
  }  // constructor

  reset() {
    console.log("blackjack : reset");
    let tmp = this.bet.bet;
    this.bet.balance = this.bet.balance + tmp;
    this.bet.bet = this.bet.bet - tmp;
    this.bet.modifyBalance(this.bet.balance, this.bet.bet);
  }

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
    this.item.setAttribute('class', name);
    
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
    this.isSplit = false;
    this.isSplitAndLeftHand = true;

    this.bjplayer.init();
    this.bjdealer.init();
    
    // this.playerHand = [];
    // this.dealerHand = [];
    // this.playerTotal = 0;
    // this.dealerTotal = 0;
    // this.playerHandCount = 2;
    // this.dealerHandCount = 2;
    // this.isDouble = false;
  }


  putCard(x, y, name='deck', card) {

    this.item = document.createElement('img');
    this.item.setAttribute('class', name);
    //this.item.setAttribute('src', this.card[this.shuffledCard[this.currentCardCount]]);
    this.item.setAttribute('src', card);

    this.item.style.position = 'absolute';
    this.item.style.left = `${x}px`;
    this.item.style.top = `${y}px`;

    this.playField.appendChild(this.item);

    this.currentCardCount++;
    console.log(`putcard : ${this.currentCardCount}`);

    
  }

  init() {

    this.dealValueInit();
    
    setTimeout(() => {
      this.bjplayer.setHand(this.deck.shuffledCard[this.currentCardCount]); //this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(350,260, `deck playerDeck${[this.bjplayer.handCount]}`, this.deck.card[this.bjplayer.hand[this.bjplayer.handCount]]); //this.putCard(350,260, this.deck.card[this.playerHand[0]]);  // player first card
      this.bjplayer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
    }, 0);
    
    setTimeout(() => {
      this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(350,80, `deck dealerDeck${[this.bjdealer.handCount]}`, this.deck.card.back);  // dealer first card : shows back side
      this.bjdealer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
    },300);

    setTimeout(() => {
      this.bjplayer.setHand(this.deck.shuffledCard[this.currentCardCount]); //this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(380,260, `deck playerDeck${[this.bjplayer.handCount]}`, this.deck.card[this.bjplayer.hand[this.bjplayer.handCount]]); //this.putCard(400,260, this.deck.card[this.playerHand[1]]);  // player second
      this.bjplayer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
    },600);

    setTimeout(() => {
      this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(380,80, `deck dealerDeck${[this.bjdealer.handCount]}`, this.deck.card[this.bjdealer.hand[this.bjdealer.handCount]]);  // dealer second
      this.bjdealer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
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
      console.log(`player hand : ${this.bjplayer.hand}`);
      console.log(`dealer hand : ${this.bjdealer.hand}`);

      this.bjplayer.setTotal(this.bjplayer.hand);//this.playerTotal = this.getTotal(this.playerHand);
      this.bjdealer.setTotal(this.bjdealer.hand);

      console.log(`player total : ${this.bjplayer.total}`);
      console.log(`dealer total : ${this.bjdealer.total}`);

      //this.showText(250,90,'dealerHand', 'Dealer Hand');
     // this.showText(40,130,'dealerTotal', this.dealerTotal);
      
      //this.showText(250,270,'playerHand', 'Player Hand');
      this.showText(380,235,'playerTotal', this.bjplayer.total);

      console.log(`init: ${this.currentCardCount}`);
      console.log(this.bjplayer);

      if (this.isBlackjack(this.bjdealer.total, this.bjdealer.hand, this.bjplayer.total, this.bjplayer.hand)) {
        return 'blackjack';
        
      } else if (this.isSoftHand(this.bjplayer.total, this.bjplayer.hand)) {
        this.bjplayer.total = this.bjplayer.total + 10;
        //this.showText(30,240,'soft', 'SOFT');
      } else {
        //this.showText(30,240,'soft', '');
        return;        
      }
    }, 1000);    
  }

  // getSplitHandPosition(childpos) {
  //   let parentPos = document.querySelector('.playField').getBoundingClientRect();
  //   let relativePos = {};

  //   relativePos.top = childPos.top - parentPos.top,
  //   relativePos.right = childPos.right - parentPos.right,
  //   relativePos.bottom = childPos.bottom - parentPos.bottom,
  //   relativePos.left = childPos.left - parentPos.left;
  // }

  getNextCard(who) {
    const nextCardClassValue = this.isSplit? (this.isSplitAndLeftHand? `playerDeck${[this.bjplayer.handCount]} splitLeft${[this.bjplayer.splitCount]}` : `playerDeck${[this.secondBJplayer.handCount]} splitRight${[this.secondBJplayer.splitCount]}`) 
                                : `playerDeck${[this.bjplayer.handCount]}`;
    
    const childposClassValue = this.isSplit? (this.isSplitAndLeftHand? `splitLeft${[this.bjplayer.splitCount-1]}` : `splitRight${[this.secondBJplayer.splitCount-1]}`) 
                                : `playerDeck${[this.bjplayer.handCount-1]}` ;
    
    console.log(`getnextcard issplit: ${this.isSplit}, isSplitAndLeftHand: ${this.isSplitAndLeftHand}`);
    
    this.item = document.createElement('img');
    if (who === 'player') {
      this.item.setAttribute('class', `deck ${nextCardClassValue}`); // 다음 카드의 class value 지정
      this.childPos = document.querySelector(`.${childposClassValue}`).getBoundingClientRect(); // 다음 카드를 놓을 위치를 찾기 위해 바로 이전카드의 좌표 정보를 가져온다
    } else {
      this.item.setAttribute('class', `deck dealerDeck${[this.bjdealer.handCount]}`);
      this.childPos = document.querySelector(`.dealerDeck${[this.bjdealer.handCount-1]}`).getBoundingClientRect();
    }

    this.item.setAttribute('src', this.deck.card[this.deck.shuffledCard[this.currentCardCount]]);
    
    let parentPos = document.querySelector('.playField').getBoundingClientRect();
    let relativePos = {};

    relativePos.top = this.childPos.top - parentPos.top,
    relativePos.right = this.childPos.right - parentPos.right,
    relativePos.bottom = this.childPos.bottom - parentPos.bottom,
    relativePos.left = this.childPos.left - parentPos.left;

    this.item.style.position = 'absolute';
    this.item.style.left = `${relativePos.left+30}px`; // this.item.style.left = `${x}px`;
    this.item.style.top = `${relativePos.top}px`; // this.item.style.top = `${y}px`;

    this.playField.appendChild(this.item);

    
    if (!this.isSplit) {
      this.bjplayer.handCount++; // not split hand
    } else if (this.isSplitAndLeftHand) { // split and left hand
      this.bjplayer.handCount++;
      this.bjplayer.splitCount++;
    } else {  // split and right hand
      this.secondBJplayer.handCount++;
      this.secondBJplayer.splitCount++;
    }
    


  }

  hit = () => {
    
    const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
    //const player = this.bjplayer;
    console.log(`init: ${this.deck.shuffledCard}`);
    console.log(`hit: ${this.currentCardCount}`);
    console.log(`hit issplit: ${this.isSplit}, isSplitAndLeftHand: ${this.isSplitAndLeftHand}`);
    
    this.getNextCard('player');
    
    player.hand.push(this.deck.shuffledCard[this.currentCardCount]); //this.bjplayer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
    console.log(`player hand : ${this.bjplayer.hand}`);
    
    player.setTotal(player.hand);//this.playerTotal = this.getTotal(this.playerHand); 
    console.log(`player total : ${player.total}`);
    this.currentCardCount++;
    //player.handCount++;
    //this.px = this.px + 50;
    console.log(`player hand count : ${player.handCount}`);

    if (!player.isDouble) { // check double down
      this.hitAndJudge(player.total, player.hand); // just hit
    } else { // double down
      if (player.total > 21) {
        this.judge(); // double down but over 21...player bust
      } else { 
        this.hitAndJudge(player.total, player.hand);
        this.stay();
      }
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
    const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
    
    if (this.isSoftHand(total, hand)) { // in case of player hand is soft... keep playing
      player.total = player.total + 10;
      if (!this.isSplit) { // not split, single hand
        this.showText(380,235,'playerTotal', player.total);
      } else if (this.isSplitAndLeftHand) { // split, left hand 
        this.showText(230,235,'playerTotal', player.total);
      } else {
        this.showText(500,235,'playerTotal2', player.total);
      }
      return;
    } else if (total <= 21) { // not soft, under 21... keep playing
      if (!this.isSplit) { // not split, single hand
        this.showText(380,235,'playerTotal', player.total);
      } else if (this.isSplitAndLeftHand) { // split, left hand 
        this.showText(230,235,'playerTotal', player.total);
      } else {
        this.showText(500,235,'playerTotal2', player.total);
      }
      return;
    } else { // player bust
      this.judge();
      return;
    }    
  }

  
  // hitAndJudge(total, hand) {
    
    
  //   if (this.isSoftHand(total, hand)) {
  //     this.bjplayer.total = this.bjplayer.total + 10;
  //     this.showText(40,220,'playerTotal', this.bjplayer.total);
  //     return;
  //   } else if (total <= 21) {
  //     this.showText(40,220,'playerTotal', this.bjplayer.total);
  //     return;
  //   } else { // player bust
  //     this.judge();
  //     return;
  //   }    
  // }

  doubleDown() {
    const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
    if ((!this.isSplit) || (this.isSplit && !this.isSplitAndLeftHand)) { this.offHitAndStay(); }
    player.isDouble = true;
    this.hit();
    
    let tmpBet = this.bet.bet;
    let tmpBalance = this.bet.balance;
    this.bet.modifyBalance(tmpBalance-tmpBet, tmpBet*2);

    this.bet.bet = this.bet.bet + tmpBet;
    this.bet.balance = tmpBalance - tmpBet;
    
  }

  

  split() {
    this.onSplitBtn();
    console.log("split");
    this.secondBJplayer = new BJPlayer();

    this.secondBJplayer.hand = this.bjplayer.hand.splice(-1);
    this.bjplayer.setTotal(this.bjplayer.hand);
    this.secondBJplayer.setTotal(this.secondBJplayer.hand);

    this.isSplit = true;
    this.isSplitAndLeftHand = true;
    const playerDeck0 = document.querySelector('.playerDeck0');
    const playerDeck1 = document.querySelector('.playerDeck1');
    playerDeck0.style.left = '';
    playerDeck0.style.right = '400px';
    playerDeck0.setAttribute('class','deck playerDeck0 splitLeft0');
    playerDeck1.setAttribute('class','deck playerDeck1 splitRight0');

    const pointer = document.createElement('img');
    pointer.setAttribute('class', 'pointer pointer');
    
    pointer.setAttribute('src', '/table_games/img/pointer_white.png');
    pointer.style.position = 'absolute';
    pointer.style.left = `240px`; // this.item.style.left = `${x}px`;
    pointer.style.top = `350px`; // this.item.style.top = `${y}px`;

    this.playField.appendChild(pointer);

    const playerTotal = document.querySelector('.playerTotal');
    this.playField.removeChild(playerTotal);
    
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
    this.putCard(350,80, 'deck', this.deck.card[this.bjdealer.hand[0]]);
    this.putCard(380,80, 'deck', this.deck.card[this.bjdealer.hand[1]]);
    this.currentCardCount--; // function putcard already increase currentCardCount
  }

  

  isBlackjack(dealerTotal, dealerHand, playerTotal, playerHand) {
    if ((dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) && (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand))) {
      this.showText(350,200,'judgement', 'BlackJack Tie!!');
      this.onDealBtn();
      this.offHitAndStay();
      this.bet.tie();
      this.chips.onChip();
      return false;

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

    if ((!this.isSplit) || (this.isSplit && !this.isSplitAndLeftHand)) { // in case of not split, or split and finish right hand 
      console.log(`stay  : if condition enter`);
      this.openDealerBackSideCard();

      const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
      
      //this.putCard(350,80, this.card[this.dealerHand[0]]); // dealer back-side card open
      let timer = setInterval(() => { // finish condition : dealer total is higher than 17 and not soft
        let tmp = this.isSoftSeventeen(this.bjdealer.total, this.bjdealer.hand);

        if (tmp >= 17) {
          this.bjdealer.total = tmp;
          this.showText(380,157,'dealerTotal', this.bjdealer.total);
          clearInterval(timer);
          
          
          this.judge(); // check win or lose 

        } else { // dealer must hit under 17
          this.getNextCard();        
          this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
          this.bjdealer.setTotal(this.bjdealer.hand);
          this.showText(380,157,'dealerTotal', this.bjdealer.total);
          this.currentCardCount++;
          this.bjdealer.handCount++;
          // this.dx = this.dx + 50;

          console.log(`dealer hand : ${this.bjdealer.hand}`);
          console.log(`dealer total : ${this.bjdealer.total}`);
        }
      }, 500);
    } else if (this.isSplit && this.isSplitAndLeftHand) { // split and finish left hand
      
      this.isSplitAndLeftHand = false;
      this.pointer = document.querySelector('.pointer');
      this.pointer.setAttribute('class', 'pointer pointerRight');

    }   
  }

  judge() {
    const player = this.isSplit ? this.bjplayer : this.bjplayer;
    const secondBJplayer = this.secondBJplayer;  

    if (!this.isSplit) { // not split, single hand play
      if (this.bjdealer.total === player.total) { //tie
        this.showText(350,200,'judgement','Tie!!');
        this.bet.tie(this.bet.bet);
             
      } else if (player.total > 21) { // player bust
        
        this.showText(380,220,'playerTotal', player.total);
        this.showText(350,200,'judgement','player bust!! dealer win');  
        this.openDealerBackSideCard();  
        this.bet.lose();
  
      } else if (this.bjdealer.total > 21) { // dealer bust       
        this.showText(350,200,'judgement','dealer bust!! player win');
        this.bet.win(this.bet.bet);      
      
      } else if (player.total > this.bjdealer.total) { // player win        
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
      return;

    } else if (this.isSplit && this.isSplitAndLeftHand) { // split, Left hand just have finished
      // left hand can judge the bust only without finish right hand 
      if (player.total > 21) { // player bust
        
        this.showText(230,220,'playerTotal', player.total);
        this.showText(230,200,'judgement','bust!');  
        //this.openDealerBackSideCard();  
        //this.bet.lose();
      }   

      this.isSplitAndLeftHand = false;

      this.pointer = document.querySelector('.pointer');
      this.pointer.setAttribute('class', 'pointer pointerRight');

      return;

    } else { // split, Right hand finish
      // left and right hands compare with dealer hand unless they are still not bust

      if ((player.total < 22) && (secondBJplayer.total > 21)) { // left hand still playing, but right hand bust
        this.showText(500,235,'playerTotal2', secondBJplayer.total);
        this.showText(500,200,'judgement2','bust!');
        this.openDealerBackSideCard();

        // dealer card flip
        setTimeout(() => {
          let timer = setInterval(() => { // finish condition : dealer total is higher than 17 and not soft
            let tmp = this.isSoftSeventeen(this.bjdealer.total, this.bjdealer.hand);
      
            if (tmp >= 17) {
              this.bjdealer.total = tmp;
              this.showText(380,157,'dealerTotal', this.bjdealer.total);
              clearInterval(timer);
                
            } else { // dealer must hit under 17
              this.getNextCard();        
              this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
              this.bjdealer.setTotal(this.bjdealer.hand);
              this.showText(380,157,'dealerTotal', this.bjdealer.total);
              this.currentCardCount++;
              this.bjdealer.handCount++;
              
            }
          }, 50);
        }, 500);

        // left hand judge
        setTimeout(() => {
          if (this.bjdealer.total === player.total) { //tie
            this.showText(230,200,'judgement','Tie!!');
            //this.bet.tie(this.bet.bet);             
      
          } else if (this.bjdealer.total > 21) { // dealer bust       
            this.showText(230,200,'judgement','dealer bust!! player win');
            //this.bet.win(this.bet.bet);      
          
          } else if (player.total > this.bjdealer.total) { // player win        
            this.showText(230,200,'judgement','Player Win');
            //this.bet.win(this.bet.bet);
      
          } else if (player.total < this.bjdealer.total) {
            this.showText(230,200,'judgement','Dealer Win'); // dealer win
            //this.bet.lose();
          }
        }, 800);


      } else if (secondBJplayer.total < 22) {  // split, left and right hand both playing

        // Left hand judge if Left hand playing
        if (player.total < 22) {
          if (this.bjdealer.total === player.total) { //tie
            this.showText(230,200,'judgement','Tie!!');
            //this.bet.tie(this.bet.bet);             
      
          } else if (this.bjdealer.total > 21) { // dealer bust       
            this.showText(230,200,'judgement','dealer bust!! player win');
            //this.bet.win(this.bet.bet);      
          
          } else if (player.total > this.bjdealer.total) { // player win        
            this.showText(230,200,'judgement','Player Win');
            //this.bet.win(this.bet.bet);
      
          } else if (player.total < this.bjdealer.total) {
            this.showText(230,200,'judgement','Dealer Win'); // dealer win
            //this.bet.lose();
          } 
        }
        //Right hand judge
        if (this.bjdealer.total === secondBJplayer.total) { //tie
          this.showText(500,200,'judgement2','Tie!!');
          //this.bet.tie(this.bet.bet);             
    
        } else if (this.bjdealer.total > 21) { // dealer bust       
          this.showText(500,200,'judgement2','dealer bust!! player win');
          //this.bet.win(this.bet.bet);      
        
        } else if (secondBJplayer.total > this.bjdealer.total) { // player win        
          this.showText(500,200,'judgement2','Player Win');
          //this.bet.win(this.bet.bet);
    
        } else if (secondBJplayer.total < this.bjdealer.total) {
          this.showText(500,200,'judgement2','Dealer Win'); // dealer win
          //this.bet.lose();
        }
      } else if ((player.total > 21) && (secondBJplayer.total > 21)){
        // both hand bust, just open the dealer card
        this.showText(500,235,'playerTotal2', secondBJplayer.total);
        this.showText(500,200,'judgement2','bust!');
        this.openDealerBackSideCard();
      }

      this.onDealBtn();
      this.offHitAndStay();
      this.chips.onReset();
      this.chips.onChip();
      this.isSplit = false;

    }
  }

  // judge() {
    
    
  //   if (this.bjdealer.total === this.bjplayer.total) { //tie
  //     this.showText(350,200,'judgement','Tie!!');
  //     this.bet.tie(this.bet.bet);
           
  //   } else if (this.bjplayer.total > 21) { // player bust
      
  //     this.showText(40,220,'playerTotal', this.bjplayer.total);
  //     this.showText(350,200,'judgement','player bust!! dealer win');  
  //     this.openDealerBackSideCard();  
  //     this.bet.lose();

  //   } else if (this.bjdealer.total > 21) { // dealer bust       
  //     this.showText(350,200,'judgement','dealer bust!! player win');
  //     this.bet.win(this.bet.bet);      
    
  //   } else if (this.bjplayer.total > this.bjdealer.total) { // player win        
  //     this.showText(350,200,'judgement','Player Win');
  //     this.bet.win(this.bet.bet);

  //   } else {
  //     this.showText(350,200,'judgement','Dealer Win'); // dealer win
  //     this.bet.lose();
  //   }

  //   // round finish and prepare next round
  //   this.onDealBtn();
  //   this.offHitAndStay();
  //   this.chips.onReset();
  //   this.chips.onChip();
  // }
  
  
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
    
    this.dealBtn.disabled = false;
  }

  offDealBtn() {
    
    this.dealBtn.disabled = true;
    
  }

  onHitAndStay() {
    
    this.hitBtn.disabled = false;
    this.doubleBtn.disabled = false;
    this.splitBtn.disabled = false;
    this.stayBtn.disabled = false;
  }

  offHitAndStay() { // after round, wait for bet and deal
   
    this.hitBtn.disabled = true;
    this.doubleBtn.disabled = true;
    this.splitBtn.disabled = true;
    this.stayBtn.disabled = true;
    
  }

  onSplitBtn() {
    if (this.bjplayer.hand[0].substr(1) === this.bjplayer.hand[1].substr(1)) {
      this.splitBtn.disabled = false;
    }
  }


}
