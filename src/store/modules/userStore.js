const state = () => ({
  userName: '' || localStorage.getItem('userName'),
  passWord: '' || localStorage.getItem('passWord'),
})
const getters = {
  userName: (state) => state.userName,
  passWord: (state) => state.passWord
}
const mutations = {
  setUserName: (state, userName) => {
    if (userName) state.userName = userName
  },
  setPassWord: (state, passWord) => {
    if (passWord) state.passWord = passWord
  }
}
const actions = {
  setUserName({ commit }, userName) {
    commit('setUserName', userName)
  },
  setPassWord({ commit }, passWord) {
    commit('setPassWord', passWord)
  }
}
export default { state, getters, mutations, actions }