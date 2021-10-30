export const state = {
  count: 2,
  minder: {},
  editor: {},
  working: {
    editing: false,
    saving: false,
    draging: false
  },
  callbackQueue: [],
  config: {
    // 右侧面板最小宽度
    ctrlPanelMin: 250,

    // 右侧面板宽度
    ctrlPanelWidth: parseInt(window.localStorage.__dev_minder_ctrlPanelWidth) || 250,

    // 分割线宽度
    dividerWidth: 3,

    // 默认语言
    defaultLang: 'zh-cn',

    // 放大缩小比例
    zoom: [
      10,
      20,
      30,
      50,
      80,
      100,
      120,
      150,
      200
    ],
    
    // 允许编辑优先级
    allowEditPriority: true,

    // 允许编辑标签
    allowEditLabel: true,

    // 允许编辑测试结果
    allowEditResult: true,

    // 允许编辑节点
    allowEditNode: true,

    // 是否全屏
    isFullScreen: false
  }
}
