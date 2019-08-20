<template>
    <div class="big">
        <h3>超级管理员登录</h3>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item  label="Username" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSubmit">提交</el-button>
                <router-link :to="{name:'login'}"> 管理员登录</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "adminLogin",
        data:function(){
            return{
                form:{
                    username:'',
                    password:'',
                },
                rules:{
                    username:[
                        {require:true, message:'请输入用户名', trigger:'blur',},
                        {min:5,max:10,message:'请输入5~10的字符',trigger:'blur'},
                    ],
                    password:[
                        {require:true,message:'请输入密码',trigger:'blur'},
                        {min:5,max:10,message:'请输入5~10的字符',trigger:'blur'},
                    ]
                }
            }
        },
        methods:{
            handleSubmit(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        this.axios.post('admin/login',this.form).then(res=>{
                            if(res.data.code == 0){
                                this.$message({
                                    message:res.data.msg,
                                    type:'success',
                                });
                                this.$router.push('/admin/main');
                                sessionStorage.superusername = this.form.username;
                            }else{
                                this.$message({
                                    message:res.data.msg,
                                    type:'error',
                                })
                            }
                        })
                    }
                })
            }
        }

    }
</script>

<style scoped>
    .big{
        height:300px;
        width: 500px;
        margin:100px auto;
        padding:60px;
        border-radius: 30px;
        background:rgba(0,0,0,0.07);
    }
    h3{
        text-align:center;
    }
    a{
        color: #606266;
        float:right;
    }
</style>