//利用mockjs提供mock接口
import Mock from "mockjs"
import recommends from "./recommends.json"
import floors from "./floors.json"
import banner from './banner.json'

//提供今日接口
Mock.mock('/mock/recommends', {code: 200, data: recommends})

//提供楼层接口
Mock.mock('/mock/floors', {code: 200, data: floors})

//模拟首页大的轮播图的数据
Mock.mock("/mock/banner", {code: 200, data: banner});
