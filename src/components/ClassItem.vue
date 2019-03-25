<template>
  <li class="class-item" :class="{active: active}" @click="toggleClass">
    <div class="color" :style="{'background-color': color}" @click.stop="showColorPicker"></div>
    <div class="name">{{className}}</div>
    <div class="delete" @click="removeClass">&times;</div>
    <div v-if="colorPickerVisiable" class="overlay" @click.self.stop="hideColorPicker">
      <Chrome
        v-model="color"
        style="position: absolute;"
        :style="{left: colorPickerPosX + 'px', top: colorPickerPoxY + 'px'}"
      />
    </div>
  </li>
</template>
<script>
import { Chrome } from 'vue-color'

export default {
  props: ['className'],
  data() {
    return {
      colorPickerVisiable: false,
      colorPickerPosX: 0,
      colorPickerPoxY: 0
    }
  },
  computed: {
    color: {
      get() {
        return this.$store.state.classes[this.className] || 'transparent'
      },
      set(val) {
        let { r, b, g, a } = val.rgba
        this.$store.commit('updateClass', {
          name: this.className,
          color: `rgba(${r}, ${g}, ${b}, ${a})`
        })
      }
    },
    active() {
      return this.className === this.$store.state.currentClassName
    }
  },
  methods: {
    toggleClass() {
      let name = this.className
      if (this.active) this.$store.commit('unselectClass')
      else this.$store.commit('selectClass', { name })
    },
    removeClass() {
      this.$store.commit('removeClass', { name: this.className })
    },
    showColorPicker() {
      this.colorPickerPosX = this.$el.offsetLeft + 10
      this.colorPickerPoxY = this.$el.offsetTop + this.$el.offsetHeight
      this.colorPickerVisiable = true
    },
    hideColorPicker() {
      this.colorPickerVisiable = false
    }
  },
  components: {
    Chrome
  }
}
</script>
<style>
.class-item .color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;
}

.class-item .color:hover {
  border: 2px #87cfff solid;
  cursor: pointer;
}

.class-item .name {
  flex-grow: 1;
  font-size: 14px;
}

.class-item .delete {
  cursor: pointer;
  /* margin: 8px; */
}

.class-item .delete:hover {
  color: white;
  /* margin: 8px; */
}

.class-item .overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
