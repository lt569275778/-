/**
 * Created by Mr.Zhou on 2017/8/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as Menu from './menu';
import chis from './module/chis'

Vue.use(Vuex);

const state = {
    // navTabIndex:0,
    count:0,
    menuData:[],
    adminInfo:{},
    breadcrumb:[{
      icon:'',
      name:''
    },{
      icon:'',
      name:''
    }],
};

let mutations = {
    getLoopImg(state) {
                // state.menuData = Menu.menu_list;
                
    }
};

let actions = {
    updateLoopImg (context) {
        context.commit('getLoopImg');
    }
};

const getters = {

};
const modules = {
    chis
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules
});
