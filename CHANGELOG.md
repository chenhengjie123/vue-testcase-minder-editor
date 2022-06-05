## [0.3.13](https://github.com/chenhengjie123/vue-testcase-minder-editor/compare/v0.3.12...v0.3.13) (2022-06-05)


### Bug Fixes

* 修复 vue-cli 2.x 项目导入时有 Unexpected token 的问题 ([808b1ab](https://github.com/chenhengjie123/vue-testcase-minder-editor/commit/808b1ab0e5f42169afd29851adaa35007436fe4b))
* 修复由于 packages 目录中没有引入组件,导致报错找不到组件的问题 ([e0f2f55](https://github.com/chenhengjie123/vue-testcase-minder-editor/commit/e0f2f5544ed862eadd0195b0f3a3fba1bb19647d))



## 0.3.12 (2022-04-08)


### Bug Fixes

* 修复部分项目引入后提示 Unknown browser query dead 的报错 ([d05b9cd](https://github.com/chenhengjie123/vue-testcase-minder-editor/commit/d05b9cd579211952cd7ef5f731b4f64118101184))
* 修复默认数据缺少id值,导致搜索功能出错不可用的问题 ([affde62](https://github.com/chenhengjie123/vue-testcase-minder-editor/commit/affde62733eec810bf03775be5daa61153313c78))
* 把 browserlist 配置调整到独立配置文件, 解决引入时出现 Unknown browser query dead 问题 ([dbae36c](https://github.com/chenhengjie123/vue-testcase-minder-editor/commit/dbae36c4a0fc2a90a9f1f99cfdef1d6263a83877))


### Features

* 首次提交全部源码 ([d882a17](https://github.com/chenhengjie123/vue-testcase-minder-editor/commit/d882a17ae1936693e371ec3cb419a9d1c4e0ffaa))


### Reverts

* Revert "release: 发布 3.10 版本" ([c92e00d](https://github.com/chenhengjie123/vue-testcase-minder-editor/commit/c92e00dcef40a34d6a78220aa0ef46400c999510))



## [0.3.9](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.8...v0.3.9) (2021-08-19)


### Features

* 修改粘贴板中 guid 的生成规则, 保障节点id不会重复 ([54e414d](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/54e414d605f12da8641981dfaba67b325eeda3ae))



## [0.3.8](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.7...v0.3.8) (2021-06-28)


### Bug Fixes

* 修复低分辨率下，右侧全屏按钮看不到的问题 ([01548db](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/01548db0026bc23cbaa1ee32c52ce1d81ac119c9))



## [0.3.7](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.6...v0.3.7) (2021-06-16)


### Bug Fixes

* 修复备注框无法选择文本的问题 ([8cf7369](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/8cf7369bdcfa041ca432da88590cf04c1e0a4558))



## [0.3.6](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.5...v0.3.6) (2021-06-01)


### Bug Fixes

* 修复非编辑模式下,键盘输入可以直接修改当前选中节点内容的问题 ([feb0bf2](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/feb0bf2ec1e190c79d044c4a3b736b6544bed782))



## [0.3.5](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.4...v0.3.5) (2021-05-28)


### Bug Fixes

* 修复退出编辑模式再重新进入后, 自定义标签数据会变为无数据的问题 ([2f173f8](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/2f173f809dac0e5f570d91a405377ee5515ea259))



## [0.3.4](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.3...v0.3.4) (2021-05-12)


### Bug Fixes

* 修复顶部当前节点对应文字的位置,无法直接选中的问题 ([ec514ac](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/ec514aceedd408016dcf7aa10d8389013b96441a))



## [0.3.3](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.2...v0.3.3) (2021-05-11)


### Features

* 增加选中单个节点时, 顶部展示此节点文字内容功能, 便于复制粘贴 ([ea5eaab](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/ea5eaabaf50893130fa60a96ebc3dcaed388ba1e))



## [0.3.2](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.1...v0.3.2) (2021-04-20)


### Bug Fixes

* 修复复制粘贴时,节点id还是原来的id导致重复的问题.但还有一个剪切后,首次粘贴时id也会改变的问题待修复 ([14aafc8](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/14aafc86016a200e07a54ab7786b843afc47420c))
* 修复本用例剪切后首次粘贴,id会变导致无法关联原有测试用例执行记录问题 ([5d3527a](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/5d3527a31d16cb7c972699917805a8710d89c853))



## [0.3.1](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.3.0...v0.3.1) (2021-03-18)


### Bug Fixes

* 修复下拉框下拉按钮太靠上的问题; 修复部分样式会直接影响全局html标签问题 ([4601b66](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/4601b66dd83b1927a1f2e723acebb7bd4881318c))



# [0.3.0](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/compare/v0.2.0...v0.3.0) (2021-03-05)


### Bug Fixes

* 修复当未加载完全时,去掉 hotbox 节点会导致 console 报错问题 ([d80fb17](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/d80fb174fac23495663af9337300c3a80b622591))


### Features

* 添加当前选中节点数量的提示文字 ([197e01a](https://gitlab.lizhi.fm/qa_mega/vue-testcase-minder-editor/commit/197e01ab228e59fa98d4a62fc69e03dfa28e95a6))



