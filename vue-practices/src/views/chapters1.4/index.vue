<template>
  <div>
    <p>
      <button @click="handleNameChange">change this.name</button>
      <button @click="handleInfoChange">change this.info</button>
      <button @click="handleListChange">change this.list</button>
    </p>
    <PropsAndData :name="name" :info="info" :list="list" />
  </div>
</template>
<script>
import PropsAndData from "./PropsAndData";
let name = "world";
export default {
  components: {
    PropsAndData
  },
  data() {
    this.name = name;
    return {
      // name: name,
      info: {},
      // info: {
      //   number: undefined
      // },
      list: []
    };
  },
  created() {
    this.objectDefinePropertyHandle()
  },
  updated() {
    console.log("触发 更新");
  },
  methods: {
    handleNameChange() {
      this.name = "vue" + Date.now();
      console.log("this.name 发生了变化，但是并没有触发子组件更新", this.name);
    },
    handleInfoChange() {
      this.info.number = 1;
      // this.$set(this.info, 'number', 1)
      console.log("this.info 发生了变化，但是并没有触发子组件更新", this.info);
    },
    handleListChange() {
      this.list.push(1, 2, 3);
      console.log("this.list 并没有发生变化，但是触发了子组件更新", this.list);
    },
    objectDefinePropertyHandle() {
      let obj = {}
      let val = 1
      Object.defineProperty(obj, 'a', {
        set: function(value) {
          val = value
          console.log('setted')
        },
        get: function() {
          return val
        }
      })
      console.log('obj', obj)
      console.log('obj.a', obj.a)
      obj.a = []
      obj.a = [1,2,3]
      obj.a[1] = 3
      obj.a.push(4)
      obj.a.length = 5; //无输出
      obj.a = 'change'
      console.log(obj.a)
    }
  }
};
</script>