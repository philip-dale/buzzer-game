<template>
  <div :class="playerClass">
    {{ player.UserInfo.PlayerName }} | Score {{ player.BuzzStatus.Score }}
    <b-button v-if="showKickBtn" @click="kick(player.UserInfo.UserId)">kick</b-button>
  </div>
</template>

<script>
export default {
  name: "player-info",
  props: {
    player: Object,
    showKickBtn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    playerClass() {
      if (!this.player.UserInfo.Active) {
        return "player playerInactive";
      } else if (this.player.BuzzStatus.LockedOut) {
        return "player playerLockedOut";
      } else if (this.player.BuzzStatus.Buzzing) {
        return "player playerBuzzing";
      } else {
        return "player playerReady";
      }
    },
  },
  methods: {
      kick(userId) {
          this.$store.dispatch("kickPlayer", userId)
      }
  }
};
</script>

<style scopped>
.player {
  width: 100%;
  border-radius: 15px;
  font-size: 1.4rem;
  margin-bottom: 5px;
}

.playerReady {
  color: white;
  background-color: green;
}

.playerInactive {
  color: black;
  background-color: gray;
}

.playerBuzzing {
  color: black;
  background-color: yellow;
}

.playerLockedOut {
  color: black;
  background-color: red;
}
</style>