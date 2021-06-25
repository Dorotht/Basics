const { Stack } = require('../utils/index.js')

// 定义运算符的优先级
const PRIORITY_MAP = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}

// 运算符
const SYMBOL = ['+', '-', '*', '/']


function infixExp2PostfixExp(array) {
  const postfixLst = []

  const stack = new Stack()

  for (let i = 0; i < array.length; i++) {
    const item = array[i]

    if (!isNaN(item)) {
      // 如果是数字, 直接放⼊入到 postfixLst中
      postfixLst.push(item)
    } else if (item === '(') {
      // 遇到左括号⼊入栈
      stack.push(item)
    } else if (item === ')') {
      // 遇到左括号把栈顶元素弹出, 直到遇到右括号
      while (stack.top() !== '(') {
        postfixLst.push(stack.pop())
      }

      // 左括号出栈
      stack.pop()
    } else {

      // 遇到运算符把栈顶元素弹出，直到栈顶的运算符优先级小于等于当前运算符
      while (!stack.isEmpty() && SYMBOL.includes(stack.top()) && PRIORITY_MAP[stack.top()] >= PRIORITY_MAP[item]) {
        // 把弹出的运算符加到 postfixLst
        postfixLst.push(stack.pop())
      }

      // 当前运算符入栈
      stack.push(item)
    }
  }

  // for 循环结束后，栈里可以还有元素，都弹出放入 postfixLst
  while (!stack.isEmpty()) {
    postfixLst.push(stack.pop())
  }

  return postfixLst
}

// const array = ['(', '1', '+', '(', '4', '+', '5', '+', '3',')', '/', '4', '-', '3', ')', '+', '(', '6', '+', '8', ')', '*', '3']
const array = ['1', '-', '2', '+', '3']

console.log('res -> ', infixExp2PostfixExp(array))
console.log(eval(array.join(' ')))
