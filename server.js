//express 启动本地服务
// // 1)这个是webpack用代理的写法
let express = require('express');

let app = express();

app.get('/api/user', (req, res) => {
    res.json({name: 'guowuhou666888'});
});

app.listen(3000);

// (2)这个是webpack用有服务度端，不用代理来处理，能不能在服务端中启动webpack 端口用服务端端口的写法
// 需要安装webpack-dev-middleware 中间键
// let express = require('express');
// let app = express();
// let webpack = require('webpack');
// let middle = require('webpack-dev-middleware');

// let config = require('./webpack.base.js');
// let compiler = webpack(config);

// app.use(middle(compiler));

// app.get('/api/user', (req, res) => {
//     res.json({name: 'guowuhou666888'});
// });
// app.listen(3000);