// arguments object - no longer bound with arrow functions
// if you need arguments access, use es5 function

const add = (a, b) => {
    // console.log(arguments);
    return a + b;
}

console.log(add(55, 1, 1001));

// this keyword - no longer bound
// uses this of context it's in
// dont use arrow function as a method on an object

const user = {
    name: 'Jake',
    cities: ['Philadelphia', 'New York', 'Dublin'],
    // new es6 syntax

    printPlacesLived() {
        return this.cities.map((city) => `${this.name} has lived in ${city}`);
    }
}
console.log(user.printPlacesLived());

const multiplier = {
    numbers: [1,2,3],
    multiplyBy: 8,
    multiply() {
        return this.numbers.map((num) => num * this.multiplyBy);    
    }
}

console.log(multiplier.multiply());