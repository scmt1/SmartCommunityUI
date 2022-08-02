import {
  baseurl,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postRequestJson,
  postRequestBodyJson
} from '@/libs/axios';
import request from '@/utils/request'

export default {
  config: {
    // inline: {
    //   type: "radio-button",
    //   label: "inline模式 / layout模式",
    //   options: [
    //     { text: "inline模式", value: undefined },
    //     { text: "layout模式", value: true }
    //   ]
    // },
    formName:{
      type: "input",
      label: "表单名称",
      required:true
    },
    tableName:{
      type: "select",
      label: "关联的表名",
      required:true,
      attrs: {
        filterable: true,
        clearable:true,
        placeholder:"请选择表名"
      },
      options:async function (data) {
        let resData = [];
        await getRequest('/generator/tables/all', {}).then(res => {
          if (res && res.length>0) {
            for(let i in res){
              if(res[i]){
                let item = {
                  text:res[i][0]+res[i][4],
                  value:res[i][0]
                }
                resData.push(item);
              }
            }

          } else {
            this.$Message.error('查询表名失败请联系管理员');
          }

        }).catch(res => {
          this.$Message.error('查询表名异常请联系管理员');
          return resData;
        }).finally(res => {
        });
        return resData;
        // return [{ text: '北京', value: 'beijing' }, {text: '深圳', value: 'shenzhen'}]
      },
      rules: {
        type: "string"
      }
    },
    isResponsive: {
      type: "radio-button",
      label: "是否响应式",
      vif: data => !data.inline,
      options: [
        { text: "是", value: undefined },
        { text: "否", value: false }
      ]
    },
    labelPosition: {
      type: "radio-button",
      label: "标签位置",
      options(data) {
        const options = ["left", "right", "top"];
        if (data.isResponsive !== false && !data.inline) {
          options.unshift({ text: "响应式", value: undefined });
        }
        return options;
      }
    },
    span: {
      type: "select",
      label: "表单宽度",
      vif: data => !data.inline,
      options() {
        const options = Array.from({ length: 24 }, (v, i) => {
          return { text: `${24 - i} / 24`, value: 24 - i };
        });
        options.unshift({ text: "响应式", value: undefined });
        return options;
      },
      style: {
        width: "100%"
      }
    },
    rules: {
      type: "data-editor",
      label: "校检规则",
      attrs: {
        types: ["object"]
      },
      tip:
        '校检规则文档, 请<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/qzzkpd" class="el-link el-link--primary">点击查看</a>'
    },
    isDialog: {
      type: "radio-button",
      label: "是否为弹窗",
      options: [
        { text: "非弹窗", value: undefined },
        { text: "弹窗", value: true }
      ]
    },
    isShowLabel: {
      type: "radio-button",
      label: "是否显示标签",
      options: [
        { text: "显示", value: undefined },
        { text: "不显示", value: false }
      ]
    },
    labelWidth: {
      type: "input",
      label: "标签宽度",
      attrs: {
        type: "number",
        min: 0,
        step: 10
      },
      tip: "默认值为 `auto`"
    },
    disabled: {
      type: "radio-button",
      label: "全局禁用表单",
      options: [
        { text: "正常", value: undefined },
        { text: "禁用", value: true }
      ]
    },
    readonly: {
      type: "radio-button",
      label: "全局只读表单",
      options: [
        { text: "正常", value: undefined },
        { text: "只读", value: true }
      ]
    },
    isShowErrorNotify: {
      type: "radio-button",
      label: "是否在校检错误后显示右上角提示",
      options: [
        { text: "显示", value: undefined },
        { text: "不显示", value: false }
      ]
    },
    isShowSubmitBtn: {
      type: "radio-button",
      label: "提交按钮",
      options: [
        { text: "显示", value: undefined },
        { text: "隐藏", value: false }
      ]
    },
    isShowBackBtn: {
      type: "radio-button",
      label: "返回按钮",
      options: [
        { text: "显示", value: undefined },
        { text: "隐藏", value: false }
      ]
    },
    formBtnSize: {
      type: "radio-button",
      label: "表单按钮大小",
      options: [{ text: "默认", value: undefined }, "medium", "small", "mini"]
    },
    isShowResetBtn: {
      type: "radio-button",
      label: "重置按钮",
      options: [
        { text: "显示", value: true },
        { text: "隐藏", value: undefined }
      ]
    },
    isShowCancelBtn: {
      type: "radio-button",
      label: "取消按钮",
      options: [
        { text: "显示", value: true },
        { text: "隐藏", value: undefined }
      ]
    },
    submitBtnText: {
      type: "input",
      label: "提交按钮文字",
    },
    style:{
      type:"textarea",
      label:"背景图样式",
    },
    headImgUrl:{
      type:"input",
      label:"表单头部图片地址",
    },
    headImgBgColor:{
      type:"input",
      label:"表单头部图片背景色样式",
    },
    backBtnText: {
      type: "input",
      label: "返回按钮文字"
    },
    cancelBtnText: {
      type: "input",
      label: "取消按钮文字"
    },
    resetBtnText: {
      type: "input",
      label: "返回按钮文字"
    },
    formAttrs: {
      type: "data-editor",
      label: "el-form属性",
      attrs: {
        types: ["object"]
      }
    }
  },
  data: {
    style:"",
    headImgUrl:"",
    headImgBgColor:""
  }
};
