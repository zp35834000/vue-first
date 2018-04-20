let arrUtil = {
  order: function(arr,property,sort) {
    console.log('排序操作');
    function compare(property,sort) {
      // 默认
      let rev = 1;
      if(sort === 'asc'){
        rev = 1;
      }else if(sort === 'desc'){
        rev = -1;
      }
      return function (a,b){
        let val1 = a[property];
        let val2 = b[property];
        if(val1 < val2) {
          return rev * -1;
        }
        if(val1 > val2) {
          return rev * 1;
        }
        return 0;
      }
    }
    arr.sort(compare(property,sort));
  }
}
export default arrUtil;
