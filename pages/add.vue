<template>
  <v-app>
    <div class="d-flex w-30" >
      <div>Pick a color: </div>
      <v-color-picker
        class="ml-4"
        hide-canvas
        v-model="color"
      ></v-color-picker>
    </div>
    <div class="d-flex justify-center align-center w-30" >
      <div>Enter a name: </div>
      <v-text-field
        v-model="name"
        class="ml-4"
      ></v-text-field>
    </div>
    <div class="d-flex justify-center align-center w-30" >
      <div>Enter a weight: </div>
      <v-text-field
        v-model="weight"
        type="number"
        class="ml-4"
      ></v-text-field>
    </div>
   <div class="d-flex justify-center w-30">
     <v-btn
       @click="onAddBtnClick"
       class="w-10"
     >Add</v-btn>
     <v-btn
       @click="onBackToMainPageCLick"
       class="ml-4">Back to main page</v-btn>
   </div>
    <div class="mt-4">
      <div>List of items:</div>
      <div style="max-height: 250px;width: 500px" class="overflow-auto">
        <div v-for="(item, index) in this.items" :key="item.name" class="d-flex mb-2">
          <div class="d-flex" style="width: 350px">Name : {{item.name}}, Color : {{item.label}}, Weight : {{item.weight}}</div>
          <v-btn style="width: 20px;" class="ml-12" @click="onDeleteClick(index)">Delete</v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'AddPage',

  computed: {
    ...mapState({
      items: state => state.items,
    }),
  },

  methods: {
    onAddBtnClick(){
      let item = {
        'label' : this.color,
        'name' : this.name,
        'weight' : parseInt(this.weight)
      }
      this.$store.commit('addToList', {item});
    },
    onDeleteClick(index) {
      this.$store.commit('deleteItemInList', {index});
    },
    onBackToMainPageCLick() {
      this.$router.push('/')
    }
  },

  watch: {
    // color: function (val) {
    //
    // }
  },

  data() {
    return {
      color: '',
      name: '',
      weight: 0,
    }
  }
}
</script>

<style scoped>
.w-30{
  width: 30%;
}
.w-10{
  width: 10%;
}
</style>
