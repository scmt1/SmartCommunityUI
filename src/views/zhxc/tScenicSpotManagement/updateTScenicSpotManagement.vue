<style lang="less">
  .tScenicSpotManagement {
    .ivu-select {
      width: 189px;
    }

    .ivu-input-wrapper {
      width: 79%;
    }

    .ivu-input-number {
      width: 189px;
    }

    .ivu-modal-body {
      height: 500px !important;
      overflow-y: auto;
    }

    .element.style {
      float: left;
      width: 800px;
    }

    .myWangEditor {
      line-height: normal !important;
      height: 400px;
      float: left;
      width: 96%;
    }

    .ql-editor {
      min-height: 150px;
    }

    .ivu-color-picker-rel {
      width: 189px;
    }

    .myWangEditor {
      width: calc(100% - 135px);
      position: absolute;
      left: 100px;
    }

    .myWangEditorLabel {
      width: 100px;
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
        right: 50px;
        top: 0px;
    }

    .addDepartUser-depart .ivu-select-dropdown{
        top: 30px !important;
        padding: 5px;
        min-width: 188.53px;
        left: -188.53px !important;
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
        width: 178.53px;
    }

    .addDepartUser-depart .ivu-tree ul li{
        margin: 2px 0;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" :width="1100" class="tScenicSpotManagement">
    <Form ref="tScenicSpotManagementForm" :label-width="100" :model="tScenicSpotManagementForm"
          style="margin-right: 35px;"
          :rules="tScenicSpotManagementFormRule">
      <Row>
        <Col span="8">
          <FormItem label="????????????" prop="name">
            <Input v-bind:disabled="disabled" :maxlength=50 type="text" v-model="tScenicSpotManagementForm.name"
                   placeholder="???????????????"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="????????????" prop="menuName">
            <Input type="text" v-model="tScenicSpotManagementForm.menuName" disabled readonly/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="????????????" prop="pointType" class="addDepartUser-depart">
              <Input v-model="areaName" placeholder="?????????" readonly />
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
          <FormItem label="????????????" prop="display">
            <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.isScenery">
              <Radio label="1">???</Radio>
              <Radio label="0">???</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="????????????" prop="url" v-if="tScenicSpotManagementForm.isScenery == 1 ">
            <Input v-bind:disabled="disabled" :maxlength=50 type="text" v-model="tScenicSpotManagementForm.url"
                   placeholder="?????????url"/>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="???????????????" prop="display">
            <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.display">
              <Radio label="1">???</Radio>
              <Radio label="0">???</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <div v-if="tScenicSpotManagementForm.display=='1'">
          <Col span="8">
            <FormItem label="?????????"
                      prop="position">
              <Input :maxlength=50 v-model="tScenicSpotManagementForm.position" placeholder="??????????????????" icon="md-map"
                     @on-click="checkMap"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="??????????????????">
              <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.isShowIcon"
                          @on-change="iconShowChange">
                <Radio label="1">???</Radio>
                <Radio label="0">???</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tScenicSpotManagementForm.isShowIcon== '1' ">
            <FormItem label="??????" prop="icon">
              <icon-choose v-model="tScenicSpotManagementForm.icon"></icon-choose>
            </FormItem>
          </Col>

          <Col span="8" v-if="tScenicSpotManagementForm.isShowIcon== '1' ">
            <FormItem label="????????????">
              <InputNumber :min="0" v-model="tScenicSpotManagementForm.height" placeholder="???????????????????????????"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="??????????????????">
              <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.titleShow"
                          @on-change="titleShowChange">
                <Radio label="1">???</Radio>
                <Radio label="0">???</Radio>
              </RadioGroup>
            </FormItem>
          </Col>

          <Col span="8" v-if="tScenicSpotManagementForm.titleShow == '1'">
            <FormItem label="????????????" prop="backgroundColor">
              <ColorPicker v-model="tScenicSpotManagementForm.backgroundColor" format="rgb"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="????????????" v-if="tScenicSpotManagementForm.titleShow == '1' " prop="min">
              <InputNumber :min="0" v-model="tScenicSpotManagementForm.min" placeholder="???????????????????????????"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="????????????" v-if="tScenicSpotManagementForm.titleShow == '1' " prop="max">
              <InputNumber :min="0" v-model="tScenicSpotManagementForm.max" placeholder="???????????????????????????"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="????????????" v-if="tScenicSpotManagementForm.titleShow == '1'" prop="namePosition">
              <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.namePosition">
                <Radio label="1">???</Radio>
                <Radio label="0">???</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </div>
      </Row>
    </Form>
    <Row>
      <label class="myWangEditorLabel">????????????</label>
      <myWangEditor class="myWangEnditor" :editorContent="tScenicSpotManagementForm.describes"
                    ref="myWangEditor"></myWangEditor>
    </Row>
    <div slot="footer">
      <Button type="text" @click="show=false">??????</Button>
      <Button type="primary"  @click="previewClick">??????</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">??????</Button>
    </div>
    <!-- ???????????? -->
    <plot v-model="showMap" modalTitle="???????????????" :menuId="this.menuIdMap.toString()" @resultPoint="getPosition"
          divId="TScenicSpotManagement"
          :objData="pointArr" :iconPath="tScenicSpotManagementForm.icon" :selectType="selectTypee"></plot>
    <!-- ???????????? -->
    <preview v-model="showPreview" :geometry-type="geometryType" map-key="updateTScenicSpotManagement" :feature="feature"></preview>
  </Modal>
</template>
<script>
    import {
        addTScenicSpotManagement,
        updateTScenicSpotManagement,
        getTScenicSpotManagement
    } from '@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement'
    import {getDictDataByType} from '@/api/index';
    import myWangEditor from "../components/myWangEditor";
    import IconChoose from "./icon-choose";
    import {formartDate, nginxUrl} from '@/api/tools/tool'
    import plot from "@/views/gismap/components/mapLabel";
    import preview from "../components/preview";
    import {getDepts} from "@/api/system/dept"

    export default {
        name: "updateTScenicSpotManagement",
        components: {
            plot,
            IconChoose,
            myWangEditor,
            preview
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TScenicSpotManagementId: {
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
            },
        },
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                menuIdMap: '',
                loading: true,
                disabled: false,
                editorContent: '',
                pointArr: [],
                tScenicSpotManagementForm: {
                    height: null,
                    menuId: null,
                    menuName: '',
                    icon: '/img/scenicSpotIcon/3.png',
                    isScenery: "0",
                    namePosition: '1',
                    pointType: '',
                    backgroundColor: '',
                    display: "0",
                    titleShow: "1",
                    isShowIcon: "1",
                    min: 0,
                    max: 8000,
                    name: '',
                    position: '',
                    url: '',
                    describes: '',
                },
                PointPriority: [],
                areaTypeArr:[],
                showMap: false,
                selectTypee: 'Point',
                tScenicSpotManagementFormRule: this.getTScenicSpotManagementFormRule(),
                showPreview:false,//????????????????????????
                geometryType:'point',//??????????????????????????????????????????
                feature:null,//?????????????????????????????????
                areaName:"",//????????????
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
                    this.tScenicSpotManagementForm.pointType = value[0].value;
                    this.areaName = value[0].title;
                    this.departVisible = false;
                }
            },
            //??????????????????
            iconShowChange(e) {
                if (e == "0" && this.tScenicSpotManagementForm.titleShow == "0") {
                    this.tScenicSpotManagementForm.display = "0";
                    this.tScenicSpotManagementForm.isShowIcon = "1";
                    this.tScenicSpotManagementForm.titleShow = "1";
                }
            },
            //??????????????????
            titleShowChange(e) {
                if (e == "0" && this.tScenicSpotManagementForm.isShowIcon == "0") {
                    this.tScenicSpotManagementForm.display = "0";
                    this.tScenicSpotManagementForm.titleShow = "1";
                    this.tScenicSpotManagementForm.isShowIcon = "1";
                }
            },
            //??????poi?????????
            getPointPriority() {
                getDictDataByType('point_type').then(res => {
                    if (res && res.success) {
                        this.PointPriority = res.data;
                    }
                });
            },
            //???????????????
            getPosition(obj, type) {
                this.tScenicSpotManagementForm.position = JSON.stringify(obj.flatCoordinates);
            },
            //??????????????????
            checkMap() {
                if (this.tScenicSpotManagementForm.position) {
                    this.pointArr = JSON.parse(this.tScenicSpotManagementForm.position);
                }
                this.showMap = true;
            },
            menuIdData() {
                if (this.modalTitle == "??????") {
                    this.menuIdMap = this.menuId;
                }
            },
            handelSubmit() {
                this.$refs['tScenicSpotManagementForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        // let editorContent = this.$refs.myQuillEditor.getEditorContent();
                        let editorContent = this.$refs.myWangEditor.getEditorData();
                        this.tScenicSpotManagementForm.describes = editorContent;
                        if (this.tScenicSpotManagementForm.min && this.tScenicSpotManagementForm.max) {
                            if (this.tScenicSpotManagementForm.min > this.tScenicSpotManagementForm.max) {
                                this.loading = false;
                                this.$Message.error('???????????????????????????????????????');
                                return;
                            }
                        }
                        if (this.TScenicSpotManagementId != null && this.TScenicSpotManagementId.trim().length > 0) {
                            this.tScenicSpotManagementForm.id = this.TScenicSpotManagementId;
                            updateTScenicSpotManagement(this.tScenicSpotManagementForm).then(res => {
                                this.loading = false;
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('????????????');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                            })
                        } else {
                            addTScenicSpotManagement(this.tScenicSpotManagementForm).then(res => {
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('????????????');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                            })
                        }
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
                this.imageUrlList = [];
                this.PointPriority = [];
                this.tScenicSpotManagementForm = {
                    menuId: this.menuId,
                    menuName: this.menuName,
                    height: null,
                    icon: '',
                    isShowIcon: "1",
                    titleShow: "1",
                    max: 8000,
                    min: 0,
                    pointType: '',
                    backgroundColor: '',
                    isScenery: '0',
                    display: "0",
                    namePosition: '1',
                    name: '',
                    position: '',
                    url: '',
                    describes: '',
                };
                this.areaName='';
                this.departVisible=false;
                this.getlist();
            },
            getTScenicSpotManagementFormRule() {
                return {
                    name: [
                        {required: true, message: '?????????????????????', trigger: 'blur'},
                        {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '?????????????????????', trigger: 'blur'},
                        {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                    ],
                    pointType: [
                        {required: true, message: '???????????????????????????', trigger: 'blur', pattern: /.+/},
                    ],
                    // titleShow: [
                    //   {required: true, message: '????????????????????????', trigger: 'blur'},
                    //   {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                    // ],
                    namePosition: [
                        {required: true, message: '???????????????????????????', trigger: 'blur'},
                        {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                    ],
                    display: [
                        {required: true, message: '??????????????????????????????', trigger: 'blur'},
                        {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: 'url???????????????', trigger: 'blur'},
                        {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                    ],
                    icon: [
                        {required: true, message: '?????????????????????', trigger: 'blur'},
                        {type: 'string', max: 255, message: '????????????????????????255???', trigger: 'blur'}
                    ],
                    isScenery: [
                        {required: true, message: '???????????????????????????', trigger: 'blur'},
                        {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                    ],
                }
            },
            //??????????????????
            previewClick(){
                this.showPreview = true;
                this.geometryType = "point";
                this.feature = this.tScenicSpotManagementForm;
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.initForm();
                this.getPointPriority();
                this.menuIdData();
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (this.editTitle == "??????") {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
                if (val) {
                    this.$refs['tScenicSpotManagementForm'].resetFields();
                    if (this.TScenicSpotManagementId != null && this.TScenicSpotManagementId.trim().length > 0) {
                        getTScenicSpotManagement({id: this.TScenicSpotManagementId}).then(res => {
                            if (res && res.code == 200) {
                                this.tScenicSpotManagementForm.backgroundColor = res.data.backgroundColor;
                                this.tScenicSpotManagementForm.namePosition = res.data.namePosition;
                                this.tScenicSpotManagementForm.titleShow = res.data.titleShow;
                                this.tScenicSpotManagementForm.menuName = res.data.menuName;
                                this.tScenicSpotManagementForm.min = res.data.min;
                                this.tScenicSpotManagementForm.max = res.data.max;
                                this.tScenicSpotManagementForm.pointType = res.data.pointType;
                                /*if(res.data.isShowIcon){
                                  this.tScenicSpotManagementForm.isShowIcon = res.data.isShowIcon.toString();
                                }*/
                                if(res.data.pointType=="0"){
                                    this.pointType ="??????"
                                }else{
                                  this.areaName = res.data.typeName;
                                }
                                this.tScenicSpotManagementForm.isShowIcon = res.data.isShowIcon + '';
                                this.tScenicSpotManagementForm.icon = res.data.icon;
                                this.tScenicSpotManagementForm.height = res.data.height;
                                this.tScenicSpotManagementForm.display = res.data.display;
                                this.tScenicSpotManagementForm.name = res.data.name;
                                this.tScenicSpotManagementForm.isScenery = res.data.isScenery;
                                this.tScenicSpotManagementForm.position = res.data.position;
                                this.tScenicSpotManagementForm.url = res.data.url;
                                this.tScenicSpotManagementForm.describes = res.data.describes;
                                if (this.modalTitle == "??????") {
                                    this.menuIdMap = res.data.menuId;
                                }

                            } else {
                                this.$Message.error(res.msg);
                            }
                        });
                    }
                } else {
                    this.closeModal(val);
                }
            }
        }
    }
</script>
