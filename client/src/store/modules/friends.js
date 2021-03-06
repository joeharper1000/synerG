import axios from './../../authentication/axios-auth'
// import router from './../../router'

const state = {
}

const mutations = {
}

const actions = {
  incomingFriend (rootState, data) {
    console.log('FRIEND INCOMING!')
    rootState.commit('socketFriend', data)
    localStorage.setItem('user', JSON.stringify(rootState.getters.user))
  },
  incomingFriendCancel (rootState, data) {
    console.log('FRIEND CANCEL INCOMING!')
    rootState.commit('socketFriendCancel', data)
    localStorage.setItem('user', JSON.stringify(rootState.getters.user))
  },
  incomingFriendAccept (rootState, data) {
    console.log('FRIEND ACCEPT INCOMING!')
    rootState.commit('socketFriendAccept', data)
    localStorage.setItem('user', JSON.stringify(rootState.getters.user))
  },
  incomingFriendDecline (rootState, data) {
    console.log('FRIEND DECLINE INCOMING!')
    rootState.commit('socketFriendDecline', data)
    localStorage.setItem('user', JSON.stringify(rootState.getters.user))
  },
  incomingFriendRemove (rootState, data) {
    console.log('FRIEND REMOVE INCOMING!')
    rootState.commit('socketFriendRemove', data)
    localStorage.setItem('user', JSON.stringify(rootState.getters.user))
  },
  getFriends (rootState) {
    axios.get(`/api/friends/${rootState.getters.user_id}`)
    .then(({data}) => {
      let user = rootState.getters.user
      user.friends = data.friends
      localStorage.setItem('user', JSON.stringify(user))
      rootState.commit('userUpdate', user)
    })
    .catch(err => {
      console.log(err)
    })
  },

  sendRequest (rootState, id) {
    if (rootState.getters.user_id === id) {
      console.log('It\'s you!')
      return
    }
    axios.post(`/api/friends/${id}/send?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data._id === rootState.getters.user_id) {
        console.log('DATA RETURNED!')
        rootState.dispatch('getFriends')
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },

  cancelRequest (rootState, id) {
    axios.post(`/api/friends/${id}/cancel?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data._id === rootState.getters.user_id) {
        console.log('canceling...')
        rootState.dispatch('getFriends')
        data.friends.pending_sent.splice(data.friends.pending_sent.indexOf(id), 1)
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },

  acceptRequest (rootState, id) {
    axios.post(`/api/friends/${id}/accept?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data._id === rootState.getters.user_id) {
        console.log('accepting...')
        rootState.dispatch('getFriends')
        data.friends.pending_received.splice(data.friends.pending_received.indexOf(id), 1)
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  declineRequest (rootState, id) {
    axios.post(`/api/friends/${id}/decline?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data._id === rootState.getters.user_id) {
        console.log('DATA RETURNED!')
        rootState.dispatch('getFriends')
        data.friends.pending_received.splice(data.friends.pending_received.indexOf(id), 1)
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteFriend (rootState, id) {
    axios.delete(`/api/friends/${id}/remove?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data._id === rootState.getters.user_id) {
        console.log('deleteing...')
        rootState.dispatch('getFriends')
        data.friends.accepted.splice(data.friends.accepted.indexOf(id), 1)
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const getters = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
