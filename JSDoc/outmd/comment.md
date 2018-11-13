## Modules

<dl>
<dt><a href="#module_color/mixer">color/mixer</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Point">Point</a></dt>
<dd></dd>
<dt><a href="#Dot">Dot</a> ⇐ <code><a href="#Point">Point</a></code></dt>
<dd><p>Class representing a dot.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#Point">Point</a></dt>
<dd><p>Class representing a point.，类的说明</p>
</dd>
<dt><a href="#foo">foo</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#config">config</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#RED">RED</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#ONE">ONE</a> : <code>number</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#method1">method1()</a> ⇒ <code>Number</code></dt>
<dd><p>Solves equations of the form a * x = b</p>
</dd>
<dt><a href="#myFunction">myFunction()</a></dt>
<dd></dd>
</dl>

## Interfaces

<dl>
<dt><a href="#Color">Color</a></dt>
<dd><p>Interface for classes that represent a color.</p>
</dd>
</dl>

<a name="module_color/mixer"></a>

## color/mixer

* [color/mixer](#module_color/mixer)
    * [.lastColor](#module_color/mixer.lastColor)
    * [.name](#module_color/mixer.name)
    * [.blend(color1, color2)](#module_color/mixer.blend) ⇒ <code>string</code>
    * [.toRgb(color)](#module_color/mixer.toRgb) ⇒ <code>Array.&lt;number&gt;</code>

<a name="module_color/mixer.lastColor"></a>

### color/mixer.lastColor
The most recent blended color.

**Kind**: static property of [<code>color/mixer</code>](#module_color/mixer)  
<a name="module_color/mixer.name"></a>

### color/mixer.name
The name of the module.

**Kind**: static constant of [<code>color/mixer</code>](#module_color/mixer)  
<a name="module_color/mixer.blend"></a>

### color/mixer.blend(color1, color2) ⇒ <code>string</code>
Blend two colors together.

**Kind**: static method of [<code>color/mixer</code>](#module_color/mixer)  
**Returns**: <code>string</code> - The blended color.  

| Param | Type | Description |
| --- | --- | --- |
| color1 | <code>string</code> | The first color, in hexidecimal format. |
| color2 | <code>string</code> | The second color, in hexidecimal format. |

<a name="module_color/mixer.toRgb"></a>

### color/mixer.toRgb(color) ⇒ <code>Array.&lt;number&gt;</code>
Get the red, green, and blue values of a color.

**Kind**: static method of [<code>color/mixer</code>](#module_color/mixer)  
**Returns**: <code>Array.&lt;number&gt;</code> - An array of the red, green, and blue values,
each ranging from 0 to 255.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | A color, in hexidecimal format. |

<a name="Color"></a>

## Color
Interface for classes that represent a color.

**Kind**: global interface  
<a name="Color+rgb"></a>

### color.rgb() ⇒ <code>Array</code>
Get the color as an array of red, green, and blue values, represented as
decimal numbers between 0 and 1.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>Array</code> - An array containing the red, green, and blue values,
in that order.  
<a name="Point"></a>

## Point
**Kind**: global class  

* [Point](#Point)
    * [new Point(x, y)](#new_Point_new)
    * _instance_
        * [._bar](#Point+_bar)
        * [.pez](#Point+pez)
        * [.getX()](#Point+getX) ⇒ <code>number</code>
        * [.getY()](#Point+getY) ⇒ <code>number</code>
    * _static_
        * [.fromString(str)](#Point.fromString) ⇒ [<code>Point</code>](#Point)

<a name="new_Point_new"></a>

### new Point(x, y)
Create a point. 构造函数，功能描述


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. 这里是参数的描述 |
| y | <code>number</code> | The y value. |

<a name="Point+_bar"></a>

### point.\_bar
**Kind**: instance property of [<code>Point</code>](#Point)  
**Access**: protected  
<a name="Point+pez"></a>

### point.pez
**Kind**: instance property of [<code>Point</code>](#Point)  
**Access**: public  
<a name="Point+getX"></a>

### point.getX() ⇒ <code>number</code>
Get the x value.

**Kind**: instance method of [<code>Point</code>](#Point)  
**Returns**: <code>number</code> - The x value.  
<a name="Point+getY"></a>

### point.getY() ⇒ <code>number</code>
Get the y value.

**Kind**: instance method of [<code>Point</code>](#Point)  
**Returns**: <code>number</code> - The y value.  
<a name="Point.fromString"></a>

### Point.fromString(str) ⇒ [<code>Point</code>](#Point)
Convert a string containing two comma-separated numbers into a point.这里的静态方法，首先展示。

**Kind**: static method of [<code>Point</code>](#Point)  
**Returns**: [<code>Point</code>](#Point) - A Point object. 返回值的描述，返回了一个类Point  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string containing two comma-separated numbers. |

<a name="Dot"></a>

## Dot ⇐ [<code>Point</code>](#Point)
Class representing a dot.

**Kind**: global class  
**Extends**: [<code>Point</code>](#Point)  

* [Dot](#Dot) ⇐ [<code>Point</code>](#Point)
    * [new Dot(x, y, width)](#new_Dot_new)
    * [._bar](#Point+_bar)
    * [.pez](#Point+pez)
    * [.getWidth()](#Dot+getWidth) ⇒ <code>number</code>
    * [.getX()](#Point+getX) ⇒ <code>number</code>
    * [.getY()](#Point+getY) ⇒ <code>number</code>

<a name="new_Dot_new"></a>

### new Dot(x, y, width)
Create a dot.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| width | <code>number</code> | The width of the dot, in pixels. |

<a name="Point+_bar"></a>

### dot.\_bar
**Kind**: instance property of [<code>Dot</code>](#Dot)  
**Access**: protected  
<a name="Point+pez"></a>

### dot.pez
**Kind**: instance property of [<code>Dot</code>](#Dot)  
**Access**: public  
<a name="Dot+getWidth"></a>

### dot.getWidth() ⇒ <code>number</code>
Get the dot's width.

**Kind**: instance method of [<code>Dot</code>](#Dot)  
**Returns**: <code>number</code> - The dot's width, in pixels.  
<a name="Point+getX"></a>

### dot.getX() ⇒ <code>number</code>
Get the x value.

**Kind**: instance method of [<code>Dot</code>](#Dot)  
**Returns**: <code>number</code> - The x value.  
<a name="Point+getY"></a>

### dot.getY() ⇒ <code>number</code>
Get the y value.

**Kind**: instance method of [<code>Dot</code>](#Dot)  
**Returns**: <code>number</code> - The y value.  
<a name="Point"></a>

## Point
Class representing a point.，类的说明

**Kind**: global variable  
**Version**: 1.2.3
[GitHub](https://github.com).
{@tutorial destroy Destroying a Widget}.  
**Author**: qiu <1014913222@qq.com>  

* [Point](#Point)
    * [new Point(x, y)](#new_Point_new)
    * _instance_
        * [._bar](#Point+_bar)
        * [.pez](#Point+pez)
        * [.getX()](#Point+getX) ⇒ <code>number</code>
        * [.getY()](#Point+getY) ⇒ <code>number</code>
    * _static_
        * [.fromString(str)](#Point.fromString) ⇒ [<code>Point</code>](#Point)

<a name="new_Point_new"></a>

### new Point(x, y)
Create a point. 构造函数，功能描述


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. 这里是参数的描述 |
| y | <code>number</code> | The y value. |

<a name="Point+_bar"></a>

### point.\_bar
**Kind**: instance property of [<code>Point</code>](#Point)  
**Access**: protected  
<a name="Point+pez"></a>

### point.pez
**Kind**: instance property of [<code>Point</code>](#Point)  
**Access**: public  
<a name="Point+getX"></a>

### point.getX() ⇒ <code>number</code>
Get the x value.

**Kind**: instance method of [<code>Point</code>](#Point)  
**Returns**: <code>number</code> - The x value.  
<a name="Point+getY"></a>

### point.getY() ⇒ <code>number</code>
Get the y value.

**Kind**: instance method of [<code>Point</code>](#Point)  
**Returns**: <code>number</code> - The y value.  
<a name="Point.fromString"></a>

### Point.fromString(str) ⇒ [<code>Point</code>](#Point)
Convert a string containing two comma-separated numbers into a point.这里的静态方法，首先展示。

**Kind**: static method of [<code>Point</code>](#Point)  
**Returns**: [<code>Point</code>](#Point) - A Point object. 返回值的描述，返回了一个类Point  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string containing two comma-separated numbers. |

<a name="foo"></a>

## foo
**Kind**: global variable  
<a name="config"></a>

## config : <code>object</code>
**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| defaults | <code>object</code> | The default values for parties. |
| defaults.players | <code>number</code> | The default number of players. |
| defaults.level | <code>string</code> | The default level for the party. |
| defaults.treasure | <code>object</code> | The default treasure. |
| defaults.treasure.gold | <code>number</code> | How much gold the party starts with. |

<a name="triState"></a>

## triState : <code>enum</code>
Enum for tri-state values. 枚举

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| TRUE | <code>number</code> | <code>1</code> | The true value |
| FALSE | <code>number</code> | <code>-1</code> |  |
| MAYBE | <code>boolean</code> | <code>true</code> |  |

<a name="RED"></a>

## RED : <code>string</code>
**Kind**: global constant  
**Default**: <code>&quot;FF0000&quot;</code>  
<a name="ONE"></a>

## ONE : <code>number</code>
**Kind**: global constant  
<a name="method1"></a>

## method1() ⇒ <code>Number</code>
Solves equations of the form a * x = b

**Kind**: global function  
**Returns**: <code>Number</code> - Returns the value of x for the equation.  
**Example**  
```js
Example usage of method1. 例子的标题
// returns 2
method1(5, 10);
```
**Example**  
```js
// returns 3
method(5, 15);
```
<a name="myFunction"></a>

## myFunction()
**Kind**: global function  
