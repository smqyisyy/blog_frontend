<!-- 归档页 -->
<template>
    <div class="middle-title-containter">
        <MiddleTitle />
    </div>
    <div class="archives-container" v-loading="loading">
        <div class="archives-stats">
            共 <span class="stats-num">{{ totalBlog }}</span> 篇文章
        </div>
        <div class="archives-timeline">
            <div class="year-group" v-for="(group, year) in groupedBlogs" :key="year">
                <div class="year-header">
                    <span class="year-text">{{ year }}</span>
                    <span class="year-count">{{ group.length }} 篇</span>
                </div>
                <div class="year-items">
                    <div class="timeline-item" v-for="item in group" :key="item.id" @click="routeToBlog(item.id)">
                        <div class="item-dot"></div>
                        <div class="item-date">{{ item.monthDay }}</div>
                        <div class="item-title">{{ item.blogTitle }}</div>
                        <div class="item-category">{{ item.category }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 分页 -->
    <div class="pagination-containter" v-if="totalBlog && totalBlog > pageSize">
        <pagination @ChangePage="handleChangePage" :totalBlog="totalBlog" :pageSize="pageSize" />
    </div>
</template>

<script>
import MiddleTitle from "@/components/MiddleTitle.vue";
import pagination from '@/components/Pagination.vue';
import { onMounted, ref, computed } from "vue";
import { getBlogInfo } from '@/request/api/getBlogInfo';
import { useRouter } from 'vue-router';
export default {
    components: {
        MiddleTitle,
        pagination
    },
    setup() {
        let blogInfoArr = ref([])
        let totalBlog = ref(0)
        let pageSize = ref(10)
        let loading = ref(true)
        const router = useRouter()

        const groupedBlogs = computed(() => {
            const groups = {}
            blogInfoArr.value.forEach(item => {
                const date = new Date(item.releaseDate)
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                item.monthDay = `${month}-${day}`
                if (!groups[year]) groups[year] = []
                groups[year].push(item)
            })
            // 按年份倒序
            const sorted = {}
            Object.keys(groups).sort((a, b) => b - a).forEach(key => {
                sorted[key] = groups[key]
            })
            return sorted
        })

        onMounted(async () => {
            const res = await getBlogInfo()
            blogInfoArr.value = res.data.data
            totalBlog.value = res.data.totalBlog
            pageSize.value = res.data.pageSize
            loading.value = false
        })

        function handleChangePage(curPage) {
            loading.value = true
            getBlogInfo(curPage).then(res => {
                if (res.status === 200) {
                    blogInfoArr.value = res.data.data
                    loading.value = false
                }
            })
        }

        function routeToBlog(id) {
            router.push(`/article/${id}`)
        }

        return {
            blogInfoArr,
            groupedBlogs,
            handleChangePage,
            routeToBlog,
            totalBlog,
            pageSize,
            loading
        }
    }
}
</script>

<style scoped>
.middle-title-containter {
    margin-top: 250px;
}

.archives-container {
    width: var(--container-narrow);
    margin: 0 auto;
    margin-top: 80px;
}

.archives-stats {
    font-size: 15px;
    color: var(--color-text-secondary);
    margin-bottom: 40px;
    padding-left: 12px;
}

.archives-stats .stats-num {
    color: var(--color-primary);
    font-weight: bold;
    font-size: 20px;
}

/* 年份分组 */
.year-group {
    margin-bottom: 40px;
}

.year-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 20px;
    padding-left: 12px;
}

.year-header .year-text {
    font-size: 28px;
    font-weight: bold;
    color: var(--color-text);
}

.year-header .year-count {
    font-size: 14px;
    color: var(--color-text-muted);
}

/* 时间线 */
.year-items {
    position: relative;
    padding-left: 28px;
    border-left: 2px solid #e8e8e8;
}

.timeline-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    margin-bottom: 4px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background 0.2s;
}

.timeline-item:hover {
    background: rgba(0, 0, 0, 0.03);
}

.timeline-item:hover .item-title {
    color: var(--color-primary);
}

.item-dot {
    position: absolute;
    left: -35px;
    width: 12px;
    height: 12px;
    background: #fff;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
}

.item-date {
    font-size: 14px;
    color: var(--color-text-muted);
    flex-shrink: 0;
    width: 50px;
}

.item-title {
    font-size: 16px;
    color: var(--color-text);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.2s;
}

.item-category {
    font-size: 12px;
    color: var(--color-primary);
    background: var(--color-primary-light);
    padding: 2px 8px;
    border-radius: 10px;
    flex-shrink: 0;
}

/* 分页 */
.pagination-containter {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-bottom: 40px;
}

/* 移动端适配 */
@media (max-width: 992px) {
    .archives-container {
        width: var(--mobile-width);
        padding: 0 4px;
    }

    .timeline-item {
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 8px;
    }

    .item-date {
        width: auto;
    }

    .item-category {
        display: none;
    }
}
</style>
