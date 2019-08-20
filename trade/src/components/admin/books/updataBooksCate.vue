<template>
    <el-form ref="booksCateForm" :model="booksCateForm" label-width="80px">
        <el-form-item label="书籍分类">
            <el-input type="cate" v-model.number="booksCateForm.title"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="update">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "updataBooksCate",
        data:function(){
            return {
                id:0,
                booksCateForm:{}
            }
        },
        methods:{
            getcurrentCate(){
                this.axios.get("/admin/books/getcurrentCate?id="+this.id).then(res=>{
                    if(res.data.code == 0){
                        this.booksCateForm = res.data.data;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            update(){
                this.axios.post("/admin/books/updateBooksCate",this.booksCateForm).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.$router.push('/admin/main/bookscate');
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