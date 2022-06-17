<template>
  <transition>
    <div class="backF">
      <div class="nav-bar">
        <header>
          <slot name="header"></slot>
        </header>
        <section style="margin: auto 0">
          <slot name="body"></slot>
        </section>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
      <div style="width: 100%; height: 100%"></div>
    </div>
  </transition>

</template>

<script>
export default {
  name: "Nav"
}
</script>

<style scoped>


.backF {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: left;
  align-items: center;
}



.nav-bar {
  height: 100%;
  display: grid;

  padding: 10px;
  grid-template-rows: 1fr 6fr 1fr;
  gap: 10px;
  background-color: #00796B;
}



</style>