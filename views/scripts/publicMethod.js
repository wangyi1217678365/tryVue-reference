const publicMethod = {
  name: 'publicMethod',
  template: `
    <div class="wrap flex column" style="height: 100vh;">
      <header>
        <h1>Fire Monkey 项目工程</h1>
        <div class="create-tab">
          <div class="tab">
            <svg t="1627025949243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33697" width="28" height="25"><path d="M172.9 972C106.2 972 52 917.8 52 851.1V52h734.9v185.1H972v614c0 66.8-54.2 120.9-120.9 120.9H172.9z m614-120.9c0 38.3 25.8 64.1 64.1 64.1s64.1-25.8 64.1-64.1V293.2H786.3l0.6 557.9z m-678.1 0c0 38.3 25.8 64.1 64.1 64.1h578.3l-2.6-4c-12.6-19.2-17.8-37-17.8-60.1V108.2h-622v742.9z m128.3-125.6v-56.2h241.2v56.2H237.1z m0-185.1v-56.2h364.8v56.2H237.1z m0-185v-56.2h364.8v56.2H237.1z" p-id="33698"></path></svg>
            详情
          </div>
          <div class="tab">
            <svg t="1627025875677" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31832" width="28" height="25"><path d="M450.8 693.8c-8.2 0-16.4-3.1-22.6-9.4L250.9 507.1c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l154.7 154.7 277-277c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L473.5 684.5c-6.3 6.2-14.5 9.3-22.7 9.3z" p-id="31833"></path><path d="M512 956.2c-59.9 0-118.1-11.7-172.9-34.9-52.9-22.4-100.4-54.4-141.2-95.2s-72.8-88.3-95.2-141.2c-23.2-54.8-34.9-113-34.9-172.9s11.7-118.1 34.9-172.9c22.4-52.9 54.4-100.4 95.2-141.2s88.3-72.8 141.2-95.2c54.8-23.2 113-34.9 172.9-34.9s118.1 11.7 172.9 34.9c52.9 22.4 100.4 54.4 141.2 95.2s72.8 88.3 95.2 141.2c23.2 54.8 34.9 113 34.9 172.9s-11.7 118.1-34.9 172.9c-22.4 52.9-54.4 100.4-95.2 141.2s-88.3 72.8-141.2 95.2c-54.8 23.1-113 34.9-172.9 34.9z m0-824.4c-101.5 0-197 39.5-268.8 111.3S131.8 410.5 131.8 512s39.5 197 111.3 268.8S410.5 892.2 512 892.2s197-39.5 268.8-111.3S892.2 613.5 892.2 512s-39.5-197-111.3-268.8S613.5 131.8 512 131.8z" p-id="31834"></path></svg>
            预设
          </div>
          <div class="tab active">
            <svg t="1627025799821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30901" width="28" height="25"><path d="M512 1024c-19.748571 0-39.314286-5.302857-56.868571-15.908571l-329.142858-199.497143A110.500571 110.500571 0 0 1 73.142857 714.788571V309.211429c0-38.034286 20.297143-74.057143 52.845714-93.805715l329.142858-199.497143a109.604571 109.604571 0 0 1 113.737142 0l329.142858 199.497143A110.500571 110.500571 0 0 1 950.857143 309.211429v405.394285c0 38.034286-20.297143 74.057143-52.845714 93.805715l-329.142858 199.497142c-17.554286 10.788571-37.12 16.091429-56.868571 16.091429z m0-950.857143c-6.582857 0-13.165714 1.828571-19.017143 5.302857l-329.142857 199.497143c-10.788571 6.582857-17.554286 18.651429-17.554286 31.268572v405.394285c0 12.617143 6.765714 24.685714 17.554286 31.268572l329.142857 199.497143c11.702857 7.131429 26.148571 7.131429 37.851429 0l329.142857-199.497143c10.788571-6.582857 17.554286-18.651429 17.554286-31.268572V309.211429c0-12.617143-6.765714-24.685714-17.554286-31.268572l-329.142857-199.497143A36.205714 36.205714 0 0 0 512 73.142857z" p-id="30902"></path><path d="M512 896c-20.114286 0-36.571429-16.457143-36.571429-36.571429V488.411429l311.405715-172.982858c17.737143-9.874286 39.862857-3.474286 49.737143 14.262858s3.474286 39.862857-14.262858 49.737142L548.571429 531.565714V859.428571c0 20.114286-16.457143 36.571429-36.571429 36.571429z" p-id="30903"></path><path d="M512 546.56c-6.034286 0-12.068571-1.462857-17.737143-4.571429l-292.571428-162.56a36.626286 36.626286 0 0 1-14.262858-49.737142c9.874286-17.737143 32-23.954286 49.737143-14.262858l292.571429 162.56c17.737143 9.874286 23.954286 32 14.262857 49.737143-6.765714 12.068571-19.2 18.834286-32 18.834286z" p-id="30904"></path></svg>
            功能
          </div>
        </div>
      </header>
      <div class="content flex column flex1 border-box pub-content">
        <div class="tab-content flex column flex1 border-box beautiful-scrollbar">
          <div class="block public-container">
            <div class="question">{{question}}</div>
            <ul>
              <li v-for="item in utilsList" :key="item.value">
                <div class="item-list flex items-center" :class="{ active: item.checked }" @click="item.checked = !item.checked">
                  <div class="item-flex flex1">
                    <div class="list-tit">{{ item.value }} --{{ item.name }}</div>
                    <div class="list-des">{{ item.des }}</div>
                  </div>
                  <div class="wrapper" tabindex="0" :class="{selected: item.checked}"><div class="bullet"></div></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="operate footer flex center border-box pb-15">
          <button class="pre" @click="swithRoute(selectOptions)">
            <svg t="1627031063830" class="icon" viewBox="0 0 1213 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36613" width="16" height="16"><path d="M209.548124 568.908272l379.62235 358.119266c23.626846 22.26157 23.513073 58.289665-0.26547 80.399538a63.561145 63.561145 0 0 1-85.822715-0.227546L32.744988 563.52302A56.886466 56.886466 0 0 1 0.016308 510.580683c-0.379243-14.942178 5.499025-30.036054 17.634805-41.489196L497.128172 16.844083A63.561145 63.561145 0 0 1 582.912963 16.578612c23.778543 22.147797 23.892316 58.175893 0.26547 80.437463L203.556083 455.135341H1156.707782a56.886466 56.886466 0 0 1 0 113.772931H209.548124z" p-id="36614"></path></svg>
            上一步
          </button>
          <button class="next" @click="createProject">
            创&nbsp;&nbsp;建
          </button>
        </div>
      </div>
      <vueDialog :visible.sync="dialogData.visible"
                 :showClose="dialogData.showClose"
                 @close="dialogClose"
                 :title="dialogData.title"
                 width="600px">
        <div class="public-dialog_content flex items-center center">
          <div class="success" v-if="dialogData.success">
            <p class="text">
              <svg t="1627972844839" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4634" width="32" height="32"><path d="M513.455158 26.947368A483.597474 483.597474 0 0 0 29.857684 510.544842 483.597474 483.597474 0 1 0 513.455158 26.947368z m237.891368 365.136843l-227.435789 306.822736c-15.791158 21.396211-52.601263 36.756211-78.686316 18.701474L281.707789 604.698947c-24.953263-17.246316-38.049684-44.732632-20.695578-71.626105 14.389895-22.366316 53.733053-36.055579 78.848-18.755368l120.508631 83.267368c63.811368-86.123789 127.568842-172.247579 191.434105-258.317474 41.229474-55.619368 141.096421-3.287579 99.543579 52.816843z" p-id="4635" fill="#008000"></path></svg>
              <span>创建成功</span>
            </p>
            <div class="desc">
              执行如下命令，启动项目：
            </div>
            <div class="command">
              <p>cd {{ dialogData.projectName }}</p>
              <p>npm i</p>
              <p>npm run serve</p>
            </div>
            <button class="install" @click="npminstall">启动项目</button>
          </div>
          <template v-else>{{ dialogData.text }}</template>
        </div>
      </vueDialog>
    </div>
  `,
  props: ['swithRoute'],
  components: {
    vueDialog
  },
  data () {
    return {
      dialogData: {
        timer: null, // 创建中定时器
        title: '创建中', // 弹窗标题
        visible: false, // 是否显示弹窗
        showClose: false, // 是否显示弹窗关闭按钮
        text: '', // 创建中text
        success: false, // 是否成功
        projectName: '' // 项目目录
      },
      utilsList: [],
      question: ''
    }
  },
  created () {
    this.$addEvent("createProject", this.onMessage)
    this.$addEvent("error", this.errorMessage)
    this.utilsList = allOptions.utils.children
    this.question = allOptions.utils.name
    this.initDialog()
  },
  methods: {
    /**
     * 初始化弹窗参数
     */
    initDialog () {
      this.dialogData = {
        timer: null, // 创建中定时器
        title: '创建中', // 弹窗标题
        visible: false, // 是否显示弹窗
        showClose: false, // 是否显示弹窗关闭按钮
        text: '', // 创建中text
        success: false, // 是否成功
        projectName: '' // 项目目录
      }
    },
    /**
     * 创建项目
     */
    createProject () {
      projectInfo.utils = this.utilsList.filter(item => item.checked).map(item => item.value)
      this.sendMessage(projectInfo)
      this.dialogData.visible = true
      let index = 0
      this.dialogData.timer = setInterval(() => {
        index = index % 6 + 1
        this.dialogData.text = `创建中${'.'.repeat(index)}`
      }, 300)
    },
    /**
     * 关闭弹窗刷新页面
     */
    dialogClose () {
      window.location.reload()
    },
    /**
     * 发送数据
     * @param {Object} data 需要发送的数据
     */
    sendMessage (data) {
      this.$ws && this.$ws.send(JSON.stringify({
        type: 'createProject',
        data
      }))
    },
    /**
     * 接收数据
     * @param {Object} data 返回的数据
     */
    onMessage ({ data }) {
      if (data && data.code === 0) {
        this.dialogData.title = '创建成功'
        this.dialogData.projectName = projectInfo.projectName
        this.dialogData.success = true
        this.dialogData.showClose = true
      } else {
        this.dialogData.title = '创建项目失败'
        this.dialogData.text = data.error
        this.dialogData.showClose = true
      }
    },
    /**
     * 报错回调
     * @param {*} data 
     */
    errorMessage ({ data: { error } }) {
      this.dialogData.title = '创建项目失败'
      this.dialogData.text = error
      this.dialogData.showClose = true
    },
    /**
     * 安装依赖
     */
    npminstall () {
      this.initDialog()
      this.swithRoute(installProject)
    }
  },
  beforeDestroy () {
    this.$removeEvent("createProject", this.onMessage)
  }
}
