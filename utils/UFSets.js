/**
 * 并查集
 *
 * @class UFSets
 */
class UFSets {
  constructor() {
    this._parent = [];
  }

  /**
   *  初始化
   *
   * @param {*} size
   * @memberof UFSets
   */
  init(size) {
    for (let i = 0; i < size; i++) {
      this._parent[i] = -1;
    }
  }

  /**
   * find方法是搜索item所在的集合，并返回这个集合的名字
   *
   * @param {*} item
   * @returns
   * @memberof UFSets
   */
  find(item) {
    while (this._parent[item] >= 0) {
      item = this._parent[item];
    }

    return item;
  }

  /**
   * 合并两个不相交的集合，将root2合并到root1中，root1和root2是两个集合的集合名
   *
   * @param {*} root1
   * @param {*} root2
   * @memberof UFSets
   */
  union(root1, root2) {
    this._parent[root1] += this._parent[root2];
    this._parent[root2] = root1;
  }

  /**
   * 建立朋友关系
   *
   * @param {*} i
   * @param {*} j
   * @memberof UFSets
   */
  buildRelation(i, j) {
    const root1 = this.find(i);
    const root2 = this.find(j);

    if (root1 != root2) {
      this.union(root1, root2);
    }
  }

  /**
   * 判断是否是朋友关系
   *
   * @returns
   * @memberof UFSets
   */
  isFriend(i, j) {
    const root1 = this.find(i);
    const root2 = this.find(j);

    return root1 === root2;
  }

  /**
   * 获取朋友圈个数
   *
   * @returns
   * @memberof UFSets
   */
  getFriendGroupCount() {
    const array = this._parent;
    let count = 0;
    for (let index = 0; index < array.length; index++) {
      const item = array[index];
      if (item < 0) {
        count++;
      }
    }

    return count;
  }
}

// const friends = [
//   [0, 7],
//   [1, 6],
//   [4, 8],
//   [8, 2],
//   [9, 0],
//   [3, 5],
//   [1, 2],
// ];

// const ufs = new UFSets();

// ufs.init(10);

// for (var i = 0; i < friends.length; i++) {
//   var item = friends[i];
//   ufs.buildRelation(item[0], item[1]);
// }

// console.log('朋友圈个数为 ' + ufs.getFriendGroupCount());
