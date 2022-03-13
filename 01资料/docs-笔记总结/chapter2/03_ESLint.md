# 3. ESLint

## 3.1. 理解

1. ESLint是一个代码规范检查工具

2. 基本已替代以前的JSHint

## 3.2. ESLint提供以下支持

1. ES5/ES6

2. JSX

## 3.3. ESLint提供以下几种校验

1. 语法错误校验

2. 不重要或丢失的标点符号，如分号

3. 没法运行到的代码块

4. 未被使用的参数提醒

5. 漏掉的结束符，如}

6. 检查变量的命名

## 3.4. 规则的错误等级有三种

- off/0: 关闭规则检查。

- warn/1：打开规则检查，并且作为一个警告（输出提示文本黄色）。

- error/2：打开规则检查，并且作为一个错误（输出提示文本红色）。

## 3.5. 相关配置

1. package.json : 全局规则配置文件

```js
"rules": {
    "no-unused-vars": "off"
}
```



2. 在js/vue文件中修改局部规则

```js
/* eslint-disable no-unused-vars */
var xxx = 123
```

 

3. vue.config.js: 关闭规则检查

```js
module.exports = {
  // lintOnSave: false, // 关闭ESLint的规则检查
  lintOnSave: 'warning', // 输出提示错误, 但项目继续运行
}
```

 