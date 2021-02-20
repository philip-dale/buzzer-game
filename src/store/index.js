import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import router from '../router'

const messageId = {
  "initMessage": 0,
  "connectedMessage": 1,
  "errorMessage": 2,
  "gameStatusMessage": 3,
  "playerStatusMessage": 4,
  "buzzActionMessage": 5,
  "adminMessage": 6,
  "quitMessage": 7,
  "kickPlayerMessage": 8,
}

const adminMessageCommands = {
  "correct": 0,
  "wrong": 1,
  "nextRound": 2,
  "reset": 3,
}

const buzzGameId = 0

export default new Vuex.Store({
  state: {
    serverId: "",
    playerName: "Player 1",
    showErrorAlert: false,
    showSuccessAlert: false,
    errorMessage: "",
    successMessage: "",
    webSocket: null,
    gameStatus: [],
    userId: 0,
    playerStatus: { Buzzing: false, LockedOut: false, score: 0 },
    adminId: "",
    connected: false,
    otherPlayerBuzzing: false,
  },
  getters: {
    serverId(state) {
      return state.serverId
    },
    playerName(state) {
      return state.playerName
    },
    showErrorAlert(state) {
      return state.showErrorAlert
    },
    showSuccessAlert(state) {
      return state.showSuccessAlert
    },
    errorMessage(state) {
      return state.errorMessage
    },
    successMessage(state) {
      return state.successMessage
    },
    gameStatus(state) {
      return state.gameStatus
    },
    adminId(state) {
      return state.adminId
    },
    connected(state) {
      return state.connected
    },
    otherPlayerBuzzing(state) {
      return state.otherPlayerBuzzing
    },
    playerStatus(state) {
      return state.playerStatus
    }
  },
  mutations: {
    serverId(state, value) {
      state.serverId = value
    },
    playerName(state, value) {
      state.playerName = value
    },
    showErrorAlert(state, value) {
      state.showErrorAlert = value
    },
    showSuccessAlert(state, value) {
      state.showSuccessAlert = value
    },
    adminId(state, value) {
      state.adminId = value
    }
  },
  actions: {
    joinGame(context) {
      if (context.state.connected) {
        return
      }
      context.state.errorMessage = false
      context.state.showSuccessAlert = false

      context.state.webSocket = new WebSocket(process.env.VUE_APP_SERVER_URL)

      context.state.webSocket.onopen = function () {
        var initMessage = {
          "UserId": context.state.userId,
          "ServerId": context.state.serverId,
          "MessageType": messageId.initMessage,
          "PlayerName": context.state.playerName,
          "GameType": buzzGameId
        }
        context.state.webSocket.send(JSON.stringify(initMessage))
      }

      context.state.webSocket.onmessage = function (event) {
        var message = JSON.parse(event.data)
        if ("MessageType" in message) {
          if (message["MessageType"] === messageId.gameStatusMessage) { // game status
            if ("Status" in message) {
              context.state.gameStatus = message["Status"]

              context.state.otherPlayerBuzzing = false
              context.state.gameStatus.forEach(s => {
                context.state.otherPlayerBuzzing = context.state.otherPlayerBuzzing || s.BuzzStatus.Buzzing
              });
            }
          }
          if (message["MessageType"] === messageId.playerStatusMessage) { // player status
            if ("Status" in message) {
              context.state.playerStatus = message["Status"]
            }
          }
          if (message["MessageType"] === messageId.connectedMessage) { // connection accepted
            if ("UserId" in message) {
              context.state.userId = message["UserId"]
              context.state.successMessage = "Game Joined"
              context.state.showSuccessAlert = true
              context.state.connected = true
              router.push("Play")
            }
          }
          if (message["MessageType"] === messageId.errorMessage) { // Error Message
            if ("MessageText" in message) {
              context.state.errorMessage = message["MessageText"]
              context.state.showErrorAlert = true
            }
          }
        }
      }

      context.state.webSocket.onclose = function () {
        console.log(`Game Server Connection Closed`);
        context.state.connected = false
      }

      context.state.webSocket.onerror = function (error) {
        console.log(error)
      }
    },
    quitGame(context) {
      var quitMessage = {
        "MessageType": messageId.quitMessage,
        "UserId": context.state.userId,
      }
      context.state.webSocket.send(JSON.stringify(quitMessage))
      context.state.webSocket.close()
      context.state.connected = false
    },
    buzz(context) {
      if (!context.state.playerStatus.LockedOut) {
        var actionMessage = {
          "MessageType": messageId.buzzActionMessage,
          "UserId": context.state.userId,
          "Buzzing": true,
        }
        context.state.webSocket.send(JSON.stringify(actionMessage))
      }
    },
    adminAction(context, action) {
      if (action in adminMessageCommands) {
        var adminMessage = {
          "MessageType": messageId.adminMessage,
          "AdminId": context.state.adminId,
          "Command": adminMessageCommands[action],
        }
        context.state.webSocket.send(JSON.stringify(adminMessage))
      }
    },
    kickPlayer(context, userId) {
      var kickMessage = {
        "MessageType": messageId.kickPlayerMessage,
        "AdminId": context.state.adminId,
        "UserId": userId,
      }
      context.state.webSocket.send(JSON.stringify(kickMessage))
    }
  },
  modules: {
  }
})
