<template>
  <div class="playGame">
    <h1 v-if="!connected">NOT CONNECTED TO SERVER</h1>
    <b-container class="play-container">
      <b-row class="row-class">
        <b-col sm class="column-class">
          <div class="col-div"><players/></div>
        </b-col>
        <b-col sm><div :class="buzzerButtonClass" @click="buzz()"> BUZZ </div></b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import players from '@/components/players.vue'

export default {
  name: "Play",
  components: {
    players,
  },
  computed: {
    connected() {
      return this.$store.getters.connected
    },
    buzzerButtonClass() {
       if (this.$store.getters.playerStatus.Buzzing) {
        return "buzzer-button buzzer-buzzing"
       } else if (this.$store.getters.playerStatus.LockedOut) {
        return "buzzer-button buzzer-locked"
       } else if (this.$store.getters.otherPlayerBuzzing) {
        return "buzzer-button buzzer-inactive"
       } else {
        return "buzzer-button buzzer-active"
       }
    }
  },
  methods: {
    buzz() {
      this.$store.dispatch("buzz")
    }
  }
}
</script>

<style scoped>
.playGame {
  margin-top: 60px;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.buzzer-button {
  /* border: thick solid black; */
  width: 100%;
  height: 100%;
  min-height: 200px;
  font-size: 3rem;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  -moz-box-shadow:
		-10px 10px 10px rgba(000,000,000,0.5),
		inset -1px 2px 0px rgba(255,255,255,0.4);
	-webkit-box-shadow:
		-10px 10px 10px rgba(000,000,000,0.5),
		inset -1px 2px 0px rgba(255,255,255,0.4);
	box-shadow:
		-10px 10px 10px rgba(000,000,000,0.5),
		inset -1px 2px 0px rgba(255,255,255,0.4);
	text-shadow:
		-2px 2px 2px rgba(000,000,000,0.7),
		0px -1px 0px rgba(255,255,255,0.4);
}

.buzzer-buzzing {
  background-color: yellow;
  color: black;
}
.buzzer-locked {
  background-color: red;
  color: black;
}
.buzzer-active {
  background-color: green;
  color: black;
}
.buzzer-inactive {
  background-color: gray;
  color: black;
}

.col-div {
  width: 100%;
  height: 100%;
  max-height: 85vh;
  overflow-y:scroll;
}
.row-class {
  height: 100%;
}
.play-container {
  height: 100%;
}
</style>

