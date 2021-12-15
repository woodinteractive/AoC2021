import fs from 'fs'
const input = fs.readFileSync('input.txt').toString().trim().split('\n').map(line => line.split('').map(n => parseInt(n)))
const test = fs.readFileSync('example.txt').toString().trim().split('\n').map(line => line.split('').map(n => parseInt(n)))

const step = (grid) => {
  let called = []
  const inc = (grid, x,y) => {
    if (x < 0 || y < 0 || x > 9 || y > 9) { return }
    if(grid[x][y] === 0 && called.includes(`${x},${y}`)) { return grid }
    if(grid[x][y] !== 9) {
      grid[x][y]++
    } else {
      grid[x][y] = 0
      called.push(`${x},${y}`)
      inc(grid, x, y - 1) //up
      inc(grid, x, y + 1) //down
      inc(grid, x - 1, y) //left
      inc(grid, x + 1, y) //right
      inc(grid, x - 1, y - 1) //upper-left
      inc(grid, x - 1, y + 1) //lower-left
      inc(grid, x + 1, y + 1) //upper-right
      inc(grid, x + 1, y - 1) //lower-right
    }
    return grid
  }
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      grid = inc(grid, x, y)
    }
  }
  return grid
}

const countFlashes = (grid, steps) => {
  let flashes = 0
  for (let i = 0; i < steps; i++) {
    grid = step(grid)
    for (const line of grid) {
      flashes += line.filter(f => f === 0).length
    }
  }
  return flashes
}

// Part 1 Solution
console.log(`Part 1: ${countFlashes(input, 100)}`)

// Part 2 Solution
const allFlashStep = (grid) => {
  let stepNum = 0
  while (true) {
    stepNum++
    let flashes = 0
    grid = step(grid)
    for (const line of grid) {
      flashes += line.filter(f => f === 0).length
    }
    if(flashes === 100) { break }
  }
  for (const [index, line] of grid.entries()) {
    console.log(`line ${index+1}: ${line}`)
  }
  return stepNum
}

console.log(allFlashStep(test))