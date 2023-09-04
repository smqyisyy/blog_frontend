<!-- 自带hover效果的a链接icon组件 -->
<template>
    <a class="my-icon-link" :href="hrefLink">
        <el-popover placement="top" trigger="hover" :content="popContent" effect="dark"
            popper-style="white-space:nowrap;text-align:center;" width="180">
            <template #reference>
                <slot name="icon"></slot>
            </template>
        </el-popover>

    </a>
</template>

<script>

export default {
    props: ["hrefLink", "popContent"],
    setup(props) {
        let hrefLink = props.hrefLink
        let popContent = props.popContent
        return {
            hrefLink,
            popContent
        }
    }
}
</script>

<style  scoped>
.my-icon-link {
    cursor: pointer;
}
</style>