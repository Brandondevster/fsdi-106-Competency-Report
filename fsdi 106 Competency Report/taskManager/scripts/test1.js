


// Object literal
let dog = {
    name: "fido",
    age: 3
};
let dog = {
    name: "DrMeowsalot",
    age: 5
};
console.log(dog);
console.log(cat);

// object constructor

function Pet(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
}

let lion = new Pet("Alex", 8, "Yellow");
let zebra = new Pet("Zerena", 4, "Black / White");

console.log(lion);
console.log(zebra);


// class
class Animal {
    // exec auto when a new object is created
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
        doSomething() {
            console.log("I'm ding it");
        }
        
        
    }


let wildcat = new Animal("Will", 3);
console.log(wildcat);