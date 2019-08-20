<template>
    <el-form ref="bannerForm" :model="bannerForm" label-width="80px">
        <el-form-item label="轮播图">
            <el-upload
                    action="uploadimg"
                    :limit="limit"
                    :file-list="bannersArr"
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
        <el-form-item label="状态">
            <el-select v-model="bannerForm.static" placeholder="请选择状态">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "updatabanner",
        data: function(){
            return {
                bannerForm:{
                    banners: "",
                    static: 0,
                },
                dialogVisible: false,
                uploadimg:'',
                limit: 1,
                bannersArr:[{name:'food.jpg',url:''}],
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
            bannerSuccess(res,file,){
                this.uploadimg = res;
                this.bannerForm.banners = res;
            },
            getcurrentbanner(){
                this.axios.get("/admin/webinfo/getcurrentbanner?id="+this.id).then(res=>{
                    if(res.data.code == 0){
                        this.bannerForm = res.data.data;
                        this.bannersArr[0].url = this.bannerForm.banners;
                        this.bannersArr[0].name = this.bannerForm.banners;
                    }else{
                    this.$message.error(res.data.msg)
                    }
                })
            },
            submit(){
                this.axios.post("/admin/webinfo/updatabanner",this.bannerForm).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.$router.push("/admin/main/banner")
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.getcurrentbanner();
        }
    }
</script>

<style scoped>

</style>