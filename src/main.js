import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false

document.ondragover = function (e) {
  // 只有在ondragover中阻止默认行为
  // 才能触发ondrop而不是ondragleave
  e.preventDefault()
}
document.ondrop = function (e) {
  // 阻止 document.ondrop的默认行为:在新窗口中打开拖进的图片
  e.preventDefault()
}

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
