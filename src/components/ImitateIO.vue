
<!-- 此组件用于实现动态输入与删除文字的显示效果 -->
<template>
    <span class="subtitle" @click="showText">{{ subtitle }}</span>
    <span :class="{ animate__animated: isShow, animate__flash: isShow }" class="subtitle">|</span>
</template>

<script>
import { ref, onMounted } from "vue"
export default {
    props: ["subtitle"],
    setup(props) {
        let subtitle = ref('')
        let isShow = ref(false)
        let index = 0
        let arrIndex = 0
        function sleep(time) {
            return new Promise((resolve) => {
                return setTimeout(resolve, time)

            })

        }
        async function autoTyping() {
            index++
            subtitle.value = props.subtitle[arrIndex].slice(0, index)
            if (index == props.subtitle[arrIndex].length) {
                isShow.value = true
                await sleep(800)
                isShow.value = false
                index = 0
                arrIndex++
                if (arrIndex == props.subtitle.length) {
                    arrIndex = 0
                }
            }

        }


        onMounted(() => {
            setInterval(() => {
                autoTyping()
            }, 150);


        })

        return {
            subtitle,
            isShow,
            autoTyping
        }
    }
}
</script>

<style scoped>
.subtitle {
    font-size: 18px;
    color: #eee;

}
</style>