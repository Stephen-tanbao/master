<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="工作标题">
                <el-input v-model="formInline.jobtitle" placeholder="工作标题"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="formInline.nickname" placeholder="发布人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    <el-table :data="recruitInfo" style="width: 100%">
        <el-table-column label="rid" prop="rid" ></el-table-column>
        <el-table-column label="工作名称" prop="jobtitle" ></el-table-column>
        <el-table-column label="发布人" prop="nickname" ></el-table-column>
        <el-table-column label="工作时间" prop="jobtime" ></el-table-column>
        <el-table-column label="工作地点" prop="jobaddress" ></el-table-column>
        <el-table-column label="人员要求" prop="personcount" ></el-table-column>
        <el-table-column label="福利待遇" prop="velfare" ></el-table-column>
        <el-table-column label="描述" prop="des" ></el-table-column>
        <el-table-column label="审核状态" prop="static" >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.static == 1">审核通过</el-button>
                <el-button type="text" size="small" @click="check(scope.row.rid)" v-if="scope.row.static == 0">审核</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="deletegoods(scope.row.rid)">删除</el-button>
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
        name: "recruit",
        data:function(){
            return{
                recruitInfo:[],
                formInline: {
                    jobtitle: '',
                    nickname:'',
                },
                total:0,
                currentpage:1,
            }
        },
        methods:{
            getrecruit(){
                let obj=Object.assign({},this.formInline,{currentpage:this.currentpage})
                this.axios.post('/admin/goods/getrecruit',{params:obj}).then(res=>{
                    this.recruitInfo = res.data.data;
                    this.total=res.data.total;
                })
            },
            deletegoods(rid){
                this.axios.get('/admin/goods/deleterecruit?rid='+rid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getrecruit();
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            onSubmit(){
                this.getrecruit();
            },
            currentchange(page){
                this.currentpage = page;
                this.getrecruit();
            },
            check(rid){
                this.axios.get('/admin/goods/checkrecruit?rid='+rid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getrecruit();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created(){
            this.getrecruit();
        }
    }
</script>

<style scoped>

</style>