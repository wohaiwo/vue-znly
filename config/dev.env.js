var merge = require('webpack-merge')		    // 使用 webpack 配置合并插件
var prodEnv = require('./prod.env')				// -> { NODE_ENV: '"production"' }

// 合并两个开发环境下面的插件
module.exports = merge(prodEnv, {	
  NODE_ENV: '"development"'
})
