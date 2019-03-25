<template>
  <nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">MyLabeler</a>
    <button class="navbar-toggler" type="button" @click="toggleCollapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" :class="{show: collapseVisiable}">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <label class="nav-link" for="file-loader">导入Bbox</label>
          <input id="file-loader" type="file" @change="importBBoxs">
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)" @click.stop="exportBBoxs">导出Bbox</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      collapseVisiable: false
    }
  },
  methods: {
    toggleCollapse() {
      this.collapseVisiable = !this.collapseVisiable
    },

    exportBBoxs(format) {
      let {bboxs, classes} = this.$store.state
      let blob = new Blob([JSON.stringify({bboxs, classes})], {
        type: 'text/plain'
      })
      let url = URL.createObjectURL(blob)
      this.download(url, 'bboxs.json')
    },

    importBBoxs(e) {
      console.log(e)
      let files = e.target.files
      let reader = new FileReader()
      reader.onload = e => {

        let {classes, bboxs} = JSON.parse(reader.result)
        console.log(classes)
        console.log(bboxs)

        // TODO: 格式检查
        this.$store.commit('addClasses', { classes })
        this.$store.commit('addBBoxs', { bboxs })
      }
      for (let file of files) {
        reader.readAsText(file, 'utf-8')
      }
    },
    download(url, fileName) {
      var eleLink = document.createElement('a')
      eleLink.download = fileName
      eleLink.style.display = 'none'
      // 字符内容转变成blob地址
      eleLink.href = url
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
label.nav-link {
  margin-bottom: 0;
}
#file-loader {
  display: none;
}
</style>
