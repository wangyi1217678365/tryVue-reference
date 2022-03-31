const detailPage = {
  name: 'detailPage',
  template: `
    <div class="wrap detail-page flex column border-box pb-15">
      <header>
        <h1>Fire Monkey 项目工程</h1>
        <div class="create-tab">
          <div class="tab active">
            <svg t="1627025949243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33697" width="28" height="25"><path d="M172.9 972C106.2 972 52 917.8 52 851.1V52h734.9v185.1H972v614c0 66.8-54.2 120.9-120.9 120.9H172.9z m614-120.9c0 38.3 25.8 64.1 64.1 64.1s64.1-25.8 64.1-64.1V293.2H786.3l0.6 557.9z m-678.1 0c0 38.3 25.8 64.1 64.1 64.1h578.3l-2.6-4c-12.6-19.2-17.8-37-17.8-60.1V108.2h-622v742.9z m128.3-125.6v-56.2h241.2v56.2H237.1z m0-185.1v-56.2h364.8v56.2H237.1z m0-185v-56.2h364.8v56.2H237.1z" p-id="33698"></path></svg>
            详情
          </div>
          <div class="tab">
            <svg t="1627025875677" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31832" width="28" height="25"><path d="M450.8 693.8c-8.2 0-16.4-3.1-22.6-9.4L250.9 507.1c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l154.7 154.7 277-277c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L473.5 684.5c-6.3 6.2-14.5 9.3-22.7 9.3z" p-id="31833"></path><path d="M512 956.2c-59.9 0-118.1-11.7-172.9-34.9-52.9-22.4-100.4-54.4-141.2-95.2s-72.8-88.3-95.2-141.2c-23.2-54.8-34.9-113-34.9-172.9s11.7-118.1 34.9-172.9c22.4-52.9 54.4-100.4 95.2-141.2s88.3-72.8 141.2-95.2c54.8-23.2 113-34.9 172.9-34.9s118.1 11.7 172.9 34.9c52.9 22.4 100.4 54.4 141.2 95.2s72.8 88.3 95.2 141.2c23.2 54.8 34.9 113 34.9 172.9s-11.7 118.1-34.9 172.9c-22.4 52.9-54.4 100.4-95.2 141.2s-88.3 72.8-141.2 95.2c-54.8 23.1-113 34.9-172.9 34.9z m0-824.4c-101.5 0-197 39.5-268.8 111.3S131.8 410.5 131.8 512s39.5 197 111.3 268.8S410.5 892.2 512 892.2s197-39.5 268.8-111.3S892.2 613.5 892.2 512s-39.5-197-111.3-268.8S613.5 131.8 512 131.8z" p-id="31834"></path></svg>
            预设
          </div>
          <div class="tab">
            <svg t="1627025799821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30901" width="28" height="25"><path d="M512 1024c-19.748571 0-39.314286-5.302857-56.868571-15.908571l-329.142858-199.497143A110.500571 110.500571 0 0 1 73.142857 714.788571V309.211429c0-38.034286 20.297143-74.057143 52.845714-93.805715l329.142858-199.497143a109.604571 109.604571 0 0 1 113.737142 0l329.142858 199.497143A110.500571 110.500571 0 0 1 950.857143 309.211429v405.394285c0 38.034286-20.297143 74.057143-52.845714 93.805715l-329.142858 199.497142c-17.554286 10.788571-37.12 16.091429-56.868571 16.091429z m0-950.857143c-6.582857 0-13.165714 1.828571-19.017143 5.302857l-329.142857 199.497143c-10.788571 6.582857-17.554286 18.651429-17.554286 31.268572v405.394285c0 12.617143 6.765714 24.685714 17.554286 31.268572l329.142857 199.497143c11.702857 7.131429 26.148571 7.131429 37.851429 0l329.142857-199.497143c10.788571-6.582857 17.554286-18.651429 17.554286-31.268572V309.211429c0-12.617143-6.765714-24.685714-17.554286-31.268572l-329.142857-199.497143A36.205714 36.205714 0 0 0 512 73.142857z" p-id="30902"></path><path d="M512 896c-20.114286 0-36.571429-16.457143-36.571429-36.571429V488.411429l311.405715-172.982858c17.737143-9.874286 39.862857-3.474286 49.737143 14.262858s3.474286 39.862857-14.262858 49.737142L548.571429 531.565714V859.428571c0 20.114286-16.457143 36.571429-36.571429 36.571429z" p-id="30903"></path><path d="M512 546.56c-6.034286 0-12.068571-1.462857-17.737143-4.571429l-292.571428-162.56a36.626286 36.626286 0 0 1-14.262858-49.737142c9.874286-17.737143 32-23.954286 49.737143-14.262858l292.571429 162.56c17.737143 9.874286 23.954286 32 14.262857 49.737143-6.765714 12.068571-19.2 18.834286-32 18.834286z" p-id="30904"></path></svg>
            功能
          </div>
        </div>
      </header>
      <div class="content flex1">
        <div class="tab-content">
          <div>
            <P class="sub-title">项目名称</P>
            <div class="subject-name flex items-center">
              <svg t="1627526964682" class="icon pd-10" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6569" width="24" height="24"><path d="M450.516401 166.4c13.6 36 52 60.8 92 62.4 11.2 0 12.8 0 23.2 0l8 0 369.6 0c33.6 0 61.6 28.8 61.6 62.4l0 248 0 124 0 186.4c0 33.6-28 62.4-61.6 62.4L80.916401 912c-33.6 0-61.6-28.8-61.6-62.4L19.316401 166.4c0-33.6 28-62.4 61.6-62.4l308 0M388.916401 104.8 388.916401 104.8c29.6 1.6 53.6 37.6 61.6 62.4" p-id="6570" fill="#fc6403"></path></svg>
              <input
                class="ipt border-box flex1 pd-10"
                v-model="projectName"
                maxlength="128"
                @input="iptHandle"
              ></input>
              <div class="bottom-line"></div>
            </div>
            <div class="input-error flex items-center bg pd-10 mt-10" v-show="status">
              <svg t="1627613746213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8741" width="24" height="24"><path d="M512 192L128 832h768z m32 576h-64v-64h64z m-64-128V384h64v256z" p-id="8742" fill="#f24418"></path></svg> 文件夹已存在
            </div>
            <div class="path-box">
              <p class="show-path">
                {{path}}\\{{projectName}}
              </p>
              <span class="path-tip bg pl-10 pr-10">{{path}}\\{{projectName}}</span>
            </div>
          </div>
          <div class="pt-15 mt-15">
            <P class="sub-title">Git</P>
            <div class="pb-10">初始化git仓库(建议)</div>
            <div class="subject-name git flex items-center">
              <input
                class="ipt border-box flex1 pd-10"
                v-model="git"
              ></input>
              <div class="bottom-line"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="operate">
        <button class="pre" @click="back">
          <svg t="1627031063830" class="icon" viewBox="0 0 1213 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36613" width="16" height="16"><path d="M209.548124 568.908272l379.62235 358.119266c23.626846 22.26157 23.513073 58.289665-0.26547 80.399538a63.561145 63.561145 0 0 1-85.822715-0.227546L32.744988 563.52302A56.886466 56.886466 0 0 1 0.016308 510.580683c-0.379243-14.942178 5.499025-30.036054 17.634805-41.489196L497.128172 16.844083A63.561145 63.561145 0 0 1 582.912963 16.578612c23.778543 22.147797 23.892316 58.175893 0.26547 80.437463L203.556083 455.135341H1156.707782a56.886466 56.886466 0 0 1 0 113.772931H209.548124z" p-id="36614"></path></svg>
          上一步
        </button>
        <button class="detail-btn" :disabled="projectName==='' || status" @click="next">
          下一步
          <svg t="1627030942650" class="icon" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36113" width="16" height="16"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="36114"></path></svg>
        </button>
      </div>
    </div>
  `,
  props: ['swithRoute'],
  data () {
    return {
      path: projectInfo.path,
      projectName: "",
      git: "",
      // 文件是否存在
      status: false,
      reg: new RegExp(`[/\\|:?*"<>]`, "g")
    }
  },
  methods: {
    back () {
      projectInfo.projectName = ""
      this.swithRoute(component1)
    },
    next () {
      projectInfo.projectName = this.projectName
      projectInfo.Git = this.git
      this.swithRoute(selectOptions)
    },
    iptHandle () {
      if (!this.projectName) return
      this.projectName = this.projectName.replace(this.reg, "")
      this.testDir()
    },
    testDir () {
      this.$ws && this.$ws.send(JSON.stringify({
        type: 'hasFolder',
        path: `${this.path}\\${this.projectName}`
      }))
    },
    onMessage (val) {
      this.status = val.data.status
    }
  },
  beforeDestroy () {
    this.$removeEvent("hasFolder", this.onMessage)
  },
  created () {
    this.$addEvent("hasFolder", this.onMessage)
  }
}