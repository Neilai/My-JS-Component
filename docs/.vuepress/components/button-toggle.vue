<template>
    <div>
        <div style="margin-top: 10px;">
            <button class="button7">按钮7</button>
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
            let button7=new Button(".button7",{"icon":"upload"})
            setInterval(()=>{
                button7.toggle()
            },3000)
        }
    }
</script>

