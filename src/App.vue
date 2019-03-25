<template>
  <div id="app">
    <Navbar/>
    <div id="panels">
      <div id="main-panel">
        <div id="content-workspace">
          <Workspace/>
        </div>
        <div id="content-album">
          <Album/>
        </div>
      </div>
      <div id="content-control-panel" :style="{width: controlPanelWidth + 'px'}">
        <div
          id="handle-control-panel"
          :class="{draging: isControlPanelDraging}"
          @mousedown="startDragingControlPanel"
        ></div>
        <ControlPanel/>
      </div>
    </div>
  </div>
</template>
<script>
// import Workspace from "./components/Workspace";
import Navbar from './components/Navbar'
import Workspace from './components/Workspace'
import Album from './components/Album'
import ControlPanel from './components/ControlPanel'

export default {
  name: 'App',
  data() {
    return {
      isControlPanelDraging: false,
      controlPanelDragingStartX: 0,
      controlPanelDragingStartWidth: 0,
      controlPanelWidth: 300
    }
  },
  methods: {
    startDragingControlPanel(e) {
      this.isControlPanelDraging = true
      this.controlPanelDragingStartWidth = this.controlPanelWidth
      this.controlPanelDragingStartX = e.clientX

      let dragingControlPanel = e => {
        this.controlPanelWidth =
          this.controlPanelDragingStartX -
          e.clientX +
          this.controlPanelDragingStartWidth
      }

      let stopDragingControlPanel = e => {
        this.isControlPanelDraging = false
        this.controlPanelDragingStartX = 0
        document.removeEventListener('mousemove', dragingControlPanel)
        document.removeEventListener('mouseup', stopDragingControlPanel)
      }

      document.addEventListener('mousemove', dragingControlPanel)
      document.addEventListener('mouseup', stopDragingControlPanel)
    }
  },
  components: {
    Navbar,
    Workspace,
    Album,
    ControlPanel
  }
}
</script>

<style>
html,
body {
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 0, 0.2);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#panels {
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
}

#main-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

#content-workspace {
  flex: 1;
  background-color: rgb(33, 37, 43);
  overflow: auto;
}

#content-album {
  width: 100%;
  height: 120px;
  overflow-x: auto;
}

#content-control-panel {
  flex-shrink: 0;
  display: flex;
  height: 100%;
  background-color: rgb(40, 44, 52);

}

#handle-control-panel {
  width: 3px;
  height: 100%;
  background-color: rgb(71, 74, 79);
  cursor: e-resize;
}

#handle-control-panel.draging {
  background-color: rgb(79, 175, 239);
}
</style>
