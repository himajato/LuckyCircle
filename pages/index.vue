<template>
  <div>
    <rolling-cirle
      :diameter="diameter"
    ></rolling-cirle>
  </div>
</template>
<script>
import {mapMutaions} from 'vuex'
import RollingCirle from "../components/RollingCirle";

export default {
  name: 'IndexPage',
  components: {RollingCirle},
  created() {
  },

  data() {
    return {
      diameter : 400 ,
    }
  }
}
</script>
