<template>
    <div class="menuItem">
        
        <template v-for="(name,path,listIndex) in kinds">
            <!-- 有子路由的 -->
            <!-- <el-submenu v-if="list.children && list.children.length > 0" :index="list.name" :key="listIndex">
                <template slot="title">
                    <i v-if="list.meta.icon" :class="list.meta.icon"></i>
                    <span slot="title">{{ routeName(list) }}</span>
                </template>
                <template v-for="(item,itemIndex) in list.children"> -->
                    <!-- 子路由里还有子路由的 -->
                    <!-- <my-side-item v-if="item.children && list.children.length > 0" :json="[item]" :key="itemIndex"></my-side-item> -->

                    <!-- 子路由里没有子路由的 -->
                    <!-- <router-link v-else :to="{name: item.name}" :key="itemIndex">
                        <el-menu-item :index="item.name">
                            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                            <span slot="title">{{ routeName(item) }}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu> -->

            <!-- 没有子路由的 -->
            
            <router-link :to="{name:path}" :key="listIndex">
                <el-menu-item :index="name">
                    <!-- <i v-if="list.meta.icon" :class="list.meta.icon"></i> -->
                    <span slot="title">{{name}}</span>
                </el-menu-item>
            </router-link>
        </template>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'menuItem',
    props: {
        json: Array
    },
    created:function(){
        // this.$store.dispatch('set_kinds',['1','2','3','4'])
        alert(kinds)
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'kinds'
        ])
    },
    methods: {
        routeName(route) {
            if (route.meta && route.meta.title) {
                return route.meta.title
            } else {
                return route.name
            }
        },
        kindName(){
            
        }
    }
}
</script>
<style lang='stylus'>
.menuItem {
    a {
        display: block;
    }
}
</style>
