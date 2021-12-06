import fs from 'fs';
const input = fs.readFileSync('input.txt').toString().trim().split('\n').map((line) => line.replace(/\s+/g, '').split('->').map((xy) => xy.split(',').map((n) => parseInt(n))))

// Part 1 Solution
const getStraightLines = (lines) => lines.filter(line => line[0][0] === line[1][0] || line[0][1] === line[1][1])
const getDiagonalLines = (lines) => lines.filter((line) => 
  line[0][0] > line[1][0] && line[0][1] > line[1][1] || line[0][0] < line[1][0] && line[0][1] < line[1][1]
    ? line[0][0] - line[1][0] === line[0][1] - line[1][1]
    : line[1][0] - line[0][0] === line[0][1] - line[1][1]
)

const findPoints = (lines) => {
  const points = []
  for (const line of lines) {
    if(line[0][0] !== line[1][0] && line[0][1] === line[1][1]) {
      const y = line[0][1]
      const start = line[0][0] < line[1][0] ? line[0][0] : line[1][0]
      const end = line[0][0] < line[1][0] ? line[1][0] : line[0][0]
      for (let x = start; x <= end; x++) {
        points.push([x, y])
      }
    } else if(line[0][0] === line[1][0] && line[0][1] !== line[1][1]) {
      const x = line[0][0]
      const start = line[0][1] < line[1][1] ? line[0][1] : line[1][1]
      const end = line[0][1] < line[1][1] ? line[1][1] : line[0][1]
      for (let y = start; y <= end; y++) {
        points.push([x, y])
      }
    } else {
      const increase = line[0][0] > line[1][0] && line[0][1] > line[1][1] || line[0][0] < line[1][0] && line[0][1] < line[1][1]
      let start = line[0][0] > line[1][0] ? line[1][0] : line[0][0]
      let end = line[0][0] > line[1][0] ? line[0][0] : line[1][0]
      let y = increase 
        ? line[0][1] > line[1][1] ? line[1][1] : line[0][1]
        : line[0][1] > line[1][1] ? line[0][1] : line[1][1]
      for (let x = start; x <= end; x++) {
        points.push([x, y])
        increase ? y++ : y--
      }
    }
  }
  return points
}

const findIntersections = (points) => {
  const intersections = {};
  for (const point of points) {
    intersections[point] = intersections[point] ? intersections[point] + 1 : 1;
  }
  return intersections
}

const straightLines = getStraightLines(input)
const p1_points = findPoints(straightLines)
const p1_intersections =  findIntersections(p1_points)

console.log(`part 1: ${Object.values(p1_intersections).filter((count) => count >= 2).length}`)

// Part 2 Solution
const allLines = [...getStraightLines(input), ...getDiagonalLines(input)]
const p2_points = findPoints(allLines)
const p2_intersections =  findIntersections(p2_points)
console.log(`part 2: ${Object.values(p2_intersections).filter((count) => count >= 2).length}`)