<template>
    <div>
        <v-header goBack="true" headTitle="景区介绍"></v-header>
        <list-tpl :items="scenicInfo" :type="type"  identifier="1"></list-tpl>
        <loading :show="done"></loading>
    </div>
</template>

<script>
    import vHeader from '../components/header.vue';
    import listTpl from '../components/listTpl.vue';
    import loading from '../components/loading.vue'; 
      
    export default {
      data() {
        return {
            done: false,
            type: '0',      // 这个类型应该是字符串，需要跟路由匹配到
            scenicInfo: []
        }
      },
      components: {
        vHeader, listTpl, loading
      },
      mounted() {
        // 页面初始化时加载数据
        this.initPage();
      },
      methods: {
        initPage() {
            this.done = true;
            let url = '/JSY_H5/h5/querySSSList';
            this.$http.get(url).then((response) => {
                // 遍历数据，改变数据结构，套用同一套模板listTpl
                response.data.rows.forEach((item, index) => {
                    let tmp = {};
                    tmp['description'] = item['SS_DESCRIPTION'];
                    tmp['id'] = item['SS_NO'];
                    tmp['imageUrl'] = item['SS_IMAGE_URL'];
                    tmp['title'] = item['SS_TITLE'];
                    this.$data.scenicInfo.push(tmp);
                });
                this.$data.done = false;
            }, (response) => {
                this.$data.done = false;
            });
        }
      }
    }
  </script>