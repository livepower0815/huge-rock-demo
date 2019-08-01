<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="true"></loading>
    <navbar/>
    <form class="form-signin py-5">
      <h1 class="h3 mb-3 font-weight-normal">請輸入帳號密碼</h1>
      <label for="inputEmail" class="sr-only">請輸入帳號</label>
      <input type="email" id="inputEmail" class="form-control my-3" placeholder="Email address" v-model="user.username"
        required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control my-3" placeholder="Password" v-model="user.password"
        required>
      <!-- <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div> -->
      <button  @click.prevent="signin" class="btn btn-lg btn-primary btn-block" type="button">登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
    </form>
  </div>
</template>

<script>
  import navbar from '../components/homeNavBar.vue';
  import {auth} from '@/firebase.js'


  export default {
    components:{
      navbar,
    },
    name: "login",
    data() {
      return {
        user: {
          username: "",
          password: "",
        },
        isLoading: false,
      };
    },
    methods: {
      signin() {
        const vm = this
        vm.isLoading = true
        auth.signInWithEmailAndPassword(this.user.username, this.user.password)
          .then(user => {
            vm.isLoading = false
            vm.$router.push('/dashboard/products');
          })
          .catch(function(error) {
            vm.isLoading = false
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
      }
    }
  };

</script>

<style scoped>
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    border: black solid 2px;
    border-radius: 12px;
    padding: 15px;
    margin: 10vh auto;
    background: rgb(246, 246, 246);
    box-shadow: 5px 5px 10px rgb(120, 120, 120);
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

</style>
