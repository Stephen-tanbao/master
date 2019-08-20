<template>
    <el-tabs type="border-card"  v-model="activeName">
        <el-tab-pane label="查看二手物品分类" name="first">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="title" prop="title"></el-table-column>
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <router-link :to="{name:'updataGoodsCate',query:{id:scope.row.id}}" tag='button' class="el-button el-button--text el-button--small">修改</router-link>
                        <el-button type="text" size="small" @click="deleteCate(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="添加二手物品分类" name="second">
            <el-form ref="goodsCateForm" :model="goodsCateForm" label-width="80px">
                <el-form-item label="物品分类">
                    <el-input type="cate" v-model.number="goodsCateForm.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addGoodsCate">提交</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "goodscate",
        data:function(){
            return {
                activeName:'first',
                goodsCateForm:{},
                tableData:[{}],
            }
        },
        methods:{
            addGoodsCate(){
                this.axios.post("admin/goods/goodsCate",this.goodsCateForm).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.goodsCateForm = {};
                        this.activeName = "first";
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            getGoodsCate(){
                this.axios.get("/admin/goods/getGoodsCate").then(res=>{
                    this.tableData = res.data;
                })
            },
            deleteCate(id){
                this.axios.get("/admin/goods/deleteGoodsCate?id="+id).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getGoodsCate();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created() {
            this.getGoodsCate();
        }
    }
</script>

<style scoped>

</style>