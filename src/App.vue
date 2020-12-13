<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
    }
    #app {
      width: 80%;
      margin: 100px auto;
    }
</style>
