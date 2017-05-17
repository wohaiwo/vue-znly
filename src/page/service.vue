<template>
    <div>
        <v-header goBack="true" :headTitle="headTitle"></v-header>
        <list-tpl :items="serviceInfo" :type="type"  identifier="2"></list-tpl>
        <v-footer :pathName="index" v-show=" type == 6 || type == 15"></v-footer>
        <loading :show="done"></loading>
    </div>
</template>

<script>
    import vHeader from '../components/header.vue';
    import listTpl from '../components/listTpl.vue';
    import loading from '../components/loading.vue';
    import vFooter from '../components/footer.vue';
    export default {
        data() {
            return {
                type: null,
                done: false,
                index: 0,          // 动态显示footer导航栏显示位置
                serviceInfo: []
            }
        },
        computed: {
            headTitle: function() {
                let type = `${this.type}`;
                switch(type) {
                    case '3':
                        type = '景区公告';
                        break;
                    case '6':
                        type = '餐饮住宿';
                        break;
                    case '7':
                        type = '周边景点';
                        break;
                    case '13':
                        type = '预订门票';
                        break;
                    case '14':
                        type = '特色购物';
                        break;
                    case '15':
                        type = '景区服务';
                        break;
                }
                return type;
            },
        },
        components: {
            vHeader, listTpl, loading, vFooter
        },
        created() {
      	    this.type = this.$route.params.type;
       },
        mounted() {
            // 页面初始化时加载数据
            this.initPage();
        },
        // 只在当前路由改变，但是该组件被复用时调用
        // to 表示 route即将要进去的路由
        // from 表示 route正要离开的路由
        beforeRouteUpdate(to, from, next) {
            this.type = to.params.type;
            next(this.initPage());          
        },
        methods: {
            initPage() {
                // 判断footer底部导航栏的显示位置
                if(this.type == 6) {
                    this.index = 2;  
                } else if (this.type == 15) {
                    this.index = 0;
                }
                this.$data.serviceInfo = [];   // 初始化数据，防止footer底部导航栏切换数据没有清空
                this.done = true;
                let url = `/JSY_H5/h5/queryServiceList?type=${this.type}`;
                this.$http.get(url).then((response) => {
                	// 遍历数据，改变数据结构，套用同一天模板listTpl
                    response.data.rows.forEach((item, index) => {
                    	let tmp = {};
                    	tmp['description'] = item['INFO_DESCRIPTION'];
                    	tmp['id'] = item['INFO_NO'];
                    	tmp['imageUrl'] = item['INFO_IMAGE_URL'];
                    	tmp['title'] = item['INFO_TITLE'];
                        tmp['qrCode'] = item['QR_CORE_URL'];
                        tmp['jumpUrl'] = item['JUMP_URL'];
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