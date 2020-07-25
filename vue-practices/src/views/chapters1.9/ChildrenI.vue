<template functional>
  <div>
    <h3 :style="{ color: injections.theme.color }">I 结点</h3>
  </div>
</template>
<script>
export default {
  inject: {
    theme: {
      default: () => ({})
    }
  }
};
</script>