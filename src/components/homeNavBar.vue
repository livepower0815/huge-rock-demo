<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">
          <i class="fas fa-copyright"></i> Huge Bamboo 巨竹
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/shopping">
                Products
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/fireTest">
                fire測試
              </router-link>
            </li> -->
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/order">
                訂單列表
              </router-link>
            </li> -->
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <router-link class="btn btn-outline-info my-2 my-sm-0" to="/login">
              後台管理
            </router-link>
          </form>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
  export default {

  }
</script>