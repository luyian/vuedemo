<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/userList">用户列表</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="userAddVisible=true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyUser(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2,4,6]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="userAddVisible" width="30%" @close="addDialogClose">
      <el-form
        ref="addFormRef"
        :model="addForm"
        label-width="70px"
        size="small"
        :rules="addFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userAddVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addSubmit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- update -->
    <el-dialog title="编辑用户信息" :visible.sync="userEditVisible" width="30%" @close="editDialogClose">
      <el-form
        ref="editFormRef"
        :model="modifyForm"
        label-width="70px"
        size="small"
        :rules="modifyFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="modifyForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="modifyForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="modifyForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="modifySubmit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 4,
      },
      userList: [],
      total: 0,
      userAddVisible: false,
      userEditVisible: false,
      addForm: {},
      modifyForm: {},
      addFormRules: {
        username: {required: true, message: "请输入用户名", trigger: 'blur'},
        password: {required: true, message: "请输入密码", trigger: 'blur'},
      },
      modifyFormRules: {},
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const {data: res} = await this.$http.get(
        'users', 
        {params: this.queryInfo}
      )
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败")
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    //监听页数改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页码切换
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //监听用户状态改变
    async userStateChange(userInfo) {
      //发送put请求，改变后台数据的状态
      const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
      if(res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败！");
      }
      this.$message.success("更新用户状态成功");
    },
    //删除一条数据
    deleteUser(userInfo) {
      this.$confirm("确认删除？", "提示", {}).then(async()=>{
        const {data: res} = await this.$http.delete(`users/${userInfo.id}`);
        // confirm("确认删除" + userInfo.username)
        console.log(res);
        if(res.meta.status !== 200) {
          return this.$message.error("删除用户失败！");
        }
        this.$message.success("删除成功");
        this.getUserList();
      }).catch(err => {
        this.$message.error("错误："+err)
      })
    },
    //取消添加用户
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    //添加用户
    addSubmit() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        this.userAddVisible = false;
        const {data: res} = await this.$http.post('users', this.addForm)
        if(res.meta.status !== 201) {
          return this.$message.error("添加用户失败！");
        }
        this.$message.success("添加成功");
        this.getUserList();
      })
      
    },
    //修改按钮事件
    modifyUser(userInfo) {
      this.userEditVisible = true;
      this.modifyForm = userInfo;
    },
    //修改
    modifySubmit() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        this.userEditVisible = false;
        const {data: res} = await this.$http.put(`users/${this.modifyForm.id}`, this.modifyForm)
        if(res.meta.status !== 200) {
          return this.$message.error("修改用户失败！");
        }
        this.$message.success("修改成功");
        this.getUserList();
      })
      
    },
  }
}
</script>
<style lang="less" scoped>

</style>