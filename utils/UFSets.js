/**
 * 并查集
 *
 * @class UFSets
 */
class UFSets {
  constructor() {
    this._parent = [];
  }

  init(size) {
    this._parent = new Array(size);

    for (let i = 0; i < size; i++) {
      this._parent[i] = -1;
    }
  }

  find(item) {
    while (this._parent[item] >= 0) {
      item = this._parent[item];
    }
    return item;
  }

  union(root1, root2) {
    console.log(root1, root2)

    this._parent[root1] += this._parent[root2];
    this._parent[root2] = root1;

    console.log(this._parent)
  }
}

const friends = [
  [0, 7],
  [1, 6],
  [4, 8],
  [8, 2],
  [9, 0],
  [3, 5],
  [1, 2],
];

const ufs = new UFSets();

ufs.init(10);

ufs.union(friends[0][0], friends[0][1])
