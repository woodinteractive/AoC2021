import fs from 'fs';
const input = fs.readFileSync('input.txt').toString()
  .trim()
  .split('\n')
  .map(line => {
    const [signal, output] = line.trim().split('|')
    return { 
      signal: signal.trim().split(' '),
      output: output.trim().split(' ')
    }
  })
const test = fs.readFileSync('example.txt').toString()
  .trim()
  .split('\n')
  .map(line => {
    const [signal, output] = line.trim().split('|')
    return { 
      signal: signal.trim().split(' '),
      output: output.trim().split(' ')
    }
  })
  

// Part 1 Solution
const results = input.reduce((total, row) => {
  return row.output.reduce((prev, curr) => {
    return [2,3,4,7].includes(curr.length) ? prev+1 : prev
  }, 0) + total
}, 0)

console.log(`part 1: ${results}`)

// Part 2 Solution
const mapSignalPattern = (signal) => {
  const list = {}
  list['1'] = signal.find(digit => digit.length === 2)
  list['4'] = signal.find(digit => digit.length === 4)
  list['7'] = signal.find(digit => digit.length === 3)
  list['8'] = signal.find(digit => digit.length === 7)
  list['9'] = signal.filter(digit => digit.length === 6).filter(digit => {
    const t = new RegExp(`[${list['1']}]`, 'g')
    const r = new RegExp(`[${list['4'].concat(list[7].replace(t, ''))}]`, 'g')
    return digit.replace(r, '').length === 1
  })[0]
  list['2'] = signal.filter(digit => digit.length === 5).filter(digit => {
    const r = new RegExp(`[${list['9']}]`, 'g')
    return digit.replace(r, '').length === 1
  })[0]
  list['0'] = signal.filter(digit => digit.length === 6).filter(digit => {
    const r = new RegExp(`[${list['1']}]`, 'g')
    return digit.replace(r, '').length === 4 && digit !== list['9']
  })[0]
  list['3'] = signal.filter(digit => digit.length === 5).filter(digit => {
    const r = new RegExp(`[${list['1']}]`, 'g')
    return digit.replace(r, '').length === 3
  })[0]
  list['5'] = signal.filter(digit => digit.length === 5 && digit !== list['3'] && digit !== list['2'])[0]
  list['6'] = signal.filter(digit => digit.length === 6 && digit !== list['0'] && digit !== list['9'])[0]
  return list
}

const getOutputValues = (input) => {
  const results = []
  for (const row of input) {
    const signalPattern = mapSignalPattern(row.signal)
    // console.log(row, signalPattern)
    const num = row.output.reduce((number, digit) => {
      const r = RegExp(`\\b[${digit}]{${digit.length}}\\b`, 'g')
      const n = Object.keys(signalPattern).find(key => r.test(signalPattern[key]))
      return number+=n
    }, '')
    results.push(parseInt(num))
  }
  return results
}

console.log(`part 2: ${getOutputValues(input).reduce((a,b) => a+b)}`)