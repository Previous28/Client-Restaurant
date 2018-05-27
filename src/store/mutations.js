export default {
  LOGIN (state) {
    state.isLogin = true;
  },
  GET_SELF_INFO (state, data) {
    state.email = data.email;
    state.restaurantName = data.name;
    state.restaurantId = data.restaurant_id;
    state.isConfirm = data.confirm_email;
  },
  SET_NETWORK_ERR (state) {
    state.isNetworkErr = true;
    setTimeout(() => { state.isNetworkErr = false; }, 1300);
  },
  UPDATE_INDEX (state, index) {
    state.index = index;
  },
  UPDATE_SUB_INDEX (state, index) {
    state.subIndex = index;
  },
  UPDATE_CUR_ORDER (state, data) {
    state.curOrder = data;
  },
  UPDATE_CLUE (state, clue) {
    console.log('clue', clue);
    state.clue = clue;
  },
  UPDATE_ORDER_LIST (state, data) {
    console.log('UPDATE_ORDER_LIST:', data.order);
    console.log('number_of_pages:', data.number_of_pages);
    state.numberOfPages = data.number_of_pages;
    state.orderList = data.order;
    for (let i = 0, len = state.orderList.length; i < len; i++) {
      state.orderList[i].waitTime = '-';
      if (state.orderList[i].state === 'paid' || state.orderList[i].state === 'accepted') {
        for (let j = 0, len = state.waitTimeClock.length; j < len; j++) {
          if (state.waitTimeClock[j].id === state.orderList[i].order_id) {
            let h = parseInt(state.waitTimeClock[j].clock / 3600);
            let m = parseInt(state.waitTimeClock[j].clock / 60 % 60);
            let s = parseInt(state.waitTimeClock[j].clock % 60);
            if (m < 10) {
              m = '0' + m;
            }
            if (s < 10) {
              s = '0' + s;
            }
            state.orderList[i].waitTime = h + ':' + m + ':' + s;
            break;
          }
        }
        if (state.orderList[i].waitTime === '-') {
          state.waitTimeClock.push({
            id: state.orderList[i].order_id,
            clock: 0
          });
          state.orderList[i].waitTime = '0:00:01';
        }
      }
    }

    for (let i = 0, len = state.orderList.length; i < len; i++) {
      let temp = new Date(state.orderList[i].time);
      state.orderList[i].time = temp.toLocaleString();
      if (state.orderList[i].state === 'paid') {
        state.orderList[i].state = '新订单';
      }
      if (state.orderList[i].state === 'accepted') {
        state.orderList[i].state = '进行中';
      }
      if (state.orderList[i].state === 'cancelled') {
        state.orderList[i].state = '已取消';
      }
      if (state.orderList[i].state === 'completed') {
        state.orderList[i].state = '已完成';
      }
      if (!state.orderList[i].remark) {
        state.orderList[i].remark = '无';
      }
    }
  },
  UPDATE_FILTERS (state, data) {
    state.filters = data;
  },
  UPDATE_DISH_LIST (state, data) {
    console.log('UPDATE_DISH_LIST', data);
    state.dishList = data;
    state.categories = [];
    for (let i = 0, len = state.dishList.length; i < len; i++) {
      state.categories.push(state.dishList[i].name);
    }
  },
  UPDATE_TIME_CLOCK (state) {
    for (let i = 0, len = state.waitTimeClock.length; i < len; i++) {
      state.waitTimeClock[i].clock++;
    }
  }
};
