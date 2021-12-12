import fs from 'fs'
const input = fs.readFileSync('input.txt').toString().trim().split('\n').map(line => line.split(''))
const test = fs.readFileSync('example.txt').toString().trim().split('\n').map(line => line.split(''))

const open = ['(', '[', '{', '<']
const close = [')', ']', '}', '>']

const checkLineSyntax = (line) => {
  const result = line.reduce((prev, curr) => {
    if(!Array.isArray(prev)) return prev
    if(open.includes(curr)) {
      prev.push(curr)
      return prev
    }
    if(close.findIndex(c => c === curr) === open.findIndex(c => c === prev[prev.length-1])){
      prev.splice(prev.length-1, 1)
      return prev
    }
    return curr
  }, [])
  return result
}

const getCorruptPoints = (subsystem) => {
  let points = 0
  const values = [3,57,1197,25137]
  for (const line of subsystem) {
    const result = checkLineSyntax(line)
    if(!Array.isArray(result)) {
      points += values[close.findIndex(c => c === result)]
    }
  }
  return points
}

// Part 1 Solution
console.log(`part 1: ${getCorruptPoints(input)}`)

const getIncompletePoints = (subsystem) => {
  const totals = []
  for (const line of subsystem) {
    let points = 0
    const result = checkLineSyntax(line)
    if(Array.isArray(result)) {
      const closures = result.slice(0).reverse().map(c => close[open.findIndex(i => i === c)])
      for (const c of closures) {
        points = points*5
        points += close.findIndex(i => i === c)+1
      }
      totals.push(points)
    }
  }
  const middleIndex = Math.floor(totals.length/2)
  return totals.sort((a,b) => a - b)[middleIndex]
}

// Part 2 Solution
console.log(`part 2: ${getIncompletePoints(input)}`)