import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
// 
// Vue.mixin({
//   beforeCreate: function () {
//     var data = this.$options.data
//     if(typeof data === 'object'){
//       if(!this.$options._$data){
//         this.$options._$data = JSON.parse(JSON.stringify(data))
//       }
//     }
//   },
//   onLoad:function(){
//     console.log(this.$options.data)
//     if(this.$options._$data){
//       this.$data = JSON.parse(JSON.stringify(this.$options._$data))
//       console.log('$data',this.$data)
//     }
//   }
// })


const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '风行视频',
      navigationBarTextStyle: 'black'
    }
  }
}
