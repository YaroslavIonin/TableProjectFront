<template>
  <router-view/>
</template>

<style>
@import "assets/css/bootstrap.css";
body{
  font-family:"Times New Roman", sans-serif;
}
</style>

<script>
import HomeView from "@/views/HomeView";
import Nav from "@/components/Nav";
import Filter from "@/components/modal";

export default {
  name: 'App',
  components: {HomeView},
}
</script>