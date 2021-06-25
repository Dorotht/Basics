
function MyDict(){
  var bst = new BinarySearchTree();
  this.set = function(key, value){
      // 向字典中添加key-value对
  };

  this.get = function(key){
      // 返回key所对应的value
  }

  this.hasKey = function(key){
      // 是否存在key
  }
};

var md = new MyDict();
md.set('name', 'javascript');
md.set('age', 20);

console.log(md.hasKey('class'));
console.log(md.hasKey('name'));
console.log(md.get("name"));
console.log(md.get("age"));
