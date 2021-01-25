'use strict';
import Chips from './chips.js';
import Deck from './deck.js';
import Bet from './bet.js';
import BJDealer from './bj/bjdealer.js';
import BJPlayer from './bj/bjplayer.js';
import BJSubgame from './bj/bjsubgame.js';

export default class BlackJack {

  PLAYER_FIRST_X = 47;
  PLAYER_FIRST_Y = 39;

  PLAYER_SECOND_X = 50;
  PLAYER_SECOND_Y = 39;

  DEALER_FIRST_X = 47;
  DEALER_FIRST_Y = 12;

  DEALER_SECOND_X = 50;
  DEALER_SECOND_Y = 12;
  
  JUDGEMENT_X = 45;
  JUDGEMENT_Y = 31;

  JUDGEMENT_SPLIT_LEFT_X = 30;
  JUDGEMENT_SPLIT_LEFT_Y = 31;

  JUDGEMENT_SPLIT_RIGHT_X = 65;
  JUDGEMENT_SPLIT_RIGHT_Y = 31;

  PLACE_BET_X = 40; 
  PLACE_BET_Y = 31;

  TEXTUP_SINGLE_PLAY = 47;
  TEXTUP_SPLIT_PLAY_LEFT = 30;
  TEXTUP_SPLIT_PLAY_RIGHT = 65;

  DEALER_TOTAL_X = 49;
  DEALER_TOTAL_Y = 26;

  PLAYER_TOTAL_X = 49;
  PLAYER_TOTAL_Y = 36;

  PLAYER_TOTAL_SPLIT_LEFT_X = 32;
  PLAYER_TOTAL_SPLIT_LEFT_Y = 36;

  PLAYER_TOTAL_SPLIT_RIGHT_X = 67;
  PLAYER_TOTAL_SPLIT_RIGHT_Y = 36;

  currentCardCount = 0;

  subgame = [];
  subgameParam = [];
     
  isDouble = false; 
  isSplit = false;
  isSplitAndLeftHand = true;
  isSplitSubgameTie = false;
  rightSubgame = '';
  leftSubgame = '';
  sideBetResult = '';

  constructor(subgameArray) {    

    console.log("blackjack initialized...");
    console.log(`${subgameArray[0]}, ${subgameArray[1]}`);
    this.mainField = document.querySelector('.mainField');
    this.playField = document.querySelector('.playField');
    this.playField.innerHTML = '';
    this.subgame = subgameArray;
    console.log(this.subgame);
    this.leftSubgame = subgameArray[0];
    this.rightSubgame = subgameArray[1];

    this.chips = new Chips();
    this.bet = new Bet(this.leftSubgame, this.rightSubgame);
    this.bjsubgame = new BJSubgame();
    this.deck = new Deck(2);
    this.bjplayer = new BJPlayer();
    this.bjdealer = new BJDealer();
        
    this.playControlField = document.querySelector('.playControlField');
    this.chipControlField = document.querySelector('.chipControlField');
    
    this.dealBtn = document.createElement('input');
    this.hitBtn = document.createElement('input');
    this.doubleBtn = document.createElement('input');
    this.splitBtn = document.createElement('input');
    this.stayBtn = document.createElement('input');

    this.setElementButton(this.dealBtn, 'playBtn', 'img/blackjack/bjplaystart.png', 43, 0,'');
    this.setElementButton(this.hitBtn, 'ctlBtn hitBtn', 'img/blackjack/ctlBtns/hit.png', 15, 50,'');
    this.setElementButton(this.doubleBtn, 'ctlBtn doubleBtn', 'img/blackjack/ctlBtns/double.png', 15, 35,'');
    this.setElementButton(this.splitBtn, 'ctlBtn splitBtn', 'img/blackjack/ctlBtns/split.png', 15, 20,'');
    this.setElementButton(this.stayBtn, 'ctlBtn stayBtn', 'img/blackjack/ctlBtns/stand.png', 75, 50,'');
   
    this.chipControlField.appendChild(this.dealBtn);
    this.playField.appendChild(this.hitBtn);
    this.playField.appendChild(this.doubleBtn);
    this.playField.appendChild(this.stayBtn);
    this.playField.appendChild(this.splitBtn);
    
    this.hideControlBtn();

    //////////////////////  control button event listener //////////////////
    this.dealBtn.addEventListener('click', (event) => { //// deal button event listener ////
      console.log(this.deck.shuffledCard);
      console.log(`current card : ${this.currentCardCount}`);
      console.log(`${this.leftSubgame}, ${this.rightSubgame}`);
      
      this.bet.onclickBetSpot(event);
      this.clearElement('clearItemForNewRound' , '.deck, .soft, .judgement, .judgement2, .placebet, .dealerTotal, .playerTotal, .playerTotal2, .textUp, .rightSidebetWin, .leftSidebetWin');
            
      if (this.bjplayer.mainBet === 0) {
        this.showText(this.PLACE_BET_X, this.PLACE_BET_Y, 'placebet', 'PLACE YOUR BET PLEASE');
        this.clearElement('stackChip', '.stackChip');

        return;
      } else {
        setTimeout(() => {
          this.dealBtn.style.transform = "";
        }, 200);
        this.dealBtn.style.transform = "rotateY(180deg)";
                
        this.bjplayer.setRebet(); /// setup for next round rebet
        this.clearElement('clearItemForNewRound' , '.deck, .soft, .judgement, .judgement2, .placebet, .dealerTotal, .playerTotal, .playerTotal2, .textUp, .rightSidebetWin, .leftSidebetWin');
        //////////////////////  call init function /////////////////              
        
        if (this.init()==='blackjack') {
          return;
        } else {        
          this.showControlBtn();    
          this.offDealBtn();           
          this.chips.offChip(); 
          this.bet.offBet();                        
        } 
      }
    });
    
    this.hitBtn.addEventListener('click', () => this.hit());
    this.doubleBtn.addEventListener('click', () => this.doubleDown());
    this.splitBtn.addEventListener('click', () => this.split());
    this.stayBtn.addEventListener('click', () => this.stay());
   
    this.chips.setChipClickListener(item => {      
      if (item === 'reset') {
        this.resetBet();
      } else if (item === 'rebet') {
        this.rebet();      
      } else if (item === 'shuffle') {
        //} else if (item === 'shuffle' && (this.playField.querySelector('.askShuffleBox') === null)) {
        this.askShuffle();            
      } else 
        this.clickChip(item);      
    });

    this.bet.setBetClickListener(item => this.chips.setBetSpot(item));

    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.mainBet, this.bjplayer.rightSideBet, this.bjplayer.winning);

  }  //////////// constructor end ///////////////////////

  setElementButton(name, attribute, url, left, top, writings) {
    name.setAttribute('class', attribute);    
    name.src = url;
    if(url) {name.type = "image";}
    name.style.position = 'absolute';
    name.style.left = `${left}%`;
    name.style.top = `${top}%`; 
    if(writings) {name.innerHTML = writings;}
  }

  askShuffle() {
    this.chips.offChip();
    const shuffleModalBox = document.createElement('div');
    shuffleModalBox.setAttribute('class', 'askShuffleBox');
    this.playField.appendChild(shuffleModalBox);

    const item = document.createElement('span');
    const allowShuffleBtn = document.createElement('button');
    const denyShuffleBtn = document.createElement('button');

    this.setElementButton(item, 'askingShuffle', '', 25, 30, 'Do you want new shuffle?');    
    this.setElementButton(allowShuffleBtn, 'shuffleBoxBtn', '', 25, 60, 'Shuffle');
    this.setElementButton(denyShuffleBtn, 'shuffleBoxBtn', '', 65, 60, 'No');
    item.style.color = '#ffffff';
    shuffleModalBox.appendChild(item);
    shuffleModalBox.appendChild(allowShuffleBtn);
    shuffleModalBox.appendChild(denyShuffleBtn);  
    
    allowShuffleBtn.addEventListener('click', ()=> {
      this.deck = new Deck(2);
      this.currentCardCount = 0;
      this.playField.removeChild(shuffleModalBox);
      this.chips.onChip();
      this.clearElement('clear', '.deck, .judgement, .judgement2, .dealerTotal, .playerTotal, .playerTotal2, .textUp, .rightSidebetWin, .leftSidebetWin, .stackChip');
    });

    denyShuffleBtn.addEventListener('click', ()=> {
      this.playField.removeChild(shuffleModalBox);
      this.chips.onChip();
    });

  }

  rebet() {
    this.clearElement('clear', '.deck, .judgement, .judgement2, .dealerTotal, .playerTotal, .playerTotal2, .textUp, .rightSidebetWin, .leftSidebetWin');
    const mainRebet = this.bjplayer.mainRebet;
    const rightSideRebet = this.bjplayer.rightSideRebet;
    const leftSideRebet = this.bjplayer.leftSideRebet;
    if (mainRebet == 0 || mainRebet === this.bjplayer.mainBet) {
      return;
    } else {
      this.resetBet();
      this.bjplayer.setMainBet(mainRebet);
      this.bjplayer.setRightSideBet(rightSideRebet);
      this.bjplayer.setLeftSideBet(leftSideRebet);
      this.bjplayer.setBalance(mainRebet + rightSideRebet + leftSideRebet);
      this.bet.stackUpChip(mainRebet, 'set', 'main');
      this.bet.stackUpChip(rightSideRebet, 'set', 'rightside');    
      this.bet.stackUpChip(leftSideRebet, 'set', 'leftside'); 
      this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.mainBet, this.bjplayer.rightSideBet + this.bjplayer.leftSideBet, this.bjplayer.winning);
    }
  }

  resetBet() {    
    let clearBet = - this.bjplayer.mainBet - this.bjplayer.rightSideBet - this.bjplayer.leftSideBet;
    this.clearElement('clear', '.deck, .judgement, .judgement2, .dealerTotal, .playerTotal, .playerTotal2, .textUp, .rightSidebetWin, .leftSidebetWin, .stackChip');
    this.bjplayer.setBalance(clearBet);
    this.bjplayer.initBetAndWinning();    
    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.mainBet, this.bjplayer.rightSideBet,this.bjplayer.winning);
  }

  clickChip(item) {    
    let index = this.chips.betSpot;
    if (!index || item === 'reset' || item === 'rebet' || item === 'shuffle' || item === 'config') {
      
      return;  
    }
    console.log(index);    
    this.bjplayer.setBalance(item);

    if (index === 'main') {      
      console.log("mainbet");
      this.clearElement('stackChip', '.mainBetStackChip, .winMainBetStackChip');
      this.bjplayer.setMainBet(item);      
      this.bet.stackUpChip(this.bjplayer.mainBet, 'set', 'main');      
    
    } else if(index === 'rightSide') {
      console.log("right sidebet");
      this.clearElement('stackChip', '.rightSideBetStackChip');
      this.bjplayer.setRightSideBet(item);      
      this.bet.stackUpChip(this.bjplayer.rightSideBet, 'set', 'rightside');

    } else if(index === 'leftSide') {
      console.log("left sidebet");
      this.clearElement('stackChip', '.leftSideBetStackChip');
      this.bjplayer.setLeftSideBet(item);      
      this.bet.stackUpChip(this.bjplayer.leftSideBet, 'set', 'leftside');
    }
    this.clearElement('clear', '.deck, .judgement, .dealerTotal, .playerTotal, .textUp, .rightSidebetWin, .leftSidebetWin');
    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.mainBet, this.bjplayer.rightSideBet,this.bjplayer.winning);
  }

 
      
  isBlackjack(dealerTotal, dealerHand, playerTotal, playerHand) {
    if ((dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) && (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand))) {
      this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement', 'BlackJack Tie!!');      
      this.bjplayer.tie();
      return true;

    } else if (dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) {
      this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement', 'Dealer BlackJack!!');                
      this.bjplayer.lose();
      return true;

    } else if (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand)) {
      let blackjackPayout = this.bjplayer.mainBet * 1.5;
      this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement', 'BlackJack!!');
      this.clearElement('playerTotal', '.playerTotal');
      this.bjplayer.blackjack();
      this.bet.stackUpChip(blackjackPayout, 'win', 'main');
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




  showText(x, y, name, query) {
    const item = document.createElement('div');
    item.setAttribute('class', name);    
    item.style.position = 'absolute';
    if (x && y) {
      item.style.left = `${x}%`;
      item.style.top = `${y}%`;
    }
    item.style.color = '#ffffff';
    this.playField.appendChild(item);

    const text = document.querySelector(`.${name}`);
    text.innerHTML = query;

  }


  dealValueInit() {    
    this.isSplit = false;
    this.isSplitAndLeftHand = true;
    this.sideBetResult = '';
    this.bjplayer.init();
    this.bjdealer.init();    
  }


  putCard(x, y, name='deck', card) {
    const deck = document.createElement('img');
    deck.setAttribute('class', name);    
    deck.setAttribute('src', card);
    deck.style.position = 'absolute';
    deck.style.left = `${x}%`;
    deck.style.top = `${y}%`;
    this.playField.appendChild(deck);
    this.currentCardCount++;
    console.log(`putcard : ${this.currentCardCount}`);    
  }

  init() {
    this.dealValueInit();
    
    setTimeout(() => {
      this.bjplayer.setHand(this.deck.shuffledCard[this.currentCardCount]); 
      this.putCard(this.PLAYER_FIRST_X , this.PLAYER_FIRST_Y, `deck playerDeck${[this.bjplayer.handCount]}`, this.deck.card[this.bjplayer.hand[this.bjplayer.handCount]]);  // player first card
      this.bjplayer.handCount++;      
    }, 0);
    
    setTimeout(() => {
      this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(this.DEALER_FIRST_X , this.DEALER_FIRST_Y, `deck dealerDeck${[this.bjdealer.handCount]}`, this.deck.card.back);  // dealer first card : shows back side
      this.bjdealer.handCount++;
      
    },300);

    setTimeout(() => {
      this.bjplayer.setHand(this.deck.shuffledCard[this.currentCardCount]); 
      this.putCard(this.PLAYER_SECOND_X , this.PLAYER_SECOND_Y, `deck playerDeck${[this.bjplayer.handCount]}`, this.deck.card[this.bjplayer.hand[this.bjplayer.handCount]]); // player second
      this.bjplayer.handCount++;
      
    },600);

    setTimeout(() => {
      this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
      this.putCard(this.DEALER_SECOND_X , this.DEALER_SECOND_Y, `deck dealerDeck${[this.bjdealer.handCount]}`, this.deck.card[this.bjdealer.hand[this.bjdealer.handCount]]);  // dealer second
      this.bjdealer.handCount++;
      
    },900);

    setTimeout(() => {
      
      this.bjplayer.setTotal(this.bjplayer.hand);
      this.bjdealer.setTotal(this.bjdealer.hand);
     
      this.showText(this.PLAYER_TOTAL_X, this.PLAYER_TOTAL_Y,'playerTotal', this.bjplayer.total);
            
      //// subgame check and payout /////
      (this.rightSubgame != 'tie') && this.checkAndPaySubgame(this.rightSubgame, this.bjplayer.rightSideBet, 'right');
      (this.leftSubgame != 'tie') && this.checkAndPaySubgame(this.leftSubgame, this.bjplayer.leftSideBet, 'left');
      //// if tie is subgame call checkAndPaySubgame func after judge the hand 

      if (this.isBlackjack(this.bjdealer.total, this.bjdealer.hand, this.bjplayer.total, this.bjplayer.hand)) {
        this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.mainBet, this.bjplayer.rightSideBet,this.bjplayer.winning);
        this.bet.textUp(this.TEXTUP_SINGLE_PLAY, this.bjplayer.mainBet, this.bjplayer.winIndex);
        this.openDealerBackSideCard();
        this.prepareNextRound();
        return 'blackjack';        
      } 
      if (this.isSoftHand(this.bjplayer.total, this.bjplayer.hand)) {
        this.bjplayer.total = this.bjplayer.total + 10;        
      } 
      if (this.onSplitBtn) {this.playField.appendChild(this.splitBtn);}
      
      this.dealBtn.setAttribute('class', 'playBtn playBtnAnimation');
      

    }, 1000);    
  }

  prepareSubgameParameter(index) {
    switch (index) {
      case 'lucky' : {
        return [this.bjplayer.hand[0], this.bjplayer.hand[1], this.bjdealer.hand[1]];
      }
      case 'kings' : {
        return [this.bjplayer.hand[0], this.bjplayer.hand[1]];
      }
      case 'trilux' : {
        return [this.bjplayer.hand[0], this.bjplayer.hand[1], this.bjdealer.hand[1]];
      }
      case 'pair' : {
        return [this.bjplayer.hand[0], this.bjplayer.hand[1]];
      }
      case 'tie' : {
        return [this.bjplayer.total, this.bjdealer.total];
      }
      case 'tieSplit' : {
        return [this.bjplayer.total, this.secondBJplayer.total, this.bjdealer.total];
      }
    }
  }

  checkAndPaySubgame(subgameIndex, bet, direction) {
        
    let subgameParam = this.prepareSubgameParameter(subgameIndex);    
    let payoutSidebet = this.bjsubgame.checkSubgame(subgameIndex, subgameParam, bet);
    console.log(`checkAndPaySubgame : ${subgameIndex}`);
    console.log(`checkAndPaySubgame : ${subgameParam}`);
    console.log(`checkAndPaySubgame : ${payoutSidebet}`);

    if (payoutSidebet && !this.isSplitSubgameTie) {
      this.bet.stackUpChip(payoutSidebet[0], 'winSidebet', `${direction}Side`);      
      this.showText('', '', `${direction}SidebetWin`, payoutSidebet[1]);
    } else if (payoutSidebet && this.isSplitSubgameTie) {
      console.log(`map left : ${payoutSidebet.get('left')}`);
      console.log(`map right : ${payoutSidebet.get('right')}`);
      
      payoutSidebet.get('left') && this.bet.stackUpChip(payoutSidebet.get('left'), 'winSidebet', `${direction}Side`);
      payoutSidebet.get('right') && this.bet.stackUpChip(payoutSidebet.get('right'), 'winSidebet', `${direction}Side`);
    }

    //////////////////// lose side bet ///////////
    if (!payoutSidebet && subgameIndex != 'tie' && !this.isSplitSubgameTie) { /// general subgame
      console.log("not tie sidebet, clear not tie side bet");      

      let parentPos = document.querySelector('.playField').getBoundingClientRect();
      let relativePos = {};
      let childPos = document.querySelector(`.${direction}SideBetStackChip`).getBoundingClientRect();
      relativePos.left = (childPos.left - parentPos.left) / parentPos.width * 100;
      relativePos.top = (childPos.top - parentPos.top) / parentPos.height * 100;
      console.log(relativePos);
      const loseItem = document.querySelectorAll(`.${direction}SideBetStackChip`);
      
      this.bet.animateLoseBet({duration: 1500,
        //timing: bounceEaseInOut,
        
        // timing(timeFraction) {
        // return timeFraction;
        // },
        back(x, timeFraction) {
          return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
        },
        draw: function(progress) {
          loseItem.forEach((item) => {
            
            
              //item.style.bottom = 38 + progress * 100 + '%';
              //let itemPosYNum = parseInt(item.style.bottom);
              //console.log(item.style.bottom);
              //console.log(itemPosYNum);
            //while(itemPosYNum) {
              if (direction === 'left' && parseInt(item.style.bottom) <100) { 
                item.style.left = relativePos.left + progress * 10 + '%';
                item.style.bottom = 38 + progress * 100 + '%';
                if (parseInt(item.style.bottom) >90 || parseInt(item.style.bottom) >100) {
                  console.log("stop draw & disappear");
                  //item.style.opacity = "0";
                  item.style.display = "none";
                }
                //console.log(`left : ${itemPosYNum}`);
              }
              else if (direction === 'right' && parseInt(item.style.bottom) <100) {
                item.style.right = relativePos.left + progress * 10 + '%';
                item.style.bottom = 38 + progress * 100 + '%';
                if (parseInt(item.style.bottom) >90 || parseInt(item.style.bottom) >100) {
                  console.log("stop draw & disappear");
                  //item.style.opacity = "0";
                  item.style.display = "none";
                }
                //console.log(`right : ${itemPosYNum}`);
              } 
            //}
          });          
        }
      });
      //this.clearElement('clearTieSidebet', `.${direction}SideBetStackChip`);         
    } else if (!payoutSidebet && subgameIndex === 'tie' && !this.isSplitSubgameTie) { /// tie subgame
      console.log("tie sidebet, clear tie side bet");
      this.clearElement('clearTieSidebet', `.tieSideBetStackChip`);
    } else if (this.isSplitSubgameTie && (!(payoutSidebet.get('left')) || !(payoutSidebet.get('right'))) ) {  /// tie split subgame
      if (!(payoutSidebet.get('left')) && this.isSplitSubgameTie) {
        console.log("tie split sidebet, clear tie split left side bet");
        //this.clearElement('clearTieSidebet', `.tieSideBetStackChip`);
        this.clearElement('clearTieSidebet', `.tieLeftSideBetStackChip`);
      }      
      if (!(payoutSidebet.get('right')) && this.isSplitSubgameTie) {
        console.log("tie split sidebet, clear tie split right side bet");
        this.clearElement('clearTieSidebet', `.tieRightSideBetStackChip`);
      }
    }    
  }

  back(x, timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
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
    const doubleIndex = this.isSplit ? (this.isSplitAndLeftHand? 'splitChipLeft' : 'splitChipRight') : 'main';
    if ((!this.isSplit) || (this.isSplit && !this.isSplitAndLeftHand)) { this.offHitAndStay(); } // button off
    
    player.isDouble = true;    

    player.setDouble();

    if (player === this.secondBJplayer) {
      console.log("double second player");
      this.bjplayer.balance = this.bjplayer.balance - player.mainBet/2}
    let bet = player.mainBet + (this.isSplit? this.secondBJplayer.mainBet : 0);
    //console.log(`double : ${player.bet}, ${this.secondBJplayer.bet}`);
    console.log(`double : ${bet}`);
    this.bet.modifyBalance(this.bjplayer.balance, bet, this.bjplayer.rightSideBet, player.winning);
    this.bet.stackUpChip(player.mainBet/2, 'double', doubleIndex);
    this.hit();  // isDouble would be true -> just one card can be draw
    // require double btn disabled code insert
    
  }

  split() {
    this.secondBJplayer = new BJPlayer();
    
    this.secondBJplayer.hand = this.bjplayer.hand.splice(-1);
    this.bjplayer.setTotal(this.bjplayer.hand);
    this.secondBJplayer.setTotal(this.secondBJplayer.hand);

    this.secondBJplayer.setMainBet(this.bjplayer.mainBet);
    this.bjplayer.setBalance(this.bjplayer.mainBet);

    this.bet.modifyBalance(this.bjplayer.balance, this.bjplayer.mainBet + this.secondBJplayer.mainBet, this.bjplayer.rightSideBet, this.bjplayer.winning + this.secondBJplayer.winning);
    

    this.isSplit = true;
    this.isSplitAndLeftHand = true;
    

    const playerDeck0 = document.querySelector('.playerDeck0');
    const playerDeck1 = document.querySelector('.playerDeck1');
    playerDeck0.style.left = '30%';
    playerDeck0.style.right = '';
    playerDeck0.setAttribute('class','deck playerDeck0 splitLeft0');
    playerDeck1.setAttribute('class','deck playerDeck1 splitRight0');

    const mainBetStackUPChipLeft = document.querySelectorAll('.mainBetStackChip');
    mainBetStackUPChipLeft && mainBetStackUPChipLeft.forEach( (item) => {
      const cln = item.cloneNode(true);
      item.style.left = '30.5%';
      item.setAttribute('class','stackChip mainBetStackChip splitChipLeftBetStackChip');      
        
      cln.style.right = '';
      cln.setAttribute('class','stackChip mainBetStackChip splitChipRightBetStackChip');
      this.playField.appendChild(cln);   
    });

    
    if (this.rightSubgame === 'tie' || this.leftSubgame === 'tie') {
      this.isSplitSubgameTie = true;
      const tieSidebet = document.querySelectorAll('.tieSideBetStackChip');
      console.log(tieSidebet);
      tieSidebet && tieSidebet.forEach((item) => {
        const cln = item.cloneNode(true);
        console.log(cln);
        item.style.left = '30.5%';
        item.setAttribute('class','stackChip sideBetStackChip tieLeftSideBetStackChip'); 

         cln.style.right = ''; 
         cln.setAttribute('class','stackChip sideBetStackChip tieRightSideBetStackChip');  
                  
        if (this.rightSubgame === 'tie') {
          //this.rightSubgame = 'tieSplit';
          console.log(`this.rightSubgame : ${this.rightSubgame}`);
          console.log(cln);
          
          cln.setAttribute('class','stackChip sideBetStackChip tieRightSideBetStackChip');
         
        } else if (this.leftSubgame === 'tie') {
          //this.leftSubgame = 'tieSplit';
          console.log(`this.leftSubgame : ${this.leftSubgame}`);
          console.log(cln);
          //cln.forEach((item) => item.style.marginLeft = '25%');
          //cln.style.right = ''; 
          cln.style.marginLeft = '25%'
          //cln.setAttribute('class','stackChip sideBetStackChip tieRightSideBetStackChip');
          
        }      
        
        this.playField.appendChild(cln);
      });
      this.rightSubgame = 'tieSplit';  
      this.leftSubgame = 'tieSplit';

      console.log(`split: ${this.bjplayer.total}, ${this.secondBJplayer.total}`);

    } 
    
 
    const pointer = document.createElement('img');
    pointer.setAttribute('class', 'pointer animated css');
    
    pointer.setAttribute('src', 'img/pointer_white.png');
    pointer.style.position = 'absolute';
    pointer.style.left = `32%`; // this.item.style.left = `${x}px`;
    pointer.style.top = `54%`; // this.item.style.top = `${y}px`;

    this.playField.appendChild(pointer);

    const playerTotal = document.querySelector('.playerTotal');
    this.playField.removeChild(playerTotal);

    this.splitBtn.disabled = true;
        
    if (this.bjplayer.total === 1 && this.secondBJplayer.total=== 1) {  ///// check for ace split
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
    this.clearElement('dealerDeck', '.dealerDeck0, .dealerDeck1');
    this.putCard(this.DEALER_FIRST_X, this.DEALER_FIRST_Y, 'deck dealerDeck0', this.deck.card[this.bjdealer.hand[0]]);
    this.putCard(this.DEALER_SECOND_X, this.DEALER_SECOND_Y, 'deck dealerDeck1', this.deck.card[this.bjdealer.hand[1]]);
    this.currentCardCount = this.currentCardCount -2; // function putcard already increase currentCardCount
  }

  stay() {
    if ((!this.isSplit) || (this.isSplit && !this.isSplitAndLeftHand)) { // in case of not split, or split and finish right hand 
      console.log(`stay  : if condition enter`);
      this.openDealerBackSideCard();
      console.log(`current card : ${this.currentCardCount}`);

      //const player = this.isSplit ? (this.isSplitAndLeftHand? this.bjplayer : this.secondBJplayer) : this.bjplayer;
      
      let timer = setInterval(() => { // finish condition : dealer total is higher than 17 and not soft
        let tmp = this.isSoftSeventeen(this.bjdealer.total, this.bjdealer.hand);

        if (tmp >= 17) {
          this.bjdealer.total = tmp;
          //this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
          clearInterval(timer);         
          this.judge(); // check win or lose 

        } else { // dealer must hit under 17
          this.getNextCard('dealer');        
          this.bjdealer.hand.push(this.deck.shuffledCard[this.currentCardCount]);
          this.bjdealer.setTotal(this.bjdealer.hand);
          //this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
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
        this.showText(this.PLAYER_TOTAL_X, this.PLAYER_TOTAL_Y, 'playerTotal', player.total);
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y, 'judgement','player bust!! dealer win');  
        this.openDealerBackSideCard();  
        player.lose();
          
      } else if (this.bjdealer.total > 21) { // dealer bust       
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement','dealer bust!! player win');
        player.win();
                      
      } else if (player.total > this.bjdealer.total) { // player win        
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement','Player Win');
        player.win();        
          
      } else {
        this.showText(this.JUDGEMENT_X, this.JUDGEMENT_Y,'judgement','Dealer Win'); // dealer win
        player.lose();        
        
      }

      this.payStackUpChip();      
      this.bet.modifyBalance(player.balance, player.mainBet, player.rightSideBet, player.winning);
      this.bet.textUp(this.TEXTUP_SINGLE_PLAY, player.mainBet, player.winIndex);
      this.bet.animateBalance(player.BalanceOfBeginningRound, player.BalanceOfBeginningRound + player.winning, 1000);
      (this.rightSubgame === 'tie') && this.checkAndPaySubgame(this.rightSubgame, this.bjplayer.rightSideBet, 'right');
      (this.leftSubgame === 'tie') && this.checkAndPaySubgame(this.leftSubgame, this.bjplayer.leftSideBet, 'left');
      this.prepareNextRound();      
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
        this.showText(this.PLAYER_TOTAL_SPLIT_RIGHT_X, this.PLAYER_TOTAL_SPLIT_RIGHT_Y,'playerTotal2', secondBJplayer.total);
        this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHT_Y,'judgement2','bust!');

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
                  
          } else if (this.bjdealer.total > 21) { // dealer bust       
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','dealer bust!! player win');
            player.win();
                      
          } else if (player.total > this.bjdealer.total) { // player win        
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','Player Win');
            player.win();
                  
          } else if (player.total < this.bjdealer.total) {
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y,'judgement','Dealer Win'); // dealer win
            player.lose();
            
          }
          
          //this.isSplit = false;

          let tmpWin = player.winning + secondBJplayer.winning;
          let tmpMainBet = player.mainBet + secondBJplayer.mainBet;
          let tmpSideBet = player.rightSideBet + secondBJplayer.rightSideBet;
          console.log(`split modify tmpWin: ${tmpWin}`);
          console.log(`split modify Wining: ${player.winning}, ${secondBJplayer.winning}`);
          console.log(`split modify Wining: ${player.winIndex}, ${secondBJplayer.winIndex}`);
      
          this.payStackUpChip();
          this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
          this.bet.textUp(this.TEXTUP_SPLIT_PLAY_LEFT, player.mainBet, player.winIndex, 'left');
          this.bet.textUp(this.TEXTUP_SPLIT_PLAY_RIGHT, secondBJplayer.mainBet, secondBJplayer.winIndex, 'right');
          this.bet.modifyBalance(player.balance, tmpMainBet, tmpSideBet, tmpWin);
          this.bet.animateBalance(player.BalanceOfBeginningRound, player.BalanceOfBeginningRound + tmpWin, 1000);
          if (this.isSplitSubgameTie) {            
            this.checkAndPaySubgame(this.rightSubgame, this.bjplayer.rightSideBet, 'tieRight');
            this.checkAndPaySubgame(this.leftSubgame, this.bjplayer.leftSideBet, 'tieLeft');
            console.log("tie split check and pay");
          }

          this.prepareNextRound();
          //this.clearElement('pointer', '.pointerRight');
        }, 800);

        return;

      ////////////////////////// split, left and right hand both playing ///////////////////////////
      } else if (secondBJplayer.total < 22) {  

        // Left hand judge if Left hand playing
        if (player.total < 22) {
          if (this.bjdealer.total === player.total) { //tie
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','Tie!!');
            player.tie();
                  
          } else if (this.bjdealer.total > 21) { // dealer bust       
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','dealer bust!! player win');
            player.win();
                      
          } else if (player.total > this.bjdealer.total) { // player win        
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','Player Win');
            player.win();
                  
          } else if (player.total < this.bjdealer.total) {
            this.showText(this.JUDGEMENT_SPLIT_LEFT_X, this.JUDGEMENT_SPLIT_LEFT_Y, 'judgement','Dealer Win'); // dealer win
            player.lose();
            
          } 
        }
        /////////////////////  Right hand judge
        if (this.bjdealer.total === secondBJplayer.total) { //tie
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHT_Y, 'judgement2','Tie!!');
          secondBJplayer.tie();
          player.balance = player.balance + secondBJplayer.bet;
              
        } else if (this.bjdealer.total > 21) { // dealer bust       
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHT_Y,'judgement2','dealer bust!! player win');
          secondBJplayer.win();
          player.balance = player.balance + secondBJplayer.winning;  /// secondplayer win affect to bjplayer balance
                  
        } else if (secondBJplayer.total > this.bjdealer.total) { // player win        
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHT_Y,'judgement2','Player Win');
          secondBJplayer.win();
          player.balance = player.balance + secondBJplayer.winning;  /// secondplayer win affect to bjplayer balance
              
        } else if (secondBJplayer.total < this.bjdealer.total) {
          this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHT_Y,'judgement2','Dealer Win'); // dealer win
          secondBJplayer.lose();          
        }


      } else if ((player.total > 21) && (secondBJplayer.total > 21)){
        ///// both hand bust, just open the dealer card
        this.showText(this.PLAYER_TOTAL_SPLIT_RIGHT_X, this.PLAYER_TOTAL_SPLIT_RIGHT_Y,'playerTotal2', secondBJplayer.total);
        this.showText(this.JUDGEMENT_SPLIT_RIGHT_X, this.JUDGEMENT_SPLIT_RIGHT_Y,'judgement2','bust!');
        player.lose();
        secondBJplayer.lose();
        this.openDealerBackSideCard();
      }
      
      console.log(`split modify bal: ${player.balance}`);
      let tmpWin = player.winning + secondBJplayer.winning;
      let tmpMainBet = player.mainBet + secondBJplayer.mainBet;
      let tmpSideBet = player.rightSideBet + secondBJplayer.rightSideBet;      

      // console.log(`split modify bet: ${player.bet}, ${secondBJplayer.bet}`);
      
      console.log(`split modify tmpWin: ${tmpWin}`);
      console.log(`split modify beginning balance: ${player.BalanceOfBeginningRound}, ${secondBJplayer.BalanceOfBeginningRound}`);
      //console.log(`split modify balance: ${player.BalanceOfBeginningRound}, ${secondBJplayer.BalanceOfBeginningRound}`);
      console.log(`split modify Wining: ${player.winning}, ${secondBJplayer.winning}`);
      console.log(`split modify WinIndex: ${player.winIndex}, ${secondBJplayer.winIndex}`);

      this.payStackUpChip();
      this.showText(this.DEALER_TOTAL_X, this.DEALER_TOTAL_Y,'dealerTotal', this.bjdealer.total);
      this.bet.textUp(this.TEXTUP_SPLIT_PLAY_LEFT, player.mainBet, player.winIndex, 'left');
      this.bet.textUp(this.TEXTUP_SPLIT_PLAY_RIGHT, secondBJplayer.mainBet, secondBJplayer.winIndex, 'right');
      this.bet.modifyBalance(player.balance, tmpMainBet, tmpSideBet, tmpWin);
      this.bet.animateBalance(player.BalanceOfBeginningRound, player.BalanceOfBeginningRound + tmpWin, 1000);

      if (this.isSplitSubgameTie) {            
        this.checkAndPaySubgame(this.rightSubgame, this.bjplayer.rightSideBet, 'tieRight');
        this.checkAndPaySubgame(this.leftSubgame, this.bjplayer.leftSideBet, 'tieLeft');
        console.log("tie split check and pay");
      }
      this.prepareNextRound();
      
    }
    
  }


  ////////////////////////////////////////////////////////////////////////////////////////

  payStackUpChip() {
    const player = this.isSplit ? ([this.bjplayer, this.secondBJplayer]) : [this.bjplayer];
    console.log(player.length);
    console.log(player);
    for (let i = 0; i < player.length; i++) {
      if ( player[i].winIndex && (player[i].winIndex === 'win')) {
        // console.log("pay stack up chip win");
        // console.log(player[i]);
        // console.log(`${player[i].winIndex}`);
        const index = this.isSplit ? ( i === 0? 'splitChipLeft' : 'splitChipRight') : 'main';
        this.bet.stackUpChip(player[i].mainBet, 'win', index);
      } else if (player[i].winIndex === 'lose') { 
        // console.log("lose stackup clear");
        const index = this.isSplit ? ( i === 0? '.splitChipLeftBetStackChip' : '.splitChipRightBetStackChip') : '.mainBetStackChip';
        this.clearElement('stackChip', index); 
      }
    }
  }

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

  hideControlBtn() {
    this.hitBtn.style.visibility = "hidden";
    this.doubleBtn.style.visibility = "hidden";
    this.splitBtn.style.visibility = "hidden";
    this.stayBtn.style.visibility = "hidden";
  }

  showControlBtn() {
    this.hitBtn.style.visibility = "visible";
    this.doubleBtn.style.visibility = "visible";
    this.splitBtn.style.visibility = "visible";
    this.stayBtn.style.visibility = "visible";
  }

  onSplitBtn() {    
    
    if (this.bjplayer.numberRecognize(this.bjplayer.hand[0]) === this.bjplayer.numberRecognize(this.bjplayer.hand[1])) {return true;} 
    else {return false;}
    //return true;
  }

  onDoubleDownBtn(player) {
    if (player.hand.length === 2) {
      this.doubleBtn.disabled = false;
    }
  }

  prepareNextRound() {
    this.isSplit = false;
    this.isSplitSubgameTie = false;
    this.onDealBtn();
    this.onHitAndStay();
    this.hideControlBtn();    
    this.chips.onChip();
    this.bet.onBet();
    this.bjplayer.initBetAndWinning(); 
    this.dealBtn.setAttribute('class', 'playBtn');
    this.clearElement('prepareNextRound','.pointerRight');
    this.leftSubgame = this.subgame[0];
    this.rightSubgame = this.subgame[1];
    
    
    console.log("prepare next round");
  }

}
