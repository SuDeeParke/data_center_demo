<template>
  <div>

  </div>
</template>

<script>
import BasicCamera from '../libs/BasicCamera';

export default {
  name: 'Scene',
  mounted() {
    const camera = new BasicCamera();
    console.log(camera);
  },
};
</script>

<style lang="scss" scoped>

</style>
