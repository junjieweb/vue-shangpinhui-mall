# day02
## 今日任务
	1). Home组件及其子组件(静态)
	2). 后台接口与使用postman测试接口
	3). axios二次封装与接口请求函数封装
	4). 使用vuex管理组件状态数据
	5). TypeNav组件动态展现
	6). TypeNav纯前台(与用户)交互效果

## Home组件及其子组件(静态)
    1). TypeNav: 3级分类导航
    2). ListContainer: 包含轮播列表的容器
    3). TodayRecommend: 今日推荐
    4). Rank: 排行
    5). Like: 猜你喜欢
    6). Floor: 楼层
    7). Brand: 品牌
    注意: 图片

## 后台接口与使用postman测试接口
    1). 启动 ===> 选择登陆==> cancel ===> 进入主界面
    2). 输入url/参数进行请求测试
    3). 注意post请求体参数需要指定为json格式(后台只支持json格式, 不支持urlencoding)
    4). 保存测试接口 ==> 后面可以反复使用



## ajax与后台进行交互

1. 下载依赖包: npm install axios nprogress

2. axios的二次封装(axios本身就是对XHR原生ajax的封装)     面试必说

- 1)  封装通用的基础与超时时间
   ```
   axios.create({
   	baseURL: '/api',
   	timeout: 200000
   })
   ```

- 2) 显示请求进度条效果: nprogress
	
    显示进度: 在请求拦截器中: NProgress.start()
    
    隐藏进度: 在响应拦截器成功和失败的回调中: NProgress.done()
	
- 3) 请求成功得到不再是response, 而是response.data (响应体数据)
	
	在响应拦截器成功的回调中: return response.data
	
- 4) 请求出错, 做统一的错误提示, 让特定请求还可以对错误做特定处理

	在响应拦截器失败的回调中:    
  
    提示错误: alert(error.message)
  
    抛出error: throw error

3. 接口请求函数模块

	包含项目中所有接口对应的ajax请求函数
   
    函数的返回值是promise, 函数内部调用ajax模块发请求
   
    需要掌握一个技能: 根据接口文档, 定义接口请求函数

4. 测试调用接口请求函数获取数据
- 出404错误

  - axios配置请求地址: /api/product/getBaseCategoryList
  - 发请求所在的基础url: http://localhost:8080
  -  http://localhost:8080/api/product/getBaseCategoryList(没有处理, 就404)
  - 后台接口的地址: http://39.99.186.36/api/product/getBaseCategoryList(没有处理)

- 解决办法1: 使用CORS解决ajax请求跨域

  - 给axios指定正确的地址: baseURL: http://39.99.186.36/api
  - 这样ajax请求就跨域了: 服务器返回特别的响应头
  - Access-Control-Allow-Origin: http://localhost:8080
  - Access-Control-Allow-Credentials: true

- 解决办法2: 使用代理服务器   开发中用得比较多

  - 配置代理服务器: 

    ```js
    devServer: {
        proxy: {
            '/api': { // 只对请求路由以/api开头的请求进行代理转发
                target: 'http://39.99.186.36', // 转发的目标url
                changeOrigin: true // 支持跨域
            }
        }
    },
    ```

  -  配置baseURL: baseURL: '/api'



## axios发请求内部流程(理解)

```
service.get('/xxx').then(
	result => { // 接收到是响应拦截器成功回调返回的结果
        
    },
    error => { // 接收到是响应拦截器失败回调抛出的error
        
    }
)

get内部执行

    Promise.resolve(config)
    .then((config) => {  // 请求拦截器
        return config
    })
    .then((config) => { // 发异步ajax
        return new Promise((resolve, reject) => {
            根据config使用xhr发ajax请求

            // 如果成功了, 创建response对象
            resolve(response)
            // 如果失败了, 创建error对象
            reject(error)

        })
    })
    .then(
        (response) => { // 响应拦截器成功的回调
            return response.data
        },
        (error) => {  // 响应拦截器失败的回调
           throw error
        }
    )

```



## 使用vuex管理组件状态数据

```js
1) vuex用来做什么?
    vuex用来管理多个组件共享的状态数据
    从后台动态获取数据

2) vuex的基本使用
    store相关: index / state / mutations / actions / getters 
    注册store: vm中注册store  ==> 组件中通过$store得到store对象
    	.state
    	.getters
    	.dispatch(actionName, data)
    	.commit(mutationName, data)
    组件:  通过$store来读取或更新vuex管理的state数据
          也可以通过mapState() / mapGetters() / mapMutations() / mapActions()

3) vuex的多模块编程的必要性
    vuex单模块问题: 需要的管理状态数据比较多, 那对应的mutations/actions模块就会变得比较大
        如果添加新的数据管理, 需要修改现在文件(不断向其添加内容) 
    vuex多模块编程: 对各个功能模块的数据分别进行管理, 这样更加具有扩展性
    什么时候需要用vuex多模块编程?  需要vuex管理的数据比较多时使用

4) 多模块编程的总state结构:
    {
        home:{
            categoryList: [], // 分类列表
            xxx: {},
            yyy: 'atguigu'
        }
        user: {
            userInfo: {}
        }
    }

5) 针对三级分类使用vuex管理
  a. api
  	接口请求函数: reqCategoryList
  b. vuex   home.js
  	state: categoryList: []
  	mutations: RECEIVE_CATEGORY_LIST(state, categoryList) {}
  	action:
  		async getCategoryList ({commit}) {
  			// 发异步ajax请求, 获取数据
  			const result = await reqCategoryList()
  			// 如果成功了, 取出数据, 提交给mutation
  			if (result.code===200) {
  				commit('RECEIVE_CATEGORY_LIST', result.data)
  			}
  		}
  	getters
  
  c. component
  	分发异步action: dispatch('getCategoryList')
  	读取state数据: 
  		$store.state.home.categoryList
  		mapState({categoryList: state => state.home.categoryList})
  	模板中动态显示
  		v-for
  		{{}}
```




## 分类列表的交互效果

### 1) 点击分类项跳转到搜索界面, 携带分类id与分类名称

```
实现: 使用声明式路由导航
问题: 显示太慢 
原因:  <router-link>太多了, 产生的组件对象太多
```



### 2) 使用编程式导航代替声明式导航

```
好处: 显示更快
原因: 不用再产生router-link的组件对象
问题: 每个分类项都绑定了点击监听, 数量太多  ==> 能不能只绑定一个监听
```



### 3) 使用事件委托/委派/代理

```
给所有的分类项的父元素绑定点击监听, 通过event.target得到分类项
好处: 只用绑定一个点击监听了, 提高事件处理效率
问题: 不知道你点击的是哪个分类项(也就是它的数据)
```



### 4) 使用标签的data自定义属性

```js
解决: 携带分类数据
编码: 
	在每个分类项的a标签上使用 data-xxx属性来携带分类ID与分类name数据
	在点击回调中, 通过event.target.dataset中取出data自定义属性值 (注意大小写)
```

