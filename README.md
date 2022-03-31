# Fire Monkey 
  Fire Monkey是一个快速初始化中后台系统的工具

## 项目初始化
  1. npm i 或 cnpm i 或 yarn 
  2. npm link 创建本地软连接 (node 12.0.0版本以上)

## 命令
  1. ui 可视化创建项目
  2. create 创建项目命令, 后面可以跟自己想创建得文件夹名称, 如果想在当前文件夹创建项目, 可以直接写 " . "
  ### 例如:  
    fireMonkey create . 就是在当前文件夹下创建项目
    fireMonkey create test 是在test文件夹下创建项目
  3. add 添加命令, 在我们创建好项目后, 可能我们在开发期间需要补充一些创建时没添加得页面, 组件, 方法 及 布局, 这时就需要在项目根目录下使用add命令来添加, 注意一定要在项目 "根" 目录下执行此命令
    ### 添加命令有4个配置参数: 
      -p(页面) 
      -c(组件) 
      -u(方法) 
      --layout(布局)
      配置参数后面接我们需要添加得内容名称, 一次可以一个或添加多个
    ### 支持添加内容
      页面: login, table
      组件: Crumbs, Head, Menu, Search, Table
      方法: download, print, tool, upload
      布局: layout
  ### 例如: 
    fireMonkey add -p login -c table search -u filter 
    这段命令是我们添加了一个页面login, 添加了俩个组件table search, 以及一个filter方法
  4. 命令查询方法 fireMonkey --help, fireMonkey add --help

## 简写
  fireMonkey命令可简写为fire、monkey，或全小写为firemonkey，方便用户使用。

## 项目结构
```
├─ command                                             // 命令
│  ├─ add                                              //
│  └─ create                                           //
├─ index.js                                            // 入口
├─ inquirer                                            // 用户交互选择
│  ├─ add                                              //
│  └─ create                                           //
├─ utils                                               // 方法
└─ yarn.lock                                           //

```