import fs from 'fs'
const input = fs.readFileSync('input.txt').toString().trim().split('\n').map(row => row.split(''))
const test = fs.readFileSync('example.txt').toString().trim().split('\n').map(row => row.split('').map(n => parseInt(n)))

const getLowPoints = (input) => {
  const lowPoints = []
  
  const isLessThanUp = (grid, y, x) => y === 0 || grid[y-1][x] > grid[y][x]  ? true : false
  const isLessThanDown = (grid, y, x) => y === grid.length-1 || grid[y+1][x] > grid[y][x] ? true : false
  const isLessThanLeft = (row, x) => x === 0 || row[x-1] > row[x] ? true : false
  const isLessThanRight = (row, x) => x === row.length-1 || row[x+1] > row[x] ? true : false
  
  for (const [y, row] of input.entries()) {
    for (const [x, num] of row.entries()) {
      if(isLessThanUp(input, y, x) && isLessThanDown(input, y, x) && isLessThanLeft(row, x) && isLessThanRight(row, x)) {
        lowPoints.push({x, y, num})
      }
    }
  }
  return lowPoints
}

const addPoints = (points) => points.map(n => parseInt(n.num)+1).reduce((a,b) => a+b)

// Part 1 Solution
const points = getLowPoints(test)
console.log(`part 1: ${addPoints(points)}`)

// Part 2 Solution
const getLeft = (start, grid) => {
  const found = []
  let i = start.x
  while(grid[start.y][i] !== 9 && i > 0) {
    found.push({ y: start.y, x: i })
    i--
  }
  return found
}

const getRight = (start, grid) => {
  const found = []
  let i = start.x
  while(grid[start.y][i] !== 9 && i < grid[start.y].length-1) {
    found.push({ y: start.y, x: i })
    i++
  }
  return found
}

const getAbove = (start, grid) => {
  const found = []
  let i = start.y
  while(grid[i][start.x] !== 9 && i < 0) {
    console.log(i)
    found.push({ y: i, x: start.x })
    i--
  }
  return found
}

const getBelow = (start, grid) => {
  const found = []
  let i = start.y
  while(grid[i][start.x] !== 9 && i < grid.length-1) {
    found.push({ y: i, x: start.x })
    i++
  }
  return found
}
const removeDups = (arr) => arr.filter((v, i, a) => a.map(c => JSON.stringify(c)).indexOf(JSON.stringify(v)) === i)

const row = [...getLeft(points[2], test), ...getRight(points[2], test)]

let second = []
for (const start of removeDups(row)) {
  second = [...second, ...getAbove(start, test)]
  second = [...second, ...getBelow(start, test)]
}
// console.log(removeDups(second).sort((a,b) => a.y - b.y))


// const getBasins = (points, grid) => {
//   const basins = []
//   for (const point of points) {
//     console.log(point)
//   }
// }

// getBasins(points, test)
// console.log(`part 2: `)