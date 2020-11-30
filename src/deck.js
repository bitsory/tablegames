'use strict';

export default class Deck {
  
  shuffledCard = [];  // array of shuffled card deck -> use in each game class

  constructor() {
      console.log("deck initialized...");
      this.shuffle();
  }

  shuffle() {
    let card = ['SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
                'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK',
                'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK',
                'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
                ];  
    
    let num = this.getRandomDeck(0,51,52); // 52 cards, single deck

    //double deck card array : doubledeck = card.concat(card);
    /*
    let doubledeck = card.concat(card);
    console.log(doubledeck);
    */
   
    console.log(num);
    
    for (let i = 0; i < 52 ; i++) {     
      this.shuffledCard.push(card[num[i]]);
    }
    console.log(this.shuffledCard);    
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

  getRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }







}