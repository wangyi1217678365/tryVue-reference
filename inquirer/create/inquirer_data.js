let tmp = {
  layout: [
    {
      type: 'list',
      message: '请选择页面布局:',
      name: 'layout',
      pageSize: 10,
      validate: function(val) {
        if (val.length > 1) { // 校验位数
          return '最多只能选择1个'
        } 
        return true
      },
      choices: []
    }
  ],
  components: [
    {
      type: "checkbox",
      message: "请选择复合组件:",
      name: "components",
      pageSize: 10,
      choices: []
    }
  ],
  views: [
    {
      type: "checkbox",
      message: "页面组件:",
      name: "views",
      pageSize: 10,
      choices: []
    }
  ],
  utils: [
    {
      type: "checkbox",
      message: "常用方法:",
      name: "utils",
      pageSize: 10,
      choices: []
    }
  ],
  themeSetting: [
    {
      type: "checkbox",
      message: "主题设置:",
      name: "themeSetting",
      pageSize: 10,
      choices: []
    }
  ]
}

// 格式化字符串, 改为首字母大写
function formatStr (str) {
  return str.replace(str[0], str[0].toUpperCase());
}
// 生成 菜单列表
function createDataList (datas) {
  for (let key in datas) {
    let val = datas[key]
    tmp[key][0].choices = val.map(item => {
      return {
        name: formatStr(item),
        value: item
      }
    })
    // 因为布局只能选一个,且可以不选,所以给一个默认none的选项, none就是不使用布局
    if (key === 'layout') {
      tmp[key][0].choices.push({
        name: 'None',
        value: 'none'
      })
    }
  }
  return tmp
}

module.exports = createDataList