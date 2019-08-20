<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="工作标题">
                <el-input v-model="formInline.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="formInline.nickname" placeholder="发布人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    <el-table :data="wantbuyInfo" style="width: 100%">
        <el-table-column label="标题" prop="title" ></el-table-column>
        <el-table-column label="发布人" prop="nickname" ></el-table-column>
        <el-table-column label="描述" prop="des" ></el-table-column>
        <el-table-column label="审核状态" prop="static" >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.static == 1">审核通过</el-button>
                <el-button type="text" size="small" @click="check(scope.row.wid)" v-if="scope.row.static == 0">审核</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="deletewant(scope.row.wid)">删除</el-button>
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
        name: "wantbuy",
        data:function () {
            return{
                wantbuyInfo:[],
                formInline: {
                    title: '',
                    nickname:'',
                },
                total:0,
                currentpage:1,
            }
        },
        methods:{
            getwant(){
                let obj=Object.assign({},this.formInline,{currentpage:this.currentpage})
                this.axios.post('/admin/goods/getwant',{params:obj}).then(res=>{
                    this.wantbuyInfo = res.data.data;
                    this.total=res.data.total;
                })
            },
            deletewant(wid){
                this.axios.get('/admin/goods/deletewant?wid='+wid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getwant();
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            onSubmit(){
                this.getwant();
            },
            currentchange(page){
                this.currentpage = page;
                this.getwant();
            },
            check(wid){
                this.axios.get('/admin/goods/checkgetwant?wid='+wid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getwant();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created(){
            this.getwant();
        }
    }
</script>

<style scoped>

</style>