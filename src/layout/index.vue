<template>
  <div class="app-wrapper">{{ name }}</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { removeSession } from '@/utils/auth';
export default {
  name: 'Layout',

  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['name']),
  },
  mounted() {
    console.log(removeSession());
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
