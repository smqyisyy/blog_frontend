<!-- 标签组件 -->
<template>
    <div class="my-tag" :class="{ 'is-selected': isSelected }" :style="{ 'background-color': color }">
        <span class="tag-name">{{ tagName }}</span>
        <span class="tag-count">{{ tagCount }}</span>
    </div>
</template>

<script>
export default {
    props: {
        tagName: {
            type: String,
            default: ''
        },
        tagCount: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: ''
        },
        isSelected: {
            type: Boolean,
            // default: () => false, // 默认返回 false

        }
    },
    setup(props) {
        return {
            ...props
        }
    }
}
</script>

<style scoped>
.my-tag {
    box-shadow: 0 3px 5px rgba(0, 0, 0, .12);
    border-radius: 5px;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    padding: 15px;
    text-align: center;
    transition: .3s ease-out;
}

.my-tag.is-selected {
    background: linear-gradient(to bottom right, #FF5E3A 0%, #FF2A68 100%);
    color: #fff;
}

.my-tag.is-selected .tag-count {
    color: #fff;
}

.my-tag:hover {
    background: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
    color: #fff;
}

.my-tag .tag-count {
    margin-left: 5px;
    font-size: 8px;
    color: red;
}
</style>