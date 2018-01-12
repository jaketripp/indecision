// this.name = name || 'Jimbo'
// sets this.name to name if name exists, otherwise sets to 'Jimbo'
// es6 function defaults
    // name = 'Jimbo'
// initializes this.name as 'Jimbo', and gets updated if a name is provided

class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
        return `Hi. I am ${this.name}!`;
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

class Student extends Person {
    constructor(name, age, major) {
        // calls constructor function on parent class
        // saves a bunch of code and mess
        // sets this.name and this.age respectively
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return !!this.major;
    }
    getDescription() {
        let description = super.getDescription();
        
        if (this.hasMajor()) {
            description += ` Their major is ${this.major}.`;
        }
        
        return description;
    }
};

class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }
    getGreeting() {
        let greeting = super.getGreeting();

        if (this.homeLocation) {
            greeting += ` I'm visiting from ${this.homeLocation}.`;
        }

        return greeting;
    }
};

const me = new Student('Jake Tripp', 21, 'Math');
console.log(me.getDescription());

const other = new Student();
console.log(other.getDescription());

const dude = new Traveler('Jason', 37, 'Texas');
console.log(dude.getGreeting());

const dudette = new Traveler('Jessica', 43);
console.log(dudette.getGreeting());