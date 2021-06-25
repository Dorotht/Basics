const { random } = require('../utils/index.js')


// const list = [6,1,7,8,9,3,5,4,2]
// const list = [1,2,4,3]

const list = []
for (let i = 1; i <= 10000; i++) {
    list.push(random(1, 1000000))
}


function sort(array) {
    let preIndex = 0
    let cur = 0

    for (let i = 0; i < array.length; i++) {
        preIndex = i - 1
        cur = array[i]

        while (preIndex >= 0 && array[preIndex] > cur) {
            array[preIndex + 1] = array[preIndex]
            preIndex --
        }

        array[preIndex+1] = cur    
    }

    return array
}

console.time('sort')
console.log(sort(list))
console.timeEnd('sort')