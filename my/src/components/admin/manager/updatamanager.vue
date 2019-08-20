<template>
    <el-form :model="manager" ref="manager" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input type="username" :rules="rules.username" v-model.number="manager.username"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" :rules="rules.password" v-model.number="manager.password"  placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input type="phone" :rules="rules.phone" v-model.number="manager.phone"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitManager">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "updatamanager",
        data:function(){
            return {
                manager: {
                    username:'',
                    password:'',
                    phone:''
                },
                rules: {
                    username:[
                        {require:true, message:'请输入用户名', trigger:'blur',},
                        {min:5,max:10,message:'请输入5~10的字符',trigger:'blur'},
                    ],
                    password:[
                        {require:true,message:'请输入密码',trigger:'blur'},
                        {min:5,max:10,message:'请输入5~10的字符',trigger:'blur'},
                    ],
                    phone:[
                        {require:true,message:'请输入手机号',trigger:'blur'},
                        {min:7,max:11,message:'请输入7~11的字符',trigger:'blur'},
                    ],
                },
                id: 0,
            }
        },
        methods:{
            getcurrentadmin(){
                this.axios.get('/admin/manager/getcurrentadmin?id='+this.id).then(res=>{
                    if(res.data.code == 0){
                        this.manager = res.data.data;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            submitManager(){
                this.axios.post("/admin/manager/update",this.manager).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.$router.push('/admin/main/querymanager');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.getcurrentadmin()
        }
    }
</script>

<style scoped>

</style>