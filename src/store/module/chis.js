/**
 * Created by qing.Lan on 2017/11/21.
 */
const state = {

    tableData:[],
    total:0,
    PageNo: 1,
    total: 0,
    pageSize: 10,
}

const getters = {

}

const mutations = {
    setTableData(state,tableList){
        state.tableData = tableList
    }
}

const actions = {
    setTableData(context,tableList){
        context.commit('setTableData',tableList)
    }
}

export  default {
    state,
    getters,
    mutations,
    actions
}
