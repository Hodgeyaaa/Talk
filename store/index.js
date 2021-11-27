import Vue from 'vue'
import Vuex from '../vuex.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count:2,
		scrollPadding: 0,
		group: [
			
		],
	},
	mutations: {
		risePadding(state){
			state.scrollPadding = 250;
		},
		reducePadding(state){
			state.scrollPadding = 0;
		},
		addGroup(state, e) {
			state.group.push(e);
		},
		reduceGroup(state, e) {
			
		},
	},
	actions: {
		delayAdd(context){
			setTimeout(()=>{
				context.commit("add")
			},1000);
		}
	},
})