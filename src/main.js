import Vue from 'vue'
import App from './App.vue'
// import store from './store'
// import router from './router'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

import {
  Container,
  Button,
  ButtonGroup,
  Header,
  Main,
  Footer,
  Icon,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Upload,
  Col
} from 'element-ui'

// npm i mint-ui -S
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css'
// Vue.use(Mint);

// import { Cell, Checklist } from 'mint-ui';
// import 'mint-ui/lib/style.css'
// Vue.component(Cell.name, Cell);
// Vue.component(Checklist.name, Checklist);

Vue.use(Container)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store: store,
  // router: router,
  render: c => c(App)
})
