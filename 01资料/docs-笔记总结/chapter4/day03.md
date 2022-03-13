# day03
## 今日任务
	1. TypeNav的交互(与用户)效果
	2. 首页广告轮播(swiper + vue-awesome-swiper)
	3. 模拟数据/接口(mockjs)
	4. 根据mock的接口实现动态TodayRecommend与Floor组件
	5. 自己mock一下Rank与Link组件的数据, 并动态显示

## TypeNav的交互(与用户)效果

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
```
解决: 携带分类数据
编码: 
	在每个分类项的a标签上使用 data-xxx属性来携带分类ID与分类name数据
	在点击回调中, 通过event.target.dataset中取出data自定义属性值
```

### 5) 事件控制二三级分类列表的显示与隐藏

```
设计一个标识当前需要显示子列表的分类项的下标: currentIndex
定义当前分类项的样式类: active
给每个分类项div绑定mouseenter监听 ==> this.currentIndex = index
给包含所分类列表和标题的div绑定mouseleave监听 ==> currentIndex = -1    注意: 有可能需要修改布局

```

### 6) 优化高频事件触发处理: 利用lodash进行函数节流

```
问题: 在快速滑动时, mouseenter事件高频触发, 导致currentIndex高频更新 ==> 界面在高频更新(没有必要)
解决: 利用lodash的throttle进行函数节流
	回调函数不能使用箭头函数, 原因在于箭头函数没有自己的this, 且不能通过bind来指定特定this
```

### 7) 优化减小打包文件: 对lodash库实现按需引入

```
问题: import _ from 'lodash'  // 引入整个lodash为, 还没有使用的工具函数也被打包了
解决: import throttle from 'lodash/throttle' // 只引入需要的工具函数 ==> 打包文件变小了
```

### 8) 解决快速移出后可能显示第一个分类的子分类列表的bug

```
原因: 在进入第一个分类项后0.5s才真正更新currentIndex为0
	但在0.5s内, 已经移出了整体div ==> 将currentIndex变为了-1
	也就是当移出整个div后currentIndex变为了0
解决1: 配置trailing为false
	最后一个事件不延迟处理, 那最后的currentIndex变为了0就不会发生
	新问题: 快速从一个分类移动另一个分类不动了  ==> 不会选中当前分类 (最后一个事件不延迟处理了) 
解决: 设计currentIndex有3种值
	-2: 出了整个div
	-1: 进入了整个div, 但还没有进入分类项上
	>=0: 光标在某个分类项上(只有当不为-2才更新)
```

### 9) 控制一级列表的显示与隐藏

```
设计状态数据: isShowFirst
初始值: 只有当是home路由时显示, 其它是隐藏
什么时候更新为true: 当光标进入包含大标题和分类的div
什么时候更新为false: 移出大的div / 点击了分类项后
```

### 10)  一级列表显示隐藏的过渡效果

```
给显示隐藏的元素包上一个<transition name="xxx">
在显示/隐藏过程的类名下指定: transition样式
在隐藏时的类名下指定: 隐藏的样式
```

### 11) 合并分类query参数与搜索的关键字params参数

```
问题: 
	当根据分类跳转search时, 丢了keyword的params参数
	当根据keyword跳转search时, 丢了categoryName/cateory1Id/cateory2Id/cateory3Id的query参数
解决:
	当根据分类跳转search时, 同时携带上keyword的params参数
	当根据keyword跳转search时,携带上catgoreyName/cateory1Id/cateory2Id/cateory3Id的query参数
```



## 首页广告轮播(swiper + vue-awesome-swiper)

### 1) 动态获取广告轮播的列表数据

```
1. api
2. vuex
3. component
```

### 2) 创建swiper对象实现动态轮播

```js
new Swiper(this.$refs.mySwiper, {
    loop: true, // 循环模式选项
    autoplay: {
      disableOnInteraction: false, // 用户操作后, 恢复自动轮播
    }, // 自动轮播
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
})
```

- 问题1: 如果直接在mounted中创建swiper对象, 没有轮播效果
  - 原因: swiper必须要在列表界面显示之后创建才有效果, 创建得太早了
  - 解决: watch + $nextTick()
    - watch: 知道bannerList已经有数据了
    - $nextTick: 知道列表已经显示了

- 问题2: 如果用class选择器查找swiper根元素, 会影响页面上的其它轮播效果  
  - 原因: class选择器匹配到了其它轮播界面
  - 解决: 使用ref查找

### 3) 使用swiper的vue组件库: vue-awesome-swiper

```js
// 引入swiper的Vue组件库
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 引入swiper的模式
import 'swiper/css/swiper.css'
// 安装插件
Vue.use(VueAwesomeSwiper)

<swiper :options="{
  loop: true, // 循环模式选项
  autoplay: {
    disableOnInteraction: false, // 用户操作后, 恢复自动轮播
  }, // 自动轮播
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}">
  <swiper-slide v-for="banner in bannerList" :key="banner.id">
    <img :src="banner.imageUrl" style="height: 464px;width:100%;"/>
  </swiper-slide>
  <div class="swiper-button-prev" slot="button-prev"></div>
  <div class="swiper-button-next" slot="button-next"></div>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
```



### 模拟数据/接口(mockjs)

### 1) mock数据接口

```
问题: 当前首页只有分类的接口写好, 其它数据的接口还没有写好
解决: 前端工程师自己mock/模拟接口数据
```

### 2) 理解JSON数据

```
a.结构: 名称, 数据类型  ==> 用于读取数据值
b.value: 会显示到界面上
c.真实接口返回的数据与mock的数据的关系: value可以变, 但结构不能变
注意: 如果有变化 ==> 需要修改模板中读取显示的代码  ==> 真实情况是多少会有些不同, 变化越小需要修改的代码就越少
```

