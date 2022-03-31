const component1 = {
  name: 'home',
  template: `
    <div class="wrap components1 flex column border-box">
      <header>
          <h1>Fire Monkey 项目工程</h1>
        <div class="create-tab">
          <div class="tab active">   
            <svg t="1627025175252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16240" width="24" height="24"><path d="M885.333333 0h-746.666666C61.866667 0 0 61.866667 0 138.666667v744.533333C0 962.133333 61.866667 1024 138.666667 1024h744.533333c76.8 0 138.666667-61.866667 138.666667-138.666667v-746.666666C1024 61.866667 962.133333 0 885.333333 0zM768 554.666667H554.666667v213.333333c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666667-42.666667V554.666667H256c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h213.333333V256c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667v213.333333h213.333333c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667z" p-id="16241"></path></svg>
            创建项目
          </div>
        </div>
      </header>
      <div class="content flex column flex1 border-box">
        <div class="dir-control flex pt-15">
          <button class="before bg btn" @click="before">
            <svg t="1627460347307" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2000" width="16" height="16"><path d="M489.6 252.8L83.2 662.4c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l384-384 384 384c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L534.4 252.8c-12.8-12.8-32-12.8-44.8 0z" p-id="2001"></path></svg>
          </button>
          <div class="dir-box bg flex between flex1 ml-15">
            <div class="dir-select flex items-center flex1" v-if="!showSearch">
              <template
                v-for="(item, index) in path"
                :key="index+item">
              <span
                v-if="item !== ''"
                class="path pointer flex items-center"
                @click="toDir(index)"
              >{{item}}</span>
              </template>
            </div>
            <input
              class="ipt flex1 pl-10 pr-10"
              v-model="searchPath"
              type="text"
              v-else
              @keyup.enter="searchDir"
            ></input>
            <div class="flex pr-10">
              <button class="dir-redirect btn" @click="inEditer">
                <svg t="1627461356969" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6771" width="16" height="16"><path d="M855.780741 315.758524c15.699564-15.699564 15.699564-39.247886 0-54.94745l-90.270956-90.270956c-15.699564-15.699564-39.247886-15.699564-54.94745 0l-70.647013 70.647013 149.143808 149.143808L855.780741 315.758524zM161.086815 716.090235l0 149.143808 149.143808 0 431.729815-435.655218-149.142785-149.143808L161.086815 716.090235z" p-id="6772"></path></svg>
              </button>
              <button class="dir-redirect btn" @click="reFresh">
              <svg t="1627528016689" class="icon" viewBox="0 0 1096 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7867" width="16" height="16"><path d="M1055.688379 313.024535c-25.870975-60.865248-62.934641-115.519465-110.085705-162.439488-47.15249-46.921448-102.150418-83.765482-163.315164-109.509526C718.936423 14.410162 651.968535 0.891365 582.201047 0.891365v116.059989c227.988323 0 398.350262 167.900345 398.350262 395.025827S810.441805 907.409471 582.201047 907.409471 188.329003 733.420747 188.329003 506.295265c0-43.374529-0.527688-68.886106 12.584646-109.406842l81.385181 40.70614-2.895153-160.321605-2.89658-160.321604-138.075988 82.657337L0.356546 282.264602l99.440668 54.784c-20.501393 55.875031-30.879733 114.551086-30.879732 174.928579 0 68.974529 13.585827 135.912468 40.380969 198.954072 25.870975 60.866674 62.896134 115.518039 110.047198 162.439488 47.15249 46.921448 102.071978 83.764056 163.236724 109.509526 63.351086 26.663933 130.617047 40.184156 199.931009 40.184156 69.312535 0 136.57707-13.520223 199.926729-40.184156 61.166173-25.745471 116.084234-62.588078 163.235298-109.509526 47.149638-46.921448 84.171944-101.572813 110.041494-162.439488 26.795142-63.041604 40.370986-129.979543 40.370986-198.952646 0-68.975955-13.605794-135.912468-40.39951-198.954072z" fill="#000000" p-id="7868"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <ul class="child flex1 beautiful-scrollbar">
          <li
            class="list-items pointer flex pd-15 pl-10 pr-10"
            v-for="(item, index) in child"
            :key="item+index"
            @click="childDir(item)"
          >
          <svg t="1627526964682" class="icon mr-15" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6569" width="24" height="24"><path d="M450.516401 166.4c13.6 36 52 60.8 92 62.4 11.2 0 12.8 0 23.2 0l8 0 369.6 0c33.6 0 61.6 28.8 61.6 62.4l0 248 0 124 0 186.4c0 33.6-28 62.4-61.6 62.4L80.916401 912c-33.6 0-61.6-28.8-61.6-62.4L19.316401 166.4c0-33.6 28-62.4 61.6-62.4l308 0M388.916401 104.8 388.916401 104.8c29.6 1.6 53.6 37.6 61.6 62.4" p-id="6570" fill="#fc6403"></path></svg>
          {{item}}
        </li>
        </ul>
      </div>
      <div class="operate footer flex center border-box pb-15">
        <button @click="createProject">
          <svg t="1627025034481" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12105" width="16" height="16"><path d="M575.771 63.583v897h-127.8v-897z" p-id="12106"></path><path d="M63.3 448.2h897V576h-897z" p-id="12107"></path></svg>
          在此创建新项目
        </button>
      </div>
    </div>
  `,
  props: ['swithRoute'],
  data () {
    return {
      path: [
      ],
      child: [],
      searchPath: "",
      showSearch: false
    }
  },
  methods: {
    run () {
      // const
      this.$ws.send(JSON.stringify({
        type: "run",
        data: ""
      }))
    },
    // 创建项目
    createProject () {
      this.swithRoute(detailPage)
      projectInfo.path = this.searchPath
    },
    // 返回上一级目录
    before () {
      const len = this.path.length
      // console.log(len, '????')
      if (len > 1) {
        let path = this.path.slice(0, len - 1).join("\\")
        // console.log()
        this.searchPath = path
        this.sendMessage(path)
      }
    },
    // 进入父级目录
    toDir (index) {
      let path = index !== undefined ? this.path.slice(0, index + 1).join("\\") : "./"
      this.searchPath = path
      this.sendMessage(path)
    },
    // 进入子目录
    childDir (val) {
      let path = [...this.path, val].join("\\") || "./"
      this.searchPath = path
      this.sendMessage(path)
    },
    // 搜索目录
    searchDir () {
      this.sendMessage(this.searchPath)
    },
    // 进入编辑模式
    inEditer () {
      this.showSearch = true
    },
    // 刷新目录
    reFresh () {
      let path = this.path.join("\\")
      this.searchPath = path
      this.sendMessage(path)
    },
    sendMessage (path) {
      this.$ws && this.$ws.send(JSON.stringify({
        type: 'getFolderList',
        path: path
      }))
    },
    onMessage (val) {
      this.showSearch = false
      if (val && val.data.code === 0) {
        this.path = val.data.path.split("\\")
        this.searchPath = val.data.path
        this.child = val.data.folderList
      } else {
        // 重置searchPath为当前目录
        this.searchPath = this.path.join("\\")
      }
      // console.log(this.path, '返回的结果???', val)
    },
    remove (fn) {
      this.$removeEvent("getFolderList", fn)
    },
    add (fn) {
      this.$addEvent("getFolderList", fn)
    },
  },
  beforeDestroy () {
    this.remove(this.onMessage)
  },
  created () {
    this.add(this.onMessage)
    if (projectInfo.path) {
      this.searchPath = projectInfo.path
      this.searchDir()
    } else {
      // this.toDir()
    }
  }
}