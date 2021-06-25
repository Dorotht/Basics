/**
 * BitMap
 *
 * 概念:
 *    这种数据结构基于位映射, 能够用很少的内存存数据, 和数组不同, 它只能表示某个数是否存在,
 * 可以用于大数据去重, 大数据排序, 两个集合取交集.
 *    BitMap在处理大数据时才有优势, 而且数据紧凑, 如果要处理的数只有3个, 1、1000、10000,
 * 那么空间利用率太低了, 最大的值决定了BitMap要用多少内存.
 *
 *
 * 逻辑:
 * 一组数, 内容为 3、9、19、20, 请用一个整数来表示这些四个数
 *
 * let value = 0
 * value = value | 1 << 3
 * value = value | 1 << 9
 * value = value | 1 << 19
 * value = value | 1 << 20
 * 程序输出结果为 1573384
 *
 */
function BitMap(size) {
  const bitArray = new Array(size).fill(0);

  /**
   * 0 0 0 0 0 0 0 0    // 0
   *
   * addMember 0
   *
   * 0 | (1 << 0)
   * 0 0 0 0 0 0 0 1    // 1 << 0
   * 0 0 0 0 0 0 0 0    // 0
   *
   * 0 0 0 0 0 0 0 1    // 执行 | 之后 = 1
   * 结果等于 1
   *
   *
   *
   * addMember 1
   *
   * 1 | (1 << 1)
   * 0 0 0 0 0 0 1 0    // 1 << 1
   * 0 0 0 0 0 0 0 1    // 1
   *
   * 0 0 0 0 0 0 1 1    // 执行 | 之后 = 3
   *
   * 结果等于3,  表示0和1都存在
   *
   * */
  this.addMember = function (member) {
    // 觉得数组中的索引
    const arrayIndex = Math.floor(member / 32);

    // 决定在整数的32个bit的哪一位
    const bitIndex = member % 32;

    bitArray[arrayIndex] = bitArray[arrayIndex] | (1 << bitIndex);
  };

  /**
   * 0 0 0 0 0 0 1 1    // 3
   *
   * isExist 2
   *
   * 3 & (1 << 2)
   * 0 0 0 0 0 1 0 0    // 1 << 2
   * 0 0 0 0 0 0 1 1    // 3
   *
   * 0 0 0 0 0 0 0 0    执行 & 之后 = 3
   *
   * 结果等于0, 表示2不存在
   *
   *
   *
   * isExist 1
   *
   * 3 & (1 << 1)
   * 0 0 0 0 0 0 1 0    // 1 << 1
   * 0 0 0 0 0 0 1 1    // 3
   *
   * 0 0 0 0 0 0 1 0    // 执行 & 之后 = 2
   *
   * 结果不等于0, 表示1存在
   *
   * */
  this.isExist = function (member) {
    // 觉得数组中的索引
    const arrayIndex = Math.floor(member / 32);

    // 决定在整数的32个bit的哪一位
    const bitIndex = member % 32;

    const value = bitArray[arrayIndex] & (1 << bitIndex);

    return value ? true : false;
  };
}

module.exports = BitMap;
