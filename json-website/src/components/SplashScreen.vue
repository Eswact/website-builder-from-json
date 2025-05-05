<script setup>
    import commonFunctions from '../scripts/common';
    const splash = commonFunctions.getSplashScreen();
</script>

<template>
  <div v-if="splash.visible" id="splashScreen" class="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col gap-4 justify-center items-center text-center">
    <div v-html="splash.defaultHtml"></div>
    <h1 v-if="splash.title" class="font-bold text-3xl text-white">{{ $t(`${splash.title}`) }}</h1>
    <p v-if="splash.description" class="font-semibold text-lg text-white dark:text-main">{{ $t(`${splash.description}`) }}</p>
    <div v-if="splash.buttons.length" class="flex items-center justify-center gap-2 mt-6">
      <button
        v-for="(button, index) in splash.buttons"
        :key="index"
        :class="button.type"
        class="px-3 py-2 text-xl rounded-lg text-white font-bold border-2 border-fourth bg-fourth shadow-md"
        @click="button.action"
      >
        {{ $t(`${button.text}`) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
  #splashScreen img {
      max-height: 50%;
      width: auto;
      object-fit: contain;
  }
  #splashScreen div button.acceptButton {
      border-color: #03FF01;
      background-color: #03FF01;
  }
  #splashScreen div button.cancelButton {
      border-color: #F70000;
      background-color: #F70000;
  }
</style>