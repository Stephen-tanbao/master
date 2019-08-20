<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="formInline.nickname" placeholder="发布人"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-input v-model="formInline.goodsCate" placeholder="商品分类"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="goodsInfo" style="width: 100%">
        <el-table-column label="gid" prop="gid" ></el-table-column>
        <el-table-column label="标题" prop="title" ></el-table-column>
         <el-table-column label="发布人" prop="nickname" ></el-table-column>
        <el-table-column label="分类" prop="goodsCate" ></el-table-column>
        <el-table-column label="折旧程度" prop="goodsOld" ></el-table-column>
        <el-table-column label="价格" prop="price" ></el-table-column>
        <el-table-column label="缩略图" prop="thumb">
            <template   slot-scope="scope">
                <img :src="scope.row.thumb"  min-width="70" height="70" />
            </template>
        </el-table-column>
        <el-table-column label="描述" prop="des" ></el-table-column>
         <el-table-column label="审核状态" prop="static" >
             <template slot-scope="scope">
                 <el-button type="text" size="small" v-if="scope.row.static == 1">审核通过</el-button>
                 <el-button type="text" size="small" @click="check(scope.row.gid)" v-if="scope.row.static == 0">审核</el-button>
             </template>
         </el-table-column>
        <el-table-column label="操作" align="right">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="deletegoods(scope.row.gid)">删除</el-button>
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
        name: "goods",
        data:function(){
            return{
                goodsInfo:[],
                formInline: {
                    title: '',
                    nickname:'',
                    goodsCate:''
                },
                total:0,
                currentpage:1,
            }
        },
        methods:{
            getgoods(){
                let obj=Object.assign({},this.formInline,{currentpage:this.currentpage})
                this.axios.post('/admin/goods/getgoods',{params:obj}).then(res=>{
                    this.goodsInfo = res.data.data;
                    this.total=res.data.total;
                })
            },
            deletegoods(gid){
                this.axios.get('/admin/goods/deletegoods?gid='+gid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getgoods();
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            onSubmit(){
                this.getgoods();
            },
            currentchange(page){
                this.currentpage=page;
                this.getgoods();
            },
            check(gid){
                this.axios.get('/admin/goods/checkgoods?gid='+gid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getgoods();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created(){
            this.getgoods();
        }
    }
</script>

<style scoped>

</style>