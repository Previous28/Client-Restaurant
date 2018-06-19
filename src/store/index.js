import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index: 0,
    infoObj: {},
    isNetworkErr: false,
    subIndex: 1,
    curOrder: {},
    clue: '',
    orderList: [],
    numberOfPages: 0,
    filters: [],
    dishList: [],
    categories: [],
    waitTimeClock: [],
    curImg: '',
    curNewCate: -1,
    isEditDish: false,
    curDish: null
  },
  actions,
  getters,
  mutations,
  modules: { },
  strict: process.env.NODE_ENV !== 'production'
});
