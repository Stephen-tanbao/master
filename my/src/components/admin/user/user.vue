<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="昵称">
                <el-input v-model="formInline.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    <el-table :data="userInfo" style="width: 100%">
        <el-table-column label="昵称" prop="nickname" ></el-table-column>
        <el-table-column label="头像" prop="thumb">
            <template   slot-scope="scope">
                <img :src="scope.row.thumb"  min-width="70" height="70" />
            </template>
        </el-table-column>
        <el-table-column label="禁止登录状态" prop="static" >
            <template   slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.static == 0">已启用</el-button>
                <el-button type="text" size="small" v-if="scope.row.static == 1">已禁止</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="start(scope.row.openid)" v-if="scope.row.static == 1">启用</el-button>
                <el-button type="text" size="small" @click="disa(scope.row.openid)" v-if="scope.row.static == 0">禁用</el-button>
                <el-button type="text" size="small" @click="deleteuser(scope.row.openid)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-pagination
                background
                @current-change="currentchange"
                layout="total,prev, pager, next,jumper"
                :page-size="3"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "user",
        data:function(){
            return {
                userInfo:[],
                formInline: {
                    nickname: '',
                },
                total:0,
                currentpage:1,
            }
        },
        methods:{
            getuserInfo(){
                let obj=Object.assign({},this.formInline,{currentpage:this.currentpage})
                this.axios.post('/admin/user/getuserInfo',{params:obj}).then(res=>{
                    this.userInfo = res.data.data;
                    this.total=res.data.total;
                })
            },
            deleteuser(openid){
                this.axios.get('/admin/user/deleteuser?openid='+openid).then(res=>{
                   if(res.data.code == 0){
                       this.$message.success(res.data.msg);
                       this.getuserInfo();
                   }else{
                       this.$message.error(res.data.msg)
                   }
                })
            },
            disa(openid){
                this.axios.post("/admin/user/dis",{openid:openid}).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getuserInfo();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            start(openid){
                this.axios.post("/admin/user/start",{openid:openid}).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getuserInfo();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            onSubmit(){
                this.getuserInfo();
            },
            currentchange(page){
                this.currentpage=page;
                this.getuserInfo();
            },
        },
        created() {
            this.getuserInfo();
        }
    }
</script>

<style scoped>

</style>