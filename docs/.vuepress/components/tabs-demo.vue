<template>
    <div class="magic tabs">
        <div class="tabsHead">
            <div class="tabsItem">体育</div>
            <div class="tabsItem">美女</div>
            <div class="tabsItem">娱乐</div>
        </div>
        <div class="tabsBody">
            <div class="tabsPane">这是体育新闻</div>
            <div class="tabsPane">这是美女新闻</div>
            <div class="tabsPane">这是娱乐新闻</div>
        </div>
    </div>
</template>

<script>
    import '../../../dist/magicUI.js'
    export default{
        mounted(){
            let tab=new Tabs(".tabs",{})
        }
    }
</script>

<style lang="scss">
</style>
