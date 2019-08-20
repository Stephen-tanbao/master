<template>
    <el-tabs type="border-card"   v-model="activeName">
        <el-tab-pane label="查看信息" name="first">
            <el-table :data="webinfo" style="width: 100%">
                <el-table-column label="网站名称" prop="names"></el-table-column>
                <el-table-column label="网站关键字" prop="keywords"></el-table-column>
                <el-table-column label="网站描述" prop="des"></el-table-column>
                <el-table-column label="网站联系方式" prop="phone"></el-table-column>
                <el-table-column label="网站地址" prop="address"></el-table-column>
                <el-table-column label="网站创始人" prop="leader"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="second">
            <el-form :model="webinfo[0]" v-if="webinfo.length">
                <el-form-item label="网站名称">
                    <el-input v-model="webinfo[0].names"></el-input>
                </el-form-item>
                <el-form-item label="网站关键字">
                    <el-input v-model="webinfo[0].keywords"></el-input>
                </el-form-item>
                <el-form-item label="网站描述">
                    <el-input type="textarea" v-model="webinfo[0].des"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="webinfo[0].phone"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="webinfo[0].address"></el-input>
                </el-form-item>
                <el-form-item label="创始人">
                    <el-input v-model="webinfo[0].leader"></el-input>
                </el-form-item>
                <el-button type="primary" plain round @click="updateInfo">Submit</el-button>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "webinfo",
        data:function(){
            return{
                activeName:'first',
                webinfo:[{}]
            }
        },
        methods:{
            getWebInfo(){
                this.axios.get("/admin/webinfo").then(res=>{
                    this.webinfo = res.data;
                })
            },
            updateInfo(){
                this.axios.post("/admin/webinfo",this.webinfo[0]).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created(){
            this.getWebInfo();
        }
    }
</script>

<style scoped>

</style>