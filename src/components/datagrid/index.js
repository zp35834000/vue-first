import vueDatagrid from './datagrid.vue'

const datagrid = {
  install(Vue, options) {
    Vue.component(vueDatagrid.name, vueDatagrid)
  }
}

export default datagrid

if(typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(datagrid);
}
