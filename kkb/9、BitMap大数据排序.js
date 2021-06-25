const { BitMap } = require("../utils/index.js");

/**
 * BitMap 排序
 *
 * 利用BitMap排序, 待排序的集合中不能存在重复的数据
 *
 * @param {Array} array
 * @returns Array
 */
function sort(array) {
  const bitMap = new BitMap(4)

  const ret = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    bitMap.addMember(item)
  }

  for (let i = 0; i < 100; i++) {
    if (bitMap.isExist(i)) {
      ret.push(i)
    }
  }

  return ret
}

const arr = [0, 6, 88, 7, 73, 34, 10, 99, 22]

console.time('k')
console.log(sort(arr))
console.timeEnd('k')
