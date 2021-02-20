<template>
  <div class="players">
    <div v-for="(p, index) in gameStatus" :key="index">
      <player :player="p" :showKickBtn="showKickBtn"></player>
    </div>
  </div>
</template>

<script>
import player from "./player.vue";

export default {
  name: "players",
  props: {
      showKickBtn: {
          type: Boolean,
          default: false
      }
  },
  components: {
    player,
  },
  computed: {
    gameStatus() {
      return this.$store.getters.gameStatus;
    },
  },
};
</script>

<style scopped>
.players {
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  /* margin: 5px; */
  /* margin-left: 5px; */
}
</style>
