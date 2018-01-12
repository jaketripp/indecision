var nameVar = 'Andrew';
var nameVar = 'Mike'
console.log('nameVar', nameVar);

let nameLet = 'Jen';
nameLet = 'Julie';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
console.log('nameConst', nameConst);

// block scoping

var fullName = 'Jake Tripp';

if (fullName) {
    const firstName = fullName.split(' ')[0];
    console.log(firstName);
    // var firstName = fullName.split(' ')[0];
}

console.log(firstName);