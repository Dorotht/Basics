const { random } = require('../utils/index.js')

const list = []
// const list = [6,1,7,8,9,3,5,4,2]

for (let i = 1; i <= 10000; i++) {
  list.push(random(1, 1000000))
}


function mergeSort(arr) {
  const len = arr.length

  if (len < 2) return arr

  const middle = Math.floor(len / 2)

  const left = arr.slice(0, middle)

  const right = arr.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result
}

// mergeSort(list)

// console.log('return merge', merge([2,1], [4,3]))

console.time('time')
const nList = mergeSort(list)
console.timeEnd('time')

console.log('return mergeSort', nList)


