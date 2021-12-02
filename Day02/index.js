import fs from 'fs';
const input = fs.readFileSync('input.txt').toString().trim().split('\n').map((n) => {
  const [direction, units] = n.split(' ')
  return { direction, units: parseInt(units) }
})

let depth = 0
let position = 0

// Part 1 Solution
for (const action of input) {
  action.direction === 'forward' 
    ? position += action.units
    : action.direction === 'down' 
      ? depth += action.units
      : depth -= action.units
}

console.log('part 1: ', depth*position)

// Part 2 Solution
let aim = 0
depth = 0
position = 0

const moveForward = (units) => {
  position += units
  if(aim !== 0) {
    aim > 0 
      ? depth += units*aim
      : depth -= units*(-1*aim)
  }
}

for (const action of input) {
  action.direction === 'forward' 
    ? moveForward(action.units)
    : action.direction === 'down' 
      ? aim += action.units
      : aim -= action.units
}

console.log('part 2: ', depth*position)
