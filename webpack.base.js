
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//抽离css样式的插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
//以下是为了压缩css样式引入的插件
let optimizeCss = require('optimize-css-assets-webpack-plugin');
//以下是因为引入了optimizeCss插件导致js压缩不生效，故需再安装压缩js文件的插件
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');

// let { CleanWebpackPlugin } = require('clean-webpack-plugin');  
// 1)CleanWebpackPlugin //清除webpack前一次打包内容的插件，需要安装clean-webpack-plugin
// let CopyWebpackPlugin = require('copy-webpack-plugin');
//2)copyWebpackPlugin  //拷贝次打包内容的插件，需要安装copy-webpack-plugin
//3)bannerPlugin  webpack内置的,不需要安装，引入webpack即可 

module.exports = {
    // mode: 'production', //模式 默认两种环境 production生产 development开发,抽离出来写成webpack.dev.js和webpack.prod.js
    devServer: {//开发服务器的配置
        port: 8000,
        hot: true, //开启热更新
        progress: true, //压缩进度条
        contentBase: './dist', //默认是以当前目录下开启静态服务，指定开启服务的文件夹
        // contentBase: path.resolve(__dirname, 'dist'),
        open: true, //打包结束时是否自动打开浏览器
        // 1)代理服务器获取数据
        proxy: { //代理服务器
            '/api': 'http://localhost:3000' //配置代理,如果是访问api下的,就用服务端server.js下的端口3000,注意：要启动服务器即命令行运行node + seriver.js路径 
            // '/api': { 
            //     target: 'http://localhost:3000',
            //     pathRewrite: {'/api': ''} //重写路径
            // }
        },
        // 2)使用mock数据
        // before(app){ //deServer内带提供的方法 钩子
        //     app.get('/api/user',(req,res) => {
        //         res.json({name: 'hello world'});
        //     })
        // },
        // 3)有服务度端，不用代理来处理，能不能在服务端中启动webpack 端口用服务端端口,主要配置查看server.js (2)注释部分
      
        compress: true //启动gzip压缩
    },
    entry: './src/index.js',//入口文件
    // entry: { //多页面打包入口文件配置
    //     index:'./src/index.js',
    //     other:'./src/other.js',
    // },

    //1)源码映射，会单独生成一个sourcemap文件,出错了会标识当前出错的列和行 大而全
    // devtool: 'source-map', //用于调试，增加映射文件，可以帮助我们调试源代码
    //2)不产生单独的文件，但是可以显示行和列
    // devtool: 'eval-source-map', //用于调试，增加映射文件，可以帮助我们调试源代码
    //3)不产生列，但是是一个单独的映射文件
    // devtool: 'cheap-module-source-map', //产生后可以保留起来
    //4)不产生单独的文件 集成在打包后的文件中 不会产生列
    // devtool: 'cheap-module-eval-source-map',

    watch: true, //实时打包文件，监控是否重新打包
    watchOptions: {
        poll: 1000, //每秒问我一次
        aggregateTimeout: 500,  //防抖 防止我每次输入代码的时候就打包,输入结束后0.5秒后开始打包
        ignored: /node_modules/ //不需要进行监控的文件
    },
    resolve: { //解析 第三方包
        // modules: [path.resolve('node_modules')], //在该文件下查找
        //mainFiles: [], //入口文件名字 默认是index.js文件
        alias: { //别名,在其它地方只要import引入@other的时候,引入的就是./src/other.js文件
            '@other': path.resolve(__dirname,'./src/other.js')
        },
        //extensions扩展名，用于引入文件时没有写后缀去补充文件后缀,如imoprt XX from './src/other' 引入的是other.js文件，按数组里的顺序去匹配
        extensions: ['*','.css','.js','.vue','.json']   
    },
    output: {
        // filename: 'bundle.js', //打包后的文件名
        filename: 'bundle.[hash:8].js', //打包后文件名加hash值并且取前8位hash值，以确保区分上下次的不同，解决缓存问题
        // filename: '[name].[hash:8].js', //多页面打包出口文件配置,name为多页面入口文件的name
        path: path.resolve(__dirname, 'dist')
        // publicPath: 'http://www.test.com'   //这主要是在打包后的文件里引入如img资源时候都会加上这个http://www.test.com前缀
    }, 
    plugins: [ //数组，放置所有的webpack的插件
        new HtmlWebpackPlugin({
             template:'./src/index.html',
             filename: 'index.html',
            //  chunks: ['index'], //用于多页面打包时生成的html引入对应的页面js，而不是所有的js
             hash: true, //带有hash值,即打包生成的html文件引入的js文件名称后面有hash值
             minify:{//配置压缩html的参数
                 removeAttributeQuotes: true, //删除html中的双引号
                 collapseWhitespace: true  //把html文件压缩成一行
             }
        }),
        new webpack.HotModuleReplacementPlugin(), //热更新插件,建议写在webpack.dev.js中
        // new webpack.NamedModulesPlugin(), //打印更新的模块路径
        // 如果是多页面打包的话，再new一个HtmlWebpackPlugin就可以了
        // new HtmlWebpackPlugin({
        //      template:'./src/other.html',
        //      filename: 'other.html',
        //      chunks: ['other'], //用于多页面打包时声称的html引入对应的页面js，而不是所有的js
        //      hash: true, //带有hash值,即打包生成的html文件引入的js文件名称后面有hash值
        //      minify:{//配置压缩html的参数
        //          removeAttributeQuotes: true, //删除html中的双引号
        //          collapseWhitespace: true  //把html文件压缩成一行
        //      }
        // }),
        new MiniCssExtractPlugin({
             filename: 'css/main.css' //打包后后生成抽离出来的css文件的名称
        }),
        new webpack.ProvidePlugin({ //在每个模块中都注入$符号,即全局引入
            $: 'jquery'
        }),
        // new CleanWebpackPlugin(), //注意：慎重使用,每次打包时会清除上次打包./dist目录下的文件
        // new CopyWebpackPlugin({ //将doc文件下的文件拷贝到dist下
        //     patterns: [
        //         { from: 'doc', to: './' }
        //         // { from: 'other', to: 'public' }
        //     ]
        // })
        new webpack.DefinePlugin({ //定义全局默认的属性
            DEV: JSON.stringify('production'),
            FLAG: 'true' //如果是布尔值就不需要JSON
            // BATH_PATH: JSON.stringify('static/m/brop/pop');
        }),
        //版权著作声明，在打包后的js文件中可以看到
        new webpack.BannerPlugin('make 2020 by guowuhou')
    ],
    module:{ //模块
        // noParse: /jquery/, //不去解析解析jq中的依赖库
        rules: [ //规则,css-loader解析@import这种语法的,即解析index.css中引入的a.css
            //style-loader 他是把css插入到html中head的标签中
            //loader的用法:字符窜只用一个loader,多个loader需要用[],loader还可以写成对象方式，可以多传入些参数
            //loader是有顺序的,默认是从右向左执行,从下到上执行
            // {test: /.css$/, use: 'css-loader'}
            // {test: /.css$/, use: ['style-loader', 'css-loader']}
            //    {
            //        test: /.css$/, 
            //        use: [{
            //            loader: 'style-loader'
            //         //    options: { 
            //         //         //这个是解决样式优先级的问题，即html文件里写了css样式,js中又引入了相对应的样式，优先选择谁的问题
            //         //         insert:'top'
            //         //      }
            //           },'css-loader'
            //        ]
            //    },
               {  
                   //用MiniCssExtractPlugin抽离样式的写法
                   test: /.css$/, 
                   use: [
                       MiniCssExtractPlugin.loader,
                       'css-loader',
                       {loader: 'postcss-loader'} //在transform样式上加上浏览器的前缀
                   ]
               },
               {
                   //可以处理less文件
                    test: /.less$/, 
                    use: [
                    //     {
                    //         loader: 'style-loader'
                    // //    options: { 
                    // //         //这个是解决样式优先级的问题，即html文件里写了css样式,js中又引入了相对应的样式，优先选择谁的问题
                    // //         insert:'top'
                    // //      }
                    //     },
                         MiniCssExtractPlugin.loader,
                        'css-loader', //@import 解析路径
                        'less-loader', //把less转换成css
                        {loader: 'postcss-loader'} //在transform样式上加上浏览器的前缀
                    ]
               },
            //    {
            //         test: /\.js$/,
            //         use: {  //es语法的校验 首先需要去eslint官网下载.eslintrc.json文件并放入到文件中
            //             loader: 'eslint-loader',
            //             options: {
            //                 enforce: 'pre' //previous 强制在开始的时候就执行，post是后面
            //             }
            //         }
            //    },
               { //图片处理
                    test: /\.(png|jpg|jpeg|gif)$/,
                    //做一个限制，当我们的图片小于200kb的时候用base64来转化
                    //否则用file-loader产生真实的图片
                    use: {
                        loader: 'url-loader',
                        options: {
                            // limit: 200*1024, 这个是现在图片的大小
                            limit: 1,
                            outputPath: '/img/', //输出图片在打包文件里的路径
                            //注意：慎重使用publicPath，如果开启，可能会找不到对应的图片
                            // publicPath: 'http://guowuhou.com', //会在打包后的html中引入的图片加上这一前缀，和output里的publicPath一样，其中这个只在这里面生效
                            esModule: false //使用了html-withimg-loader需要加这一项
                        }
                    }
               },
               { //在html中通过src引入 图片处理
                    test: /\.html$/,
                    use: 'html-withimg-loader'
               },
               {
                   test: /\.js$/,
                   exclude: /node_modules/, //排除
                //    include: path.resolve(__dirname,'src') //在src目录下找
                   use: [
                       { 
                        loader: 'babel-loader',
                        options: {
                            presets: [ // 用babel-loader 把es6转换成es5
                                '@babel/preset-env'
                            ],
                            plugins: [ //es7高级语法的转换如 class A{ a=1 };还有es7更高级的语法，这里需要再安装一些插件，比较繁琐，暂时不安装了
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                     }
                   ]
               }
        ]
    },
    optimization:{ //优化项
        minimizer:[ 
            //此项是为了压缩打包后js文件的操作
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            //此项是为了压缩打包后css样式的操作
            new optimizeCss()
        ]
        // splitChunks: { //用于多页面打包时引入相同文件的处理,单页面不建议用
        //     cacheGroups:{ //缓存组
        //         common:{ //公共的模块,抽离如a.js,b.js文件，
        //             chunks: 'initial'
        //             minSize: 0,
        //             minChunks: 2 //用过2次以上就开始抽离出来
        //         },
        //         vendor:{ //抽离第三方，如jquery
        //             priority: 1, //权重,先抽离这部分
        //             test: /node_modules/,
        //             chunks: 'initial',
        //             minSize: 0,
        //             minChunks: 2 //用过2次以上就开始抽离出来
        //         }
        //     }
        // }
    }
}


//还有ignorePlugin 忽略引入库中的某些部分，例如引入的时间插件moment里面支持中文等很多中语言
//而，我们只需要中文，所以只要引入中文部分，这样可以减少打包时生成包的体量，具体用法去百度，这里不做介绍

//同样还有dllPlugin动态引入包也需要自行去百度，此处未列举出来，按需要引入

//happypack多线程 进程打包,用于打包大型项目时减少打包时间，具体用法这里不做介绍