<template>
  <div
    class="modal"
    :class="{show: visiable}"
    :style="{display: visiable ? 'block': 'none'}"
    tabindex="-1"
    role="dialog"
    @click.self.stop="cancel"
  >
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新的类别</h5>
          <button type="button" class="close" @click="cancel">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>类别名称</label>
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="类别名称"
              v-model="className"
            >
            <small v-if="invalidClassName" class="error-msg form-text text-muted">类别名称不能为空</small>
          </div>
          <div class="form-group">
            <label>颜色</label>
            <Chrome class="color-picker" v-model="color"/>
            <!-- <input type="text" class="form-control form-control-sm" placeholder="#aabbcc" v-model="color"> -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-primary" @click="ok">确定</button>
          <button type="button" class="btn btn-sm btn-secondary" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
  props: ['visiable'],
  data() {
    return {
      className: '',
      invalidClassName: false,
      color: `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
    }
  },
  methods: {
    reset() {
      this.invalidClassName = false
      this.className = ''
      this.color = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
    },
    ok() {
      if (this.className === '') {
        this.invalidClassName = true
        return
      }
      let name = this.className
      let color = this.color
      if (typeof color === 'object') {
        let { r, g, b, a } = color.rgba
        color = `rgba(${r}, ${g}, ${b}, ${a})`
      }

      this.$emit('ok', { name, color })
      this.reset()
    },
    cancel() {
      this.$emit('cancel')
      this.reset()
    }
  },
  components: {
    Chrome
  }
}
</script>
<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.3);
  color: initial;
}

.color-picker {
  width: 100%;
  box-shadow: none;
  border: 1px solid #ced4da;
  border-radius: 2px;
}

.error-msg {
  color: red !important;
}
</style>
