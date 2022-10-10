function add(n){
    return function(b){
    if(b){
    return add(n+b)
    }
    return n
    }
    }
    
    
    console.log( add(1)(2)(3))// == 6
    console.log(add(1)(2)(3)(4)) // == 10
    
    function createFunctions(n) {
    let callbacks = [];
    
    for (let i=0; i<n; i++) {
    callbacks.push(function() {
    return i;
    });
    }
    
    return callbacks;
    }
    
    console.log(createFunctions([0]))
    console.log(createFunctions([3]))
    
    
    const add1 = function(a){return a + 1}
    const id = function(a){return a}
    
    const compose=(f,g) =>(...arg)=>f(g(...arg))
    
    console.log(compose(add1,id)(0))//1 ))
    
    const addOne = (a) => a + 1
    const multTwo = (b) => b * 2
    
    const compose1=(...fns) =>x=>fns.reverse().reduce((v,f)=>f(v),x)
    
    
    
    console.log(compose1(addOne, multTwo, addOne, addOne)(2))//9,