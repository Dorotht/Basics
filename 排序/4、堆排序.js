// const { random } = require('../utils/index.js')


const list = [9,8,7,6,5,4,3,2,1]
// console.log(list[4])

// let list = [10, 15, 20, 25, 30, 35, 40, 45, 50]
// list = list.sort((x, y) => y - x)

// const list = []
// for (let i = 1; i <= 10000; i++) {
//     list.push(random(1, 1000000))
// }

var len    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

// 建立小顶堆
function buildMaxHeap(array) {
    len = Math.floor(array.length / 2)
    
    for (let i = 0; i < len; i++) {
        heapify(array, i)
    }
}

// 堆调整
function heapify(array, i) {
    // console.log('i -> ', array, i)
    // console.log('i', Math.floor(i * 2))
    // console.log('i', array[Math.floor(i / 2)])
    console.log('i', array[i], array[Math.floor(i * 2 + 1)])
    console.log('i', array[i], array[Math.floor(i * 2 + 2)])

}

function swap(array, i, j) {

}

function sort(array) {
    buildMaxHeap(array);
    
    // console.log('array', array)

    return array
}

console.time('sort')
console.log(sort(list))
console.timeEnd('sort')



