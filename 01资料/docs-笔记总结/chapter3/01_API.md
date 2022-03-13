# 接口文档(前台PC)

## 1. 附录

### 1.1. 服务器地址

| 开发/测试服务器 | http://39.99.186.36/                   |
| --------------- | ---------------------------------------- |
| 线上服务器      | http://39.99.186.36/（真实场景不一样） |

### 1.2. 公共请求参数

- 每个接口需要的Header参数值（注册/登录接口不需要）

| 参数名称   | 类型                 | 是否必选 | 描述                   |
| ---------- | -------------------- | -------- | ---------------------- |
| token      | String               | Y        | 登录的token            |
| userTempId | String(通过uuid生成) | Y        | 未登陆用户生成的临时ID |

- 例如： 
  - token: d90aa16f24d04c7d882051412f9ec45b  后台生成
  - userTempId: b2f79046-7ee6-4dbf-88d0-725b1045460b 前台生成



## 2. 首页三级分类

### 2.1. 请求地址

/api/product/getBaseCategoryList

### 2.2. 请求方式
GET

### 2.3. 参数类型

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### 2.4. 返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": [
        {
            "categoryChild": [
                {
                    "categoryChild": [
                        {
                            "categoryName": "电子书",
                            "categoryId": 1
                        }
                    ],
                    "categoryName": "电子书刊",
                    "categoryId": 1
                }
            ],
            "categoryName": "图书、音像、电子书刊",
            "categoryId": 1
        }
    ],
    "ok": true
}
```



## 3. 搜索商品

### 3.1. 请求地址

/api/list

### 3.2. 请求方式

POST

### 4.3. 参数类型

| 参数名称     | 类型   | 是否必选 | 描述                                                         |
| ------------ | ------ | -------- | ------------------------------------------------------------ |
| category1Id  | string | N        | 一级分类ID                                                   |
| category2Id  | string | N        | 二级分类ID                                                   |
| category3Id  | string | N        | 三级分类ID                                                   |
| categoryName | string | N        | 分类名称                                                     |
| keyword      | string | N        | 搜索关键字                                                   |
| props        | Array  | N        | 商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"] |
| trademark    | string | N        | 品牌: "ID:品牌名称"示例: "1:苹果"                            |
| order        | string | N        | 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc" |
| pageNo       | number | N        | 页码                                                         |
| pageSize     | number | N        | 每页数量                                                     |

例子

```json
{
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": [
        "1:1700-2799:价格",
        "2:6.65-6.74英寸:屏幕尺寸"
    ],
    "trademark": "4:小米"
}
```

 

### 3.4. 返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": {
        "trademarkList": [
            {
                "tmId": 1,
                "tmName": "苹果"
            }
        ],
        "attrsList": [
            {
                "attrId": 1,
                "attrValueList": [
                    "4500-11999",
                    "2800-4499"
                ],
                "attrName": "价格"
            }
        ],
        "goodsList": [
            {
                "id": 2,
                "defaultImg": "http://192.168.200.128:8080/xxx.jpg",
                "title": "Apple iPhone 11 (A2223)",
                "price": 5499,
                "createTime": null,
                "tmId": null,
                "tmName": null,
                "category1Id": null,
                "category1Name": null,
                "category2Id": null,
                "category2Name": null,
                "category3Id": null,
                "category3Name": null,
                "hotScore": 0,
                "attrs": null
            }
        ],
        "total": 8,
        "pageSize": 2,
        "pageNo": 1,
        "totalPages": 4
    },
    "ok": true
}
```




## 4. 获取商品详情

### 4.1.请求地址

/api/item/{ skuId }

### 4.2. 请求方式

GET

### 4.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| skuId    | string | Y        | 商品ID |

### 4.4. 返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": {
        "valuesSkuJson": "{\"3|5|7\":6,\"3|4|7\":2,\"2|4|7\":3,\"2|5|7\":4}",
        "price": 5499,
        "categoryView": {
            "id": 61,
            "category1Id": 2,
            "category1Name": "手机",
            "category2Id": 13,
            "category2Name": "手机通讯",
            "category3Id": 61,
            "category3Name": "手机"
        },
        "spuSaleAttrList": [
            {
                "id": 1,
                "spuId": 1,
                "baseSaleAttrId": 1,
                "saleAttrName": "选择颜色",
                "spuSaleAttrValueList": [
                    {
                        "id": 1,
                        "spuId": 1,
                        "baseSaleAttrId": 1,
                        "saleAttrValueName": "黑色",
                        "saleAttrName": "选择颜色",
                        "isChecked": "0"
                    }
                ]
            },
            {
                "id": 2,
                "spuId": 1,
                "baseSaleAttrId": 2,
                "saleAttrName": "选择版本",
                "spuSaleAttrValueList": [
                    {
                        "id": 4,
                        "spuId": 1,
                        "baseSaleAttrId": 2,
                        "saleAttrValueName": "64GB",
                        "saleAttrName": "选择版本",
                        "isChecked": "1"
                    }
                ]
            },
            {
                "id": 3,
                "spuId": 1,
                "baseSaleAttrId": 3,
                "saleAttrName": "选择套装",
                "spuSaleAttrValueList": [
                    {
                        "id": 7,
                        "spuId": 1,
                        "baseSaleAttrId": 3,
                        "saleAttrValueName": " 官方标配",
                        "saleAttrName": "选择套装",
                        "isChecked": "1"
                    }
                ]
            }
        ],
        "skuInfo": {
            "id": 2,
            "spuId": 1,
            "price": 5499,
            "skuName": "Apple iPhone 11 (A2223) 64GB 红色 移动联通电信双卡双待",
            "skuDesc": "主体\n入网型号\nA2223\n品牌\n机身厚度（mm）\n8.3\n运营商标志或内容\n无",
            "weight": "0.47",
            "tmId": 1,
            "category3Id": 61,
            "skuDefaultImg": "http://192.168.200.128:8080/xxxx.jpg",
            "isSale": 1,
            "skuImageList": [
                {
                    "id": 6,
                    "skuId": 2,
                    "imgName": "63e862164165f483.jpg",
                    "imgUrl": "http://192.168.200.128:8080/Ad5YSAANTQTjaVjQ819.jpg",
                    "spuImgId": 2,
                    "isDefault": "0"
                }
            ],
            "skuAttrValueList": [
                {
                    "id": 6,
                    "attrId": 1,
                    "valueId": 6,
                    "skuId": 2
                }
            ],
            "skuSaleAttrValueList": null
        }
    },
    "ok": true
}
```



## 5. 获取购物车列表

### 5.1. 请求地址

/api/cart/cartList

### 5.2. 请求方式

GET

### 5.3. 参数类型

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### 5.4. 返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": [
        {
            "id": 61,
            "userId": "2",
            "skuId": 4,
            "cartPrice": 5999,
            "skuNum": 4,
            "imgUrl": "http://192.168.200.128:8080xxx.jpg",
            "skuName": "Apple iPhone 11 (A2223) ",
            "isChecked": 1,
            "skuPrice": 5999
        },
        {
            "id": 62,
            "userId": "2",
            "skuId": 2,
            "cartPrice": 5499,
            "skuNum": 1,
            "imgUrl": "http://192.168.200.128:8080/yyyy.jpg",
            "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
            "isChecked": 0,
            "skuPrice": 5499
        }
    ],
    "ok": true
}
```



## 6. 添加到购物车(修改数量)

### 6.1. 请求地址

/api/cart/addToCart/{ skuId }/{ skuNum }

### 6.2请求方式

POST

### 6.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述                             |
| -------- | ------ | -------- | -------------------------------- |
| skuID    | string | Y        | 商品ID                           |
| skuNum   | string | Y        | 商品数量正数代表增加负数代表减少 |

### 6.4返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 7. 切换商品选中状态

### 7.1. 请求地址

/api/cart/checkCart/{skuID}/{isChecked}

### 7.2. 请求方式

GET

### 7.3. 参数类型

| 参数名称  | 类型   | 是否必选 | 描述                               |
| --------- | ------ | -------- | ---------------------------------- |
| skuID     | string | Y        | 商品ID                             |
| isChecked | string | Y        | 商品选中状态0代表取消选中1代表选中 |

### 7.4返回示例

成功：

```json

{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 8. 删除购物车商品

### 8.1. 请求地址

/api/cart/deleteCart/{skuId}

### 8.2. 请求方式

DELETE

### 8.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| skuId    | string | Y        | 商品id |

### 8.4. 返回示例

成功：

```json

{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 9. 获取订单交易页信息

### 9.1. 请求地址

/api/order/auth/trade

### 9.2. 请求方式

GET

### 9.3. 参数类型

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### 9.4. 返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": {
        "totalAmount": 23996,
        "userAddressList": [
            {
                "id": 2,
                "userAddress": "北京市昌平区2",
                "userId": 2,
                "consignee": "admin",
                "phoneNum": "15011111111",
                "isDefault": "1"
            }
        ],
        "tradeNo": "1b23c1efc8144bfc83e51807f4e71d3a",
        "totalNum": 1,
        "detailArrayList": [
            {
                "id": null,
                "orderId": null,
                "skuId": 4,
                "skuName": "Apple iPhone 11 移动联通电信4G手机 双卡双待",
                "imgUrl": "http://192.168.200.128:8080/RLOAElEmAATrIT-1J9Q110.jpg",
                "orderPrice": 5999,
                "skuNum": 4,
                "hasStock": null
            }
        ]
    },
    "ok": true
}
```



## 10. 获取我的订单列表

### 10.1. 请求地址

/api/order/auth/{page}/{limit}

### 10.2. 请求方式

GET

### 10.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述         |
| -------- | ------ | -------- | ------------ |
| page     | string | Y        | 页码         |
| limit    | string | Y        | 每页显示数量 |

### 10.4. 返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": {
        "records": [
            {
                "id": 70,
                "consignee": "admin",
                "consigneeTel": "15011111111",
                "totalAmount": 29495,
                "orderStatus": "UNPAID",
                "userId": 2,
                "paymentWay": "ONLINE",
                "deliveryAddress": "北京市昌平区2",
                "orderComment": "",
                "outTradeNo": "ATGUIGU1584247289311481",
                "tradeBody": "Apple iPhone 11 (A2223) 128GB手机 双卡双待 A",
                "createTime": "2020-03-15 12:41:29",
                "expireTime": "2020-03-16 12:41:29",
                "processStatus": "UNPAID",
                "trackingNo": null,
                "parentOrderId": null,
                "imgUrl": null,
                "orderDetailList": [
                    {
                        "id": 81,
                        "orderId": 70,
                        "skuId": 2,
                        "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
                        "imgUrl": "http://192.168.200.128:8080/xxx.jpg",
                        "orderPrice": 5499,
                        "skuNum": 1,
                        "hasStock": null
                    }
                ],
                "orderStatusName": "未支付",
                "wareId": null
            }
        ],
        "total": 41,
        "size": 2,
        "current": 1,
        "pages": 21
    },
    "ok": true
}
```



## 10. 提交订单

### 10.1. 请求地址

/api/order/auth/submitOrder?tradeNo={tradeNo}

### 10.2. 请求方式

POST

### 10.3. 参数类型

| 参数名称        | 类型   | 是否必选 | 描述                     |
| --------------- | ------ | -------- | ------------------------ |
| traderNo        | string | Y        | 订单编号(拼接在路径中)   |
| consignee       | string | Y        | 收件人姓名               |
| consigneeTel    | string | Y        | 收件人电话               |
| deliveryAddress | string | Y        | 收件地址                 |
| paymentWay      | string | Y        | 支付方式(ONLINE代表在线) |
| orderComment    | string | Y        | 订单备注                 |
| orderDetailList | Array  | Y        | 存储多个商品对象的数组   |

例子:



### 10.4. 返回示例

成功：

```json

{
    "code": 200,
    "message": "成功",
    "data": 71, // orderId 订单号
    "ok": true
}
```



## 11. 获取订单支付信息

### 11.1. 请求地址

/api/payment/weixin/createNative/{orderId}

### 11.2. 请求方式

GET

### 11.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述                         |
| -------- | ------ | -------- | ---------------------------- |
| orderId  | string | Y        | 支付订单ID(通过提交订单得到) |

### 11. 4返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": {
        "codeUrl": "weixin://wxpay/bizpayurl?pr=P0aPBJK",
        "orderId": 71,
        "totalFee": 23996,
        "resultCode": "SUCCESS"
    },
    "ok": true
}
```



## 12. 查询支付订单状态

### 12.1. 请求地址

/api/payment/weixin/queryPayStatus/{orderId}

### 12.2. 请求方式

GET

### 12.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述       |
| -------- | ------ | -------- | ---------- |
| orderId  | string | Y        | 支付订单ID |

### 12.4. 返回示例

成功：

```json
// 支付中
{
    "code": 205,
    "message": "支付中",
    "data": null,
    "ok": false
}
// 支付完成
{
    "code": 200,
    "message": "支付完成",
    "data": null,
    "ok": true
}
```



## 13. 登录

### 13.1. 请求地址

/api/user/passport/login

### 13.2. 请求方式

POST

### 13.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述   |
| -------- | ------ | -------- | ------ |
| phone    | string | Y        | 用户名 |
| password | string | Y        | 密码   |

### 13.4. 返回示例

成功：

```json

{
    "code": 200,
    "message": "成功",
    "data": {
        "nickName": "Administrator",
        "name": "Admin",
        "token": "90aa16f24d04c7d882051412f9ec45b"
    },
    "ok": true
}
```

失败:

```json
{
    "code": 201,
    "message": "失败",
    "data": null,
    "ok": false
}
```



## 14. 获取用户信息

### 14.1请求地址

/user/passport/auth/getUserInfo

### 14.2. 请求方式

GET

### 14.3. 参数类型

无

### 14.4. 返回示例

成功：

```json
{
    "code": 200,
    "message": "成功",
    "data": {
        "id": 2,
        "loginName": "13700000000",
        "nickName": "Administrator",
        "passwd": "96e79218965eb72c92a549dd5a330112",
        "name": "Admin",
        "phoneNum": "2222",
        "email": "upd@qq.com",
        "headImg": "http://182.92.128.115:8080/rBFUDF5nPC6AHA1PAAAjaw5WDGc236.jpg",
        "userLevel": "2"
    },
    "ok": true
}
```

失败:

```json
{
    "code": 401,
    "message": "token已过期",
    "ok": false
}
```

 

## 15. 获取短信验证码?

### 15.1. 请求地址

/api/user/passport/code

### 15.2. 请求方式

GET

### 15.3. 参数类型

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### 15.4. 返回示例



## 16. 注册用户

### 16.1. 请求地址

/api/user/passport/register

### 16.2. 请求方式

POST

### 16.3. 参数类型

| 参数名称 | 类型   | 是否必选 | 描述         |
| -------- | ------ | -------- | ------------ |
| phone    | string | Y        | 注册手机号   |
| password | string | Y        | 密码         |
| code     | string | Y        | 验证码(任意) |

### 16.4. 返回示例

成功：

```json

{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 17. 退出登陆

### 17.1. 请求地址

/api/user/passport/logout

### 17.2. 请求方式

GET

### 17.3. 参数类型

无

### 17.4返回示例

成功：

```json

{
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
}
```



## 18. 首页广告轮播

### 18.1. 请求地址

/api/cms/banner

### 18.2. 请求方式

GET

### 18.3. 参数类型

| 参数名称 | 类型 | 是否必选 | 描述 |
| -------- | ---- | -------- | ---- |
| 无       | 无   | 无       | 无   |

### 18.4. 返回示例

成功：

```json
{
  "code": 200,
  "message": "成功",
  "data": [
    {
      "id": 1,
      "title": "小米电视4A 70英寸 4K超高清 HDR 二级能效 2GB+16GB L70M5-4A 内置小爱",
      "imageUrl": "http://47.93.148.192:8080/0kICAaGuxAAKnO3DNDcY020.jpg",
      "linkUrl": "http://item.atguigu.cn/21.html",
      "sort": 0
    },
    {
      "id": 3,
      "title": "test",
      "imageUrl": "http://47.93.148.192:8080/group1/MZcxyALfXOAAGJ0EtoY9k848.jpg",
      "linkUrl": "http://item.atguigu.cn/21.html",
      "sort": 0
    },
    {
      "id": 2,
      "title": "华为 HUAWEI P40 麒麟990 5G SoC芯片 5000万超感知徕卡三摄",
      "imageUrl": "http://47.93.148.192:8080/group1/sklaALrngAAHGDqdpFtU741.jpg",
      "linkUrl": "http://item.atguigu.cn/16.html",
      "sort": 1
    }
  ],
  "ok": true
}
```

