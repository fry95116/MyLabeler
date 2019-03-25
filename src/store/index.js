import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    images: {},
    currentImageName: '',

    bboxs: [],
    currentBBoxIndex: -1,

    classes: {
      // c1: '#f00',
      // c2: '#0f0',
      // c3: '#00f'
    },
    currentClassName: ''
  },
  mutations: {
    addImages(state, payload) {
      var { images } = payload
      for (let image of images) {
        Vue.set(state.images, image.name, image)
      }
    },

    selectImage(state, payload) {
      var { name } = payload
      if (name in state.images) {
        state.currentImageName = name
      }
    },

    addBBoxs(state, payload) {
      var { bboxs } = payload
      if (bboxs instanceof Array) {
        state.bboxs = state.bboxs.concat(bboxs)
      } else {
        state.bboxs.push(bboxs)
      }
    },

    selectBBox(state, payload) {
      var { index } = payload
      if (index >= -1 && index < state.bboxs.length) {
        state.currentBBoxIndex = index
        state.currentClassName = ''
      }
    },
    unselectBBox(state) {
      state.currentBBoxIndex = -1
    },

    updateBBox(state, payload) {
      let { index, newAttr } = payload
      for (let [key, value] of Object.entries(newAttr)) {
        state.bboxs[index][key] = value
      }
    },

    removeBBox(state, payload) {
      var { index } = payload
      if (index >= -1 && index < state.bboxs.length) {
        state.bboxs.splice(index, 1)
        if (index < state.currentBBoxIndex) {
          state.currentBBoxIndex = -1
        }
      }
    },

    addClass(state, payload) {
      let { name, color } = payload
      let newObj = {}
      newObj[name] = color
      if (!(name in state.classes)) {
        state.classes = Object.assign({}, state.classes, newObj)
      }
    },
    addClasses(state, payload) {
      let {classes} = payload
      state.classes = Object.assign({}, state.classes, classes)
    },

    removeClass(state, payload) {
      let { name } = payload
      Vue.delete(state.classes, name)
    },

    selectClass(state, payload) {
      let { name } = payload
      if (name in state.classes) {
        state.currentClassName = name
        state.currentBBoxIndex = -1
      }
    },

    unselectClass(state) {
      state.currentClassName = ''
    },

    updateClass(state, payload) {
      let { name, color } = payload
      let newObj = {}
      newObj[name] = color
      if (name in state.classes) {
        state.classes = Object.assign({}, state.classes, newObj)
      }
    }
  }
})
