var userSteps = 0 // 选布局，选组件，选页面，选主题 0-3
var allOptions = [] // 存放所有交互选项
var projectInfo = {
  path: "", // 项目目录
  projectName: "", // 项目名称
  Git: "", // git初始化数据
} // 存储用户交互信息

// message的不同类型事件
const EventList = [
  "error",
  "getFolderList",
  "hasFolder",
  "createProject",
  "run"
]
// message回调列表
var message = new Map(EventList.map(item => {
  return [
    item, new Map()
  ]
}))
// 注册 message 回调事件
function addEvent (type, cb) {
  const item = message.get(type)
  if (item) {
    item.set(cb, cb)
  }
}
// 移除 message 回调事件
function removeEvent (type, cb) {
  const item = message.get(type)
  if (item) {
    item.delete(cb, cb)
  }
}
// 创建app
function creatAPP () {
  const App = {
    template: `
    <div>
      <component
        ref="child"
        :is="component"
        :swithRoute="swithRoute">
      </component>
      <vueDialog
        :title="'ServeError'"
        :visible.sync="showModel"
        :width="'300px'"
        :showClose="true"
      >
        {{errorContent}}
      </vueDialog>
    </div>
    `,
    data () {
      return {
        ws: null,
        showModel: false,
        errorContent: '服务器发生了错误!!!!',
        // component: publicMethod
        component: component1 // default view
      }
    },
    components: {
      vueDialog
    },
    methods: {
      showModelHandle () {
        this.showModel = true
      },
      swithRoute (component) {
        this.component = component
      },
      onOpen () {
        this.$refs.child.init && this.$refs.child.init()
      },
      creatWS () {
        const _this = this
        var ws = new WebSocket(`ws://127.0.0.1:${location.port}/graphic`)
        ws.onopen = function () {
          _this.ws.send(JSON.stringify({
            type: 'getFolderList',
            path: './'
          }))
        }
        ws.onmessage = function (e) {
          let data = JSON.parse(e.data)
          if (data.data.code !== 0) {
            _this.errorContent = data.data.error
            _this.showModelHandle()
          }
          const eventMap = message.get(data.type)
          if (eventMap) {
            eventMap.forEach(item => {
              item(data)
            })
          } else {
            console.log(data, "这里应该是运行项目的结果或者进度")
          }
        }
        return ws
      }
    },
    created () {
      this.ws = this.creatWS()
      Vue.prototype.$ws = this.ws
    }
  }
  return new Vue({
    el: '#app',
    render: h => h(App)
  })
}
Vue.prototype.$addEvent = addEvent
Vue.prototype.$removeEvent = removeEvent
var APP = creatAPP()
