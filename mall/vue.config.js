module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{//最安全的方式
            '/api':{
                target:'http://www.imoc.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}