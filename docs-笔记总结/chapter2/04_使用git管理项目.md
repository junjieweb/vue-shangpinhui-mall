
# 4. 使用git管理项目

## 4.1. 基本操作(一个分支master)

```shell
## 1). 创建本地仓库(代码在本地仓库中)
    创建.gitignore文本, 并配置好
    git init
    git add .
    git commit -m "init app"

## 2). 创建远程仓库
    New Repo
    指定仓库名
    创建		

## 3). 将本地仓库的代码推送到远程仓库
    git remote add origin url (在本地记录远程仓库的地址)
    git push -u origin master

## 4). 如果本地代码有修改, 要提交到本地仓库, 推送到仓库
    git add .
    git commit -m "xxx"
    git push

    git config --global credential.helper store (记住用户和密码)

## 5). 如果远程代码有修改, 要拉取到本地仓库
    git pull

## 6). 将远程仓库的代码clone到本地(生成仓库)
    git clone url
```



## 4.2. 多分支操作

```shell
## 1). 创建本地个人开发分支, 并推送到远程
    git checkout -b atguigu
    git push -u origin atguigu

## 3). 在个人开发分支上开发, 并推送到远程
    git add .
    git commit -m "xxx"
    git push

## 4). 根据远程个人开发分支创建本地个人开发分支
    git pull  (如果分支是在clone后创建的才需要执行)
    git checkout -b atguigu origin/atguigu

## 5). 将个人开发分支合并到master
    git checkout master
    git merge atguigu
    git push
```


