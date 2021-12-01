import fs from 'fs';
const input = fs.readFileSync('input.txt').toString().trim().split('\n').map((n) => parseInt(n))


// Part 1 Solution
let increase = 0
let decrease = 0

for (let index = 1; index < input.length; index++) {
  input[index] > input[index-1] ? increase++ : decrease++
}

console.log('part 1: ', increase)

// Part 2 Solution
increase = 0
input.reduce((previous, current, index, input) => {
  const window = current+input[index+1]+input[index+2]
  if(index === 0) {
    return window
  }
  if(window > previous) {
    increase++
  }
  return window
})

console.log('part 2: ', increase)