import fs from 'fs';
const input = fs.readFileSync('input.txt').toString().trim().split(',').map((n) => parseInt(n))
const fish = [0,0,0,0,0,0,0,0,0]

for (const count of input) {
  fish[count]++
}

const calculateFish = (days, fish) => {
  for (let day = 0; day < days; day++) {
    fish = fish.map((val, idx, arr) => {
      if(![6,8].includes(idx)) { return arr[idx+1] }
      if(idx === 6) { return arr[idx+1] + arr[0] }
      if(idx === 8) { return arr[0] }
    })
  }
  return fish
}


// Part 1 Solution
console.log(`part 1: ${calculateFish(80, fish).reduce((prev, curr) => prev+curr)}`)

// Part 2 Solution
console.log(`part 2: ${calculateFish(256, fish).reduce((prev, curr) => prev+curr)}`)