const { Stack } = require('../utils/index.js')

const SYMBOL = ['+', '-', '*', '/']

function calcExp(array) {
  const stack = new Stack()

  for (let i = 0; i < array.length; i++) {
    const item = array[i]

    if (SYMBOL.includes(item)) {
      const y = stack.pop()
      const x = stack.pop()

      const s = x + array[i] + y
      // 计算
      const r = eval(s)
      // 己算结果压入栈中
      stack.push(r.toFixed(2))

    } else {
      stack.push(item)
    }
  }

  return stack.top()
}

let list = [
  '1', '4', '5', '+', '3',
  '+', '4', '/', '+', '3',
  '-', '6', '8', '+', '3',
  '*', '+'
]
console.log(calcExp(list))
