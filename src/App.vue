<template>
  <router-view/>
</template>

<style>
@import "assets/css/bootstrap.css";
body{
  font-family: Roboto, sans-serif;
  background-color: #F5F5F5;
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