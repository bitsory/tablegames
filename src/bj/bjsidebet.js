'use strict';

import BJPublic from "./bjpublic.js";

export default class BJSidebet extends BJPublic {

    rightSubgame ='';
    leftSubgame = '';

    // constructor() {
    
    //     console.log("bjsidebet initialized...");
    //     // console.log(right);
    //     // console.log(left);
    //     // this.rightSubgame = right;
    //     // this.leftSubgame = left;        

    // }

    checkSubgame(index, subgameParam, bet) {
        switch (index) {
            case 'lucky' : {    
                return this.subgameLucky(subgameParam, bet);
                                
            }
            case 'kings' : {
                return this.subgameKings(subgameParam, bet);
                
            }
            case 'trilux' : {
                return this.subgameTrilux(subgameParam, bet);
                              
            }
        }

    }

    subgameLucky = (subgameParam, bet) => {
        
        const luckyTotal = this.checkTotal(subgameParam);
        
        switch (luckyTotal) {
            case 19 : {                
                return [bet * 2, 'Any 19'];                
            }
            case 20: {
                return [bet * 2, 'Any 20'];
            }
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
            default : {
                console.log("nothing on lucky lucky");
                return;
            }
        }

    }

    subgameKings = (subgameParam, bet) => {
               
        const kingsTotal = this.checkTotal(subgameParam);
        const kingsSuitArray = this.checkSuit(subgameParam);
        console.log(`kings : ${kingsSuitArray}`);
        this.checkFlush(subgameParam);
        let kingsNumberArray = [];
        subgameParam.forEach(element => {
            kingsNumberArray.push(this.numberRecognizeForSidebet(element));
        });
        console.log(`kings : ${subgameParam}`);

        switch (kingsTotal) {
            
            case 20: {
                if ((kingsNumberArray[0] === 13 && kingsNumberArray[1] === 13) && (kingsSuitArray[0] === 'S' && kingsSuitArray[1] === 'S')) {
                    return [bet * 100, 'Kings of Spades'];
                } else if ((kingsNumberArray[0] === 13 && kingsNumberArray[1] === 13) && (kingsSuitArray[0] === kingsSuitArray[1])) {
                    return [bet * 30, 'Suited Kings(except Spades)'];
                } else if ((kingsSuitArray[0] === kingsSuitArray[1]) && this.checkFlush(subgameParam)) {
                    return [bet * 20, 'Suited Qs, Js, or 10s'];
                } else if (kingsSuitArray[0] === kingsSuitArray[1]) {
                    return [bet * 8, 'Suited 20'];
                } else if (kingsNumberArray[0] === 13 && kingsNumberArray[1] === 13) {
                    return [bet * 6, 'Unsutied Kings'];
                } else {
                    return [bet * 4, 'Unsuited 20'];
                }
            }
            
            default : {
                console.log("nothing on kings");
                return;
            }
        }
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
        } else {
            return;
        }
    }

    checkTotal(array) {
        let total = 0;
        array.forEach(element => {
            total = total + this.numberRecognize(element);            
        });
        
        console.log(`check total : ${total}`);
        return total;
    }

    checkSuit(array) {
        console.log(array.length);
        let suit = [];
        array.forEach(element => {
            suit.push(this.suitRecognize(element));
        })
        
        console.log(suit);
        console.log(suit.length);
        return suit;
    }

    checkShape(array) {
        console.log(array.length);
        let shape = [];
        array.forEach(element => {
            shape.push(this.shapeRecognize(element));
        })
        
        console.log(shape);
        console.log(shape.length);
        return shape;
    }

    checkFlush(array) {
        let arr = this.checkShape(array);
        console.log(arr.length);
        for (let i = 0 ; i < arr.length - 1 ; i ++) {
            if (!(arr[i] === arr[i+1])) return false;
            console.log(`flush ${i}`);
        }
        
        console.log(`flush : ${arr}`);
        return true;

    }

    checkStraight(array) {
        let arr = [];
        array.forEach(element => arr.push(this.numberRecognizeForSidebet(element)));
        let sortedArr = arr.sort(this.compareNumbers);
        console.log(sortedArr);

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

