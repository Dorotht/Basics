const { random } = require('../utils/index.js')


// const list = [6,1,7,8,9,3,5,4,2]
// const list = [3,2,1]

const list = []
for (let i = 1; i <= 10000; i++) {
    list.push(random(1, 1000000))
}


function sort(array) {
    let cur = 0
    let minIndex = 0

    for (let i = 0; i < array.length - 1; i++) {
        minIndex = i

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j
            }
        }

        cur = array[i]
        array[i] = array[minIndex]
        array[minIndex] = cur
    }

    return array
}

console.time('sort')
// let a = list.sort((x, y) => x - y)
console.log(sort(list))
console.timeEnd('sort')
