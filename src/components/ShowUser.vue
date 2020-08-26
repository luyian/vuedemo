<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="6">
        <img id="photo" src="../assets/logo.png">
      </el-col>
      <el-col :span="18" class="content_right">
        <el-row :gutter="20">
          <el-col :span="5">
            <span id="name">许鹏飞</span>
          </el-col>
           <el-col :span="4">
            <span style="color:#bbb; font-weight:bold; line-height:32px;"><i class="el-icon-map-location"></i> 贵州省 贵阳</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <div style="margin-top:10px;">
              <span style="color:deepskyblue; font-size:20px">Gerely Fly</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col> 
            <div id="gender">
              <span>
                男 <i class="el-icon-male" style=""></i>
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="18">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><i class="el-icon-office-building"></i> 单位</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-user"></i> 关于</el-menu-item>
          </el-menu>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-show="showCompany" class="show" :span="12">
            <el-row class="baseTitle">
              <span>基本信息</span>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <span class="label">职责: </span>
              </el-col>
              <el-col :span="8">
                <span class="content">警航</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <span class="label">入职时间: </span>
              </el-col>
              <el-col :span="8">
                <span class="content">2019-11-08</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <span class="label">组织机构: </span>
              </el-col>
              <el-col :span="8">
                <span class="content">贵州省公安厅</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <span class="label">职称: </span>
              </el-col>
              <el-col :span="8">
                <span class="content">技术员</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <span class="label">角色: </span>
              </el-col>
              <el-col :span="8">
                <span class="content">公安厅</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-show="showAbout" class="show">
            showAbout
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1',
      showCompany: true,
      showAbout: false,
      dataForm: {orgId: '1234'},
    };
  },
  methods: {
    handleSelect(key) {
      if (key === "1") {
        this.showAbout = false;
        this.showCompany = true;
      } else {
        this.showCompany = false;
        this.showAbout = true;
      }
    }
  },
  computed: {
    
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#photo {
    width: 160px;
    height: 180px;

}
.content_right {
    text-align: left;
}
#name {
  float: left;
  font-size: 24px;
  font-weight: bold;
  margin-right: 80px;
}
#gender {
  text-align: center;
  font-weight: bold;
  color: rgb(74, 99, 236);
  background-color: rgba(125, 192, 219, 0.2);
  line-height: 35px;
  width: 90px;
  height: 35px;
  border-radius: 5px;
  margin: 40px 0 30px 0;
}
.el-col .el-menu-item {
  font-weight: bold;
  line-height: 70px;
}
.show {
  margin-top: 20px;
}
.el-row .baseTitle {
  font-size: 16px;
  color: #bbbbbb;
}
.show .el-row {
  margin: 25px 0;
}
.el-row .label {
  font-size: 18px;
  letter-spacing: 2px;
}
.el-row .content {
  font-size: 16px;
  color: #777;
  letter-spacing: 2px;
}
</style>