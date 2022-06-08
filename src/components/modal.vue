<script>
export default {
  name: 'modal',
  methods: {

    close() {
      this.$emit('close');
    },
  },
};
</script>
<template>
  <transition name="modal-fade">
    <div class="filter-backdrop" >
      <div class="filter">
        <header class="filter-header" id="modalTitle">
          <slot name="header"></slot>
        </header>
        <section class="filter-body" id="modalDescription">
          <slot name="body"></slot>
        </section>
        <footer class="filter-footer" id="modalFooter">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
.filter-backdrop {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter {
  background: #FFFFFF;
  max-width: 500px;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: grid;
}

.filter-header,
.filter-footer {
  padding: 10px;
  display: grid;
  grid-template-columns: 9fr 1fr;
}

.filter-footer1{
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.filter-header {
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.filter-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.filter-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  cursor: pointer;
  border: none;
  background-color: white;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
</style>