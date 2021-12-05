import fs from 'fs';
const input = fs.readFileSync('input.txt').toString().trim().split('\n\n')
const numbers = input.shift().split(',').map(n => parseInt(n))
const boards = input.map((board) => board.split('\n')).map((board) => {
  return board.map((row) => row.trim().split(/\s+/).map(n => parseInt(n)))
})

const checkBoard = (index, marks) => {
  const x = []
  const y = []
  let countX = {}
  let countY = {}
  let bingo = false

  if(marks[index]) {
    for (let i = 0; i < marks[index].length; i++) {
      x.push(marks[index][i][0])
      y.push(marks[index][i][1])
    }
  }
  for (const num of x) { 
    countX[num] = countX[num] ? countX[num] + 1 : 1 
    for (let i = 0; i < 5 && !bingo; i++) {
      if(countX[i] >= 5) bingo = { x: countX[i] }
    }
  }
  for (const num of y) { 
    countY[num] = countY[num] ? countY[num] + 1 : 1 
    for (let i = 0; i < 5 && !bingo; i++) {
      if(countY[i] >= 5) bingo = { y: countY[i] }
    }
  }
  return bingo
}

const findFirstWinner = (numbers, boards) => {
  const called = []
  const marks = {}
  let bingo = false
  let winner = {}

  for (let i = 0; i < numbers.length && !bingo; i++) {
    called.push(numbers[i])
    for (const [boardIndex, board] of boards.entries()) {
      for (const [rIdx, row] of board.entries()) {
        for (const [column, n] of row.entries()) {
          if(numbers[i] === n) {
            marks[boardIndex] ? marks[boardIndex].push([rIdx, column]) : marks[boardIndex] = [[rIdx, column]]
            break
          }
        }
      }
      const result = checkBoard(boardIndex, marks)
      if(result) {
        bingo = true
        winner.line = result
        winner.index = boardIndex
        winner.board = board
        winner.marks = marks[boardIndex]
        winner.lastCalled = called.pop()
        break
      }
    }
  }
  return winner
}

const getScore = (winner) => {
  return winner.board.map((row, index) => {
    const marks = winner.marks.map(mark => {
      if(mark[0] === index) {
        return mark[1]
      }
    }).filter(mark => mark !== undefined)
    const filtered = row.filter((n, i) => !marks.includes(i))
    if(filtered.length) {
      return filtered.reduce((acc, curr) => acc+curr)
    } 
  }).filter((total) => total !== undefined).reduce((acc, curr) => acc+curr)*winner.lastCalled
}

const firstWinner = findFirstWinner(numbers, boards)
const score = getScore(firstWinner)
console.log(`part 1: ${score}`)

// Part 2 Solution
const findLastWinner = (numbers, boards) => {
  const totalBoards = boards.length
  const called = []
  const marks = {}
  let bingoCount = 0
  let bingoBoards = []
  let winner = {}

  for (let i = 0; i < numbers.length && bingoBoards.length !== totalBoards; i++) {
    called.push(numbers[i])
    for (const [boardIndex, board] of boards.entries()) {
      for (const [rIdx, row] of board.entries()) {
        for (const [column, n] of row.entries()) {
          if(numbers[i] === n) {
            marks[boardIndex] ? marks[boardIndex].push([rIdx, column]) : marks[boardIndex] = [[rIdx, column]]
            break
          }
        }
      }
      if(checkBoard(boardIndex, marks) && !bingoBoards.includes(boardIndex)) {
        bingoBoards.push(boardIndex)
      }
      if(bingoBoards.length === totalBoards) {
        winner.line = checkBoard(boardIndex, marks)
        winner.index = boardIndex
        winner.board = board
        winner.marks = marks[boardIndex]
        winner.lastCalled = called.pop()
        break
      }
    }
  }
  return winner
}

const lastWinner = findLastWinner(numbers, boards)
const score2 = getScore(lastWinner)
console.log(`part 2: ${score2}`)
