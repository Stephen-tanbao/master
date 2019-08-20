<template>
    <el-tabs type="border-card"  v-model="activeName">
        <el-tab-pane label="查看轮播图" name="first">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="图片浏览" prop="banners">
                    <template   slot-scope="scope">
                        <img :src="scope.row.banners"  min-width="70" height="70" />
                    </template>
                </el-table-column>
                <el-table-column label="启用状态" prop="static">
                    <template   slot-scope="scope">
                        <el-button type="text" size="small" v-if="scope.row.static == 0">已启用</el-button>
                        <el-button type="text" size="small" v-if="scope.row.static == 1">已禁用</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="start(scope.row.id)" v-if="scope.row.static == 1">启用</el-button>
                        <el-button type="text" size="small" @click="disa(scope.row.id)" v-if="scope.row.static == 0">禁用</el-button>
                        <router-link :to="{name:'updatabanner',query:{id:scope.row.id}}" tag='button' class="el-button el-button--text el-button--small">修改</router-link>
                        <el-button type="text" size="small" @click="deleteBanner(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="添加轮播图" name="second">
            <el-form ref="bannerForm" :model="bannerForm" label-width="80px">
                <el-form-item label="轮播图">
                    <el-upload
                            action="uploadimg"
                            :limit="limit"
                            :file-list="fileList"
                            list-type="picture-card"
                            :on-preview="handlePreview"
                            :on-remove="bannerRemove"
                            :on-success="bannerSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="uploadimg" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addBanner">提交</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "banner",
        data:function(){
            return {
                activeName:'first',
                bannerForm:{
                    banners: "",
                },
                dialogVisible: false,
                uploadimg:'',
                limit: 1,
                tableData:[{}],
                fileList:[]
            }
        },
        methods:{
            handlePreview(file){

            },
            bannerRemove(){
                this.axios.get('/removeimg?url='+this.bannerForm.banners).then(res=>{
                    if(res.data.code == 0){
                        this.bannerForm.banners = '';
                    }
                })
            },
            bannerSuccess(res,file,fileList){
                this.uploadimg = res;
                this.bannerForm.banners = res;
            },
            addBanner(){
                this.axios.post("/admin/webinfo/addbanner",this.bannerForm).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.bannerForm = {};
                        this.fileList = [],
                        this.activeName = 'first';
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            getBannerInfo(){
                this.axios.get('/admin/webinfo/getbannerinfo').then(res=>{
                    this.tableData = res.data;
                })
            },
            deleteBanner(id){
                this.axios.get("/admin/webinfo/deleteBanner?id="+id).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getBannerInfo();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            disa(id){
                this.axios.post("/admin/webinfo/dis",{id:id}).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getBannerInfo();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            start(id){
                this.axios.post("/admin/webinfo/start",{id:id}).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getBannerInfo();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
        },
        created() {
            this.getBannerInfo();
        }
    }
</script>

<style scoped>

</style>