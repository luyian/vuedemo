<template>
    <div class="login_container">
        <!-- 头像区域 -->
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <!-- 登录表单区域 -->
            <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-icon-test1" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password"> 
                    <el-input prefix-icon="iconfont icon-icon-test" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="resetLoginForm">重置</el-button>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //表单数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456',
            },
            //表单的验证规则对象
            loginRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        //点击重置按钮，重置表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                const { data: res} = await this.$http.post('login', this.loginForm);
                if (res.meta.status !== 200) return this.$message.error("登录失败！");
                this.$message.success("登录成功！");

                //保存token，到sessionStorage中
                window.sessionStorage.setItem('token', res.data.token);

                //跳转到/home
                this.$router.push('/home');
            });
        },
    }
}
</script>
<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .avatar_box {
        padding: 10px;
        height: 130px;
        width: 130px;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        box-shadow: 0 0 10px #dddddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
    
</style>