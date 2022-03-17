# day04

## 今日任务
1. 使用mockjs模拟今日推荐和楼层的接口
2. 根据mock的接口实现动态TodayRecommend与Floor组件
3. mock一下Rank与Like组件的数据, 并动态显示(自己完成)
4. Search组件和SearchSelector组件动态显示
5. 根据分类/关键字条件进行搜索
6. 根据品牌进行搜索
7. 根据平台属性进行搜索



## 3) 使用mockjs来mock接口

```
下载mockjs, 引入使用
mockjs: 生成随机数据，拦截 Ajax 请求, 返回生成的随机数据
定义mock json数据: 使用mockjs的随机语法
mockServer中: 通过Mock.mock()来定义mock接口
main.js中: 引入mockServer
```



## 根据mock的接口实现动态TodayRecommend与Floor组件

```
api: 
	mockAjax: 封装axios
	index: reqRecommends() / reqFloors()
vuex
    state: banners / floors
    mutation: RECEIVE_BANNERS() / RECEIVE_FLOORS()
    action: getBanners() / getFloors()
组件
	dispatch()
	mapState()
```



## 自己mock一下Rank与Like组件的数据, 并动态显示



## Search静态组件和动态显示

	api: reqProductList
	vuex: search.js---state/mutations/actions/getters
	component: dispatch() / mapGetters() / 模板显示



## 搜索商品分页列表数据的条件参数
	category1Id: '', // 一级分类ID
	category2Id: '', // 二级分类ID
	category3Id: '', // 三级分类ID
	categoryName: '', // 分类名称
	keyword: '', // 搜索关键字
	props: [], // ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
	trademark: '', // 品牌: "ID:品牌名称"示例: "1:苹果"
	order: '', // 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
	pageNo: 1, // 页码
	pageSize: 10, // 每页数量



## 根据分类/关键字条件进行搜索

	搜索的条件
	1. 关键字搜索: keyword
	2. 分类搜索: category1Id / category2Id / category3Id / categoryName
	
	初始化搜索:
		在created中收集参数数据到options中, 并发送搜索的请求
	
	问题: 当前已经在搜索页面, 再添加别的搜索条件, 不会再发请求?
	原因: 从搜索跳转到搜索, 搜索组件对象不会重新创建, 初始化的勾子不会重新执行 ==> 不会再发请求
	解决: 监视路由参数的变化  watch: $route  一旦参数发生了变化, 监视的回调就会自动调用
	
	动态显示分类和关键字条件, 并实现删除重新请求
		读取状态数据显示, 需要判断有才显示
		重置数据
		重新发请求获取新的列表数据
		
	问题: 删除分类和关键字条件, 地址栏还有参数数据
	原因: 删除时没有去除路径上的参数数据
	解决: 重新跳转到search, 不再携带删除的条件所对应的参数
	
	问题: 删除关键字条件, 搜索框中的数据没有清除
	解决: 使用全局事件总线进行兄弟组件间通信
		1) 创建或指定事件总线对象, 保存到Vue的原型上
		2). 在Header中绑定自定义事件监听, 在回调中清除数据
		3). 在Search中分发事件
		
		4). 在Header组件死亡之前解绑事件监听: 在beforeDestory中
	
	问题: 在搜索界面多次跳转后, 点击返回不能一次性跳转到首页
	原因: 跳转到搜索界面都是用的push
	解决:
		从首页到搜索页: push()
		从搜索到搜索页: replace()
		
	代码优化: 使用watch的immediate为true让监视的回调初始执行一次



## 根据品牌进行搜索

	搜索的条件数据: trademark: '', // 品牌: "ID:品牌名称"示例: "1:苹果"
	点击每个品牌:
		更新options中的trademark为指定的值: 子向父通信 ==> 选择函数props
		重新请求获取数据列表
		注意: 需要判断一下是否已经在条件了
	删除品牌条件
		重置品牌数据: option.trademark = ''
		重新请求获取数据列表
		



## 根据属性进行搜索

```
属性的条件数据:  props: [], // ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]

点击某个属性值:
	如果已经存在条件数组中, 不添加
	向props数组添加一个条件字符串 子向父通信==>vue自定义事件
	重新请求获取数据列表

点击删除某个属性条件:
	删除数组中对应的条件字符串
	重新请求获取数据列表
```



	

