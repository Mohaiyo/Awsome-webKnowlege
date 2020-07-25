export default function proxy(obj, temp, key) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function() {
      console.log('get')
      return temp[key]
    },
    set: function(val) {
      console.log('set')
      temp[key] = val
      if (window.isUpdatefromChildren) {
        console.error('不可以直接从子组件修改父组件的值')
      }
      window.isUpdatefromChildren = true
    }
  })
}