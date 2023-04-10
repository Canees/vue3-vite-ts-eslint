# vue3+TS+vite+eslint 多入口模板

## 目录结构
```
| - `src`
|   - `pages`                     全局入口目录
|       - `index`                 首页html入口目录
|           - `assets`            子静态文件
|           - `components`        子组件
|           - `store`             子存储
|           - `views`             子页面
|           - `service`           子服务
|           - `App.vue`           子模板
|           - `main.ts`           子入口文件
|       - `admin`                 后台管理html入口目录
|           - `assets`            子静态文件
|           - `components`        子组件
|           - `store`             子存储
|           - `service`           子服务
|           - `views`             子页面
|           - `App.vue`           子模板
|           - `main.ts`           子入口文件
|       - `login`                 登录html入口目录
|           - `assets`            子静态文件
|           - `components`        子组件
|           - `store`             子存储
|           - `service`           子服务
|           - `views`             子页面
|           - `App.vue`           子模板
|           - `main.ts`           子入口文件
|   - `components`                全局组件
|   - `utils`                     全局插件
|   - `assets`                    全局静态文件
```
## 编写规范
```
import { onMounted, ref, computed} from 'vue'
<script setup>
    <!-- 函数new区  -->
    const test = new DataServer()

    <!-- data 声明区 -->
    const test=ref(1)
    const test1:computed(()=>test)

    <!-- fn 声明区 -->
    function name(){
      console.log(123)
    }
    test().then(res=>{})

    <!-- vue 方法区 -->
    onMounted(() => {test()})

    <!-- 函数调用区 -->
    name()
</script>
<template></template>
<style></style>
```
### TS
* 不允许的操作
  * `any` 类型
  * `JSON.parse` 等危险操作时不嵌套异常处理
  * 单个文件中的脚本代码总行数不允许超过`1024`行
* 命名
  * 文件 小写字母命名，多个词之间以 `-`连接，不允许大写字母及驼峰式
  * 变量
    * 小写字母开头的驼峰式，如 `userName`
    * 必须使用英文单词或有意义的拼音
    * 单字符变量名只允许在循环、循环回调中使用，可使用 `i,j,k,m,n,t,v`等
  * 函数
    * 小写字母开头的驼峰式，如 `shouUserName`
    * `.service.ts` 文件中方法命名建议：
      * 集合类数据获取采用 `loadUsers` 之类的命名，即以 `load`开头并以获取数据名结尾
      * 单个数据获取采用 `fetchTemplate` 之类的命名，以`fetch`开头并以数据名结尾
      * 保存数据采用 `saveFlow` 之类的命名
      * 删除数据采用 `removeTemplate` 之类的命名
  * 类及类型
    * 大写字母开头的驼峰式，如 `UserService`
    * 私有变量以下划线接小写字母开头的驼峰式，如 `_innerType`
  * 全局常量，下划线连接大写字母，如 `GROUP_TYPES`
* 类型及注释
  * 注释写法分以下几类
  /** 这种用于简单描述函数作用 或 类成员变量用处 */
  // 这种用于描述函数内变量或代码段作用
  /**
   * 这种用于描述类、复杂函数用途及参数等
   */
* 函数调用
  * async 在没有其它函数调用的情况下,写成.then

### CSS
* 不允许使用无封装或不唯一的全局类样式，必须使用时需备注说明并慎重选择类名
* 颜色赋值使用 `var(--color-a)` 写法，无特殊说明不允许直接赋值
* `class, id` 命名必须使用短线连接单词方式，如 `form-label`, `list-item-title` 等
* 多层级类名嵌套时，必须使用`scss`嵌套写法，以免污染其他样式
