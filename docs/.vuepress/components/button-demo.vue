<template>
    <div>
        <div>
            <button class="button1">按钮1</button>
            <button class="button2">按钮2</button>
            <button class="button3">按钮3</button>
        </div>
    </div>
</template>

<script>

    import '../../../dist/magicUI.js'
    export default{
        data(){
            return{
                content:``
            }
        },
        mounted(){
            let button1=new Button(".button1")
            let button2=new Button(".button2",{"icon":"download"})
            let button3=new Button(".button3",{"icon":"setting"})
        }
    }
</script>
<style scoped>

</style>

