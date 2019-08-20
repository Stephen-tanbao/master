<template>
    <el-tabs type="border-card"  v-model="activeName">
        <el-tab-pane label="查看二手书籍分类" name="first">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="title" prop="title"></el-table-column>
                <el-table-column label="操作" align="right">
                    <template slot-scope="scope">
                        <router-link :to="{name:'updataBooksCate',query:{id:scope.row.id}}" tag='button' class="el-button el-button--text el-button--small">修改</router-link>
                        <el-button type="text" size="small" @click="deleteCate(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="添加二手书籍分类" name="second">
            <el-form ref="booksCateForm" :model="booksCateForm" label-width="80px">
                <el-form-item label="书籍分类">
                    <el-input type="cate" v-model.number="booksCateForm.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addbooksCate">提交</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "bookscate",
        data:function(){
            return {
                activeName:'first',
                booksCateForm:{},
                tableData:[{}],
            }
        },
        methods:{
            addbooksCate(){
                this.axios.post("admin/books/booksCate",this.booksCateForm).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.booksCateForm = {};
                        this.getBooksCate();
                        this.activeName = "first";
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            getBooksCate(){
                this.axios.get("/admin/books/getBooksCate").then(res=>{
                    this.tableData = res.data;
                })
            },
            deleteCate(id){
                this.axios.get("/admin/books/deletebooksCate?id="+id).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getBooksCate();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created() {
            this.getBooksCate();
        }
    }
</script>

<style scoped>

</style>