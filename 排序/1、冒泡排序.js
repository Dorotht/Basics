const { random } = require('../utils/index.js')

const list = []
// const list = [6,1,7,8,9,3,5,4,2]

for (let i = 1; i <= 10000; i++) {
    list.push(random(1, 1000000))
}

function sort(array) {
    let cur = 0
    
    for (let i = 1; i < array.length - 1; i++) {

        for (let j = array.length; j - i; j--) {
            const l = array[j - 2]
            const r = array[j - 1]
            
            if (l > r) {
                cur = array[j - 2]
                array[j - 2] = array[j - 1]
                array[j - 1] = cur
            }
        }
    }

    return array
}

console.time('sort')
console.log(sort(list))
console.timeEnd('sort')