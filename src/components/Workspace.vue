<template>
  <div id="workspace">
    <img
      class="image"
      v-show="image.url !== '#'"
      :src="image.url"
      @load="updateImageSize"
      @mousedown.prevent
    >
    <svg
      class="bboxs"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      :width="width"
      :height="height"
      @mousedown="addBBox"
    >
      <BoundingBox
        v-for="(bbox, index) in bboxs"
        :key="index"
        :interactable="createMode === false"
        :index="index"
      ></BoundingBox>
      <rect
        v-if="creatingBBox"
        :x="newBBoxX"
        :y="newBBoxY"
        :width="newBBoxWidth"
        :height="newBBoxHeight"
        :style="'fill: transparent; stroke-width: 2; stroke: ' + (currentClassColor || 'transparent')"
      ></rect>
    </svg>
  </div>
</template>
<script>
import BoundingBox from './Bbox'
export default {
  name: 'Workspace',
  data() {
    return {
      width: 0,
      height: 0,
      creatingBBox: false,
      newBBoxX1: 0,
      newBBoxY1: 0,
      newBBoxX2: 0,
      newBBoxY2: 0
    }
  },
  computed: {
    image() {
      let name = this.$store.state.currentImageName
      if (name !== '') {
        return this.$store.state.images[name]
      } else {
        return {
          name: '',
          url: '#'
        }
      }
    },
    bboxs() {
      let imageName = this.$store.state.currentImageName
      let bboxs = this.$store.state.bboxs
      let ret = {}
      for (let [index, bbox] of Object.entries(bboxs)) {
        if (bbox.imageName === imageName) {
          ret[index] = bbox
        }
      }
      return ret
    },
    currentImageName() {
      return this.$store.state.currentImageName
    },
    currentClassName() {
      return this.$store.state.currentClassName
    },
    currentClassColor() {
      return this.$store.state.classes[this.$store.state.currentClassName]
    },
    newBBoxX() {
      return Math.min(this.newBBoxX1, this.newBBoxX2)
    },
    newBBoxY() {
      return Math.min(this.newBBoxY1, this.newBBoxY2)
    },
    newBBoxWidth() {
      return Math.abs(this.newBBoxX2 - this.newBBoxX1)
    },
    newBBoxHeight() {
      return Math.abs(this.newBBoxY2 - this.newBBoxY1)
    },
    createMode() {
      return this.$store.state.currentClassName !== ''
    }
  },
  methods: {
    updateImageSize(e) {
      let img = e.target
      if (img instanceof Image) {
        this.width = img.width
        this.height = img.height
      }
    },
    addBBox(e) {
      if (!this.createMode) {
        this.$store.commit('unselectBBox')
        return
      }

      this.creatingBBox = true
      this.newBBoxX1 = e.offsetX
      this.newBBoxY1 = e.offsetY
      this.newBBoxX2 = e.offsetX
      this.newBBoxY2 = e.offsetY

      let drag = e => {
        this.newBBoxX2 = e.offsetX
        this.newBBoxY2 = e.offsetY
      }

      let stopDrag = e => {
        this.creatingBBox = false
        if (
          this.newBBoxX1 !== this.newBBoxX2 &&
          this.newBBoxY1 !== this.newBBoxY2
        ) {
          let bboxs = {
            imageName: this.currentImageName,
            class: this.currentClassName,
            x1: this.newBBoxX1,
            y1: this.newBBoxY1,
            x2: this.newBBoxX2,
            y2: this.newBBoxY2
          }
          this.$store.commit('addBBoxs', { bboxs })
        }

        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', stopDrag)
      }

      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', stopDrag)
    }
  },
  components: {
    BoundingBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#workspace {
  position: relative;
}
#workspace .image {
  position: absolute;
  left: 0;
  top: 0;
}

#workspace .bboxs {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
