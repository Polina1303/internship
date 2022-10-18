class CustomIterator{
    constructor(iterateData){
  this.iterateData=iterateData
  this.isCyclic = iterateConfig.cyclic;
  this.windowWidth = iterateConfig.windowWidth;
  this.position = 0
    }
      isPosition(){
        if(this.isCyclic){
            return true
        }else{
            if(this.position+this.windowWidth+1>this.iterateData.length){
                console.log("We don't have data")
                return false
        }
    }
    }

    getCurrent(){
        if(this.isPosition()){
            let array=[]
            for(let i=0;i<this.windowWidth+1;i++){
array.push(this.iterateData[(this.position+i)])
            }
            return array
        }else{
            return undefined
        }
    }

 
    forward(){
        this.position+=1
        return this.getCurrent()
    }

    jumpTo(number) {
        this.position = number;
    }

    back() {
        this.position -= 1;
        return this.getCurrent();
    }

}


const iterateData = [0,1,2,3,4,5,6,7,8,9,10,11]
const iterateConfig = {'cyclic': true, 'windowWidth': 2}
const customIterator = new CustomIterator(iterateData, iterateConfig)



console.log(customIterator.getCurrent()) // [0,1,2]
console.log(customIterator.forward()) // [1,2,3]
console.log(customIterator.jumpTo(3)) // undefined
console.log(customIterator.getCurrent()) // [3,4,5]
console.log( customIterator.back())// [2,3,4]