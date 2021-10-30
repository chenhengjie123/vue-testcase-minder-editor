/**
 * @fileOverview
 *
 * 只读模式支持
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */

define(function(require, exports, module) {
    var kity = require('./kity');
    var Minder = require('./minder');
    var MinderEvent = require('./event');

    // 初始化时根据的传入的 options 决定是否要 disable
    Minder.registerInitHook(function(options) {
        if (options.readOnly) {
            this.disable();
        }
    });

    kity.extendClass(Minder, {

        disable: function() {
            var me = this;
            //禁用命令
            me.bkqueryCommandState = me.queryCommandState;
            me.bkqueryCommandValue = me.queryCommandValue;
            me.queryCommandState = function(type) {
                var cmd = this._getCommand(type);
                if (cmd && cmd.enableReadOnly) {
                    return me.bkqueryCommandState.apply(me, arguments);
                }
                return -1;
            };
            me.queryCommandValue = function(type) {
                var cmd = this._getCommand(type);
                if (cmd && cmd.enableReadOnly) {
                    return me.bkqueryCommandValue.apply(me, arguments);
                }
                return null;
            };
            this.setStatus('readonly');
            me._interactChange();
        },

        /**
         * @description 【二次开发新增】关闭指定模块命令
         * @param {Array} value 要关闭的模块名称。
         * 具体名称可从 minder 对象的 _commands 中获取
         */
        disableSpecificModule: function(moduleNames) {
            var me = this;
            //仅启用部分模块
            me.bkqueryCommandState = me.queryCommandState;
            me.bkqueryCommandValue = me.queryCommandValue;
            me.queryCommandState = function(type) {
                var cmd = this._getCommand(type);
                if (cmd && moduleNames.indexOf(cmd.__KityClassName) === -1) {
                    return me.bkqueryCommandState.apply(me, arguments);
                }
                return -1;
            };
            me.queryCommandValue = function(type) {
                var cmd = this._getCommand(type);
                if (cmd && moduleNames.indexOf(cmd.__KityClassName) === -1) {
                    return me.bkqueryCommandValue.apply(me, arguments);
                }
                return null;
            };
            this.setStatus('partEnable');
            me._interactChange();
        },

        enable: function() {
            var me = this;

            if (me.bkqueryCommandState) {
                me.queryCommandState = me.bkqueryCommandState;
                delete me.bkqueryCommandState;
            }
            if (me.bkqueryCommandValue) {
                me.queryCommandValue = me.bkqueryCommandValue;
                delete me.bkqueryCommandValue;
            }

            this.setStatus('normal');

            me._interactChange();
        }
    });
});