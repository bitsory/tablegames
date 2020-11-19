'use strict';

export default class BlackJack {

  cardDeck = []; 
  shuffledCard = [];
  currentCardCount = 0;

  px = 200;
  py = 200;
  dx = 200;
  dy = 100;   
  playerHand = [];
  dealerHand = [];
  playerTotal = 0;
  dealerTotal = 0;
  playerHandCount = 2;
  dealerHandCount = 2;  

  card = {
    SA: '/table_games/img/AS.png',        
    S2: '/table_games/img/2S.png',
    S3: '/table_games/img/3S.png',
    S4: '/table_games/img/4S.png',
    S5: '/table_games/img/5S.png',
    S6: '/table_games/img/6S.png',
    S7: '/table_games/img/7S.png',
    S8: '/table_games/img/8S.png',
    S9: '/table_games/img/9S.png',
    S10: '/table_games/img/10S.png',
    SJ: '/table_games/img/JS.png',
    SQ: '/table_games/img/QS.png',
    SK: '/table_games/img/KS.png',
  
    HA: '/table_games/img/AH.png',
    H2: '/table_games/img/2H.png',
    H3: '/table_games/img/3H.png',
    H4: '/table_games/img/4H.png',
    H5: '/table_games/img/5H.png',
    H6: '/table_games/img/6H.png',
    H7: '/table_games/img/7H.png',
    H8: '/table_games/img/8H.png',
    H9: '/table_games/img/9H.png',
    H10: '/table_games/img/10H.png',
    HJ: '/table_games/img/JH.png',
    HQ: '/table_games/img/QH.png',
    HK: '/table_games/img/KH.png',
  
    DA: '/table_games/img/AD.png',        
    D2: '/table_games/img/2D.png',
    D3: '/table_games/img/3D.png',
    D4: '/table_games/img/4D.png',
    D5: '/table_games/img/5D.png',
    D6: '/table_games/img/6D.png',
    D7: '/table_games/img/7D.png',
    D8: '/table_games/img/8D.png',
    D9: '/table_games/img/9D.png',
    D10: '/table_games/img/10D.png',
    DJ: '/table_games/img/JD.png',
    DQ: '/table_games/img/QD.png',
    DK: '/table_games/img/KD.png',
  
    CA: '/table_games/img/AC.png',        
    C2: '/table_games/img/2C.png',
    C3: '/table_games/img/3C.png',
    C4: '/table_games/img/4C.png',
    C5: '/table_games/img/5C.png',
    C6: '/table_games/img/6C.png',
    C7: '/table_games/img/7C.png',
    C8: '/table_games/img/8C.png',
    C9: '/table_games/img/9C.png',
    C10: '/table_games/img/10C.png',
    CJ: '/table_games/img/JC.png',
    CQ: '/table_games/img/QC.png',
    CK: '/table_games/img/KC.png',
    
    back: '/table_games/img/back.png'
      
  };


  constructor() {
    this.mainField = document.querySelector('.mainField');
    this.playField = document.querySelector('.playField');
    
      

    console.log("blackjack initialized...");

    /*
    this.item = document.createElement('img');
    this.item.setAttribute('class', 'deck');
    this.item.setAttribute('src', this.cardBack);

    this.item2 = document.createElement('img');
    this.item2.setAttribute('class', 'deck');
    this.item2.setAttribute('src', this.card.SA);

    this.item.style.position = 'absolute';
    this.item.style.left = `10px`;
    this.item.style.top = `10px`;

    this.item2.style.position = 'absolute';
    this.item2.style.left = `20px`;
    this.item2.style.top = `20px`;

    setTimeout(() => {
      this.playField.appendChild(this.item);

    }, 100);

    setTimeout(() => {
        this.playField.appendChild(this.item2);

    }, 200);
    */

    
    this.playControlField = document.querySelector('.playControlField');
    this.testBtn = document.querySelector('.startBtn');

    

    //this.mainField.appendChild(this.item);
    //this.mainField.appendChild(this.item2);
    //this.playControlField.removeChild(this.testBtn);

    this.dealBtn = document.createElement('button');
    this.dealBtn.setAttribute('class', 'ctlBtn dealBtn');        
    this.dealBtn.style.position = 'absolute';
    this.dealBtn.innerHTML = 'Deal';
    this.dealBtn.style.left = `100px`;

    this.hitBtn = document.createElement('button');
    this.hitBtn.setAttribute('class', 'ctlBtn hitBtn');
    this.hitBtn.style.position = 'absolute';
    this.hitBtn.innerHTML = 'Hit';
    this.hitBtn.style.left = `200px`;

    this.stayBtn = document.createElement('button');
    this.stayBtn.setAttribute('class', 'ctlBtn stayBtn');
    this.stayBtn.style.position = 'absolute';
    this.stayBtn.innerHTML = 'Stay';
    this.stayBtn.style.left = `300px`;

    

    
    
    this.playControlField.appendChild(this.dealBtn);
    this.playControlField.appendChild(this.hitBtn);
    this.playControlField.appendChild(this.stayBtn);



    

    if (this.playField.hasChildNodes) {
      
      console.log("field check");
      this.playField.innerHTML = '';
      this.shuffle();
    }
    
    
    

    this.dealBtn.addEventListener('click', () => {
      
      this.playField.innerHTML = '';
      this.init();
      // this.showText(5,110,'dealerHand', 'Dealer Hand');
      // //this.showText(40,130,'dealerTotal', this.dealerTotal);
      // this.showText(5,200,'playerHand', 'Player Hand');
      // this.showText(40,220,'playerTotal', this.playerTotal);      
    });
    
    this.hitBtn.addEventListener('click', () => this.hit());

    this.stayBtn.addEventListener('click', () => this.stay());

  }  // constructor
    
   



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


  dealInit() {
    this.px = 200;
    this.py = 200;
    this.dx = 200;
    this.dy = 100;
    
    this.playerHand = [];
    this.dealerHand = [];
    this.playerTotal = 0;
    this.dealerTotal = 0;
    this.playerHandCount = 2;
    this.dealerHandCount = 2;
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

    this.dealInit();

    this.playerHand.push(this.shuffledCard[this.currentCardCount]);
    this.putCard(100,200, this.card[this.playerHand[0]]);  // player first card
    
    this.dealerHand.push(this.shuffledCard[this.currentCardCount]);
    this.putCard(100,100, this.card.back);  // dealer first card : shows back side
    
    this.playerHand.push(this.shuffledCard[this.currentCardCount]);
    this.putCard(150,200, this.card[this.playerHand[1]]);  // player second
    
    this.dealerHand.push(this.shuffledCard[this.currentCardCount]);
    this.putCard(150,100, this.card[this.dealerHand[1]]);  // dealer second
    

    console.log(`player hand : ${this.playerHand}`);
    console.log(`dealer hand : ${this.dealerHand}`);

    this.playerTotal = this.getTotal(this.playerHand);
    this.dealerTotal = this.getTotal(this.dealerHand);

    console.log(`player total : ${this.playerTotal}`);
    console.log(`dealer total : ${this.dealerTotal}`);

    this.showText(5,110,'dealerHand', 'Dealer Hand');
    //this.showText(40,130,'dealerTotal', this.dealerTotal);
    this.showText(5,200,'playerHand', 'Player Hand');
    this.showText(40,220,'playerTotal', this.playerTotal);

    if (this.isBlackjack(this.dealerTotal, this.dealerHand, this.playerTotal, this.playerHand)) {
      return;
      
    } else if (this.isSoftHand(this.playerTotal, this.playerHand)) {
      this.playerTotal = this.playerTotal + 10;
      this.showText(30,240,'soft', 'SOFT');
    } else {
      this.showText(30,240,'soft', '');
      return;
      
    }
  
  }

  hit() {
    
    this.getNextCard(this.px, this.py);
    
    this.playerHand.push(this.shuffledCard[this.currentCardCount]);
    console.log(`player hand : ${this.playerHand}`);
    
    this.playerTotal = this.getTotal(this.playerHand); 

    this.hitAndJudge(this.playerTotal, this.playerHand);

    this.currentCardCount++;
    this.playerHandCount++;
    this.px = this.px + 50;
    
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
    } else {
      this.showText(40,220,'playerTotal', this.playerTotal);
      this.showText(10,300,'dealerWin','player bust!! dealer win');
      return;
    }
    
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

  

  isBlackjack(dealerTotal, dealerHand, playerTotal, playerHand) {
    if ((dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) && (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand))) {
      this.showText(15,240,'blackjackTie', 'Tie BlackJack!!');
      return true;

    } else if (dealerTotal === 11 && this.isSoftHand(dealerTotal, dealerHand)) {
      this.showText(15,150,'dealerBlackjack', 'BlackJack!!');                
      this.putCard(100,100, this.card[this.dealerHand[0]]); // dealer back-side card open
      return true;

    } else if (playerTotal === 11 && this.isSoftHand(playerTotal, playerHand)) {
      this.showText(15,240,'playerBlackjack', 'BlackJack!!');
      this.putCard(100,100, this.card[this.dealerHand[0]]);  // dealer back-side card open
      this.$playerTotal = document.querySelector('.playerTotal');
      this.playField.removeChild(this.$playerTotal);
                
      return true;

    } else {
      return false;
    }      
  }

  isSoftSeventeen(total, hand) {

    if (total <= 7 && (hand.indexOf("SA") !== -1 || hand.indexOf("CA") !== -1 || hand.indexOf("DA") !== -1 || hand.indexOf("HA") !== -1)) {
      console.log("soft17");
      return total;

    } else if (total > 7 && total <= 11 && (hand.indexOf("SA") !== -1 || hand.indexOf("CA") !== -1 || hand.indexOf("DA") !== -1 || hand.indexOf("HA") !== -1)) {
      console.log("soft18");
      return total + 10;

    } else { 
      console.log("hard");
      return total;
    }
  }


  stay() {
    this.putCard(100,100, this.card[this.dealerHand[0]]); // dealer back-side card open
    let timer = setInterval(() => { // 종료조건 : dealer total 17 이상, not soft
      let tmp = this.isSoftSeventeen(this.dealerTotal, this.dealerHand);

      if (tmp >= 17) {
        this.dealerTotal = tmp;
        this.showText(40,130,'dealerTotal', this.dealerTotal);
        clearInterval(timer);
        this.judge();

      } else {
        this.getNextCard(this.dx, this.dy);        
        this.dealerHand.push(this.shuffledCard[this.currentCardCount]);
        this.dealerTotal = this.getTotal(this.dealerHand);
        this.showText(40,130,'dealerTotal', this.dealerTotal);
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
      this.showText(10,300,'tie','Tie!!');
    }

    else if (this.dealerTotal > 21) { // dealer bust       
      this.showText(10,300,'playerWin','dealer bust!! player win');

    /*  
    } else if (this.playerTotal > 21) {        
      this.showText(10,300,'dealerWin','player bust!! dealer win');
    */
    } else if (this.playerTotal > this.dealerTotal) {        
      this.showText(10,300,'playerWin','player Win');

    } else         
      this.showText(10,300,'dealerWin','dealer Win');
  }

  getNextCard(x, y) {
    this.item = document.createElement('img');
    this.item.setAttribute('class', 'deck');
    this.item.setAttribute('src', this.card[this.shuffledCard[this.currentCardCount]]);

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



  shuffle() {
    let card = ['SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
                'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK',
                'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK',
                'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
                ];  
    
    let num = this.getRandomDeck(0,51,52);

    console.log(num);
    
    for (let i = 0; i < 52 ; i++) {     
      this.shuffledCard.push(card[num[i]]);
    }    
    
    console.log(this.shuffledCard);
    
  }
    
  getRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  getRandomDeck(min, max, count) {
      
    let result = [];

    while(1)
    {
      // store the number which from function getRandom in the varable index   
      // getRandom 으로 뽑힌 숫자를 변수 index에 저장
      let index = this.getRandom(min, max); 
  
      // remove repetition index value
      if (result.indexOf(index) > -1) { // index 값의 중복제거
        continue;
      }

      //insert to result array 
      result.push(index);  // getRandom 으로 뽑힌 숫자를 result 배열에 삽입
      console.log(`count = ${count}`)
  
      // exit loop when result array complete 
      if (result.length == count) { // result 배열이 완성되면 종료
        break;
      }
    }
    return result;
  }


}
