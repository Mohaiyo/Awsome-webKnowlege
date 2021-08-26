// 冒泡排序算法
function bubbleSort(arr) {
  const sourceArr = [...arr]
  const len = sourceArr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (sourceArr[j] > sourceArr[j+1]) {
        var tem = sourceArr[j + 1]
        sourceArr[j+1] = sourceArr[j]
        sourceArr[j] = tem
      }
    }
  }
  return sourceArr
}

var originalArr = [1, 3, 4, 2, 7, 6, 5]
console.log('originalArr', originalArr)
console.log('bubbleSort', bubbleSort(originalArr))

// 选择排序算法

function selectionSort (arr) {
  const sourceArr = [...arr]
  const len = sourceArr.length
  var miniIndex
  var tem
  for (var i = 0; i < len - 1; i++) {
    miniIndex = i
    for (var j = i + 1; j < len; j++) {
      if (sourceArr[j] < sourceArr[miniIndex]) {
        miniIndex = j
      }
    }
    tem = sourceArr[i]
    sourceArr[i] = sourceArr[miniIndex]
    sourceArr[miniIndex] = tem
  }
  return sourceArr
}
console.log('originalArr', originalArr)
console.log('selectionSort', selectionSort(originalArr))

function insertionSort (arr) {
  const sourceArr = [...arr]
  const len = sourceArr.length
  let preIndex
  let current
  for (let i = 0; i < len; i++) {
    current = sourceArr[i]
    preIndex = i - 1
    while (preIndex >= 0 && sourceArr[preIndex] > current) {
      sourceArr[preIndex + 1] = sourceArr[preIndex]
      preIndex--
    }
    sourceArr[preIndex + 1] = current
  }
  return sourceArr
}

console.log('originalArr', originalArr)
console.log('insertionSort', insertionSort(originalArr))