import { initData } from '@/api/initData';
export default {
  data() {
    return {
      loading: false,
      data: [],
      blurry: '',
      page: 1,
      size: 10,
      total: 0,
      url: '',
      params: {},
      emptyText: '暂无数据',
    };
  },
  methods: {
    async init() {
      if (!await this.beforeInit() || this.url === '') {
        return false;
      }
      return new Promise((resolve, reject) => {
        this.loading = true;
        initData(this.url, this.params, this.methods).then(res => {
          if (res.code === 0) {
            this.total = res.result.total;
            this.data = res.result.data;
            setTimeout(() => {
              this.loading = false;
            }, this.time);
            resolve(res);
          } else {
            this.loading = false;
          }
        }).catch(err => {
          this.loading = false;
          this.emptyText = err.message;
          reject(err);
        });
      });
    },
    beforeInit() {
      return true;
    },
    pageChange(e) {
      this.page = e;
      this.init();
    },
    sizeChange(e) {
      this.page = 0;
      this.size = e;
      this.init();
    },
    delChangePage(size) {
      if (size === undefined) {
        size = 1;
      }
      if (this.data.length === size && this.page !== 0) {
        this.page = this.page - 1;
      }
    },
    toQuery() {
      this.page = 0;
      this.init();
    }
  },
};
