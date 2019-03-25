<template>
  <div id="control-panel">
    <h1>控制面板</h1>
    <div id="class-list" :class="{open:classlistVisiable}">
      <div class="header" @click="toggleClassList">
        <div class="indicator" :class="{open:classlistVisiable}"></div>
        <div class="header-title">类型</div>
        <img class="operator" src="../assets/plus.svg" @click.stop="showNewClass">
      </div>
      <div v-show="classlistVisiable" class="list-content">
        <ul class="list">
          <ClassItem
            class="list-item"
            v-for="(color, className) in classes"
            :key="className"
            :className="className"
          />
        </ul>
      </div>
      <NewClass :visiable="newClassVisiable" @ok="addClass" @cancel="newClassVisiable=false"/>
    </div>
    <div id="bbox-list" :class="{open:bboxlistVisiable}">
      <div class="header" @click="toggleBBoxList">
        <div class="indicator" :class="{open:bboxlistVisiable}"></div>
        <div class="header-title">边界框</div>
      </div>
      <div v-show="bboxlistVisiable" class="list-content">
        <ul class="list">
          <li
            class="list-item"
            v-for="(bbox, index) in bboxs"
            :key="index"
            :class="{active: index === currentBBoxIndex}"
            @click="toggleBBox(index)"
          >
            <div class="index">{{index}}</div>
            <div class="name" :style="{color: classes[bbox.class] || 'gray'}">{{bbox.class}}</div>
            <div class="pos">{{`(${bbox.x1}, ${bbox.y1}, ${bbox.x2}, ${bbox.y2})`}}</div>
            <div class="delete" @click.stop="removeBBox(index)">&times;</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ClassItem from './ClassItem'
import NewClass from './NewClass'
export default {
  name: 'ControlPanel',
  data() {
    return {
      newClassVisiable: false,
      classlistVisiable: true,
      bboxlistVisiable: true
    }
  },
  computed: {
    classes() {
      return this.$store.state.classes
    },
    currentClassName() {
      return this.$store.state.currentClassName
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
    currentBBoxIndex() {
      return this.$store.state.currentBBoxIndex
    }
  },
  methods: {
    toggleClassList() {
      this.classlistVisiable = !this.classlistVisiable
    },
    toggleBBoxList() {
      this.bboxlistVisiable = !this.bboxlistVisiable
    },
    showNewClass() {
      this.newClassVisiable = true
    },
    addClass(msg) {
      this.newClassVisiable = false
      this.$store.commit('addClass', msg)
    },
    toggleBBox(index) {
      if (this.currentBBoxIndex === index) {
        index = -1
      }
      this.$store.commit('selectBBox', { index })
    },
    removeBBox(index) {
      this.$store.commit('removeBBox', { index })
    }
  },
  components: {
    ClassItem,
    NewClass
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#control-panel {
  width: 100%;
  color: rgb(204, 204, 204);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#control-panel h1 {
  font-size: medium;
  margin: 10px 12px;
}

#new-class {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

#class-list,
#bbox-list {
  display: flex;
  flex-direction: column;
}
#class-list.open,
#bbox-list.open {
  flex-grow: 1;
}

.header {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background-color: rgb(51, 56, 66);
  font-size: small;
}
.header .indicator {
  width: 0;
  height: 0;
  border: 4px transparent solid;
  border-left: 4px rgb(204, 204, 204) solid;
  margin-right: 4px;
}
.header .indicator.open {
  border: 3px transparent solid;
  border-right: 3px rgb(204, 204, 204) solid;
  border-bottom: 3px rgb(204, 204, 204) solid;
  margin-right: 6px;
}

.header .header-title {
  flex-grow: 1;
}

.header .operator {
  width: 10px;
  height: 10px;
  opacity: 0.5;
  cursor: pointer;
}

.header .operator:hover {
  opacity: 1;
}
.list-content {
  overflow-x: hidden;
  overflow-y: auto;
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.list .list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
}

.list .list-item.active {
  background: rgba(255, 255, 255, 0.1);
}

.list .list-item .index {
  width: 40px;
  font-size: 14px;
}

.list .list-item .pos {
  flex-shrink: 1;
  font-size: 12px;
  margin-right: 6px;
}

#bbox-list .name {
  flex-grow: 1;
}
</style>
