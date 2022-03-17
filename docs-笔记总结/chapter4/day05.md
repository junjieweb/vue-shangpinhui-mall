# day05

## 今日任务
	1. 排序搜索 
	2. 自定义分页组件
	3. Detail静态路由组件
	4. Detail组件的动态显示
	5. ImageList组件
	6. Zoom组件



## 排序搜索

	条件数据:  order: '', // 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
			orderFlag: 排序项  1: 综合,2: 价格, 3: 销量
			orderType: 排序方式 asc: 升序,desc: 降序
			orderFlag:orderType
			
	根据order动态显示排序项和排序方式
		
	点击某个排序项:
		更新options中的order
			点击的是当前排序项: 只需要切换orderType
			点击的不是当前排序项:  更新orderFlag为指定的值, orderType更新为desc
		请求获取商品分页列表



## 问题: 优化减少没必要的请求参数

	原因: 当前的后台接口不需要空串参数或空数组参数
	解决: 在发请求前(在异步action中), 删除空串或数组数据
		对对象进行浅拷贝操作: {...obj}  / [...arr]



## 响应式数据对象: 添加新属性和删除属性

	响应式数据: data和state中的数据都是响应式数据
	响应式数据对象: 是值为对象的响应式数据, 响应式对象内部的所有层次数据都是响应式: options / shopList
	
	向响应式对象中添加新的属性
		不正确的方式: options.xxx = 'abc'  界面不会更新 ==> 直接添加的属性不是响应式的
		正确的方式: Vue.set( target, propertyName/index, value )
				  this.$set(target, propertyName/index, value)
	删除响应式对象中的属性
		应式对象中添加新的属性
		不正确的方式: delete options.xxx 界面不会更新
		正确的方式: Vue.delete( target, propertyName/index )
				  this.$delete(target, propertyName/index)
				  
	直接给组件对象添加一个属性也就是非响应式的: this.xxx = 'abc' 



## 自定义分页组件

```
1. 使用组件
	<Pagination
            :currentPage="options.pageNo"
            :total="total"
            :pageSize="options.pageSize"
            :showPageNo="3"
            @currentChange="currentChange"
          />
          
2. 定义一个高复用的组件的基本流程
	模板与样式 ===> 静态组件
	设计props: 从父组件(外部)传入的可变数据
		currentPage: 当前页码
		total: 所有数据的总数量
		pageSize: 每页的最大数量
		showPageNo: 最大连续页码数
	设计data: 组件内部的可变数据
		myCurrentPage:内部保存的当前页码数
	设计computed: 基于props和data计算的数据
		totalPages: 总页数
		start/end: 连续页码数的开始页码与结束页码
			const {myCurrentPage, showPageNo, totalPages} = this
			let start, end
			start = myCurrentPage - (showPageNo-1)/2
			if (start<1)  start = 1
			end = start + showPageNo - 1
			if (end>totalPages) {
				end = totalPages
				start = end - showpageNo + 1
				if (start<1)  start = 1
			}
			
			return {start, end}
	根据数据动态显示界面
	当组件内部数据发生改变后, 有可能需要通知父组件(分发自定义事件)
	当父组件的数据发生改变后, 有可能需要通知子组件(当前)
		父组件中得到子组件对象后调用子组件的方法来更新子组件的数据  ==> 后面会用
		子组件监视父组件传入的数据变化
```




### v-for与v-if的优先级   面试题

```
v-for的优先级高: 解析v-for遍历产生多个标签, 接着在每个标签上解析v-if
v-for与v-if同时使用
	问题: 效率低, 多执行了一些v-if的解析判断
	解决: 
		情况1: 如果v-if的判断是根据数组的每一项来判断的 ==> 解决办法就是定义计算提前对数组进行过滤处理
		情况2: 如果v-if的判断是根据其它数据判断的 ==> 解决办法就是在外边加一层标签并在它上用v-if  ==> 只执行一次v-if判断


```




## Detail静态路由组件
	定义Detail静态组件
	注册路由
	从Search跳转Detail组件: router-link/push()
	问题: 路由跳转后, 滚动条没有停留在最上面(0,0)
		scrollBehavior (to, from, savedPosition) {
	    	// return 期望滚动到哪个的位置
	    	return { x: 0, y: 0 }
	  	}

## Detail组件的动态显示
	api: getDetailInfo()
	vuex: detail.js: state/mutations/actions/getters
	component: dispatch()/mapState()/mapGetters()/模板

## 错误: "TypeError: Cannot read property 'category1Name' of undefined"
	说明: 在undefined上读取了category1Name属性
	原因:  data/state中的数据初始值是一个空对象/空数组, 如果模板中直接写一个三层(a.b.c)表达式
	解决1: 想办法不让detailInfo.categoryView的结果是undefined, 利用getters
	解决2: 利用v-if来判断, 只有当有数据才解析显示,  ==> 不能使用v-show
	
	imageList[currentIndex].imgUrl    a.b.c  v-if="a.b"  v-show="a.b"

## 销售属性列表功能 (大家自己做)
	功能: 
		二层嵌套列表 
		点击某一项就选中对应的项
	数据: 
		detailInfo中的spuSaleAttrList属性
		isChecked属性为'1'时代表是当前的
	
	功能: 动态显示 / 交互
	数据结构

## ImageList组件
	使用swiper显示小图片轮播列表:
		slidesPerView: 5,  // 一次显示5页
	  	slidesPerGroup: 5, // 每次翻动多少(5)页
	使用currentIndex标识当前图片下标, 点击时更新它

## Zoom组件
	根据传入的imgUrl和bigUrl来动态显示中图和大图
	放大镜效果的布局:
		左侧:
			<img>: 显示中图
			event的<div>: 用来绑定mousemove事件, 尺寸与<img>一样
			mask的<div>: 遮罩, 尺寸是<img>的1/4
		右侧:
			big的<div>: 包含<img>, 尺寸与左侧<img>一样
			<img>: 显示大图, 尺寸是左侧<img>的4倍  ==> 右侧只能看到大图的1/4部分
	放大镜的事件处理
		绑定什么事件监听?
			mousemove
		给谁绑定?
			左侧的event <div>
		回调函数中做什么?
			计算left与top值:
				依赖数据: 事件的offsetX/offsetY, mask <div>的宽度maskWidth
				算法:
					left = offsetX - maskWidth/2
					top = offsetY - maskWidth/2
					left和top必须在[0, maskWidth]区间内
	
			指定mask <div>的坐标值(left, top)
				maskDiv.style.left = left + 'px'
				maskDiv.style.top = top + 'px'
			指定大图 <img>的坐标值(left, top)
				bigImg.style.left = -2 * left + 'px'
				bigImg.style.top = -2 * top + 'px'
## 编码分析
	ImageList
		读取vuex getters中的数据
		swiper
			slidesPerView: 5
			slidesPerGroup: 5
		currentIndex = 0
		点击某个小图更新Detail组件currentImageIndex(子向父通信)
	
	Zoom
		props: imgUrl / bigUrl
		放大镜效果
			mousemove
	
	Detail
		skuImageList
		currentImageIndex = 0
		skuImageList[currentImageIndex].imgUrl    v-if="skuImageList[currentImageIndex]"
		<Zoom :imgUrl="skuImageList[currentImageIndex].imgUrl" v-if="skuImageList[currentImageIndex]"/>