let orderUtil = {
  // 升序排列
  ascBubbleSort: function (arr) {
　　let i = arr.length-1; //初始时,最后位置保持不变
　　while ( i> 0) {
　　　　let pos= 0; //每趟开始时,无记录交换
　　　　for (let j= 0; j< i; j++){
　　　　　　if (arr[j]> arr[j+1]) {
　　　　　　　　pos= j; //记录交换的位置
　　　　　　　　let tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
　　　　　　}
　　　　}
　　　　i= pos; //为下一趟排序作准备
　　}
　　return arr;
  },
  // 降序排列
  descBubbleSort: function (arr) {
　　let i = arr.length-1; //初始时,最后位置保持不变
　　while ( i> 0) {
　　　　let pos= 0; //每趟开始时,无记录交换
　　　　for (let j= 0; j< i; j++){
　　　　　　if (arr[j]< arr[j+1]) {
　　　　　　　　pos= j; //记录交换的位置
　　　　　　　　let tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
　　　　　　}
　　　　}
　　　　i= pos; //为下一趟排序作准备
　　}
　　return arr;
  },
  // 将obj集合内的元素按照某个属性值升序排列
  ascBubbleSortObj: function (arr,field) {
    let i = arr.length-1; //初始时,最后位置保持不变
    while ( i> 0) {
      let pos= 0; //每趟开始时,无记录交换
      for (let j= 0; j< i; j++){
        if (arr[j][field]> arr[j+1][field]) {
          pos= j; //记录交换的位置
          let tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
        }
      }
      i= pos; //为下一趟排序作准备
    }
    return arr;
  },
  // 将obj集合内的元素按照某个属性值降序排列
  descBubbleSortObj: function (arr,field) {
    let i = arr.length-1; //初始时,最后位置保持不变
    while ( i> 0) {
      let pos= 0; //每趟开始时,无记录交换
      for (let j= 0; j< i; j++){
        if (arr[j][field]< arr[j+1][field]) {
          pos= j; //记录交换的位置
          let tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
        }
      }
      i= pos; //为下一趟排序作准备
    }
    return arr;
  }
}
export default orderUtil;
