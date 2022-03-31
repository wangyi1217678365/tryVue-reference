const previewDialog = {
  name: 'previewDialog',
  template: `
  <div class="preview-dialog-wrapper">
    <div class="dialog-mask" @click="$emit('close')"></div>
    <div class="preview-dialog-container">
      <div class="preview-dialog-title">
        {{ title }}
      </div>
      <div class="preview-dialog-content">
        <img :src="pic" alt="" />
      </div>
    </div>
  </div>
  `,
  props: {
    pic: {
      type: String
    },
    title: {
      type: String
    },
    close: {
      type: Function
    }
  }
}