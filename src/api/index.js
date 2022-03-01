/*
* 包含应用的所有接口的接口请求函数
* 函数内部调用Ajax函数发送请求
* 函数返回的是promise对象
* */
import ajax from "@/api/ajax";

// 首页三级分类
// /api/product/getBaseCategoryList  GET
export function reqCategoryList() {
    return ajax({
        url: '/product/getBaseCategoryList',
    })
}