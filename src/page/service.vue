<template>
    <div>
        <v-header goBack="true" :headTitle="headTitle"></v-header>
        <list-tpl :items="serviceInfo"  identifier="2"></list-tpl>
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
                serviceInfo: []
            }
        },
        computed: {
            headTitle: function() {     
                return this.$data.type == 7 ? '周边景点' : '住宿，餐饮';
            },
        },
        components: {
            vHeader, listTpl, loading
        },
        created() {
      	    this.type = this.$route.params.type;
       },
        mounted() {
            // 页面初始化时加载数据
            this.initPage();
        },
        methods: {
            initPage() {
                this.done = true;
                let url = `/zhan/queryServiceList?type=${this.type}`;
                this.$http.get(url).then((response) => {
                	// 遍历数据，改变数据结构，套用同一天模板listTpl
                    response.data.rows.forEach((item, index) => {
                    	let tmp = {};
                    	tmp['description'] = item['INFO_DESCRIPTION'];
                    	tmp['id'] = item['INFO_NO'];
                    	tmp['imageUrl'] = item['INFO_IMAGE_URL'];
                    	tmp['title'] = item['INFO_TITLE'];
                    	this.$data.serviceInfo.push(tmp);
                    });
                    this.$data.done = false;
                }, (response) => {
                    this.$data.done = false;
                });
            }
        }
    }
  </script>