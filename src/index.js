let str = require('./a.js');
require('./index.css');
require('./index.less');

import moment from 'moment';
let r = moment().format();
console.log(r);

//发送ajax请求
let xhr = new XMLHttpRequest();
//http://localhost:8080 webpack-dev-serve的服务 
xhr.open('GET','/api/user',true);
xhr.onload = function(){
    console.log(xhr.response)
};
xhr.send();

let url = "";
if(DEV === 'dev'){
    url = 'http://localhost:3000';
}else{
    url = 'http://www.baidu.com';
};
console.log(url);
console.log(DEV);

//webpack打包图片
//file-loader默认会在内部生成一张图片到build目录下，并把生成的名字返回回来
import logo from './logo192.png'; //把图片引入，返回的结果是一个新的图片地址
console.log(logo);
let image = new Image();
image.src = logo;
document.body.appendChild(image);

// import $ from 'jquery';
// console.log($);

// import $ from 'expose-loader?$!jquery'; //这种写法是吧jq暴露到全局
console.log($);//这个$在webpack.base.js中plugins配置了全局插件，可以拿到

//1,expose-loader  //暴露到windows全局的loader，内联loader
//2,providePlugin  //全局的如：console.log($)
//3,在html中引入cdn  //不打包
//loader有4种 。pre 前面执行 normal普通的 内联loader post后置loader



// function fn1(){
//     console.log("hello world");
// }
// fn1();
let fn1 = ()=>{
    console.log('gwhtestss666')
};
fn1();

class A{
    a = 1;
};
let a = new A();
console.log(a.a);
console.log(str);

//以下为webpak懒加载的应用
let button = document.createElement('button');
button.innerHTML = 'hello button';
document.body.appendChild(button);
button.addEventListener('click', ()=>{
    //这种写法是动态加载文件，即点击按钮的时候才会加载b.js文件
    import('./b.js').then((data) => {
        console.log(data.default);
    })
})

//在packjson文件中"scripts"这里配置了"build": "webpack" 就可以执行npm run build 打包命令,生成打包的文件
//在packjson文件中"scripts"这里配置了"dev": "webpack" 就可以启动服务本地服务 执行npm run dev 打包命令，不会自动生成打包的文件