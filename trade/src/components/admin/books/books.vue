<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="书名">
                <el-input v-model="formInline.bookname" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="formInline.nickname" placeholder="发布人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    <el-table :data="booksInfo" style="width: 100%">
        <el-table-column label="书名" prop="bookname" ></el-table-column>
        <el-table-column label="发布人" prop="nickname" ></el-table-column>
        <el-table-column label="书籍分类" prop="booksCate" ></el-table-column>
        <el-table-column label="折旧程度" prop="booksOld" ></el-table-column>
        <el-table-column label="价格" prop="price" ></el-table-column>
        <el-table-column label="作者" prop="author" ></el-table-column>
        <el-table-column label="缩图图" prop="thumb">
            <template   slot-scope="scope">
                <img :src="scope.row.thumb"  min-width="70" height="70" />
            </template>
        </el-table-column>
        <el-table-column label="描述" prop="des" ></el-table-column>
        <el-table-column label="审核状态" prop="static" >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.static == 1">审核通过</el-button>
                <el-button type="text" size="small" @click="check(scope.row.bid)" v-if="scope.row.static == 0">审核</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="deletebooks(scope.row.bid)">删除</el-button>
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
        name: "books",
        data:function(){
            return {
                booksInfo:[],
                formInline: {
                    bookname: '',
                    nickname:'',
                },
                total:0,
                currentpage:1,
            }
        },
        methods:{
            getbooks(){
                let obj=Object.assign({},this.formInline,{currentpage:this.currentpage})
                this.axios.post('/admin/books/getbooks',{params:obj}).then(res=>{
                    this.booksInfo = res.data.data;
                    this.total=res.data.total;
                })
            },
            deletebooks(bid){
                this.axios.get('/admin/books/deletebooks?bid='+bid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getbooks();
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            onSubmit(){
                this.getbooks()
            },
            currentchange(page){
                this.currentpage = page;
                this.getbooks()
            },
            check(bid){
                this.axios.get('/admin/books/checkbooks?bid='+bid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success(res.data.msg);
                        this.getbooks()
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created() {
            this.getbooks()
        }
    }
</script>

<style scoped>

</style>