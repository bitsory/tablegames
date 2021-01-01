'use strict';
import Chips from './chips.js';
import Deck from './deck.js';
import BJLucky from './bj/bjlucky.js';
import Bet from './bet.js';
import BJPlayer from './bj/bjPlayer.js';
import BJDealer from './bj/bjdealer.js';

export default class BlackJack {
  
  JUDGEMENT_X = 45;
  JUDGEMENT_Y = 33;

  JUDGEMENT_SPLIT_LEFT_X = 30;
  JUDGEMENT_SPLIT_LEFT_Y = 33;

  JUDGEMENT_SPLIT_RIGHT_X = 63;
  JUDGEMENT_SPLIT_RIGHTY = 33;

  PLACE_BET_X = 40; 
  PLACE_BET_Y = 33;

  TEXTUP_SINGLE_PLAY = 47;
  TEXTUP_SPLIT_PLAY_LEFT = 32;
  TEXTUP_SPLIT_PLAY_RIGHT = 65;

  DEALER_TOTAL_X = 47;
  DEALER_TOTAL_Y = 27;

  PLAYER_TOTAL_X = 47;
  PLAYER_TOTAL_Y = 39;

  PLAYER_TOTAL_SPLIT_LEFT_X = 32;
  PLAYER_TOTAL_SPLIT_LEFT_Y = 39;

  PLAYER_TOTAL_SPLIT_RIGHT_X = 65;
  PLAYER_TOTAL_SPLIT_RIGHT_Y = 39;

  currentCardCount = 0;
   
  isDouble = false; 
  isSplit = false;
  isSplitAndLeftHand = true;
  
  constructor(subgame) {
    

    console.log("blackjack initialized...");
    this.mainField = document.querySelector('.mainField');
    this.playField = document.querySelector('.playField');
    this.playField.innerHTML = '';

    if (subgame === 'BJlucky') {
      this.bjlucky = new BJLucky();
    } else if (subgame === 'BJkings') {
      this.bjkings = new BJLucky();
    }
    
    this.chips = new Chips();
    this.bet = new Bet();
    this.deck = new Deck(2);
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
    this.splitBtn.innerHTML = 'SPLIT';
    this.splitBtn.style.left = `200px`;

    this.stayBtn = document.createElement('button');
    this.stayBtn.setAttribute('class', 'ctlBtn stayBtn');
    //this.stayBtn.style.position = 'absolute';
    this.stayBtn.innerHTML = 'STAY';
    this.stayBtn.style.left = `300px`;
    
   
    // this.buttonMaker('dealBtn', 'ctlBtn dealBtn', 'DEAL START');
    // this.buttonMaker('this.hitBtn', 'ctlBtn hitBtn', 'HIT');
    // this.buttonMaker('this.doubleBtn', 'ctlBtn doubleBtn', 'Double Down! X2');
    // this.buttonMaker('this.splitBtn', 'ctlBtn splitBtn', 'SPLIT');
    // this.buttonMaker('this.stayBtn', 'ctlBtn stayBtn', 'STAY');

   


    this.playControlField.appendChild(this.dealBtn);
    this.playControlField.appendChild(this.hitBtn);
    this.playControlField.appendChild(this.doubleBtn);
    this.playControlField.appendChild(this.splitBtn);
    this.playControlField.appendChild(this.stayBtn);
    
    this.offHitAndStay();

    //////////////////////  control button event listener //////////////////
    this.dealBtn.addEventListener('click', () => {
      //this.bet = this.bet.bet;
      if (this.bjplayer.bet === 0) {
        this.showText(this.PLACE_BET_X, this.PLACE_BET_Y, 'placebet', 'PLACE YOUR BET PLEASE');
        return;
      } else {
        
        this.clearElement('clearItemForNewRound' , '.deck, .soft, .judgement, .judgement2, .placebet, .dealerTotal, .playerTotal, .playerTotal2, .textUp');
                
        if (this.init()==='blackjack') {
          return;
        } else {
          this.offDealBtn();
          this.onHitAndStay();          
          this.chips.offReset();
          this.chips.offChip(); 
          this.bjlucky.offBet();         
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
        this.resetBet();
      } else 
      this.clickChip(item)
    });

    this.bjlucky.setClickListener(item => {      
      this.BJClickItem(item)
      
      this.clearElement('textUp' , '.textUp');
    });

    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.bet, this.bjplayer.winning);

  }  /// constructor

  resetBet() {    
    this.clearElement('stackUpChip', '.stackUpChip');
    //this.bjlucky.resetBetStack();
    this.bjplayer.setBalance(-this.bjplayer.bet);
    this.bjplayer.initBetAndWinning();    
    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.bet, this.bjplayer.winning);
  }

  clickChip(item) {    
    this.bjlucky.setBJluckyBet(item);
  }

  BJClickItem(item) {
    this.bjplayer.setBet(item);
    this.bjplayer.setBalance(item);
    this.clearElement('stackUpChip', '.stackUpChip');
    //this.bjlucky.setBetStack(item);
    this.bjlucky.stackUpChip(this.bjplayer.bet);
    
    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.bet, this.bjplayer.winning);
  }
      
  isBlackjack(dealerTotal, dealerHand, playerTotal, playerHand) {
    if ((dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) && (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand))) {
      this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement', 'BlackJack Tie!!');      
      this.openDealerBackSideCard();
      this.bjplayer.tie();
      this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.bet, this.bjplayer.winning, 'tie');      
      return true;

    } else if (dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) {
      this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement', 'Dealer BlackJack!!');                
      this.openDealerBackSideCard();      
      this.bjplayer.lose();
      this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.bet, this.bjplayer.winning, 'lose');      
      return true;

    } else if (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand)) {
      this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement', 'BlackJack!!');
      this.openDealerBackSideCard();      
      this.bjplayer.blackjack();
      this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.bet, this.bjplayer.winning, 'blackjack');      
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




  showText(x,y,name,text) {
    this.item = document.createElement('span');
    this.item.setAttribute('class', name);
    
    this.item.style.position = 'absolute';
    this.item.style.left = `${x}%`;
    this.item.style.top = `${y}%`;
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
    
  }


  putCard(x, y, name='deck', card) {

    this.item = document.createElement('img');
    this.item.setAttribute('class', name);
    //this.item.setAttribute('src', this.card[this.shuffledCard[this.currentCardCount]]);
    this.item.setAttribute('src', card);

    this.item.style.position = 'absolute';
    this.item.style.left = `${x}%`;
    this.item.style.top = `${y}%`;

    this.playField.appendChild(this.item);

    this.currentCardCount++;
    console.log(`putcard : ${this.currentCardCount}`);

    
  }

  init() {

    this.dealValueInit();
    
    setTimeout(() => {
      this.bjplayer.setHand(this.deck.shuffledCard[this.currentCardCount]); //this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(45,43, `deck playerDeck${[this.bjplayer.handCount]}`, this.deck.card[this.bjplayer.hand[this.bjplayer.handCount]]); //this.putCard(350,260, this.deck.card[this.playerHand[0]]);  // player first card
      //this.putCard(350,260, `deck playerDeck${[this.bjplayer.handCount]}`, this.deck.card[this.bjplayer.hand[this.bjplayer.handCount]]); //this.putCard(350,260, this.deck.card[this.playerHand[0]]);  // player first card
      this.bjplayer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
    }, 0);
    
    setTimeout(() => {
      this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(45,13, `deck dealerDeck${[this.bjdealer.handCount]}`, this.deck.card.back);  // dealer first card : shows back side
      this.bjdealer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
    },300);

    setTimeout(() => {
      this.bjplayer.setHand(this.deck.shuffledCard[this.currentCardCount]); //this.playerHand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(48,43, `deck playerDeck${[this.bjplayer.handCount]}`, this.deck.card[this.bjplayer.hand[this.bjplayer.handCount]]); //this.putCard(400,260, this.deck.card[this.playerHand[1]]);  // player second
      this.bjplayer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
    },600);

    setTimeout(() => {
      this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(48,13, `deck dealerDeck${[this.bjdealer.handCount]}`, this.deck.card[this.bjdealer.hand[this.bjdealer.handCount]]);  // dealer second
      this.bjdealer.handCount++;
      console.log(`init: ${this.currentCardCount}`);
    },900);

    setTimeout(() => {      
      this.bjplayer.setTotal(this.bjplayer.hand);//this.playerTotal = this.getTotal(this.playerHand);
      this.bjdealer.setTotal(this.bjdealer.hand);
     
      this.showText(this.PLAYER_TOTAL_X, this.PLAYER_TOTAL_Y,'playerTotal', this.bjplayer.total);

      if (this.isBlackjack(this.bjdealer.total, this.bjdealer.hand, this.bjplayer.total, this.bjplayer.hand)) {
        
        this.bet.textUp(this.TEXTUP_SINGLE_PLAY, this.bjplayer.bet, this.bjplayer.winIndex);
        
        this.prepareNextRound();
        // this.onDealBtn();
        // this.offHitAndStay();
        // this.chips.onChip();
        // this.chips.onReset();
        // this.bjlucky.onBet();
        // this.bjplayer.initBetAndWinning();        
        return 'blackjack';
        
      } else if (this.isSoftHand(this.bjplayer.total, this.bjplayer.hand)) {
        this.bjplayer.total = this.bjplayer.total + 10;        
      } else {        
        return;        
      }
    }, 1000);    
  }


  getNextCard(who) {
    console.log(`who : ${who}`);
    const nextCardClassValue = this.isSplit? (this.isSplitAndLeftHand? `playerDeck${[this.bjplayer.handCount]} splitLeft${[this.bjplayer.splitCount]}` : `playerDeck${[this.secondBJplayer.handCount]} splitRight${[this.secondBJplayer.splitCount]}`) 
                                : `playerDeck${[this.bjplayer.handCount]}`;
    
    const childposClassValue = this.isSplit? (this.isSplitAndLeftHand? `splitLeft${[this.bjplayer.splitCount-1]}` : `splitRight${[this.secondBJplayer.splitCount-1]}`) 
                                : `playerDeck${[this.bjplayer.handCount-1]}`;
    
    console.log(`getnextcard issplit: ${this.isSplit}, isSplitAndLeftHand: ${this.isSplitAndLeftHand}`);
    
    this.item = document.createElement('img');
    if (!(who === 'dealer')) { // player hit
      this.item.setAttribute('class', `deck ${nextCardClassValue}`); // 다음 카드의 class value 지정
      this.childPos = document.querySelector(`.${childposClassValue}`).getBoundingClientRect(); // 다음 카드를 놓을 위치를 찾기 위해 바로 이전카드의 좌표 정보를 가져온다
    } else if (who === 'dealer') {  /// dealer hit
      this.item.setAttribute('class', `deck dealerDeck${[this.bjdealer.handCount]}`);
      this.childPos = document.querySelector(`.dealerDeck${[this.bjdealer.handCount-1]}`).getBoundingClientRect();
    }

    this.item.setAttribute('src', this.deck.card[this.deck.shuffledCard[this.currentCardCount]]);
    
    let parentPos = document.querySelector('.playField').getBoundingClientRect();
    let relativePos = {};

    relativePos.top = (this.childPos.top - parentPos.top) / parentPos.height * 100,
    relativePos.left = (this.childPos.left - parentPos.left) / parentPos.width * 100;
    
    this.item.style.position = 'absolute';
    if (who && who.isDouble) {
      this.item.style.transform = 'rotate(90deg)';       
    }
    this.item.style.left = `${relativePos.left +3}%`; // this.item.style.left = `${x}px`;
    this.item.style.top = `${relativePos.top}%`; // this.item.style.top = `${y}px`;

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

  hit() {
    
    const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
        
    this.getNextCard(player);
    player.hand.push(this.deck.shuffledCard[this.currentCardCount]); //this.bjplayer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
    player.setTotal(player.hand);//this.playerTotal = this.getTotal(this.playerHand); 
    this.currentCardCount++;
    this.splitBtn.disabled=true;
    if (!this.isSplit) {this.doubleBtn.disabled=true}

    if (!player.isDouble) { // check double down
      this.hitAndJudge(player.total, player.hand); // just hit
    } else { // double down
      if (player.total > 21) {  /// double down but over 21...player bust
        this.judge(); 
      } else { /// double down 
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
        this.showText(this.PLAYER_TOTAL_X, this.PLAYER_TOTAL_Y,'playerTotal', player.total);
      } else if (this.isSplitAndLeftHand) { // split, left hand 
        this.showText(this.PLAYER_TOTAL_SPLIT_LEFT_X, this.PLAYER_TOTAL_SPLIT_LEFT_Y,'playerTotal', player.total);
      } else {  /// split, right hand
        this.showText(this.PLAYER_TOTAL_SPLIT_RIGHT_X, this.PLAYER_TOTAL_SPLIT_RIGHT_Y,'playerTotal2', player.total);
      }
      return;
    } else if (total <= 21) { // not soft, under 21... keep playing
      if (!this.isSplit) { // not split, single hand
        this.showText(this.PLAYER_TOTAL_X, this.PLAYER_TOTAL_Y,'playerTotal', player.total);
      } else if (this.isSplitAndLeftHand) { // split, left hand 
        this.showText(this.PLAYER_TOTAL_SPLIT_LEFT_X, this.PLAYER_TOTAL_SPLIT_LEFT_Y,'playerTotal', player.total);
      } else {
        this.showText(this.PLAYER_TOTAL_SPLIT_RIGHT_X, this.PLAYER_TOTAL_SPLIT_RIGHT_Y,'playerTotal2', player.total);
      }
      return;
    } else { // player bust
      this.judge();
      return;
    }    
  }

  

  doubleDown() {
    const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
    if ((!this.isSplit) || (this.isSplit && !this.isSplitAndLeftHand)) { this.offHitAndStay(); } // button off
    
    player.isDouble = true;    

    player.setDouble();

    if (player === this.secondBJplayer) {this.bjplayer.balance = this.bjplayer.balance - player.bet/2}
    let bet = player.bet + (this.isSplit? this.secondBJplayer.bet : 0);
    //console.log(`double : ${player.bet}, ${this.secondBJplayer.bet}`);
    console.log(`double : ${bet}`);
    this.bet.modifyBalance(this.bjplayer.balance, bet, player.winning);
    this.hit();  // isDouble would be true -> just one card can be draw
    // require double btn disabled code insert
    
  }

  

  split() {
    
    
    console.log("split");
    this.secondBJplayer = new BJPlayer();
    
    this.secondBJplayer.hand = this.bjplayer.hand.splice(-1);
    this.bjplayer.setTotal(this.bjplayer.hand);
    this.secondBJplayer.setTotal(this.secondBJplayer.hand);

    this.secondBJplayer.setBet(this.bjplayer.bet);
    this.bjplayer.setBalance(this.bjplayer.bet);

    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.bet + this.secondBJplayer.bet, this.bjplayer.winning + this.secondBJplayer.winning);
    

    this.isSplit = true;
    this.isSplitAndLeftHand = true;

    const playerDeck0 = document.querySelector('.playerDeck0');
    const playerDeck1 = document.querySelector('.playerDeck1');
    playerDeck0.style.left = '30%';
    playerDeck0.style.right = '';
    playerDeck0.setAttribute('class','deck playerDeck0 splitLeft0');
    playerDeck1.setAttribute('class','deck playerDeck1 splitRight0');

    const pointer = document.createElement('img');
    pointer.setAttribute('class', 'pointer animated css');
    
    pointer.setAttribute('src', '/table_games/img/pointer_white.png');
    pointer.style.position = 'absolute';
    pointer.style.left = `32%`; // this.item.style.left = `${x}px`;
    pointer.style.top = `58%`; // this.item.style.top = `${y}px`;

    this.playField.appendChild(pointer);

    const playerTotal = document.querySelector('.playerTotal');
    this.playField.removeChild(playerTotal);

    this.splitBtn.disabled = true;
        
    if (this.bjplayer.total === 1 && this.secondBJplayer.total=== 1) {
      console.log("ace split");
      setTimeout(()=> { 
        this.hit(); 
        this.stay();
        return;
      }, 500); 


    } else {
      console.log("not ace split");
      setTimeout(()=> { this.hit() }, 500); /// automatically hit one card right after split
    }
  }

  isSoftHand(total, hand) {    
    
    if (total <= 11 && (hand.indexOf("SA") !== -1 || hand.indexOf("CA") !== -1 || hand.indexOf("DA") !== -1 || hand.indexOf("HA") !== -1)) {
      return true;
      
    } else {
      return false;
    }
  }

  openDealerBackSideCard() {
    this.putCard(45,13, 'deck', this.deck.card[this.bjdealer.hand[0]]);
    this.putCard(48,13, 'deck', this.deck.card[this.bjdealer.hand[1]]);
    this.currentCardCount--; // function putcard already increase currentCardCount
  }

  stay() {
    if ((!this.isSplit) || (this.isSplit && !this.isSplitAndLeftHand)) { // in case of not split, or split and finish right hand 
      console.log(`stay  : if condition enter`);
      this.openDealerBackSideCard();

      //const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
      
      let timer = setInterval(() => { // finish condition : dealer total is higher than 17 and not soft
        let tmp = this.isSoftSeventeen(this.bjdealer.total, this.bjdealer.hand);

        if (tmp >= 17) {
          this.bjdealer.total = tmp;
          this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
          clearInterval(timer);         
          this.judge(); // check win or lose 

        } else { // dealer must hit under 17
          this.getNextCard('dealer');        
          this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
          this.bjdealer.setTotal(this.bjdealer.hand);
          this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
          this.currentCardCount++;
          this.bjdealer.handCount++;
         

          console.log(`dealer hand : ${this.bjdealer.hand}`);
          console.log(`dealer total : ${this.bjdealer.total}`);
        }
      }, 500);
    } else if (this.isSplit && this.isSplitAndLeftHand) { // split and finish left hand
      
      this.isSplitAndLeftHand = false;
      this.pointer = document.querySelector('.pointer');
      this.pointer.setAttribute('class', 'pointerRight animated css');
      
      if (this.bjplayer.numberRecognize(this.bjplayer.hand[0]) === 1 
          && this.secondBJplayer.numberRecognize(this.secondBJplayer.hand[0]) === 1) {  /// ace split
        this.hit();  /// automatically hit one card after left hand stay 
        this.stay();
      } else {
        this.hit();
      }      
    }   
  }

  judge() {
    console.log("judge initialized....");
    
    const player = this.isSplit ? this.bjplayer : this.bjplayer;
    const secondBJplayer = this.secondBJplayer;  
    player.setBalanceOfBeginningRound();
    console.log(`judge: ${player} = ${player.BalanceOfBeginningRound}`);

    if (!this.isSplit) { /////// not split, single hand play  ////////////
      
      this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
      if (this.bjdealer.total === player.total) { //tie
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement','Tie!!');        
        player.tie();
                     
      } else if (player.total > 21) { // player bust
        
        //this.showText(this.PLAYER_TOTAL_X,this.PLAYER_TOTAL_Y,'playerTotal', player.total);
        this.showText(this.JUDGEMENT_X,this.JUDGEMENT_Y,'judgement','player bust!! dealer win');  
        this.openDealerBackSideCard();  
        player.lose();
          
      } else if (this.bjdealer.total > 21) { // dealer bust       
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement','dealer bust!! player win');
        player.win(player.bet);
              
      } else if (player.total > this.bjdealer.total) { // player win        
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement','Player Win');
        player.win();
          
      } else {
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement','Dealer Win'); // dealer win
        player.lose();
        
      }

      // round finish and prepare next round
      this.bet.modifyBalance(player.balance, player.bet, player.winning, player.winIndex);
      this.bet.textUp(this.TEXTUP_SINGLE_PLAY, player.bet, player.winIndex);
      this.bet.animateBalance(player.BalanceOfBeginningRound, player.BalanceOfBeginningRound + player.winning, 1000);
      this.prepareNextRound();
      console.log(`${this.bjplayer.balance},${this.bjplayer.bet},${this.bjplayer.winning}`)

      // this.onDealBtn();
      // this.offHitAndStay();
      // this.chips.onReset();
      // this.chips.onChip();
      // this.bjlucky.onBet();
      // player.initBetAndWinning();            
      return;

    //////////////////////////////   split, Left hand just have finished(came from hitAndJudge();)  /////////////////////////
    } else if (this.isSplit && this.isSplitAndLeftHand) { 
      // left hand can judge the bust only without finish right hand 
      if (player.total > 21) { // player(left hand) bust
        
        this.showText(this.PLAYER_TOTAL_SPLIT_LEFT_X, this.PLAYER_TOTAL_SPLIT_LEFT_Y,'playerTotal', player.total);
        this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','bust!');                 
        player.lose();
      }

      this.isSplitAndLeftHand = false;
      this.pointer = document.querySelector('.pointer');
      this.pointer.setAttribute('class', 'pointer pointerRight');
      this.hit();
      return;

    /////////////////////////////////// split, Right hand finish ////////////////////////////
    } else { 
      // left and right hands can compare with dealer hand both of them unless they are still not bust

      if ((player.total < 22) && (secondBJplayer.total > 21)) { // left hand still playing, but right hand bust
        
        this.openDealerBackSideCard();
        secondBJplayer.lose();
        //player.tempBalance = player.tempBalance - secondBJplayer.bet; //right hand bust, affect bjplayer's total balance
        
        this.showText(this.PLAYER_TOTAL_SPLIT_RIGHT_X, this.PLAYER_TOTAL_SPLIT_RIGHT_Y,'playerTotal2', secondBJplayer.total);
        this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHTY,'judgement2','bust!');

        // dealer card flip
        setTimeout(() => {
         let timer = setInterval(() => { // finish condition : dealer total is higher than 17 and not soft
            let tmp = this.isSoftSeventeen(this.bjdealer.total, this.bjdealer.hand);
      
            if (tmp >= 17) {
              this.bjdealer.total = tmp;
              this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
              clearInterval(timer);
                
            } else { // dealer must hit under 17
              this.getNextCard('dealer');        
              this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
              this.bjdealer.setTotal(this.bjdealer.hand);
              this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
              this.currentCardCount++;
              this.bjdealer.handCount++;
              
            }
          }, 50);
        }, 500);

        ////////////////// left hand judge
        setTimeout(() => {
          if (this.bjdealer.total === player.total) { //tie
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','Tie!!');
            player.tie();
            //this.bet.tie(this.bet.bet);             
      
          } else if (this.bjdealer.total > 21) { // dealer bust       
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','dealer bust!! player win');
            player.win();
                      
          } else if (player.total > this.bjdealer.total) { // player win        
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','Player Win');
            player.win();
                  
          } else if (player.total < this.bjdealer.total) {
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','Dealer Win'); // dealer win
            player.lose();
            //this.bet.lose();
          }

          this.isSplit = false;

          console.log(`come on`);
          let tmpWin = player.winning + secondBJplayer.winning;
          let tmpBet = player.bet + secondBJplayer.bet;
          console.log(`split modify tmpWin: ${tmpWin}`);
          console.log(`split modify Wining: ${player.winning}, ${secondBJplayer.winning}`);
          console.log(`split modify Wining: ${player.winIndex}, ${secondBJplayer.winIndex}`);
      
          this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
          this.bet.textUp(this.TEXTUP_SPLIT_PLAY_LEFT, player.bet, player.winIndex, 'left');
          this.bet.textUp(this.TEXTUP_SPLIT_PLAY_RIGHT, secondBJplayer.bet, secondBJplayer.winIndex, 'right');
          this.bet.modifyBalance(player.balance, tmpBet, tmpWin, 'split');
          this.bet.animateBalance(player.BalanceOfBeginningRound, player.BalanceOfBeginningRound + tmpWin, 1000);

          this.prepareNextRound();
          this.clearElement('pointer', '.pointerRight');
        }, 800);

        return;

      ////////////////////////// split, left and right hand both playing ///////////////////////////
      } else if (secondBJplayer.total < 22) {  

        // Left hand judge if Left hand playing
        if (player.total < 22) {
          if (this.bjdealer.total === player.total) { //tie
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','Tie!!');
            player.tie();
            //this.bet.tie(this.bet.bet);             
      
          } else if (this.bjdealer.total > 21) { // dealer bust       
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','dealer bust!! player win');
            player.win();
            //this.bet.win(this.bet.bet);      
          
          } else if (player.total > this.bjdealer.total) { // player win        
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','Player Win');
            player.win();
            //this.bet.win(this.bet.bet);
      
          } else if (player.total < this.bjdealer.total) {
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','Dealer Win'); // dealer win
            player.lose();
            //this.bet.lose();
          } 
        }
        /////////////////////Right hand judge
        if (this.bjdealer.total === secondBJplayer.total) { //tie
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHTY, 'judgement2','Tie!!');
          secondBJplayer.tie();
          player.balance = player.balance + secondBJplayer.bet;
              
        } else if (this.bjdealer.total > 21) { // dealer bust       
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHTY,'judgement2','dealer bust!! player win');
          secondBJplayer.win();
          player.balance = player.balance + secondBJplayer.winning;  /// secondplayer win affect to bjplayer balance
                  
        } else if (secondBJplayer.total > this.bjdealer.total) { // player win        
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHTY,'judgement2','Player Win');
          secondBJplayer.win();
          player.balance = player.balance + secondBJplayer.winning;  /// secondplayer win affect to bjplayer balance
              
        } else if (secondBJplayer.total < this.bjdealer.total) {
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHTY,'judgement2','Dealer Win'); // dealer win
          secondBJplayer.lose();
          
        }


      } else if ((player.total > 21) && (secondBJplayer.total > 21)){
        // both hand bust, just open the dealer card
        this.showText(this.PLAYER_TOTAL_SPLIT_RIGHT_X, this.PLAYER_TOTAL_SPLIT_RIGHT_Y,'playerTotal2', secondBJplayer.total);
        this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHTY,'judgement2','bust!');
        player.lose();
        secondBJplayer.lose();
        this.openDealerBackSideCard();
      }
      
      this.isSplit = false;

      console.log(`split modify bal: ${player.balance}`);
      let tmpWin = player.winning + secondBJplayer.winning;
      let tmpBet = player.bet + secondBJplayer.bet;      

      // console.log(`split modify bet: ${player.bet}, ${secondBJplayer.bet}`);
      
      console.log(`split modify tmpWin: ${tmpWin}`);
      console.log(`split modify beginning balance: ${player.BalanceOfBeginningRound}, ${secondBJplayer.BalanceOfBeginningRound}`);
      //console.log(`split modify balance: ${player.BalanceOfBeginningRound}, ${secondBJplayer.BalanceOfBeginningRound}`);
      console.log(`split modify Wining: ${player.winning}, ${secondBJplayer.winning}`);
      console.log(`split modify WinIndex: ${player.winIndex}, ${secondBJplayer.winIndex}`);

      this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
      this.bet.textUp(this.TEXTUP_SPLIT_PLAY_LEFT, player.bet, player.winIndex, 'left');
      this.bet.textUp(this.TEXTUP_SPLIT_PLAY_RIGHT, secondBJplayer.bet, secondBJplayer.winIndex, 'right');
      this.bet.modifyBalance(player.balance, tmpBet, tmpWin, 'split');
      this.bet.animateBalance(player.BalanceOfBeginningRound, player.BalanceOfBeginningRound + tmpWin, 1000);

      this.prepareNextRound();

      // this.onDealBtn();
      // this.offHitAndStay();
      // this.chips.onReset();
      // this.chips.onChip();
      // this.bjlucky.onBet();
      // this.bjplayer.initBetAndWinning();      

      this.clearElement('pointer', '.pointerRight');

      
    }
    
  }


  ////////////////////////////////////////////////////////////////////////////////////////

  clearElement(name, className) {
    name = document.querySelectorAll(className);
    name && name.forEach( (item) => this.playField.removeChild(item));
  }


  buttonMaker = (btnVal, className, btnName) => {
    
    btnVal = document.createElement('button');
    btnVal.setAttribute('class', className);        
    
    btnVal.innerHTML = btnName;
    btnVal.style.left = `150px`;
    this.playControlField.appendChild(btnVal);
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

  onDoubleDownBtn(player) {
    if (player.hand.length === 2) {
      this.doubleBtn.disabled = false;
    }
  }

  prepareNextRound() {
    this.onDealBtn();
    this.offHitAndStay();
    this.chips.onReset();
    this.chips.onChip();
    this.bjlucky.onBet();
    this.bjplayer.initBetAndWinning(); 
  }


}
