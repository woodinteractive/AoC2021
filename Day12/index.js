import fs from 'fs'
const test1 = fs.readFileSync('example1.txt').toString().trim().split('\n').map(line => line.split('-'))
// const input = fs.readFileSync('input.txt').toString().trim().split('\n').map(line => line.split('').map(n => parseInt(n)))

console.log(test1)