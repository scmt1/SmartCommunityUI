<style lang="less">
  .tPopulationlabel {
    .ivu-row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      /*margin-bottom: 2vh;*/
      margin-bottom: 0px;
    }
    .form-item-input {
      width: 200px;
    }
    .ivu-form .ivu-form-item-label {
      width: 120px;
    }
    .ivu-select {
      /*width: 178px;*/
    }
    .ivu-description-term{
      padding-bottom: 30px !important;
    }
    .ivu-form-item{
      /*margin-bottom: 0 !important;*/
    }

    .imageVideoView{
      height: 15vh;
      width: 8vw;
      /*border: 1px solid rgb(192,192,192);*/
    }
    .upImgView {
    }
    .textImageVideo{
      /*text-align: center;*/
      /*margin-top: 5.5vh*/
    }

    .imgWrap:hover .shadow {
      display: block;
      z-index: 3;
      width: 100%;
    }

    .ivu-select-dropdown-list {
      min-width: 100%;
      list-style: none;
      /*text-align: center;*/
    }

    .noImg {
      width: 150px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 20px;
      height: 140px;
      line-height: 93px;
      margin-top: 4px;
      text-align: center;
      color: #ccc;
      user-select: none;
      font-size: 12px;
      margin-left: 0px;
    }

    .ivu-form-item-error-tip {
      position: absolute;
      top: 100%;
      left: 0;
      line-height: 1;
      padding-top: 6px;
      color: #ed4014;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .imgWrap {
      position: relative;
      width: 150px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 20px;
      height: 140px;
      line-height: 93px;
      margin-top: 4px;
      text-align: center;
      color: #ccc;
      user-select: none;
      font-size: 12px;
      margin-left: 0px;
    }

    .img {
      /*width: 100%;*/
      /*height: 156px;*/
      width: 150px;
      height: 140px;
    }

    .textImageVideoNo{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .ivu-form-item-content {
      position: relative;
      line-height: 27px;
      font-size: 14px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tPopulationlabel" :width="400" :draggable="false">
    <Form ref="tPopulationlabelForm" :model="tPopulationlabelForm" :rules="tPopulationlabelFormRule" :label-width="90">

      <Row>
        <Col span="24">
          <FormItem label="????????????" prop="name">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tPopulationlabelForm.name" placeholder="???????????????"/>
          </FormItem>
          <div v-if="!addFlag">
            <FormItem label="????????????" v-if="isNotEdit">
              <TreeSelect v-model="tPopulationlabelForm.pid" disabled :data="pidPriority" />
            </FormItem>
            <FormItem label="????????????" v-if="!isNotEdit">
              <TreeSelect v-model="tPopulationlabelForm.pid" disabled :data="pidPriority" />
            </FormItem>
          </div>
          <FormItem label="????????????" prop="isLabel">
            <RadioGroup v-bind:disabled="disabled" v-model="tPopulationlabelForm.isLabel">
              <Radio v-bind:disabled="disabled" :label="'0'">??????</Radio>
              <Radio v-bind:disabled="disabled" :label="'1'">??????</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">??????</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit" v-if="!disabled">??????</Button>
    </div>
  </Modal>
</template>
<script>
  import {
    addTPopulationlabel,
    updateTPopulationlabel,
    getTPopulationlabel,
    queryTPopulationlabelTreeByPage,
  } from '@/api/zhsq/tPopulationlabel/tPopulationlabel'
  import {getDictDataByType} from '@/api/index';
  import {uploadImg} from '@/api/utils';
  import {formartDate} from '@/api/tools/tool'
  import uploadHeaderImg from '@/components/uploadHeaderImg'

  export default {
    name: "updateTPopulationlabel",
    components: {
      uploadHeaderImg
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      addFlag: {
        type: Boolean,
        default: true
      },
      TPopulationlabelId: {
        type: String
      }
      ,TPopulationlabelParentName: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        isShow: 0,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        pidPriority: [],
        enabledRadio: [],
        tPopulationlabelForm: {
          pid:'',
          name:'',
          isLabel: '',
        },
        imgFiles: [],
        imageUrlList: [],
        imageUrl: '',
        imgShow: false,
        departVisible: false,
        selectModel: "",
        tPopulationlabelFormRule: this.getTPopulationlabelFormRule(),
        isNotEdit:true,
        /*??????????????????(??????)*/
        pageNumber: 1, // ????????????
        pageSize: 10, // ????????????
        queryName: '', // ?????? ????????????
        startDate: null,//???????????? ????????????
        endDate: null,//???????????? ????????????
      }
    },
    methods: {
      onFileUploadSuccess(res, file) {
        console.log('?????????????????????????????????');
        console.log(res.data);
        this.tPopulationlabelForm.imgUrl = res.data;
        // this.imageUrl = 'http://192.168.1.147:8013' + res.data;
        // this.imageUrl = 'http://223.87.166.240:8016' + res.data;
        this.imageUrl = res.data;
      },
      onFileUploadError(file) {
        this.$Message.error('?????????????????????');
      },
      onRemovePath() {
        this.tPopulationlabelForm.imgUrl = '';
      },
      //???????????? ????????????
      fileUpload() {

        const _this = this;
        const inputFile = this.$refs.filElem.files[0];
        if (inputFile) {
          const reader = new FileReader();
          reader.readAsDataURL(inputFile);
          reader.onload = () => {
            _this.imageUrlList = [];
            _this.imageUrlList.push(reader.result);
            _this.imgShow = true;
            _this.tPopulationlabelForm.imgUrl = reader.result;
          }


        } else {
          this.$Message.error('???????????????')
        }
        this.$refs.filElem.value = null
      },
      //???????????? ????????????
      fileUploadInto(){
        let _this = this;
        const formData = new FormData()
        formData.append('multipartFile', _this.imageUrlList[0])
        // formData.append('propertyId', this.$store.getters.propertyInfo.id)

        uploadImg(formData).then(res => {
          if (res && +res.code === 200) {
            _this.imageUrlList = _this.imageUrlList.concat(res.object)
          }
        })
      },
      previewImg(imgFile) {
        // local preview

        this.imageUrlList = this.imageUrlList.concat(imgFile);
      },
      //????????????
      choiceFile() {
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
      },
      // ????????????
      handleView() {
        const viewer = this.$el.querySelector('.imgWrap').$viewer;
        viewer.show();
      },
      // ????????????
      handleRemove() {
        this.imageUrlList = [];
        this.tPopulationlabelForm.imgUrl = '';
      },
      // getRegionPriority() {
      //   getDept('').then(res => {
      //     if (res.content) {
      //       this.regionPriority = this.getTreeData(res.content);
      //     }
      //   });
      //   // getDictDataByType('dept_name').then(res => {
      //   // 	if (res && res.success) {
      //   // 		 this.regionPriority = this.getTreeData(res.data);
      //   // 	}
      //   // });
      // },
      //??????????????????
      getPidPriority() {
        let _this = this;
        // getDept('').then(res => {
        //   if (res.content) {
        //     this.pidPriority = this.getTreeData(res.content);
        //   }
        // });
        queryTPopulationlabelTreeByPage({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.queryName,
          startDate: this.startDate,
          endDate: this.endDate,
        }).then(res => {
          if(res && res.success) {
            if (res.data && res.data.records) {
              _this.pidPriority = _this.getTreeData(res.data.records);
            }
          }
        }).catch(err => {
          this.loading = false
        });
      },
      //????????????
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
      //??????????????????
      getEnabledRadio() {
        getDictDataByType('dept_status').then(res => {
          if (res && res.success) {
            this.enabledRadio = res.data;
          }
        });
      },
      //??????
      handelSubmit() {
        // this.fileUploadInto();
        // console.log('????????????');
        // console.log(this.imageUrlList);
        this.loading = true;
        this.$refs['tPopulationlabelForm'].validate((valid) => {
          if (valid) {
            if (this.TPopulationlabelId != null && this.TPopulationlabelId.trim().length > 0) {
              this.tPopulationlabelForm.id = this.TPopulationlabelId;
              // this.tPopulationlabelForm.pid = '';
              updateTPopulationlabel(this.tPopulationlabelForm).then(res => {
                this.loading = false;
                if (res!=null) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('????????????');
                } else {
                  this.$Message.error('????????????');
                }
              })
            } else {
              if(!this.tPopulationlabelForm.pid){
                this.tPopulationlabelForm.pid = '0';
              }
              if(!this.tPopulationlabelForm.isLabel){
                this.tPopulationlabelForm.isLabel = '1';
              }
              addTPopulationlabel(this.tPopulationlabelForm).then(res => {
                this.loading = false;
                if (res) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('????????????');
                } else {
                  this.$Message.error('????????????');
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
      //???????????????
      initForm() {
        this.tPopulationlabelForm = {
          pid:'',
          name:'',
          isLabel: '',
        };
        this.selectModel = "";
        this.departVisible = false;
      },
      getTPopulationlabelFormRule() {
        return {
          name: [
            {required: true, message: '???????????????????????????', trigger: 'blur'},
            {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
          ],
          pid: [
            {required: true, message: '???????????????????????????', trigger: 'blur'},
            // {required: false, pattern: /^[0-9]+$/, message: '???????????????????????????', trigger: 'blur'},
          ],
          isLabel: [
            {required: true, message: '???????????????????????????', trigger: 'blur'},
          ],
          /*imgUrl: [
            {required: true, message: '?????????????????????', trigger: 'blur'},
          ],*/
          // enabled: [
          //   {required: true, message: '?????????????????????', trigger: 'blur', pattern: /.+/},
          // ],
        }
      },
      //?????????????????????
      handleCheckChange(data) {

        this.deptForm.pid = data[0].value;
        this.departVisible = false;
        this.selectModel = data[0].title;
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.isShow = 0;
        this.imageUrlList = [];
        this.imageUrl = '';
        this.getPidPriority(),
          // this.getEnabledRadio(),
          this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "??????") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (this.editTitle == "????????????") {
          this.tPopulationlabelForm.pid = this.TPopulationlabelId;
          this.TPopulationlabelId = null;
        }
        this.isNotEdit = true;
        if (val) {
          this.$refs['tPopulationlabelForm'].resetFields();
          if (this.TPopulationlabelId != null && this.TPopulationlabelId.trim().length > 0) {
            this.isNotEdit = false;
            getTPopulationlabel({id: this.TPopulationlabelId}).then(res => {
              if (res!=null) {
                this.tPopulationlabelForm.name = res.data.name;
                this.tPopulationlabelForm.pid = res.data.pid;
                this.tPopulationlabelForm.isLabel = res.data.isLabel;
              } else {
                this.$Message.error('????????????');
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
