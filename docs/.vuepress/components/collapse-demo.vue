<template>
    <div>
        <div class="collapse">
            <div class="collapseItem">
                <div class="title">标题1</div>
                <div class="content">内容1</div>
            </div>
            <div class="collapseItem">
                <div class="title">标题2</div>
                <div class="content">内容2</div>
            </div>
            <div class="collapseItem">
                <div class="title">标题3</div>
                <div class="content">内容3</div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../dist/magicUI.js'
    export default{
        mounted(){
            let collapse=new Collapse(".collapse")

        }
    }
</script>

<style lang="scss">
</style>
