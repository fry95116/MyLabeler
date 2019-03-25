<template>
  <g>
    <rect
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      style="fill: transparent; stroke-width: 2;"
      :style="{stroke: color}"
      @click="selectBBox"
    />
    <rect
      v-if="_interactable"
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      style="fill: rgba(0, 0, 255, 0.1); cursor: move"
      @mousedown.stop="dragBBox"
    />
    <circle
      v-if="_interactable"
      :cx="x1"
      :cy="y1"
      r="4"
      style="cursor:nw-resize; stroke-width: 2; stroke:rgb(150, 150, 150); fill: #fff;"
      @mousedown.stop="dragP1"
    />
    <circle
      v-if="_interactable"
      :cx="x2"
      :cy="y2"
      r="4"
      style="cursor:nw-resize; stroke-width: 2; stroke:rgb(150, 150, 150); fill: #fff;"
      @mousedown.stop="dragP2"
    />
  </g>
</template>
<script>
export default {
  name: 'BoundingBox',
  props: ['index', 'interactable'],
  data() {
    return {
      isDragingP1: false,
      isDragingP2: false,
      isDragingBBox: false
    }
  },
  computed: {
    color() {
      let bbox = this.$store.state.bboxs[this.index]
      let color = this.$store.state.classes[bbox.class]
      if (typeof color === 'string') return color
      else return 'transparent'
    },
    x1() {
      return this.$store.state.bboxs[this.index].x1
    },
    y1() {
      return this.$store.state.bboxs[this.index].y1
    },
    x2() {
      return this.$store.state.bboxs[this.index].x2
    },
    y2() {
      return this.$store.state.bboxs[this.index].y2
    },
    x() {
      return Math.min(this.x1, this.x2)
    },
    y() {
      return Math.min(this.y1, this.y2)
    },
    width() {
      return Math.abs(this.x2 - this.x1)
    },
    height() {
      return Math.abs(this.y2 - this.y1)
    },
    _interactable() {
      return (
        this.interactable && this.index === this.$store.state.currentBBoxIndex
      )
    }
  },
  methods: {
    selectBBox() {
      this.$store.commit('selectBBox', { index: this.index })
    },
    dragBBox(e) {
      this.isDragingBBox = true
      let biasX1 = e.offsetX - this.x1
      let biasY1 = e.offsetY - this.y1
      let biasX2 = e.offsetX - this.x2
      let biasY2 = e.offsetY - this.y2

      let drag = e => {
        this.$store.commit('updateBBox', {
          index: this.index,
          newAttr: {
            x1: e.offsetX - biasX1,
            y1: e.offsetY - biasY1,
            x2: e.offsetX - biasX2,
            y2: e.offsetY - biasY2
          }
        })
      }

      let stopDrag = e => {
        this.isDragingBBox = false
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', stopDrag)
      }

      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', stopDrag)
    },

    dragP1(e) {
      this.isDragingP1 = true

      let drag = e => {
        this.$store.commit('updateBBox', {
          index: this.index,
          newAttr: { x1: e.offsetX, y1: e.offsetY }
        })
      }

      let stopDrag = e => {
        this.isDragingP1 = false
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', stopDrag)
      }

      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', stopDrag)
    },
    dragP2(e) {
      this.isDragingP2 = true

      let drag = e => {
        this.$store.commit('updateBBox', {
          index: this.index,
          newAttr: { x2: e.offsetX, y2: e.offsetY }
        })
      }

      let stopDrag = e => {
        this.isDragingP2 = false
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', stopDrag)
      }

      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', stopDrag)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
