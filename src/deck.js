'use strict';

export default class Deck {
  
  shuffledCard = [];  // array of shuffled card deck -> use in each game class
  resultDeck = [];  // array of how many decks. not shuffled yet.

  card = {
    SA: '/table_games/img/deck/AS.png',        
    S2: '/table_games/img/deck/2S.png',
    S3: '/table_games/img/deck/3S.png',
    S4: '/table_games/img/deck/4S.png',
    S5: '/table_games/img/deck/5S.png',
    S6: '/table_games/img/deck/6S.png',
    S7: '/table_games/img/deck/7S.png',
    S8: '/table_games/img/deck/8S.png',
    S9: '/table_games/img/deck/9S.png',
    S10: '/table_games/img/deck/10S.png',
    SJ: '/table_games/img/deck/JS.png',
    SQ: '/table_games/img/deck/QS.png',
    SK: '/table_games/img/deck/KS.png',
  
    HA: '/table_games/img/deck/AH.png',
    H2: '/table_games/img/deck/2H.png',
    H3: '/table_games/img/deck/3H.png',
    H4: '/table_games/img/deck/4H.png',
    H5: '/table_games/img/deck/5H.png',
    H6: '/table_games/img/deck/6H.png',
    H7: '/table_games/img/deck/7H.png',
    H8: '/table_games/img/deck/8H.png',
    H9: '/table_games/img/deck/9H.png',
    H10: '/table_games/img/deck/10H.png',
    HJ: '/table_games/img/deck/JH.png',
    HQ: '/table_games/img/deck/QH.png',
    HK: '/table_games/img/deck/KH.png',
  
    DA: '/table_games/img/deck/AD.png',        
    D2: '/table_games/img/deck/2D.png',
    D3: '/table_games/img/deck/3D.png',
    D4: '/table_games/img/deck/4D.png',
    D5: '/table_games/img/deck/5D.png',
    D6: '/table_games/img/deck/6D.png',
    D7: '/table_games/img/deck/7D.png',
    D8: '/table_games/img/deck/8D.png',
    D9: '/table_games/img/deck/9D.png',
    D10: '/table_games/img/deck/10D.png',
    DJ: '/table_games/img/deck/JD.png',
    DQ: '/table_games/img/deck/QD.png',
    DK: '/table_games/img/deck/KD.png',
  
    CA: '/table_games/img/deck/AC.png',        
    C2: '/table_games/img/deck/2C.png',
    C3: '/table_games/img/deck/3C.png',
    C4: '/table_games/img/deck/4C.png',
    C5: '/table_games/img/deck/5C.png',
    C6: '/table_games/img/deck/6C.png',
    C7: '/table_games/img/deck/7C.png',
    C8: '/table_games/img/deck/8C.png',
    C9: '/table_games/img/deck/9C.png',
    C10: '/table_games/img/deck/10C.png',
    CJ: '/table_games/img/deck/JC.png',
    CQ: '/table_games/img/deck/QC.png',
    CK: '/table_games/img/deck/KC.png',
    
    back: '/table_games/img/deck/back.png'
      
  };

  defualtDeck = ['SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
          'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK',
          'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK',
          'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
  ];

  
  
  constructor(count) {
      console.log("deck initialized...");
      this.shuffle(count); 
      //this.shuffledCard = ['H10', 'H7', 'H10', 'H6', 'H10', 'H10', 'H10','H10','CK'];
      //this.shuffledCard = ['H10', 'H5', 'H10', 'H8', 'H10', 'H10', 'H10','H10','CK'];
      //this.shuffledCard = ['H5', 'H5', 'H5', 'H8', 'H10', 'H10', 'H10','H10','CK'];
      //this.shuffledCard = ['H10', 'H10', 'H10', 'H10', 'H10', 'H10', 'H10','H10','CK'];
      //this.shuffledCard = ['HA', 'H10', 'S7', 'H10', 'H6', 'H8', 'H10','H10','CK'];
  }

  shuffle(count) {
    const lengthOfCard = this.defualtDeck.length * count;
    this.howManyDecks(count);
    const num = this.getRandomDeck(0, lengthOfCard-1, lengthOfCard); 

    console.log(num);
    
    for (let i = 0; i < lengthOfCard ; i++) {     
      this.shuffledCard.push(this.resultDeck[num[i]]);
    }
    console.log(this.shuffledCard);    
  } 


  howManyDecks(count) {
    if (count === 0) // recusive break condition
      return;
    else {
      this.resultDeck = this.resultDeck.concat(this.defualtDeck);
      console.log(count);
      this.howManyDecks(count-1);    
    }
  };


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