<template>
    <el-form ref="goodsCateForm" :model="goodsCateForm" label-width="80px">
        <el-form-item label="物品分类">
            <el-input type="cate" v-model.number="goodsCateForm.title"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="update">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "updataGoodsCate",
        data:function(){
            return {
                id:0,
                goodsCateForm:{}
            }
        },
        methods:{
            getcurrentCate(){
                this.axios.get("/admin/goods/getcurrentCate?id="+this.id).then(res=>{
                    if(res.data.code == 0){
                        this.goodsCateForm = res.data.data;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            update(){
                this.axios.post("/admin/goods/updateGoodsCate",this.goodsCateForm).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.$router.push('/admin/main/goodscate');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.getcurrentCate();
        }
    }
</script>

<style scoped>

</style>