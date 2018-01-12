console.log('utils is running');

const square = (x) => x * x;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

// same result
// export default subtract;
// export default (a, b) => a - b;

// export { square, add, subtract as default };

// not an object
// export {
//     square,
//     add
// };