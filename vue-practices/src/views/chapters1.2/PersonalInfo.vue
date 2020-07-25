<template>
  <div>
    <select :value="phoneInfo.areaCode" @change="handleAreaCodeChange">
      <option value="+86">+86</option>
      <option value="+22">+22</option>
      <option value="+202">+202</option>
    </select>
    <input
      :value="phoneInfo.phone"
      type="number"
      placeholder="请输入手机号码"
      @input="handlePhoneChange"
    >
    <div v-show="showMessage" style="color: red; font-size: 12px;">
      {{ message }}
    </div>
    <input
      :value="zipCode"
      type="number"
      placeholder="请输入邮编号码"
      @input="handleZipCodeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'PersonalInfo',
  model: {
    prop: "phoneInfo", // 默认value
    event: "change" // 默认input
  },
  props: {
    phoneInfo: Object,
    zipCode: String,
    message: String,
    validate: Function
  },
  data() {
    return {
      showMessage: false
    }
  },
  watch: {
    "phoneInfo.phone": function(val) {
      this.handleValidate(val)
    }
  },
  methods: {
    handleAreaCodeChange(e) {
      this.$emit("change", {
        ...this.phoneInfo,
        areaCode: e.target.value
      })
    },
    handlePhoneChange(e) {
      this.$emit("change", {
        ...this.phoneInfo,
        phone: e.target.value
      })
    },
    handleZipCodeChange(e) {
      this.$emit("update:zipCode", e.target.value)
    },
    handleValidate(val) {
      const res = this.validate(val)
      console.log(res)
      this.showMessage = !res
    }
  }
}
</script>