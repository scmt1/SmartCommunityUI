<style lang="less">
  .batchUpdateTBasicInformationManagement {
    /*.myEditor{
      width: 100%;
      margin: 0;
    }*/

    .ql-editor {
      min-height: 350px;
    }

    .ivu-modal-body {
      height: 500px !important;
      overflow-y: auto;
    }

    .ivu-color-picker-rel {
      width: 227.73px;
    }

    .myWangEditorDiv {
      width: calc(100% - 159px);
      position: absolute;
      left: 110px;
      height: 300px;
    }

    .myWangEditorLabel {
      width: 110px;
      position: absolute;
      left: 0px;
      text-align: right;
      padding: 10px 12px 10px 0;
    }

    .ivu-color-picker .ivu-select-dropdown {
      z-index: 99999;
    }
    .addDepartUser-depart .ivu-form-item-content{
    position: relative;
    }

    .addDepartUser-depart .ivu-dropdown{
        position: absolute;
        right: 0;
        top: 0px;
    }

    .addDepartUser-depart .ivu-select-dropdown{
        top: 30px !important;
        padding: 5px;
        min-width: 189px;
        left: -223.66px !important;
        max-height: 180px;
        overflow-y: auto;
        z-index: 99999;
    }
    .addDepartUser-depart .ivu-dropdown-rel .ivu-icon{
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        text-align: center;
        color: #808695;
        position: absolute;
        right: 0;
        z-index: 3;
        transition: all .2s ease-in-out;
    }

    .departVisibleSelectIcon{
        transform: rotateZ(-180deg);
    }

    .addDepartUser-depart .ivu-dropdown .ivu-tree{
        width: 212px;
    }

    .addDepartUser-depart .ivu-tree ul li{
        margin: 2px 0;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="1100px"
         class="batchUpdateTBasicInformationManagement">
    <Form ref="tBasicInformationManagementForm" :model="tBasicInformationManagementForm" :label-width="110"
          style="margin-right: 50px;" :rules="tBasicInformationManagementFormRule">
      <Row>
        <Col span="8">
          <FormItem label="????????????" prop="menuName">
            <Input type="text" v-model="tBasicInformationManagementForm.menuName" disabled readonly/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="????????????" prop="name">
            <Input type="text" :maxlength=50 v-model="tBasicInformationManagementForm.name" placeholder="?????????????????????"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="????????????" prop="areaType" class="addDepartUser-depart">
            <i-input v-model="quyuname" placeholder="?????????" readonly>
            </i-input>
            <Dropdown trigger="custom" :visible="departVisible" placement="bottom-end">
                <a href="javascript:void(0)" @click="departVisible=!departVisible">
                    <Icon type="ios-arrow-down" v-bind:class="{departVisibleSelectIcon:departVisible}"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <Tree v-bind:data="areaTypeArr" @on-select-change="selectDownitem">
                    </Tree>
                </DropdownMenu>
            </Dropdown>
          </FormItem>
        </Col>
      </Row>
      <Row>

        <Col span="8">
          <FormItem label="??????????????????" prop="type">
            <RadioGroup v-model="tBasicInformationManagementForm.isDisplayState">
              <Radio :label="0">??????</Radio>
              <Radio :label="1">??????</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <div>
          <Col span="8">
            <FormItem label="????????????" prop="polygonColor">
              <ColorPicker v-model="tBasicInformationManagementForm.polygonColor" :recommend="true" format="hex"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="???????????????" prop="alpha">
              <InputNumber :max="1" :min="0" :step="0.1" v-model="tBasicInformationManagementForm.alpha"
                           @on-blur="changeAlpha" style="width:100%;" placeholder="????????????????????????"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="??????????????????">
              <RadioGroup v-model="tBasicInformationManagementForm.isStereoscopic">
                <Radio :label="0">???</Radio>
                <Radio :label="1">???</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="????????????" prop="surfaceHeight">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.surfaceHeight" style="width:100%;"
                           placeholder="?????????????????????"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="??????????????????" prop="isLabel">
              <RadioGroup v-model="tBasicInformationManagementForm.isLabel">
                <Radio :label="0">??????</Radio>
                <Radio :label="1">??????</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="????????????" prop="min">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.min" style="width:100%;"
                           placeholder="?????????????????????"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="????????????" prop="max">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.max" style="width:100%;"
                           placeholder="?????????????????????"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="????????????" prop="isDashLien">
              <RadioGroup v-model="tBasicInformationManagementForm.isBorder">
                <Radio :label="0">???</Radio>
                <Radio :label="1">???</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="????????????" prop="color">
              <ColorPicker v-model="tBasicInformationManagementForm.color" :recommend="true" format="hex"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="????????????" prop="width">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.width" style="width:100%;"
                           placeholder="?????????????????????"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="???????????????" prop="isDashLien">
              <RadioGroup v-model="tBasicInformationManagementForm.isDashLien">
                <Radio :label="0">???</Radio>
                <Radio :label="1">???</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="??????????????????" prop="dashLength">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.dashLength" style="width:100%;"
                           placeholder="???????????????????????????"></InputNumber>
            </FormItem>
          </Col>

          <div>
            <Col span="8">
              <FormItem label="????????????" prop="isDashLien">
                <RadioGroup v-model="tBasicInformationManagementForm.isGlow">
                  <Radio :label="0">???</Radio>
                  <Radio :label="1">???</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="????????????" prop="glow">
                <InputNumber :min="0.1" :max="1" :step="0.1" v-model="tBasicInformationManagementForm.glow"
                             @on-blur="changeGlow" style="width:100%;" placeholder="?????????????????????"></InputNumber>
              </FormItem>
            </Col>
          </div>
        </div>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">??????</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">??????</Button>
    </div>
  </Modal>
</template>
<script>
  import {updateByIds} from '@/api/zhxc/tBasicInformationManagement/tBasicInformationManagement'
  import myWangEditor from "../components/myWangEditor";
  import mapLabel from "@/views/gismap/components/mapLabel";
  import {getDictDataByType} from '@/api/index';
  import {getDepts} from "@/api/system/dept"

  export default {
    name: "batchUpdateTBasicInformationManagement",
    components: {
      mapLabel,
      myWangEditor
      // myQuillEditor
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TBasicInformationManagementId: {
        type: String
      },
      modalTitle: {
        type: String
      },
      menuId: {
        type: Number
      },
      menuName: {
        type: String
      }
    },
    data() {
      return {
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        tBasicInformationManagementForm: {
          name: null,
          position: null,
          description: null,
          isDashLien:null,
          width: null,
          color: '',
          dashLength: null,
          polygonColor: '',
          alpha: null,
          surfaceHeight: null,
          isDisplayState: 1,
          isStereoscopic: 0,
          menuId: this.menuId,
          menuName: this.menuName,
          areaType: null,
          isBorder: null,
          isGlow: null,
          glow: null,
          isLabel:null,
          max: null,
          min: null,
        },
        tBasicInformationManagementFormRule: this.getTBasicInformationManagementFormRule(),
        pointArr: [],
        showMap: false,
        selectType: 'Polygon',
        rgbaColor: '',
        areaTypeArr: [],
        quyuname:"",
        departVisible:false,
      }
    },
    methods: {
       // ??????????????????
      getlist() {
        getDepts({ enabled: true }).then(res => {
          this.areaTypeArr = this.getTreeData(res.content);
          this.areaTypeArr.unshift({
              title:'??????',
              value:'0',
              expand:false,
          })
        })
      },
      //??????tree???????????????
      getTreeData(data) {
                if (data) {
                    for (let i in data) {
                        var item = data[i];
                        data[i].title = data[i].label;
                        data[i].value = data[i].id;
                        data[i].expand = true;
                        if (data[i].children) {
                            data[i].children = this.getTreeData(data[i].children);
                        }
                    }
                }
                return data;
            },
      // ????????????
      selectDownitem(value) {
          if (Array.isArray(value) && value.length > 0) {
              this.tBasicInformationManagementForm.areaType = value[0].value;
              this.quyuname = value[0].title;
              this.departVisible = false;
          }
      },
      //???????????? ????????????
      changeGlow() {
        if (this.tBasicInformationManagementForm.glow || this.tBasicInformationManagementForm.glow != 0) {
          this.tBasicInformationManagementForm.glow = this.getFloat(this.tBasicInformationManagementForm.glow, 1);
        } else {
          this.tBasicInformationManagementForm.glow = null;
        }
      },
      //?????????????????????????????????
      getFloat(num, n) {
        n = n ? parseInt(n) : 0;
        if (n <= 0) {
          return Math.round(num);
        }
        num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //????????????
        num = Number(Number(num).toFixed(n)); //????????????
        return num;
      },
      //???????????????????????????rgba??????
      colorTransform(color, alpha) {
        // 16????????????????????????
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // ????????????????????????
        if (color != '' && color) {
          color = color.toLowerCase();
          if (reg.test(color)) {
            // ???????????????????????????????????????????????????#fff => #ffffff
            if (color.length === 4) {
              let colorNew = "#";
              for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
              }
              color = colorNew;
            }
            // ?????????????????????????????????RGB
            let colorChange = [];
            for (let i = 1; i < 7; i += 2) {
              colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
            }
            if (alpha == 0 || alpha == null) {
              return "rgba(" + colorChange.join(",") + "," + 0 + ")";
            } else {
              return "rgba(" + colorChange.join(",") + "," + alpha + ")";
            }
          } else {
            return color;
          }
        } else {
          return '';
        }

      },
      //?????????????????????????????????
      getFloat(num, n) {
        n = n ? parseInt(n) : 0;
        if (n <= 0) {
          return Math.round(num);
        }
        num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //????????????
        num = Number(Number(num).toFixed(n)); //????????????
        return num;
      },
      //????????? ????????????
      changeAlpha() {
        if (this.tBasicInformationManagementForm.alpha || this.tBasicInformationManagementForm.alpha != 0) {
          this.tBasicInformationManagementForm.alpha = this.getFloat(this.tBasicInformationManagementForm.alpha, 1);
        } else {
          this.tBasicInformationManagementForm.alpha = null;
        }
      },
      //???????????????
      getPosition(obj, type) {
        if (obj.flatCoordinates) {
          this.tBasicInformationManagementForm.position = JSON.stringify(obj.flatCoordinates);
        } else {
          this.tBasicInformationManagementForm.position = '';
        }
      },
      //????????????
      checkMap() {
        if (this.tBasicInformationManagementForm.position) {
          this.pointArr = JSON.parse(this.tBasicInformationManagementForm.position);
        } else {
          this.pointArr = [];
        }
        this.rgbaColor = this.colorTransform(this.tBasicInformationManagementForm.polygonColor, this.tBasicInformationManagementForm.alpha);
        this.showMap = true;
      },
      handelSubmit() {
        this.$refs['tBasicInformationManagementForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.tBasicInformationManagementForm.max && this.tBasicInformationManagementForm.min) {
              if (this.tBasicInformationManagementForm.max < this.tBasicInformationManagementForm.min) {
                this.loading = false;
                this.$Message.error('????????????????????????????????????');
                return;
              }
            }
            this.tBasicInformationManagementForm.id = null;
            let ids = [];
            this.$parent.selectList.forEach(function (e) {
              ids.push(e.id);
            });
            if(this.tBasicInformationManagementForm.color==''){
              this.tBasicInformationManagementForm.color = null;
            }
            if(this.tBasicInformationManagementForm.polygonColor==''){
              this.tBasicInformationManagementForm.polygonColor = null;
            }
            this.tBasicInformationManagementForm.ids = ids
            updateByIds(this.tBasicInformationManagementForm).then(res => {
              this.loading = false;
              if (res && res.code == 200) {
                this.$Message.success('????????????');
                this.closeModal(false);
                this.$emit('handleSearch');
              } else {
                this.$Message.error(res.msg);
              }

            }).catch(err => {
              this.loading = false;
            })
          } else {
            this.loading = false;
            this.$Message.error('????????????????????????');
          }
        });
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tBasicInformationManagementForm = {
          name: null,
          position: null,
          description: null,
          isDashLien:null,
          width: null,
          color: null,
          dashLength: null,
          polygonColor: null,
          alpha: null,
          surfaceHeight: null,
          isDisplayState: null,
          isStereoscopic:null,
          menuId: null,
          menuName: null,
          areaType: null,
          isBorder: null,
          isGlow: null,
          glow: null,
          isLabel:null,
          max: null,
          min: null,
        };
        this.quyuname='';
        this.departVisible=false;
        this.getlist();
      },
      getTBasicInformationManagementFormRule() {
        return {
          name: [
            {required: false, message: '???????????????????????????', trigger: 'blur'},
            {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
          ],
          color: [
            {required: false, message: '???????????????????????????', trigger: 'blur'},
          ],
          alpha: [
            {type: 'number', message: '??????????????????????????????', trigger: 'blur', pattern: /\b(0(\.\d{1})?)|1\b/}
          ],
          surfaceHeight: [
            {type: 'integer', required: false, message: '???????????????????????????', trigger: 'blur'},
            {type: 'integer', message: '????????????????????????', trigger: 'blur'}
          ],
          areaType: [
            {required: false, message: '???????????????????????????', trigger: 'blur', pattern: /.+/},
          ],
          glow: [
            {required: false, message: '???????????????????????????', trigger: 'blur', pattern: /.+/},
          ]
        }
      },
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (val) {
          this.$refs['tBasicInformationManagementForm'].resetFields();
        } else {
          this.closeModal(val);
        }
      }
    }
  }
</script>
