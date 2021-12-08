import fs from 'fs';
const input = fs.readFileSync('input.txt').toString().split(',').map((n) => parseInt(n))

const getStartPositions = (positions) => {
  const frequency = {}
  const end = positions.sort((a,b) => a - b)[positions.length-1]
  for (let i = 0; i <= end; i++) {
    if(!frequency[i]) {
      frequency[i] = 0
    }
    if(i < positions.length) {
      frequency[positions[i]] = frequency[positions[i]] ? frequency[positions[i]] + 1 : 1
    }
  }
  return frequency
}

const getBestFuelCost = (costs) => {
  return Object.values(costs).sort((a, b) => a - b)[0]
}

// Part 1 Solution
const getFuelCostsByOnes = (positions) => {
  const totals = {}
  const entries = Object.entries(positions)
  
  for (const [key, value] of entries) {
    let num = parseInt(key)
    let steps = 0
    for (const [k, v] of entries) {
      let n = parseInt(k)
      if(n > num) {
        steps += (n-num)*v
      }
      if(num > n) {
        steps += (num-n)*v
      }
    }
    totals[num] = steps
  }
  return totals
}

const findBestCostByOnes = (input) => {
  const positions = getStartPositions(input)
  const costs = getFuelCostsByOnes(positions)
  return getBestFuelCost(costs)
}

console.log(`part 1: ${ findBestCostByOnes(input) }`)

// Part 2 Solution
const getFuelCostsByMultiples = (positions) => {
  const totals = {}
  const entries = Object.entries(positions)
  for (const [key, value] of entries) {
    let num = parseInt(key)
    let steps = 0
    for (const [k, v] of entries) {
      let n = parseInt(k)
      if(num !== n) {
        const range = n > num ? (n-num) : (num-n)
        steps += ((range*(range+1))/2)*v
      }
    }
    totals[num] = steps
  }
  return totals
}

const findBestCostByMultiples = (input) => {
  const positions = getStartPositions(input)
  const costs = getFuelCostsByMultiples(positions)
  return getBestFuelCost(costs)
}

console.log(`part 2: ${ findBestCostByMultiples(input) }`)