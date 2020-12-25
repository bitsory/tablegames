'use strict';

export default class BJPublic {
    
    getTotal(index) {
        let total = 0;
        for (let i = 0; i < index.length; i++) {
          total = total + this.numberRecognize(index[i]);
        }
        console.log(`public total : ${total}`);
        return total;
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
}