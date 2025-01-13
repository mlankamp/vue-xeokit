<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';

import { NavCubePlugin, TreeViewPlugin, Viewer, XKTLoaderPlugin } from '@xeokit/xeokit-sdk';

import renderService from '../treeviewRenderService';

const mainCanvas = ref<HTMLCanvasElement>();
const cubeCanvas = ref<HTMLCanvasElement>();
const treeContainer = ref<HTMLDivElement>();
const viewer: Ref<Viewer | null> = ref(null);

onMounted(() => {
  viewer.value = new Viewer({
    canvasElement: mainCanvas.value,
    transparent: true
  });

  const cameraControl = viewer.value.cameraControl;
  const scene = viewer.value.scene;
  const cameraFlight = viewer.value.cameraFlight;

  cameraControl.followPointer = true;
  cameraFlight.duration = 1.0;
  cameraFlight.fitFOV = 25;

  scene.camera.eye = [-37.1356047775136, 13.019223731456176, 58.51748229729708];
  scene.camera.look = [-21.930914776596467, 1.3515918520952024, 29.454670463302506];
  scene.camera.up = [0.15536164462465452, 0.9421651211030125, -0.2969640448883814];

  new NavCubePlugin(viewer.value, {
    canvasElement: cubeCanvas.value,
    visible: true,
  });

  new TreeViewPlugin(viewer.value, {
    containerElement: treeContainer.value,
    hierarchy: 'containment',
    autoExpandDepth: 3,
    renderService: renderService
  });

  const xktLoader = new XKTLoaderPlugin(viewer.value);
  const sceneModel = xktLoader.load({
    id: 'Widget',
    src: 'https://xeokit.github.io/xeokit-sdk/assets/models/xkt/v10/ifc/rac.xkt',
    edges: true,
    excludeUnclassifiedObjects: false
  });

  const t0 = performance.now();
  sceneModel.on('loaded', function () {
    const t1 = performance.now();
    console.log(`Model loaded in ${Math.floor(t1 - t0) / 1000.0} seconds, Objects: ${sceneModel.numEntities}`);
  });
});

onUnmounted(() => {
  if (viewer.value !== null) viewer.value.destroy();
});

</script>

<template>
  <v-navigation-drawer width="450">
    <nav class="treeViewContainer">
      <div ref="treeContainer" class="treeWrapper" />
    </nav>
  </v-navigation-drawer>

  <v-main class="d-flex">
    <canvas ref="mainCanvas" class="viewer" />
    <canvas ref="cubeCanvas" class="navCube" />
  </v-main>
</template>
