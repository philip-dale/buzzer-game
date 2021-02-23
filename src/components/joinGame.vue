<template>
  <div class="SignIn">
    <div class="inputDiv">
      <label class="labelClass">Enter Server ID</label>
      <b-form-input
        class="inputBox"
        v-model="serverId"
        placeholder="Enter Server ID"
        type="text"
      ></b-form-input>
    </div>
    <div class="inputDiv">
      <label class="labelClass">Enter Player Name</label>
      <b-form-input
        class="inputBox"
        v-model="playerName"
        placeholder="Enter Player Name"
        type="text"
      ></b-form-input>
    </div>
    <div class="inputDiv">
      <div>
        <b-button class="signin-button" @click="joinGame()" variant="primary">Join</b-button>
      </div>
      <div>
        <b-button class="signin-button" @click="quitGame()" variant="primary">Quit</b-button>
      </div>
    </div>
    <b-alert v-model="showErrorAlert" variant="danger" dismissible>
      {{errorMessage}}
    </b-alert>
    <b-alert v-model="showSuccessAlert" variant="success" dismissible>
      {{successMessage}}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "joinGame",
  computed: {
    serverId: {
      get: function () {
        return this.$store.getters.serverId;
      },
      set: function (newValue) {
        this.$store.commit("serverId", newValue);
      },
    },
    playerName: {
      get: function () {
        return this.$store.getters.playerName;
      },
      set: function (newValue) {
        this.$store.commit("playerName", newValue);
      },
    },
    showErrorAlert: {
      get: function () {
        return this.$store.getters.showErrorAlert;
      },
      set: function (newValue) {
        this.$store.commit("showErrorAlert", newValue);
      },
    },
    showSuccessAlert: {
      get: function () {
        return this.$store.getters.showSuccessAlert;
      },
      set: function (newValue) {
        this.$store.commit("showSuccessAlert", newValue);
      },
    },
    errorMessage(){
      return this.$store.getters.errorMessage;
    },
    successMessage(){
      return this.$store.getters.successMessage;
    }
  },
  methods: {
    joinGame() {
      this.$store.dispatch("joinGame")
    },
    quitGame() {
      this.$store.dispatch("quitGame")
    }
  }
};
</script>

<style scoped>
.SignIn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.labelClass {
  margin: 5px;
}

.inputDiv {
  display: flex;
  flex-direction: row;
  align-self: center;
  margin: 0;
}

.inputBox {
  margin: 5px;
}

.signin-button {
  margin: 5px;
}
</style>
