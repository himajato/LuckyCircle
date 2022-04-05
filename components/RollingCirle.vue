<template>
  <div :style="cssVars">
    <div ref="cirle-container" class="cirle-container">
      <div ref="triangle" class="triangle">
      </div>
      <div class="rotate-90">
        <svg viewBox='0 0 110 110' ref="spin-wheel">
        </svg>
      </div>
      <v-btn
        min-width="50px"
        min-height="50px"
        class="center-btn circle" @click="toggleRoll">Roll</v-btn>
    </div>
    <v-btn>
      <nuxt-link to="/add">Add item to circle</nuxt-link>
    </v-btn>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import {getters, state} from "../store";
export default {
  name: 'RollingCirle',

  props: {
    diameter: {
      type: Number
    },
  },

  created() {
  },

  mounted() {
      this.$store.commit('clearItemsWeightRange');
      this.createPie(this.itemLength);
  },

  computed: {
      ...mapState({
          itemLength: state => state.items.length,
          items : state => state.items,
          itemsWeighRange : state => state.itemsWeighRange,
          itemsWeighRangeLength: state => state.itemsWeighRange.length,
      }),
      ...mapGetters({
        totalWeight : 'getTotalWeigh',
      }),

      cssVars() {
        return {
          '--circle-diameter' : this.diameter + 'px',
          '--border-left-triangle' : this.diameter/20 + 'px solid transparent',
          '--border-right-triangle' : this.diameter/20 + 'px solid transparent',
          '--border-top-triangle' : this.diameter/20 + 'px solid greenyellow',
          '--center-btn-height-width' : this.diameter/10 + 'px',
        }
      },

      fullCircleDeg: function () {
        return 360;
      },
  },

  methods: {
    toggleRoll() {
      this.spinCount = ++this.spinCount;
      let randomDeg = 0;
      let randomWeight = Math.floor(Math.random() * this.totalWeight) + 1;
      let winner = 0;
      for (let i = 0; i < this.itemsWeighRangeLength; i ++) {
        if((randomWeight) >= this.itemsWeighRange[i].from && (randomWeight) <= this.itemsWeighRange[i].to) {
          winner = i;
          randomDeg = Math.floor(Math.random()
                                  * ((i+1)*this.fullCircleDeg/this.itemLength - i*this.fullCircleDeg/this.itemLength + 1))
                                  + i*this.fullCircleDeg/this.itemLength
                                  +  (2160 * this.spinCount);
          break;
        }
      }
      this.$refs['spin-wheel'].style.transform = `rotate(-${randomDeg}deg)`
      setTimeout(()=> {
        alert('Winner : ' + this.items[winner].name);
      },6100)
    },

    createPie(slices,cx = 55,cy = 55,r = 50) {
      let fromAngle, toAngle, fromCoordX, fromCoordY, toCoordX, toCoordY, path, d, pathInside,fromCoordXInside,
          fromCoordYInside,toCoordXInside,toCoordYInside, dInside,fromWeight, toWeight;
      for (let i = 0; i < slices; i++) {
        path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathInside = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if(i === 0) {
          fromWeight = 0;
        } else {
          fromWeight = toWeight + 1;
        }
        toWeight = fromWeight + this.items[i].weight;
        let weightRange = {
          'from' : parseInt(fromWeight),
          'to' : parseInt(toWeight)
        }
        this.$store.commit('addToItemsWeightRange', {weightRange})
        fromAngle = i * this.fullCircleDeg/slices;
        toAngle = (i+1)  *  this.fullCircleDeg/slices;

        //For path outside
        fromCoordX = cx + (r * Math.cos(fromAngle * Math.PI / (this.fullCircleDeg/2)));
        fromCoordY = cy + (r * Math.sin(fromAngle * Math.PI / (this.fullCircleDeg/2)));
        toCoordX = cx + (r * Math.cos(toAngle * Math.PI / (this.fullCircleDeg/2)));
        toCoordY = cy + (r * Math.sin(toAngle * Math.PI / (this.fullCircleDeg/2)));
        d = 'M' + cx + ',' + cy + ' L' + fromCoordX + ',' + fromCoordY
            + ' A' + r + ',' + r + ' 0 0,1 ' + toCoordX + ',' + toCoordY + 'z';

        //For path inside circle
        fromCoordXInside = cx + (r/2 * Math.cos(fromAngle * Math.PI / (this.fullCircleDeg/2)));
        fromCoordYInside = cy + (r/2 * Math.sin(fromAngle * Math.PI / (this.fullCircleDeg/2)));
        toCoordXInside = cx + (r/2 * Math.cos(toAngle * Math.PI / (this.fullCircleDeg/2)));
        toCoordYInside = cy + (r/2 * Math.sin(toAngle * Math.PI / (this.fullCircleDeg/2)));
        dInside = 'M' + cx + ',' + cy + ' L' + fromCoordXInside + ',' + fromCoordYInside
                  + ' A' + r/2 + ',' + r/2 + ' 0 0,1 ' + toCoordXInside + ',' + toCoordYInside + 'z';
        pathInside.setAttributeNS(null, "d",dInside);

        path.setAttributeNS(null, "d", d);
        path.setAttribute('fill', this.items[i].label);
        pathInside.setAttribute('fill', this.items[i].label);
        pathInside.setAttribute('id', `path${i}`);
        let textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        let textValue= document.createTextNode(this.items[i].name);
        textPath.appendChild(textValue);
        textPath.classList.add('label');
        text.style.fontSize = '7px';
        text.appendChild(textPath);
        textPath.setAttribute('href', `#path${i}`);
        textPath.setAttribute('text-anchor','middle');
        textPath.setAttribute('startOffset', '50%');
        this.$refs['spin-wheel'].appendChild(path);
        this.$refs['spin-wheel'].appendChild(pathInside);
        this.$refs['spin-wheel'].appendChild(text);
      }
    },
  },
  data() {
    return {
      spinCount: 0,
      isRolling: false,
    }
  }
}
</script>

<style scoped>
svg {
  transition:all 6s cubic-bezier(0.075, 0.820, 0.165, 1);
  height: var(--circle-diameter);
  width: var(--circle-diameter);
}

.center-btn{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: 50px;
  width: 50px;
}

.circle{
  border-radius: 50%;
}

.rotate-90{
  transform: rotate(-90deg);
}

.cirle-container{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.triangle{
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-55%);
  height: 0px;
  width: 0px;
  background: transparent;
  z-index: 10;
  border-left: var(--border-left-triangle);
  border-right: var(--border-right-triangle);
  border-top: var(--border-top-triangle);
}

.rolling-animate{
  animation: rotation 2s;
}

.label{
  fill: orange;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

</style>
