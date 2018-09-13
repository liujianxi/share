<template>
	<div class="index">
		<div>111111</div>
		<img v-if="value.exist" :class="value" v-for="(value, name) in picList">
	</div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      picList: {
        name1: {
          exist: true
        },
        name2: {
          exist: true
        }
      }
    };
  },
  created() {
	this.$set(this.picList["name1"], 'exist', false);
	console.log(this.picList);
  },
  activated() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>