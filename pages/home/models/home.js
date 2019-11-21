import {delay, modelGenerate} from "../../../utils/helper";
import {getData} from '../services/home'
export default modelGenerate({
  state: {
    grids: [
      {
        icon: 'good',
        name: 'tabbar',
        url: '/pages/tabbar/tabbar',
      },
      {
        icon: 'good',
        name: 'btn',
        url: '/pages/btn/btn',
      },
    ],
    tabs: [
      {
        name: '组件',
        icon: 'setting',
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
    },
    async getData({commit}, payload){
      return  await getData(payload);
    },
  }
});
