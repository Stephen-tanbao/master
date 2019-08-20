<template>
    <el-container>
        <el-header>
            <myheader></myheader>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <myaside></myaside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import myheader from '../common/header/myheader';
    import myaside from '../common/aside/myaside';
    export default {
        name: "mymain",
        data() {
            return {
            }
        },
        components:{
            myheader,
            myaside,
        },
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        /*line-height: 60px;*/
        height:100px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        /*line-height: 200px;*/
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: 100vh;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
</style>