export const state = () => ({
  items: [
    {
      'name' : 'red',
      'label' : 'red',
      'weight' : 20,
    },
    {
      'name' : 'blue',
      'label' : 'blue',
      'weight' : 20,
    },
    {
      'name' : 'yellow',
      'label': 'yellow',
      'weight' : 20,
    },
    {
      'name' : 'purple',
      'label' : 'purple',
      'weight': 20,
    },
    {
      'name' : 'grey',
      'label' : 'grey',
      'weight' : 20,
    },
    {
      'name': 'orange',
      'label': 'orange',
      'weight' : 1000,
    }
  ],
  itemsWeighRange: []
})

export const mutations = {
  addToList(state, {item}) {
    state.items.push(item);
  },
  addToItemsWeightRange(state, {weightRange}) {
    state.itemsWeighRange.push(weightRange)
  },
  clearItemsWeightRange(state) {
    state.itemsWeighRange = [];
  },
  deleteItemInList(state, {index}) {
    state.items.splice(index,1);
  },
}

export const getters = {
  getTotalWeigh: (state) =>{
    let total = 0;
    for (let i = 0; i < state.items.length; i++) {
      total += state.items[i].weight;
    }
    return total;
  }
}
