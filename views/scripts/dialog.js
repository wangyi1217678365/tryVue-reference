const vueDialog = {
  name: 'dialog',
  template: `
    <div class="dialog-wrapper" v-if="visible">
      <div class="dialog-container" :style="_style">
        <div class="dialog-title">
          <span>{{ title }}</span>
          <div v-if="showClose" class="close" @click="close">
            <svg t="1627977151113" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9676" width="200" height="200"><path d="M10.750656 1013.12136c-13.822272-13.822272-13.822272-36.347457 0-50.169729l952.200975-952.200975c13.822272-13.822272 36.347457-13.822272 50.169729 0 13.822272 13.822272 13.822272 36.347457 0 50.169729l-952.200975 952.200975c-14.334208 14.334208-36.347457 14.334208-50.169729 0z" fill="" p-id="9677"></path><path d="M10.750656 10.750656c13.822272-13.822272 36.347457-13.822272 50.169729 0L1013.633296 963.463567c13.822272 13.822272 13.822272 36.347457 0 50.169729-13.822272 13.822272-36.347457 13.822272-50.169729 0L10.750656 60.920385c-14.334208-14.334208-14.334208-36.347457 0-50.169729z" fill="" p-id="9678"></path></svg>
          </div>
        </div>
        <div class="dialog-content">
          <slot></slot>
        </div>
      </div>
    </div>
  `,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    showClose: {
      type: Boolean
    }
  },
  computed: {
    _style () {
      let styles = {}
      if (this.width) {
        styles.width = this.width
      }
      if (this.height) {
        styles.height = this.height
      }
      return styles
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
      this.$emit('close')
    }
  }
}