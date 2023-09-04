<!-- 通用按钮组件 -->
<template>
    <a class="my-button" :href="hrefLink" target="_blank">
        <slot name="icon"></slot>
        <button ref="abc">{{ buttonContent }}</button>
    </a>
</template>

<script>
import { ref } from "vue"
export default {
    props: ["buttonContent", "hrefLink"],
    setup(props) {
        let buttonContent = props.buttonContent
        let hrefLink = props.hrefLink
        // 是否需要点击后变色
        let needChange = props.needChange
       
        return {
            buttonContent,
            hrefLink,
        }
    }
}
</script>

<style scoped>
.my-button {
    display: flex;
    padding: 0 40px;
    height: 45px;
    line-height: 45px;
    border-radius: 30px;
    text-align: center;
    border: 1px solid #fff;
    display: inline-block;
    cursor: pointer;
    transition: .5s;
    display: block;
}

.my-button:focus {
    background-color: #1d7d74;
    outline: none;
}

.my-button:hover {
    border: 1px solid #f44336;
    background-color: #f44336;
    box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2)
}

.my-button button {
    background: none;
    color: #fff;
    text-align: center;
    font-size: 16px;
    margin-left: 5px;
    cursor: pointer;
}
</style>