<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="发布人">
                <el-input v-model="formInline.nickname" placeholder="发布人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    <el-table :data="contentInfo" style="width: 100%">
        <el-table-column label="id" prop="id" ></el-table-column>
        <el-table-column label="发布人" prop="nickname" ></el-table-column>
        <el-table-column label="发布内容" prop="content" ></el-table-column>
        <el-table-column label="审核状态" prop="static" >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.static == 1">审核通过</el-button>
                <el-button type="text" size="small" @click="check(scope.row.id)" v-if="scope.row.static == 0">审核</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="deletecontent(scope.row.id)">删除</el-button>
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
        name: "content",
        data:function(){
            return{
                contentInfo:[],
                formInline: {
                    nickname:'',
                },
                total:0,
                currentpage:1,
            }
        },
        methods:{
            getcontent(){
                let obj=Object.assign({},this.formInline,{currentpage:this.currentpage})
                this.axios.post('/admin/content/getcontent',{params:obj}).then(res=>{
                    this.contentInfo = res.data.data;
                    this.total=res.data.total;
                })
            },
            deletecontent(id){
                this.axios.get('/admin/content/deletecontent?id='+id).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getcontent();
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            onSubmit(){
                this.getcontent();
            },
            currentchange(page){
                this.currentpage = page;
                this.getcontent();
            },
            check(id){
                this.axios.get('/admin/content/check?id='+id).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getcontent();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created(){
            this.getcontent();
        }
    }
</script>

<style scoped>

</style>