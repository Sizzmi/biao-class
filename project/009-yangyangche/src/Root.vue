<template>
  <div>
    <Login/>
    <!-- <Signup/> -->
    <!-- <Detail/> -->
    <!-- <Home/> -->
  </div>
</template>

<script>
import Detail from "./page/Detail";
import Home from "./page/Home";
import Login  from './page/Login';
import Signup  from './page/Signup';

export default {
  name: "root",
  components: {
    Detail,
    Home,
    Login,
    Signup,
  },
};
</script>

<style>
</style>