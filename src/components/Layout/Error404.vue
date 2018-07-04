<template>
  <div class="bg-img">
    <div class="centered">
      <v-layout>
        <v-flex xs12 sm4>
          <img src="../../assets/wrong-turn.jpg" width="200">
        </v-flex>
        <v-flex xs12 sm8>
          <h1>Looks like you missed your way again.</h1>
          <i>The developers can't always be at fault</i>
        </v-flex>
      </v-layout>
      <v-btn @click="back">Go Back</v-btn>
      <!--<h1>404</h1>-->
      <!--<p>The page you are looking for could not be found</p>-->
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Error404',
      data () {
        return {}
      },
      methods: {
        back () {
          window.history.back()
        }
      }
    }
</script>

<style scoped>
  .bg-img {
    position: relative;
    width: 100%;
    height: 90vh;
    background: url("../../assets/404_bg.png") center center no-repeat;
    background-size: cover;
  }

  .bg-img:before {
     content: '';
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     background-image: linear-gradient(to bottom right, #000, #000);
     opacity: 0.4;
   }

  .bg-img * {
    position: relative;
  }

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #d3d3d3;
    /*width: 100%;*/
    /*height: 100%;*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }
</style>
