const installProject = {
  name: 'installProject',
  template: `
    <div class="wrap flex column">
      <header>
        <h1>Fire Monkey 项目工程</h1>
        <div class="create-tab">
          <div class="tab active">
            <svg t="1627025799821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30901" width="28" height="25"><path d="M512 1024c-19.748571 0-39.314286-5.302857-56.868571-15.908571l-329.142858-199.497143A110.500571 110.500571 0 0 1 73.142857 714.788571V309.211429c0-38.034286 20.297143-74.057143 52.845714-93.805715l329.142858-199.497143a109.604571 109.604571 0 0 1 113.737142 0l329.142858 199.497143A110.500571 110.500571 0 0 1 950.857143 309.211429v405.394285c0 38.034286-20.297143 74.057143-52.845714 93.805715l-329.142858 199.497142c-17.554286 10.788571-37.12 16.091429-56.868571 16.091429z m0-950.857143c-6.582857 0-13.165714 1.828571-19.017143 5.302857l-329.142857 199.497143c-10.788571 6.582857-17.554286 18.651429-17.554286 31.268572v405.394285c0 12.617143 6.765714 24.685714 17.554286 31.268572l329.142857 199.497143c11.702857 7.131429 26.148571 7.131429 37.851429 0l329.142857-199.497143c10.788571-6.582857 17.554286-18.651429 17.554286-31.268572V309.211429c0-12.617143-6.765714-24.685714-17.554286-31.268572l-329.142857-199.497143A36.205714 36.205714 0 0 0 512 73.142857z" p-id="30902"></path><path d="M512 896c-20.114286 0-36.571429-16.457143-36.571429-36.571429V488.411429l311.405715-172.982858c17.737143-9.874286 39.862857-3.474286 49.737143 14.262858s3.474286 39.862857-14.262858 49.737142L548.571429 531.565714V859.428571c0 20.114286-16.457143 36.571429-36.571429 36.571429z" p-id="30903"></path><path d="M512 546.56c-6.034286 0-12.068571-1.462857-17.737143-4.571429l-292.571428-162.56a36.626286 36.626286 0 0 1-14.262858-49.737142c9.874286-17.737143 32-23.954286 49.737143-14.262858l292.571429 162.56c17.737143 9.874286 23.954286 32 14.262857 49.737143-6.765714 12.068571-19.2 18.834286-32 18.834286z" p-id="30904"></path></svg>
            启动项目
          </div>
        </div>
      </header>
      <div class="content flex column flex1 border-box">
        <div class="tab-content">
          <p v-for="(item, index) in logList" :key="index" v-text="item"></p>
        </div>
      </div>
    </div>
  `,
  props: ['swithRoute'],
  data () {
    return {
      logList: [],
      tableContent: null,
      timeStamp: 0
    }
  },
  created () {
    this.$addEvent("run", this.onMessage)
    this.$nextTick(() => {
      this.tableContent = document.querySelector('html')
      this.sendMessage({})
    })
  },
  methods: {
    /**
     * 发送数据
     * @param {Object} data 需要发送的数据
     */
    sendMessage (data) {
      this.$ws && this.$ws.send(JSON.stringify({
        type: 'run',
        data
      }))
    },
    /**
     * 接收数据
     * @param {Object} data 返回的数据
     */
    onMessage ({ data: { data } }) {
      if (data.indexOf('<s>') > -1) {
        this.logList.pop()
      }
      this.logList.push(data)
      this.changeScroll()
    },
    /**
     * 让log列表一直在底部
     */
    changeScroll () {
      const date = +new Date()
      if (date - this.timeStamp < 1000) return
      this.timeStamp = date
      let $dom = this.tableContent
      if ($dom) {
        setTimeout(() => {
          $dom.scrollTop = $dom.scrollHeight
        }, 0)
      }
    }
  }
}
