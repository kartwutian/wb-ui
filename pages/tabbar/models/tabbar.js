import {delay, modelGenerate} from "../../../utils/helper";


export default modelGenerate({
  state: {
    tabs: [
      {
        name: 'title',
        icon: 'good',
      },
      {
        name: 'title',
        icon: 'good',
      },
      {
        name: 'title',
        icon: 'good',
      },
      {
        name: 'title',
        icon: 'good',
      },
    ],
    currentTabIndex: 0,
  },
  actions: {
    async delayChange({commit}, payload){
      await delay(2);
      commit('updateState', payload)
    }
  }
});
