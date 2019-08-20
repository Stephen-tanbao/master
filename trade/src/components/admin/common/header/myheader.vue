<template>
    <el-container>
        <el-aside>吕梁学院二手交易平台后台管理系统</el-aside>
        <el-main>
            <el-button type="warning" @click="exit()">退出</el-button>
            <span>{{username}}</span>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "myheader",
        data:function(){
            return{
                username:"",
            }
        },
        methods:{
            exit(){
                sessionStorage.clear();
                this.$router.push('/admin/login');
            }
        },
        created(){
            if(sessionStorage.username){
                this.username = sessionStorage.username;
            }
            if(sessionStorage.superusername){
                this.username = sessionStorage.superusername;
            }
        }
    }
</script>

<style scoped>
    .el-container{
        line-height: 60px;
    }
    .el-main{
        padding: 0;
    }
    span{
        float: right;
        margin-right: 30px;
    }
    .el-button{
        float: right;
        margin-top: 10px;
        margin-left: 15px;
    }
</style>