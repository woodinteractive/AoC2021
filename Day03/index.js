import fs from 'fs';
const input = fs.readFileSync('input.txt').toString().trim().split('\n')

// Part 1 Solution
const binaryArray = input.map((binary) => binary.split('').map((n) => parseInt(n)))
const start = Array(binaryArray[0].length).fill(0, 0, binaryArray[0].length)
const result = binaryArray.reduce((previousValue, currentValue, index) => {
  currentValue.forEach((value, index) => {
    value === 1 ? previousValue[index]++ : previousValue[index]--
  })
  return previousValue
}, start)

const gamma = parseInt(result.map((n) => n > 0 ? 1 : 0).join(''), 2)
const epsilon = parseInt(result.map((n) => n > 0 ? 0 : 1).join(''), 2)

console.log(`Part 1 solution: ${gamma*epsilon}`)

// Part 2 Solution
let oxygen = input
let CO2 = input

for (let i = 0; i < input[0].length && oxygen.length > 1; i++) {
  const zero = []
  const one = []

  for (const binary of oxygen) {
    parseInt(binary[i]) > 0 ? one.push(binary) : zero.push(binary)
  }
  oxygen = one.length >= zero.length ? one : zero
}

for (let i = 0; i < input[0].length && CO2.length > 1; i++) {
  const zero = []
  const one = []

  for (const binary of CO2) {
    parseInt(binary[i]) > 0 ? one.push(binary) : zero.push(binary)
  }
  CO2 = one.length >= zero.length ? zero : one
}

console.log(`Part 2 Solution: ${parseInt(oxygen.join(''), 2)*parseInt(CO2.join(''), 2)}`)