'use strict';

import BJPublic from "./bjpublic.js";

export default class BJSubgame extends BJPublic {
   
    checkSubgame(index, subgameParam, bet) {
        switch (index) {
            case 'lucky' : return this.subgameLucky(subgameParam, bet);                                
            
            case 'kings' : return this.subgameKings(subgameParam, bet);                
            
            case 'trilux' : return this.subgameTrilux(subgameParam, bet);                              
            
            case 'pair' : return this.subgamePair(subgameParam, bet);                              
            
            case 'tie' : return this.subgameTie(subgameParam, bet);                              
            
            case 'tieSplit' : return this.subgameTieSplit(subgameParam, bet);                              
        }
    }

    subgameLucky = (subgameParam, bet) => {
        
        const luckyTotal = this.checkTotal(subgameParam);
        
        switch (luckyTotal) {
            case 19 : return [bet * 2, 'Any 19'];                
            
            case 20: return [bet * 2, 'Any 20'];
            
            case 21: {
                if (this.checkFlush(subgameParam) && this.checkTrips(subgameParam)) { /// suited 777
                    return [bet * 200, 'Suited 777']; 
                } else if (this.checkFlush(subgameParam) && this.checkStraight(subgameParam)) { /// suited 678
                    return [bet * 100, 'Suited 678']; 
                } else if (this.checkTrips(subgameParam)) { /// unsuited 777
                    return [bet * 50, 'Unsuited 777'];
                } else if (this.checkStraight(subgameParam)) { /// unsuited 678
                    return [bet * 30, 'Unsuited 678'];
                } else if (this.checkFlush(subgameParam)) { /// suited Any 21
                    return [bet * 10, 'Suited 21'];
                } else {
                    return [bet * 3, 'Any 21'];          
                }
            }
            default : return;            
        }

    }

    subgameKings = (subgameParam, bet) => {
               
        const kingsTotal = this.checkTotal(subgameParam);
        const kingsSuitArray = this.checkShape(subgameParam);
        console.log(`kings : ${kingsSuitArray}`);
        this.checkFlush(subgameParam);
        let kingsNumberArray = [];
        subgameParam.forEach(element => {
            kingsNumberArray.push(this.numberRecognizeForSidebet(element));
        });
        console.log(`kings : ${subgameParam}`);
                    
            if (kingsTotal === 20) {
                if ((kingsNumberArray[0] === 13 && kingsNumberArray[1] === 13) && (kingsSuitArray[0] === 'S' && kingsSuitArray[1] === 'S')) {
                    return [bet * 100, 'Kings of Spades'];
                } else if ((kingsNumberArray[0] === 13 && kingsNumberArray[1] === 13) && (kingsSuitArray[0] === kingsSuitArray[1])) {
                    return [bet * 30, 'Suited Kings(Not Spades)'];
                } else if ((kingsNumberArray[0] === kingsNumberArray[1]) && this.checkFlush(subgameParam)) {
                    return [bet * 20, 'Suited Qs, Js, or 10s'];
                } else if (kingsSuitArray[0] === kingsSuitArray[1]) {
                    return [bet * 8, 'Suited 20'];
                } else if (kingsNumberArray[0] === 13 && kingsNumberArray[1] === 13) {
                    return [bet * 6, 'Unsutied Kings'];
                } else {
                    return [bet * 4, 'Unsuited 20'];
                }
            }
        return;            
        
    }

    subgameTrilux = (subgameParam, bet) => {
        if (this.checkFlush(subgameParam) && this.checkStraight(subgameParam)) {
            return [bet * 25, 'Straight Flush'];
        } else if (this.checkTrips(subgameParam)) {
            return [bet * 15, 'Three of Kind'];
        } else if (this.checkStraight(subgameParam)) {
            return [bet * 8, 'Straight'];        
        } else if (this.checkFlush(subgameParam)) {
            return [bet * 5, 'Flush'];
        } else return;        
    }

    subgamePair = (subgameParam, bet) => {
        if (this.checkFlush(subgameParam) && this.checkPair(subgameParam)) {
            return [bet * 25, 'Perfect Pair'];
        } else if (this.checkColor(subgameParam) && this.checkPair(subgameParam)) {
            return [bet * 12, 'Colored Pair'];
        } else if (this.checkPair(subgameParam)) {
            return [bet * 6, 'Mixed Pair'];
        } else return;
    }

    subgameTie = (subgameParam, bet) => {
        if (subgameParam[0] === subgameParam[1]) {
            return [bet * 10, 'Tie pays 10 to 1'];
        } else return;
    }

    subgameTieSplit = (subgameParam, bet) => {
        const result = new Map();
        if (subgameParam[0] === subgameParam[2]) { // left side bjplayer tie
            result.set('left', bet * 10);
        } 
        if (subgameParam[1] === subgameParam[2]) { // right side secondBJplayer tie
            result.set('right', bet * 10);
        }
        console.log(result);
        return result;
    }

    checkPair(array) {
        if (this.numberRecognizeForSidebet(array[0]) === this.numberRecognizeForSidebet(array[1])) return true;
        else return false;        
    }

    checkColor(array) {
        let shape = this.checkShape(array);
        if ((shape[0] === 'H' || shape[0] === 'D') && (shape[1] === 'H' || shape[1] === 'D')) {
            return true;
        } else if ((shape[0] === 'C' || shape[0] === 'S') && (shape[1] === 'C' || shape[1] === 'S')) {
            return true;
        } else return false;
    }

    checkTotal(array) {
        let total = 0;
        array.forEach(element => {
            total = total + this.numberRecognize(element);            
        });
        
        console.log(`check total : ${total}`);
        return total;
    }

    checkShape(array) {
        console.log(array.length);
        let shape = [];
        array.forEach(element => {
            shape.push(this.shapeRecognize(element));
        })
        
        return shape;
    }

    checkFlush(array) {
        let arr = this.checkShape(array);        
        for (let i = 0 ; i < arr.length - 1 ; i ++) {
            if (!(arr[i] === arr[i+1])) return false;            
        }
        return true;

    }

    checkStraight(array) {
        let arr = [];
        array.forEach(element => arr.push(this.numberRecognizeForSidebet(element)));
        let sortedArr = arr.sort(this.compareNumbers);
        
        if (sortedArr[0] === 1 && sortedArr[sortedArr.length-1] === 13) {
            sortedArr.push(14);
            sortedArr.shift();
        }

        for (let i = 0 ; i < sortedArr.length -1 ; i++) {
            if (!(sortedArr[i] === sortedArr[i+1] -1)) {
                console.log('not straight');
                return false;
            }
        }
        console.log(`straight : ${sortedArr}`);
        return true;
    }

    checkTrips(array) {
        let arr = [];
        array.forEach(element => arr.push(this.numberRecognizeForSidebet(element)));
        if (arr[0] === arr[1] && arr[1] === arr[2]) return true;
        else return false;
    }

    compareNumbers(a, b) {
        return a - b;
    }

    numberRecognizeForSidebet(item) {
        let result = item.slice(1,3);
        switch (result) {
            case '10' : { 
                result = 10;
                break;
            }
            case 'J' : {
                result = 11;
                break;
            }
            case 'Q' : {
                result = 12;
                break;
            }
            case 'K' : {
                result = 13;
                break;
            }
            case 'A' : {
                result = 1;
                break;
            }
            default : {
                break;
            }
        }
        return parseInt(result);
    }



    
}

