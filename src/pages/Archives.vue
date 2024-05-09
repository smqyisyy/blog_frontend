<!-- 归档页 -->
<template>
  <div class="middle-title-containter">
    <MiddleTitle />
  </div>
  <div class="timeline-containter" >
  <div class="timeline">
    <el-timeline  v-loading="loading" >
      <el-timeline-item :timestamp="item.releaseDate"  placement="top" v-for="(item,index) in blogInfoArr" :class="index % 2 === 0 ? 'timeline-left' : 'timeline-right'">
          <!-- 博客卡片 -->
        <div class="blog-card-containter" v-loading="loading">
            <BlogCard  :key="item.id" :blogTitle="item.blogTitle" :blogContent="item.blogContent"
                :blogAuthor="item.blogAuthor" :releaseDate="item.releaseDate" :imgUrl="item.imgUrl"
                @click="routeToBlog(item.id)" />
        </div>
      </el-timeline-item>
    </el-timeline>
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
import { onMounted, ref } from "vue";
import { getBlogInfo } from '@/request/api/getBlogInfo';
import { useRouter } from 'vue-router';
import BlogCard from '@/components/BlogCard.vue';
export default {
  components: {
    MiddleTitle,
    pagination,
    BlogCard
  },
  setup() {
    let blogInfoArr = ref([])
    let totalBlog = ref()
    let pageSize = ref()
    // 分页时，对每一页的内容做加载中显示
    let loading = ref(true)
    onMounted(async () => {
      // 获取博客数据
      const res = await getBlogInfo()
      blogInfoArr.value = res.data.data
      totalBlog.value = res.data.totalBlog;
      pageSize.value = res.data.pageSize;
      loading.value = false
    })
    /**
     * 换页之后按照页码重新请求数据
     * @param {} curPage 
     */
    function handleChangePage(curPage) {
      loading.value = true
      getBlogInfo(curPage).then(res => {
        if (res.status === 200) {
          blogInfoArr.value = res.data.data
          loading.value = false
        }
      })
    }

    const router = useRouter()
    /**
     * 跳转到对应文章的页面
     * @param {*} id  文章的id
     */
    function routeToBlog(id) {
      router.push(`/article/${id}`)
    }

    return {
      blogInfoArr,
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

.timeline-containter {
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.timeline-containter .timeline {
  width: 40vw;
}
.timeline-containter .timeline .timeline-right {
    left: 50%;
    width: 50%;
}
/* 左侧`el-timeline-item`的样式，同上，仅是为了方便下面的CSS样式修改 */
.timeline-containter .timeline .timeline-left {
    left: 50%;
    width: 50%;
}
.timeline-containter .timeline .timeline-left :deep(.el-timeline-item__wrapper) {
    right: 100%;
    padding: 0 19px 0 0;
    text-align: right;
}
/* 博客卡片 */
.timeline :deep(.blog-card-containter .blog-card) {
  width: 100%;
}
/* elmenet日期样式 */
.timeline  :deep(.el-timeline-item__timestamp) {
  color: #000;
  font-size: 1.5rem;
}
/* 分页组件 */
.pagination-containter {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
/* 移动端适配 */
@media screen and (max-width: 992px) {
  .timeline-containter .timeline {
    width: 90vw;
  }
}
</style>