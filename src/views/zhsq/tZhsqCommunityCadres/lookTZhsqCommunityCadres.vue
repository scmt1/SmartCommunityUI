<style lang="less">
  .tZhsqCommunityCadresLook {
    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .img {
      width: 85px;
      margin-top: 10px;
      border: 1px dashed #ccc;
      padding: 2px;
      display: block;
      height: 93px;
    }

    .noImg {
      width: 80px;
      height: 100px;
      border: 1px dashed rgb(204, 204, 204);
      margin: 10px 0 0 30px;
      line-height: 93px;
      text-align: center;
      color: #ccc;
      user-select: none;
      height: 93px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px !important;
    }

    .ivu-form-item .ivu-form-item-content .item_span {
      width: 700px;
      margin-top: 6px;
      height: 40px !important;
      line-height: 150%;
      word-break: break-all;
      overflow-x: hidden;
      overflow-y: auto;
      border: 1px solid rgb(222, 222, 222);
    }
    .ivu-tabs-nav-wrap {
      text-align: center !important;
    }

    .ivu-tabs-nav-scroll {
      display: inline-block !important;
    }

    .ivu-tabs-nav {
      padding-left: 0;
      margin: 0;
      float: left;
      list-style: none;
      box-sizing: border-box;
      position: relative;
      transition: transform .5s ease-in-out;
      border-radius: 16px;
      box-shadow: 0px 4px 8px 0px #f8f8f9;
      border: 1px solid #f8f8f9;
      background: #f8f8f9;
      /* margin-bottom: 44px; */
    }

    .ivu-tabs-bar {
      border-bottom: 0px solid #dcdee2;
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
      border: none;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #676a6c;
      background: #f8f8f900;
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
      background: #3083f2;
      border-radius: 16px;
      box-shadow: 0px 4px 8px 0px rgba(48, 131, 242, 0.3);

      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #ffffff;
    }
    .ivu-tabs .ivu-tabs-content-animated {
      margin-top: 10px;
    }

  }
</style>
<template>
  <Modal
    v-model="show"
    :title="editTitle"
    :mask-closable="false"
    width="900"
    height="600"
    class="tZhsqCommunityCadresLook"
  >
    <Tabs type="card">
      <TabPane label="????????????">
        <Form
          ref="tZhsqCommunityCadresForm"
          :model="tZhsqCommunityCadresForm"
          label-position="right"
          :label-width="90"
        >
          <Divider orientation="left" style="color:#2d8cf0;">????????????</Divider>
          <Row>
            <Col span="8">
            <Row>
              <FormItem label="??????" prop="name">
                {{ tZhsqCommunityCadresForm.name }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="????????????" prop="type">
                {{ tZhsqCommunityCadresForm.type }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="?????????" prop="phone">
                {{ tZhsqCommunityCadresForm.phone }}
              </FormItem>
            </Row>
            </Col>
            <Col span="8">
            <Row>
              <FormItem label="??????" prop="sex">
                {{ tZhsqCommunityCadresForm.sex }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="??????" prop="nation">
                {{ tZhsqCommunityCadresForm.nation }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="????????????" prop="fixedTelephone">
                {{ tZhsqCommunityCadresForm.fixedTelephone }}
              </FormItem>
            </Row>
            </Col>
            <Col span="8">
            <FormItem label="??????">
<!--              <div v-if="tZhsqCommunityCadresForm.headPortrait" v-viewer="{movable: true}">-->
<!--                <img :src="tZhsqCommunityCadresForm.headPortrait" class="img">-->
<!--              </div>-->
<!--              <div v-if="!tZhsqCommunityCadresForm.headPortrait" class="noImg">????????????</div>-->
              <div v-viewer="{movable: true}">
                <img v-if="tZhsqCommunityCadresForm.headPortrait" :src="tZhsqCommunityCadresForm.headPortrait" class="img">
                <img v-else src="/img/tx_wzp2.png" class="img">
              </div>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="????????????" prop="idCard">
              {{ tZhsqCommunityCadresForm.idCard }}
            </FormItem>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="????????????" prop="personalProfile">
              <p class="item_span">
                {{ tZhsqCommunityCadresForm.personalProfile }}
              </p>
            </FormItem>
            </Col>
          </Row>
          <Row>
          </Row>
          <Divider orientation="left" style="color:#2d8cf0;">??????&??????</Divider>
          <Row>
            <Col span="8">
            <FormItem label="????????????" filterable prop="houseStreet">
              {{ tZhsqCommunityCadresForm.streetName }}
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="????????????" filterable prop="houseCommunity">
              {{ tZhsqCommunityCadresForm.communityName }}
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="????????????" prop="department">
              {{ tZhsqCommunityCadresForm.department }}
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <FormItem label="????????????" prop="post">
              {{ tZhsqCommunityCadresForm.post }}
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="??????" filterable prop="postLevel">
              {{ tZhsqCommunityCadresForm.postLevel }}
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="????????????" prop="responsibilities" style="width: 100%">
              <p class="item_span">
                {{ tZhsqCommunityCadresForm.responsibilities }}
              </p>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </TabPane>
      <TabPane label="????????????">
        <Table ref="table" stripe :columns="columns" sortable="custom" :data="data" />
      </TabPane>
    </Tabs>
    <div slot="footer">
      <Button type="text" @click="show=false">??????</Button>
    </div>
  </Modal>
</template>
<script>
import {
  getTZhsqCommunityCadres,
  queryBasicResumeListByPersonId
} from '@/api/zhsq/tZhsqCommunityCadres/tZhsqCommunityCadres'
import { getDictDataByType } from '@/api/index'
import { formartDate, nginxUrl } from '@/api/tools/tool'
import {
  levelData,
  politicalData,
  postData,
  departmentData,
  sexData,
  nationData,
  streetData,
  communityData
} from '@/api/tools/zhsqSelectData'
import { getCommunity, getDictionary, getStreet, getPostData, getDepartmentData } from '../../../api'

export default {
  name: 'UpdateTZhsqCommunityCadres',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TZhsqCommunityCadresId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      left: 'left',
      show: this.value,
      editTitle: this.modalTitle,
      loading: false,
      tZhsqCommunityCadresForm: {
        name: '',
        sex: '',
        type: '',
        nation: '',
        idCard: '',
        phone: '',
        fixedTelephone: '',
        personalProfile: '',
        headPortrait: '',
        streetName: '',
        communityName: '',
        department: '',
        post: '',
        postLevel: '',
        responsibilities: '',
        imageIsUpdate: false
      },
      // ??????????????????
      sexArr: [],
      // ??????????????????
      nationArr: [],
      // ??????????????????
      departmentArr: [],
      // ????????????????????????
      politicalArr: [],
      // ??????????????????
      postArr: [],
      // ??????????????????
      levelArr: [],
      // ????????????
      imageIsUpdate: false,
      imageUrlList: [],

      data: [],
      columns: this.getBasicResumeColumns()
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        this.initForm()
        this.getSelectData()
        this.$refs['tZhsqCommunityCadresForm'].resetFields()
        if (this.TZhsqCommunityCadresId != null && this.TZhsqCommunityCadresId.trim().length > 0) {
          queryBasicResumeListByPersonId({ personId: this.TZhsqCommunityCadresId }).then(res => {
            if (res && res.success) {
              this.data = res.data
            }
          })

          getTZhsqCommunityCadres({ id: this.TZhsqCommunityCadresId }).then(res => {
            if (res && res.code == 200) {
              this.tZhsqCommunityCadresForm.name = res.data.name
              this.tZhsqCommunityCadresForm.sex = res.data.sex

              let filter = this.politicalArr.filter(item => item.number == res.data.type)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.type = filter[0].name
              }

              filter = this.nationArr.filter(item => item.number == res.data.nation)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.nation = filter[0].name
              }

              this.tZhsqCommunityCadresForm.idCard = res.data.idCard
              this.tZhsqCommunityCadresForm.phone = res.data.phone
              this.tZhsqCommunityCadresForm.fixedTelephone = res.data.fixedTelephone
              this.tZhsqCommunityCadresForm.personalProfile = res.data.personalProfile
              this.tZhsqCommunityCadresForm.headPortrait = res.data.headPortrait
              this.tZhsqCommunityCadresForm.streetName = res.data.streetName
              this.tZhsqCommunityCadresForm.communityName = res.data.communityName

              filter = this.departmentArr.filter(item => item.id == res.data.department)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.department = filter[0].name
              }

              filter = this.postArr.filter(item => item.id == res.data.post)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.post = filter[0].name
              }

              filter = this.levelArr.filter(item => item.number == res.data.postLevel)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.postLevel = filter[0].name
              }

              this.tZhsqCommunityCadresForm.responsibilities = res.data.responsibilities
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      } else {
        this.closeModal(val)
      }
    }
  },
  methods: {
    closeModal(val) {
      this.$emit('input', val)
    },
    initForm() {
      this.imageUrlList = []
      this.tZhsqCommunityCadresForm = {
        name: '',
        sex: '',
        type: '',
        nation: '',
        idCard: '',
        phone: '',
        fixedTelephone: '',
        personalProfile: '',
        headPortrait: '',
        streetName: '',
        communityName: '',
        department: '',
        post: '',
        postLevel: '',
        responsibilities: ''
      }
    },
    // ??????????????????
    getSelectData() {
      // ??????????????????
      getDictionary({ fieldName: 'nationData' }).then(res => {
        if (res && res.success) {
          this.nationArr = res.data
        }
      })

      // ????????????????????????
      getDictionary({ fieldName: 'politicalData' }).then(res => {
        if (res && res.success) {
          this.politicalArr = res.data
        }
      })

      // ??????????????????
      getDepartmentData({ type: 3, parentId: null }).then(res => {
        if (res && res.success) {
          this.departmentArr = res.data
        }
      })

      // ??????????????????
      getPostData({}).then(res => {
        if (res && res.success) {
          this.postArr = res.data
        }
      })
      // ??????????????????
      getDictionary({ fieldName: 'levelData' }).then(res => {
        if (res && res.success) {
          this.levelArr = res.data
        }
      })
    },

    // ??????????????????
    getBasicResumeColumns() {
      return [
        {
          title: '??????????????????',
          align: 'center',
          key: 'personName',
          tooltip: true,
          ellipse: true,
          sortable: false
        },
        {
          title: '??????????????????',
          key: 'startTime',
          sortable: false,
          align: 'center',
          tooltip: true,
          ellipse: true,
          width: 180
        },
        {
          title: '??????????????????',
          key: 'endTime',
          sortable: false,
          align: 'center',
          tooltip: true,
          ellipse: true,
          width: 180
        },
        {
          title: '????????????',
          align: 'center',
          key: 'department',
          sortable: false,
          render: (h, params) => {
            const filter = this.departmentArr.filter(item => item.id == params.row.department)
            if (filter && filter.length > 0) {
              return h('Tooltip', {
                props: {
                  content: filter[0].name,
                  placement: 'bottom',
                  transfer: true
                }
              }, filter[0].name)
            }
          }
        },
        {
          title: '????????????',
          align: 'center',
          key: 'post',
          sortable: false,
          render: (h, params) => {
            const filter = this.postArr.filter(item => item.id == params.row.post)
            if (filter && filter.length > 0) {
              return h('Tooltip', {
                props: {
                  content: filter[0].name,
                  placement: 'bottom',
                  transfer: true
                }
              }, filter[0].name)
            }
          }
        }
      ]
    }
  }
}
</script>
