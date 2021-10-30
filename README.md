# VUE-TESTCASE-MINDER-EDITOR

基于百度脑图，并使用Vue二次开发的用例脑图编辑器组件。

底层基础（因为需要协同修改，已经整体挪到项目中）：[百度脑图](https://github.com/fex-team/kityminder-core) 

改造为 vue 组件： [fudax/vue-mindeditor](https://github.com/fudax/vue-mindeditor) 

补充部分用例需要用的功能  [MeYoung/Case_Minder_Vue](https://github.com/MeYoung/Case_Minder_Vue)

采用Vue 全家桶 + Element UI + webpack 开发

在此特别感谢 [fudax](https://github.com/fudax)、[MeYoung](https://github.com/MeYoung) 两位前辈的开源贡献，我只是站在大家的肩膀上补充了一些边角功能而已

## 效果

![脑图](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/-/raw/master/docs/preview.png)

也可以本地跑起来体验，克隆完代码后，在根目录下：

```
# 安装依赖
npm --registry=https://registry.npm.taobao.org install

# 本地运行
npm run lib && npm run serve
```

运行后，按照提示的地址打开即可，例如 

```
  App running at:
  - Local:   http://localhost:8081 
```

表示通过 <http://localhost:8081> 可以打开

# 项目中使用

安装本组件

``` bash
npm install vue-testcase-minder-editor --registry=http://npm.lizhifm.com
```

在 main.js 中

``` javascript
import '@lizhife/vue-testcase-minder-editor/lib/VueTestcaseMinderEditor.css'
import VueTestcaseMinderEditor from '@lizhife/vue-testcase-minder-editor'

Vue.use(VueTestcaseMinderEditor)
```

本组件依赖 vuex 进行部分全局配置管理。如果没有用 vuex ，可直接在 main.js 加入下面代码。

``` javascript
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    caseEditorStore: VueTestcaseMinderEditor.caseEditorStore
  }
})
```

如果有，可以仿照下面代码，动态注册对应 module 

``` javascript
const store = new Vuex.Store({...})

// 动态注册用例编辑器项目的 store 模块到项目中
store.registerModule('caseEditorStore', {
  ...VueTestcaseMinderEditor.caseEditorStore
})
```

在页面的 .vue 文件中

``` javascript
<template>
    <VueTestcaseMinderEditor 
      :initJson="initJson"  // 初始化数据，加载脑图时自动更新。同时也会监听数据变化，数据一更新就重新加载
      ref="minderEditor"    // 组件应用名称
      :allowEditPriority="true"  // 是否允许增删改优先级，实时更新状态
      :allowEditLabel="true"     // 是否允许增删改标签，实时更新状态
      :allowEditResult="true"    // 是否允许增删改测试结果，实时更新状态
      :allowEditNode="true">     // 是否允许增删改节点内容，实时更新状态
    </VueTestcaseMinderEditor>
</template>
...

<scripts>

export default {

  ...

  data() {
    return {
      // 测试数据，实际可不必引入
      initJson: {
          'data': {
            'id': 2,
            'text': 'Design project',
            'image': 'https://testerhome.com/uploads/user/avatar/6109.jpg',
            'imageSize': { 'width': 200, 'height': 200 }
          }
      }
    }
  },
  methods: {
    // 示例方法，实际可根据需要绑定到其他元素事件中，比如 v-on:click="logCurrentData"
    logCurrentData: function(event) {
      console.log("编辑器中的最新用例内容：", this.$refs.minderEditor.getJsonData())
    }
  }
}
<scripts>
```

完整示例可查看 `examples` 下面的2个文件

# 版本发布记录

请查看 [CHANGELOG.md](CHANGELOG.md)

## 本地开发

``` bash
# 安装依赖
npm --registry=https://registry.npm.taobao.org install

# 打包成组件并本地运行 examples 里面的示例
npm run lib && npm run serve

# 打包成组件
npm run lib
```

* 运行时报错 `Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime`

如果运行 `npm run serve` 有报错 `Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime` ，可以运行以下命令解决（[参考文章](https://medium.com/@proustibat/how-to-fix-error-node-sass-does-not-yet-support-your-current-environment-os-x-64-bit-with-c1b3298e4af0)）：

```bash
npm rebuild node-sass
```

* 如果有修改 kityminder-core ，需要阅读 kityminder-core 下的readme，并执行如下指令打包

```shell script
# kityminder-core
cd kityminder-core && npm run build && cd ..
```

* 如果需要本地调试，且不使用示例程序便于查看错误堆栈，请修改根目录下 vue.config.js 下面 entry 的值。改为注释下面代码片段中的第一行，去掉第二行的注释即可

``` json
...
      entry: 'examples/main.js', // 走示例项目，需要 npm run lib 后才能使用
      // entry: 'packages/VueTestcaseMinderEditor/main.js', // 走主工程项目，可直接 npm run serve 使用。方便调试时查看源码堆栈
...
```

# 发布版本指引

1. 改动代码
2. 提交这些改动
3. 改变package.json中的版本号
4. 运行 `npm run changelog` 生成版本变更记录
5. 提交 package.json和CHANGELOG.md文件
6. 创建tag，规则为 v+版本号，比如 v0.2.0
7. `git push && git push --tags` push代码及tags
8. 运行 `npm publish` 发布到仓库上

# 部分核心功能说明

1、用例结果对应的节点属性是什么？

答：对应的属性名是 progress 。此处为了兼容原有滴滴 agileTC 平台自带的测试结果，所以没有新开属性，而是沿用了原有的属性及值定义。

具体值定义：
```
1, // 不通过
9, // 通过
5, // 阻塞
4  // 不执行
```

2、整体项目架构是怎样的？

答：整体上这个项目包含了 kityminder-core + kityminder-editor 所做的事情。

可参考下图中，kityminder-editor 里面包含的部分：

![](https://github.com/fex-team/kityminder-editor/raw/master/relations.png)

* kityminder-core

负责底部编辑器具体内容绘制，以及通过命令调用改变编辑器内容、接口和事件暴露编辑器内部关键内容。详细可参阅：[kityminder-core](https://github.com/fex-team/kityminder-core/wiki)

* editor

使用 vue 重写了 kityminder-editor （原来官方的 editor 用的 angularjs ，不好内嵌到 vue 中）。负责顶部编辑栏以及包住 core 提供的编辑窗口，以及右键 hotbox 菜单能力。通过调用 kityminder-core 提供的命令、接口和事件达到修改 xmind 内容的目的。

3、result 这个新增属性怎么加上去的？

答：关键改动点有3处

1、editor的顶部编辑器，增加 result 编辑框。可参考 `packages/VueTestcaseMinderEditor/src/components/menu/edit/resultBox.vue`

2、editor的右键菜单，增加 result 相关操作。可参考 `packages/VueTestcaseMinderEditor/src/script/runtime/result.js`

3、kityminder-core 的命令解析器及渲染器，解析前两处发出的命令并对应修改节点内容。可参考 `kityminder-core/src/module/result.js`

# License

BSD 3-Clause (基于fex-team/kityminder-core，并非kityminder-editor)