import axios from 'axios'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.passport) {
      console.log(req.session.passport.user)
      const authUser = req.session.passport.user
      commit('SET_USER', authUser)
    }
  },

  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.post('/logout')
    commit('SET_USER', null)
  }

}
