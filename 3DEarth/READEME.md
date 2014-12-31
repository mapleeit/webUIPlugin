# 3D Earth  
## I iminate this one  
origin: http://experilous.com/1/blog/post/procedural-planet-generation  
by : [Andy Gainey](http://experilous.com/)
## Some stuff about `THREE.js` we should learn before begin  
(I will introduce these stuff in Chinese because there are too much professional words that I can not handle with English, sorry )

### Lights（光源）

#### DirectionalLight（平行光源）  
类似于太阳光，我们常把太阳光近似成为平行光，因为它离地球特别远  
`DirectionalLight(hex, intensity)`  
- hex : 16进制表示颜色（`0xffffff`），光源的颜色
- intensity : 光源的强度（0 - 1），0最弱，1最强  
例子：  
```javascript
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0); // 设定位置，(0, 1, 0)是指x轴，y轴，z轴的距离。其中x轴是屏幕平面长度方向，y轴是屏幕平面宽度方向，z轴是垂直屏幕平面。因此(0, 1, 0)是指垂直于屏幕平面长度方向向下照
```
### Camera（投影方式）

#### PerspectiveCamera(透视投影)  
> 透视投影是为了获得接近真实三维物体的视觉效果而在二维的纸或者画布平面上绘图或者渲染的一种方法，它也称为透视图。透视投影的绘制必须根据已有的几何规则进行。  ——维基百科
__透视投影需要按照物体不同部分离摄像机远近的不同进行比例变换__  
`PerspectiveCamera(fov, aspect, near, far)`  
- fov : 视域角度？？？这个目前还不清楚是什么机理，但是我截了几张图如下  
30  
80  
150  
179  
180  
- aspect : 视域宽/长比例，一般使用浏览器的宽/长比例，否则会产生变形  
- near : 相机离视体积最近的距离
- far : 相机离视体积最远的距离

### Material（材料）这个非常之复杂  

#### MeshLambertMaterial  
Lambert是一种没有镜面反射的材料，当带有颜色的光（例如红光）照射到这种紫色的材料上，展现出来的颜色是紫色而不是红色。
`MeshLambertMaterial({color : hex, emissive : hex, wireframe : true/false})`  
- color : 漫反射出来的颜色，而不是灯光的颜色。即：无镜面反射。
- emissive : 当没有光照射时候展现的颜色，默认为黑。
- wireframe : 是否将渲染时候用到的三角形的线显示出来。
