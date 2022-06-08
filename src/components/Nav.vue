<template>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
       id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style="width:220px;">

    <div class="offcanvas-header">
      <div class="card text-center">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Фамилия</li>
          <li class="list-group-item">Имя</li>
          <li class="list-group-item">Отчество</li>
          <li class="list-group-item">e-mail</li>
        </ul>
      </div>
<!--      <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"-->
<!--              aria-label="Close"></button>-->
    </div>
    <div class="offcanvas-body">
      <div class="card text-center card__table" style="width: 170px;">
        <h5 class="zago ">Таблицы</h5>
        <div class="list-group ">
          <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
            Квотники
          </a>
          <a href="#" class="list-group-item list-group-item-action">Подгот. год</a>
          <a href="#" class="list-group-item list-group-item-action">Курсы РЯ</a>
          <a href="#" class="list-group-item list-group-item-action">Подгот. 1.5 года(21-22)</a>
          <a href="#" class="list-group-item list-group-item-action">Косяки</a>
        </div>
      </div>
      <div class="header__logo">
        <a href="#" class="header__logo-link">
<!--          <img src="/img/svg/logo.svg" alt="Подготовительное отделение для иностранных учащихся УрФУ"-->
<!--               class="header__logo pic" style="width: 170px;">-->
        </a>
      </div>

    </div>
  </div>
  <button class="btn modal-dialog modal-sm" style="background-color: #E1E1E1; height: 50px;" type="button"
          data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Меню
  </button>
</template>

<script>
export default {
  name: "Nav"
}
</script>

<style scoped>
.card {
  width: 100%;
  word-wrap: break-word;
  margin: 0 auto;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.offcanvas{
  width: 100px;
  background-color: #5C5C5C;

}

.offcanvas-header {
  padding: 20px;
  display: inline-block;
}

.offcanvas-body {
}

.zago {
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: #FAE0C8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__table {
  margin-bottom: 20px;
}

</style>