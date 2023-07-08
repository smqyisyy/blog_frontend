<template>
    <div class="middle-title-containter">
        <MiddleTitle />
    </div>
    <div class="tag-card-containter">
        <TagCard />
    </div>
</template>

<script>
import MiddleTitle from '../components/MiddleTitle.vue';
import TagCard from '@/components/tag/TagCard.vue'
export default {
    components: {
        MiddleTitle,
        TagCard
    },
    setup() {
        return {}
    }
}
</script>

<style scoped>
.middle-title-containter {
    margin-top: 250px;
}

.tag-card-containter {
    margin: 0 auto;
    margin-top: 150px;
    width: 1125px;

}
</style>