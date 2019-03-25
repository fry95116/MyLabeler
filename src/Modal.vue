<template>
  <div class="modal fade" :class="{ show:visiable }" v-if="visiable"></div>
</template>
<script>
export default {
  data() {
    return {
      visiable: true
    }
  }
}
</script>
<style>
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
