<!-- eslint-disable max-len -->
<template>
  <div>
    <b-overlay
      :show="loading"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    > <template v-slot:overlay>
        <div class="text-center">
          <b-icon
            icon="three-dots"
            font-scale="3"
            animation="cylon"
          ></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
      <div
        class="jumbotron"
        v-if="!userInfo"
      >
        <h1 class="display-3">Hello, world!</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p class="lead">
          <a
            class="btn btn-primary btn-lg"
            href="#"
            role="button"
          >Learn more</a>
        </p>
      </div>

      <div
        class="overflow-auto"
        @click="fetchData"
      >
        <div class="mt-3">
          <!-- <h6>Goto first and last button number</h6> -->
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="right"
            first-number
            last-number
          ></b-pagination>

        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import userService from '@/service/userService';

export default {
    data() {
        return {
            rows: 1,
            perPage: 6,
            currentPage: 1,
            loading: false,
            posts: null,
            currentPosts: null,
            url: null,
        };
    },
    created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
        this.fetchData();
    },
    watch: {
    // 如果路由有变化，会再次执行该方法
        $route: 'fetchData',
    },
    methods: {
        fetchData() {
            this.post = null;
            this.loading = true;
            this.url = `/posts/page/list?pageNum=${this.currentPage}`;
            userService.pagelist(this.url).then((response) => {
                this.loading = false;
                this.posts = response.data.data.post;
                // console.log(response);
                // console.log(response.data.data.post);
                // console.log(response.data.data.total_pages);
                this.rows = response.data.data.total_pages;
            }).catch((err) => {
                this.$bvToast.toast(err.response.data.msg, {
                    title: '数据验证错误',
                    variant: 'danger',
                    toaster: 'b-toaster-top-center',
                    solid: true,
                });
            });
        },

    },
};
</script>
<style lang="scss" scoped>
.text-desc {
  font-size: 12px;
  color: #999;
}
.avatarStyle {
  width: 50px;
  height: 50px;
}
</style>
