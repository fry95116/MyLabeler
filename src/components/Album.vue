<template>
  <ul id="album" @dragover.prevent @drop="readFiles">
    <li
      class="image-file"
      v-for="(image, name) in images"
      :key="name"
      :class="{active: name == currentImageName}"
      :title="name"
      @click="selectImage(name)"
    >
      <img :src="image.url">
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Album',
  data() {
    return {}
  },
  computed: {
    currentImageName() {
      return this.$store.state.currentImageName
    },
    images() {
      return this.$store.state.images
    }
  },
  methods: {
    readFiles(e) {
      let files = e.dataTransfer.files
      let images = []
      for (let file of files) {
        let imageURL = window.URL.createObjectURL(file)
        var img = new Image()
        img.src = imageURL

        let image = {
          name: file.name,
          url: imageURL
        }
        images.push(image)
      }
      this.$store.commit('addImages', { images })
    },
    selectImage(name) {
      this.$store.commit('selectImage', { name })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#album {
  display: flex;
  flex-direction: row;
  margin: 0;
  height: 100%;
  padding: 0;
  min-width: 100%;
  background-color: rgba(40, 44, 52);
  /* border-top: 2px rgb(71, 74, 79) solid; */
  list-style: none;
}

#album .image-file {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 160px;
  background-color: rgba(40, 44, 52);
  border: 1px rgb(71, 74, 79) solid;
}

#album .image-file.active {
  border: 2px rgb(82, 139, 255) solid;
  border-radius: 2px;
}

#album .image-file img {
  max-height: 100%;
  max-width: 100%;
}

/* #album .image-file .file-name{
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 4px 6px;
  background-color: rgba(0,0,0,0.2);
  white-space: nowrap;
  overflow: hidden;
  color:white;
  font-size: small;
} */
</style>
