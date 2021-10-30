define(function (require, exports, module) {
  function ClipboardRuntime () {
    var minder = this.minder
    var Data = window.kityminder.data

    if (!minder.supportClipboardEvent || kity.Browser.gecko) {
      return
    };

    var fsm = this.fsm
    var receiver = this.receiver
    var MimeType = this.MimeType
    var isFirstPasteAfterCut = false
    var cutOrCopyCache = ''

    var kmencode = MimeType.getMimeTypeProtocol('application/km')
    var decode = Data.getRegisterProtocol('json').decode
    var _selectedNodes = []

    /*
     * 增加对多节点赋值粘贴的处理
     */
    function encode (nodes) {
      var _nodes = []
      for (var i = 0, l = nodes.length; i < l; i++) {
        _nodes.push(minder.exportNode(nodes[i]))
      }
      return kmencode(Data.getRegisterProtocol('json').encode(_nodes))
    }

    var beforeCopy = function (e) {
      if (document.activeElement == receiver.element) {
        var clipBoardEvent = e
        var state = fsm.state()

        switch (state) {
          case 'input': {
            break
          }
          case 'normal': {
            var nodes = [].concat(minder.getSelectedNodes())
            if (nodes.length) {
              // 这里由于被粘贴复制的节点的id信息也都一样，故做此算法
              // 这里有个疑问，使用node.getParent()或者node.parent会离奇导致出现非选中节点被渲染成选中节点，因此使用isAncestorOf，而没有使用自行回溯的方式
              if (nodes.length > 1) {
                var targetLevel
                nodes.sort(function (a, b) {
                  return a.getLevel() - b.getLevel()
                })
                targetLevel = nodes[0].getLevel()
                if (targetLevel !== nodes[nodes.length - 1].getLevel()) {
                  var plevel; var pnode
                  var idx = 0
                  var l = nodes.length
                  var pidx = l - 1

                  pnode = nodes[pidx]

                  while (pnode.getLevel() !== targetLevel) {
                    idx = 0
                    while (idx < l && nodes[idx].getLevel() === targetLevel) {
                      if (nodes[idx].isAncestorOf(pnode)) {
                        nodes.splice(pidx, 1)
                        break
                      }
                      idx++
                    }
                    pidx--
                    pnode = nodes[pidx]
                  }
                };
              };
              var str = encode(nodes)
              clipBoardEvent.clipboardData.setData('text/plain', str)
              // 强制设定为需要更新id
              isFirstPasteAfterCut = false
              cutOrCopyCache = str
            }
            e.preventDefault()
            break
          }
        }
      }
    }

    var beforeCut = function (e) {
      if (document.activeElement == receiver.element) {
        if (minder.getStatus() !== 'normal') {
          e.preventDefault()
          return
        };

        var clipBoardEvent = e
        var state = fsm.state()

        switch (state) {
          case 'input': {
            break
          }
          case 'normal': {
            var nodes = minder.getSelectedNodes()
            if (nodes.length) {
              clipBoardEvent.clipboardData.setData('text/plain', encode(nodes))
              isFirstPasteAfterCut = true
              cutOrCopyCache = encode(nodes)
              minder.execCommand('removenode')
            }
            e.preventDefault()
            break
          }
        }
      };
    }

    var guid = function () {
      // 出处：https://www.codenong.com/cs106429627/
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }

    var updateChildrenNodesId = function (node) {
      if (node.children !== undefined && node.children.length > 0) {
        node.children.forEach(function (child) {
          child.data.id = guid()
          child.data.created = (new Date()).valueOf()
          updateChildrenNodesId(child)
        })
      }
    }

    var beforePaste = function (e) {
      if (document.activeElement == receiver.element) {
        if (minder.getStatus() !== 'normal') {
          e.preventDefault()
          return
        };

        var clipBoardEvent = e
        var state = fsm.state()
        var textData = clipBoardEvent.clipboardData.getData('text/plain')

        switch (state) {
          case 'input': {
            // input状态下如果格式为application/km则不进行paste操作
            if (!MimeType.isPureText(textData)) {
              e.preventDefault()
              return
            };
            break
          }
          case 'normal': {
            /*
             * 针对normal状态下通过对选中节点粘贴导入子节点文本进行单独处理
             */
            var sNodes = minder.getSelectedNodes()

            if (MimeType.whichMimeType(textData) === 'application/km') {
              var nodes = decode(MimeType.getPureText(textData))
              var _node
              sNodes.forEach(function (node) {
                // 由于粘贴逻辑中为了排除子节点重新排序导致逆序，因此复制的时候倒过来
                for (var i = nodes.length - 1; i >= 0; i--) {
                  _node = minder.createNode(null, node)
                  minder.importNode(_node, nodes[i])
                  if (textData !== cutOrCopyCache || isFirstPasteAfterCut === false) {
                    // 从外部有进行过其他复制或剪切，导致和缓存数据不一致，或 非首次剪切后粘贴 ，均需要更新id
                    _node.data.id = guid()
                    _node.data.created = (new Date()).valueOf()
                    // 遍历子节点，给子节点都重新赋值id和created
                    updateChildrenNodesId(_node)
                  }

                  _selectedNodes.push(_node)
                  node.appendChild(_node)
                }
              })
              minder.select(_selectedNodes, true)
              _selectedNodes = []

              minder.refresh()
            } else if (clipBoardEvent.clipboardData && clipBoardEvent.clipboardData.items[0].type.indexOf('image') > -1) {
              var imageFile = clipBoardEvent.clipboardData.items[0].getAsFile()
              var serverService = angular.element(document.body).injector().get('server')

              return serverService.uploadImage(imageFile).then(function (json) {
                var resp = json.data
                if (resp.errno === 0) {
                  minder.execCommand('image', resp.data.url)
                }
              })
            } else {
              sNodes.forEach(function (node) {
                minder.Text2Children(node, textData)
              })
            }
            // 首次粘贴后，都去掉标识（因为后面粘贴肯定都得更新id了）。这里 set 完后继续粘贴总是会丢失，但如果是在上面触发复制则没问题，非常奇怪
            isFirstPasteAfterCut = false
            e.preventDefault()
            break
          }
        }
      }
    }
    /**
     * 由editor的receiver统一处理全部事件，包括clipboard事件
     * @Editor: Naixor
     * @Date: 2015.9.24
     */
    document.addEventListener('copy', beforeCopy)
    document.addEventListener('cut', beforeCut)
    document.addEventListener('paste', beforePaste)
  }

  return module.exports = ClipboardRuntime
})
