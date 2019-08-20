<template>
    <el-tabs type="border-card"  v-model="activeName">
        <el-tab-pane label="查看管理员" name="first">
            <el-table :data="managerInfo" style="width: 100%">
                <el-table-column label="id" prop="id" width="50"></el-table-column>
                <el-table-column label="用户名" prop="username"  width="150"></el-table-column>
                <el-table-column label="密码" prop="password" width="150"></el-table-column>
                <el-table-column label="手机号" prop="phone" width="150"></el-table-column>
                <el-table-column label="启用状态" prop="static" width="100">
                    <template   slot-scope="scope">
                        <el-button type="text" size="small" v-if="scope.row.static == 0">已启用</el-button>
                        <el-button type="text" size="small" v-if="scope.row.static == 1">已禁用</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="start(scope.row.id)" v-if="scope.row.static == 1">启用</el-button>
                        <el-button type="text" size="small" @click="disa(scope.row.id)" v-if="scope.row.static == 0">禁用</el-button>
                        <router-link :to="{name:'updatamanager',query:{id:scope.row.id}}" tag='button' class="el-button el-button--text el-button--small">修改</router-link>
                        <el-button type="text" size="small" @click="deletemanager(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="添加管理员" name="second">
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
                    <el-button type="primary" @click="insertAdmin">提交</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "querymanager",
        data:function(){
            return {
                activeName: "first",
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
                managerInfo:[{}],
            }
        },
        methods:{
            insertAdmin(){
                this.axios.post("/admin/manager",this.manager).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.activeName = "first";
                        this.manager =  {
                            username:'',
                            password:'',
                            phone:''
                        };
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            getmanager(){
                this.axios.get("/admin/manager").then(res=>{
                    if(res.data.code == 0){
                        this.managerInfo = res.data.data;
                    }
                })
            },
            disa(id){
                this.axios.post("/admin/manager/dis",{id:id}).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getmanager();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            start(id){
                this.axios.post("/admin/manager/start",{id:id}).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getmanager();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            deletemanager(id){
                this.axios.get("/admin/manager/delete?id="+id).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getmanager();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
        },
        created(){
            if(!sessionStorage.superusername){
                this.$message({
                    message:'您不是超级管理员不能查看此信息！',
                    type:'error',
                })
                this.$router.push('/admin/main');
            }else{
                this.getmanager();
            }
        }
    }
</script>

<style scoped>

</style>