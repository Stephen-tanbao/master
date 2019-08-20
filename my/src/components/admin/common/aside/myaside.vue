<template>
    <el-menu>
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>基本信息</template>
            <el-menu-item-group>
                <el-menu-item index="1-1">
                    <router-link :to="{name:'webinfo'}">网站信息</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <router-link :to="{name:'banner'}">轮播图管理</router-link>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>用户信息</template>
            <el-menu-item-group>
                <el-menu-item index="2-1"><router-link :to="{name:'user'}">用户管理</router-link></el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>分类管理</template>
            <el-menu-item-group>
                <el-menu-item index="3-1">
                    <router-link :to="{name:'goodscate'}">二手物品</router-link>
                </el-menu-item>
                <el-menu-item index="3-2">
                    <router-link :to="{name:'bookscate'}">二手书籍</router-link>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>发布信息管理</template>
            <el-menu-item-group>
                <el-menu-item index="4-1">
                    <router-link :to="{name:'goods'}">二手物品管理</router-link>
                </el-menu-item>
                <el-menu-item index="4-2">
                    <router-link :to="{name:'books'}">二手书籍管理</router-link>
                </el-menu-item>
                <el-menu-item index="4-3">
                    <router-link :to="{name:'wantbuy'}"> 求购信息管理</router-link>
                </el-menu-item>
                <el-menu-item index="4-4">
                    <router-link :to="{name:'recruit'}"> 招聘信息管理</router-link>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>留言管理</template>
            <el-menu-item-group>
                <el-menu-item index="5-1">
                    <router-link :to="{name:'content'}">留言管理</router-link>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>管理员管理</template>
            <el-menu-item-group>
                <el-menu-item index="6-1">
                    <router-link :to="{name:'querymanager'}">管理员信息</router-link>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "myaside"
    }
</script>

<style scoped>
    a{
        color: #333;
    }
    .el-menu-item >a{
        display: block;
        width: 100%;
        height: 100%;
    }
    .is-active > .router-link-exact-active{
        color: #409eff;
    }
</style>