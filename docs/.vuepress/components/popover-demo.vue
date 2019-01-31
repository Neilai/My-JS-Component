<template>
    <div>
        <button id="a">悬浮我</button>
        <button id="b">点击我</button>
    </div>
</template>

<script>
    import '../../../dist/magicUI.js'
    export default{
        mounted(){
            let popover1=new Popover("#a",{"position":"top","text":"上方"})
            let popover2=new Popover("#b",{"action":"click","text":"下方"})
        }
    }
</script>

<style lang="scss">
</style>
