<template>
    <div class="wrapper">
        <v-head></v-head>
        <keep-alive>
        <v-sidebar></v-sidebar>
        </keep-alive>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        }
    }
</script>
