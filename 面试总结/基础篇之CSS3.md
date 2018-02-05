# CSS3

## 基本知识

  > 基本知识包括了盒子模型、布局、居中、优先级等知识点。

### 盒子模型

> IE盒子模型：content(元素宽高)包含了 border 和 padding
> W3C标准盒子模型: content(元素宽高)并不包含了 border 和 padding

### 布局方式

- 单列布局 : 全屏或单列居中。
  - 使用inline-block 和 text-align实现
  ```css
  .parent{text-align: center;}
  .child{display: inline-block;}
  /* 优点：兼容性好； */
  /* 不足：需要同时设置子元素和父元素 */
  ```
  - 使用margin:0 auto来实现
  ```css
  .child{width: 200px; margin: 0 auto;}
  /* 优点：兼容性好 缺点: 需要指定宽度 */
  ```
  - 使用table实现
  ```css
  .child{display: table; margin: 0 auto;}
  /* 优点:只需要对自身进行设置  不足:IE6,7需要调整结构 */
  ```
  - 使用绝对定位实现
  ```CSS
  .parent{position:relative;}
  /*或者实用margin-left的负值为盒子宽度的一半也可以实现，不过这样就必须知道盒子的宽度，但兼容性好*/
  .child{position:absolute; left:50%; transform:translate(-50%);}
  ```
- 两列布局 ：通过浮动或绝对定位来实现。

- 多列布局 ：通过浮动+绝对定位来实现。

- flex布局 ：弹性布局方式。

- 响应式布局：通过css3、bootstrap、flex等途径来实现。

### 水平垂直居中

- text-align和vertical-align和inline-block

  ```css
  .parent{ display:table-cell; vertical-align:middle; text-align:center }
  .child{ display:inline-block; }
  ```

- 绝对定位+transform

  ```css
  .parent{ position:relative }
  .child { position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
  ```

- flex水平+垂直

  ```css
  .parent{ display:flex; justify-content:center; align-items:center;}
  ```

### 优先级

!important > 内联 > id > class > 后代选择器

## CSS3新特性

### 常见新特性

- 圆角：border-radius

- 边框：box-shadow

- 渐变、背景、字体、文本效果等。

- css函数：

  - calc:  动态计算长度值

  ```css
  width: calc(100% - 100px);
  ```
  > 支持加减乘除。
  > 运算符两边必须有空格。

  - linear-gradient(角度|方向,color1,color2,clor3...);    兼容性：IE9+ 。
    - linear-gradient 用于创建一个线性渐变的 "图像"。
    - 角度可用单位表示：deg、rad、grad或turn

      background: linear-gradient(180deg,red,yellow);
    - 方向的值有：

      top、right、bottom、left、

      left top、left bottom、top right、bottom right、

  - radial-gradient()

  > 用径向渐变创建 "图像",径向渐变由中心点定义。

  - repeating-linear-gradient(角度|方向,color1,color2,clor3……)

  > 可重复的线性渐变。

### 动态特效

> CSS3动态特效主要有三种:
transform(转换)、transition(过渡)、animation(动画)。

- 2D、3D转换 (transform)

> 注意：Chrome 和 Safari 要求前缀 -webkit- 版本，IE9要求前缀 -ms- 版本。
***
  可能的值为：

    位移 : translate()

    旋转 ：rotate()

    缩放 ：scale()

    倾斜 ：skew()

  总结为：旋缩移倾
***

```css
div{

 transform: rotate(30deg);  // 旋

 transform: scale(2,3);     // 缩

 transform: translate(20px,30px);  // 移

 transform: skew(30deg,15deg);    // 倾

}
```

> 3D转换：多了一轴Z。

- 过渡 (transition)

> transition: 属性名 持续秒数 转速曲线 开始时间；

```css
div {
  width:100px;
  transition: width 2s;
  background:red;
}

div:hover {
  width: 200px;
}
```

- 动画 (animation):css3动画分为动画规则和动画属性两部分，分别为@keyframes和animation
  - 动画规则  @keyframes
  ```css
  @keyframes annimateName{
    0% {background:red;left:0px;top:0px;}
    50% {background:yellow;left:30px;top:60px;}
    100% {background:green;left:80px;top:100px;}
  }
  /* 或者 */
  @keyframes annimateName{
    from {background:red;left:0px;top:0px;}
    to {background:green;left:80px;top:100px;}
  }
  ```
  > 注意： from to 等同于0%到100%

  - 动画属性(使用动画)  aniamtion

  ```css
  div{
      animation:annimateName duration timing-function delay iteration-count direction fill-mode play-state;
  }
  ```

### 媒体查询

- 基本语法：

```css
@media not/only mediatype and (expressions) {
    /* CSS 代码...; */
}
/* 或 */
@media not/only mediatype and (expressions1) and (expressions2) {
    /* CSS 代码...; */
}
```

> not: 除了，排除。
> only: 唯独，仅有。

- mediatype(媒体类型):

  - all: 所有的设备。

  - screen: 电脑，平板，智能手机。

  - print: 打印机。

  - speech: 屏幕阅读器。

- expressions: 条件表达。

```css
@media screen and (max-width:1000px) {

  body {
    width:1000px;
    margin:0px auto;
  }
}
```

### flex弹性布局

> 通过设置容器，添加容器属性来达到流动布局的效果。

- 添加容器

```css
div {
  display: flex;   // 块级元素
  display: inline-flex;  // 内联元素
}
```

- 给容器添加属性(6个)
  - 主轴方向
  ```css
  flex-direction: row | row-reverse | column | column-reverse;
  /* 其中row代表水平方向，column代表垂直方向。 */
   ```
  - 换行方式
  ```css
  flex-wrap: nowrap | wrap | wrap-reverse;
  /* nowrap - 不换行； wrap-向下换行； wrap-reverse - 向上换行。 */
  ```
  - 方向+换行
  ```css
  /* flex-flow， 是flex-direction和flex-wrap的简写。 */
  flex-flow: flex-direction || flex-wrap;
  ```
  - 主轴对齐方式(默认是是水平方向-左对齐)

  ```css
  /* 主轴通常是横轴，也就是水平方向。除非单独设置了collumn轴方向。 */
  justify-content: flex-start | flex-end | center | space-between | space-around;
  /* flex-start: 左对齐 */
  /* flex-end: 右对齐 */
  /* center:  水平居中 */
  /* space-between: 两端对齐 */
  /* space-around: 两端与边框的间隔等于项目间隔的一半。 */
  ```

  - 次轴对齐方式(通常是垂直方向)
  ```css
  align-items: flex-start | flex-end | center | baseline | stretch;
   /* flex-start: 往顶部对齐
   flex-end: 往底部对齐
   center:  垂直居中
   baseline: 项目的第一行文字的基线对齐
   stretch(默认值): 如果项目未设置高度或设为auto，将占满整个容器的高度。   */
   ```

  - 多轴线对齐方式：

  ```css
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  ```

- 给项目添加属性：
  - `order: number`
    定义项目的排列顺序。数值越小，排列越靠前，默认为0
  - `flex-grow: number`
    定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  - `flex-shrink: number`
    定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  - `flex-basis: <length> | auto`
    定义了在分配多余空间之前，项目占据的主轴空间（main size）。默认为auto。
  - `flex: <length> | auto`
    是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。
  - `align-self: <length> | auto`
    允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto。