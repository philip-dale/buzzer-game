<template>
  <div class="administerGame">
    <b-container class="admin-container">
      <b-row class="row-class">
        <b-col sm class="column-class">
          <div class="col-div"><players :showKickBtn="true"/></div>
        </b-col>
        <b-col sm>
            <admin/>
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import admin from '@/components/admin.vue'
import players from '@/components/players.vue'

export default {
  name: "Play",
  components: {
    admin,
    players,
  },
}
</script>

<style scoped>
.administerGame {
  margin-top: 60px;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-left: 5px;
  margin-right: 5px; */
}
.buzzer-button {
  background-color: red;
  color: black;
  border: thick solid black;
  width: 100%;
  height: 100%;
  min-height: 200px;
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
.admin-container {
  height: 100%;
}
</style>

