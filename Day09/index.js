import fs from 'fs'
const input = fs.readFileSync('input.txt').toString().trim().split('\n').map(row => row.split('').map(n => parseInt(n)))
const test = fs.readFileSync('example.txt').toString().trim().split('\n').map(row => row.split('').map(n => parseInt(n)))

const isLower = (y, x, grid) => {
  const h = grid.length
  const w = grid[0].length
  const tile = grid[y][x]

  if (y > 0 && grid[y - 1][x] <= tile) return false // top
  if (x > 0 && grid[y][x - 1] <= tile) return false // left
  if (x < w - 1 && grid[y][x + 1] <= tile) return false // right
  if (y < h - 1 && grid[y + 1][x] <= tile) return false // bottom

  return true
}

const getLowPoints = (grid) => {
  let answer = 0
  const height = grid.length
  const width = grid[0].length

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isLower(y, x, grid)) {
        answer += grid[y][x] + 1
      }
    }
  }

  return answer
}

// Part 1 Solution
console.log(`part 1: ${getLowPoints(input)}`)

// Part 2 Solution


const getBasin = (y, x, grid, checked = []) => {
  const h = grid.length
  const w = grid[0].length

  if (x < 0 || x >= w || y < 0 || y >= h) return 0
  if (grid[y][x] == 9) return 0

  const key = `${y}_${x}`
  if (checked.includes(key)) return 0

  let count = 1 // itself
  checked.push(key)

  count += getBasin(y - 1, x, grid, checked)
  count += getBasin(y + 1, x, grid, checked)
  count += getBasin(y, x - 1, grid, checked)
  count += getBasin(y, x + 1, grid, checked)

  return count
}

const getBasins = (grid) => {
  const h = grid.length
  const w = grid[0].length
  const basins = []
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (isLower(y, x, grid)) {
        basins.push(getBasin(y, x, grid))
      }
    }
  }
  
    const sorted = basins.sort((a, b) => b - a)
    return sorted[0] * sorted[1] * sorted[2]
}

console.log(`part 2: ${getBasins(input)}`)