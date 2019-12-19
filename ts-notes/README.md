# TypeScript notes

参考：https://jspang.com/detailed?id=38

## TypeScript中的数据类型有：
```
undefined ;
number: 数值类型;
string: 字符串类型;
boolean: 布尔类型;
enum: 枚举类型;
any: 任意类型，一个牛X的类型;
null: 空类型;
void: 空类型;
array: 数组类型;
tuple: 元组类型。
```

### undefined类型

```ts
//声明数值类型的变量age，但不予赋值
var age: number
console.log(age)  //undefined
```

### number类型

在TypeScript中，所有的数字都是Number类型，这不分是整数还是小数。

```ts
var age: number = 18
console.log(age)  //18

var stature: number = 178.5
console.log(stature)  //178.5
```

### string类型

```ts
var fname: string = 't-one'
console.log(fname)  //t-one
```

### boolean类型

```ts
var flag: boolean = true
console.log(flag)  //true
```

### enum类型

```ts
enum REN{ nan , nv ,yao}
console.log(REN.yao)  //2

//赋值
enum REN{
    nan = '男',
    nv = '女',
    yao = '妖'
}
console.log(REN.yao)  //返回了妖 这个字
```

### any类型

```ts
var t: any = 10 
t = "jspang"
t = true
console.log(t)  //true
```

### null类型

```ts
var n: null = null
console.log(n)  //null
```

### void类型

某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```
声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：

```ts
var unusable: void = undefined;
```

### array类型

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：

```ts
var list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，Array<元素类型>：

```ts
var list: Array<number> = [1, 2, 3];
```

### tuple类型

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。

```ts
// Declare a tuple type
var x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```
当访问一个已知索引的元素，会得到正确的类型：

```ts
console.log(x[0].substr(1)); //ello
console.log(x[1].substr(1)); //报错，number' does not have 'substr'
```

当访问一个越界的元素，会使用联合类型替代：

```ts
x[3] = "world"; // Error, Property '3' does not exist on type '[string, number]'
console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'
```

## TypeScript中的函数

我们可以把功能相近的需求封装成一个独立的代码块，每次传入不同的变量或参数，就可以实现不同的结果。

### 定义函数

```ts
function searchXiaoJieJie(age: number): string{
    return '找到了' + age + '岁的小姐姐' 
}
var age: number = 18
var result: string = searchXiaoJieJie(age)
console.log(result)
```

注意点：
- 声明（定义）函数必须加 function 关键字；
- 函数名与变量名一样，命名规则按照标识符规则；
- 函数参数可有可无，多个参数之间用逗号隔开；
- 每个参数参数由名字与类型组成，之间用分号隔开；
- 函数的返回值可有可无，没有时，返回类型为 void；
- 大括号中是函数体。

## TypeScript的函数参数

### 1.有可选参数的函数

可选参数，就是我们定义形参的时候，可以定义一个可传可不传的参数。这种参数，在定义函数的时候通过?标注。

```ts
function searchXiaoJieJie2(age: number, stature?: string): string{

    let yy: string = ''
    yy = '找到了' + age + '岁'
    if (stature != undefined){
        yy = yy + stature
    }
    return yy + '的小姐姐'

}

var result: string  =  searchXiaoJieJie2(22,'大长腿')
console.log(result)
```

### 2.有默认参数的函数

有默认参数就更好理解了，就是我们不传递的时候，他会给我们一个默认值，而不是undefined了

```ts
function searchXiaoJieJie2(age: number = 18, stature: string = '大胸'): string{

    let yy: string = ''
    yy = '找到了' + age + '岁'
    if (stature != undefined){
        yy = yy + stature
    }
    return yy + '的小姐姐'

}

var result: string  =  searchXiaoJieJie2()
console.log(result)
```

### 3、有剩余参数的函数

剩余参数就是形参是一个数组，传递几个实参过来都可以直接存在形参的数组中。

```ts
function searchXiaoJieJie3(...xuqiu: string[]): string{

    let  yy: string = '找到了'
    for (let i = 0; i < xuqiu.length; i++){
        yy = yy + xuqiu[i]
        if (i < xuqiu.length){
            yy = yy+ '、'
        }
    }
    yy = yy + '的小姐姐'
    return yy

}

var result: string  =  searchXiaoJieJie3('22岁', '大长腿',  '瓜子脸', '水蛇腰')
console.log(result)
```

## TypeScript函数的定义方式

### 1、函数声名法

函数声明法创建函数是最常用的函数定义法。使用function关键字和函数名去定义一个函数。

```ts
function add(n1: number, n2: number): number{
    return n1+n2
}
```

### 2、函数表达式法

函数表达式法是将一个函数赋值给一个变量，这个变量名就是函数名。通过变量名就可以调用函数了。这种方式定义的函数，必须在定义之后，调用函数。下面例子中等号右边的函数没有函数名，称为匿名函数。

```ts
var add = function(n1: number, n2: number): number{
    return n1 + n2
}

console.log(add(1,4))
```

### 3、箭头函数

箭头函数是 ES6 中新增的函数定义的新方式，我们的 TypeScript 语言是完全支持 ES6 语法的。箭头函数定义的函数一般都用于回调函数中。

```ts
var add = (n1: number, n2: number): number => {
    return n1 + n2
}

console.log(add(1,4))
```

## 函数中变量的作用域

每个变量都有一个起作用的范围，这个范围就是变量的作用域。在TypeScript语言中变量作用域划分是以函数为标准的。

### 函数作用域的演示

```ts
function zhengXing(): void{
    var yangzi = '刘德华'
    console.log(yangzi)
}
zhengXing()
console.log(yangzi)  //找不到变量yangzi
```

### 认识全局变量和局部变量

- 局部变量: 函数体内定义的变量就是局部变量。
- 全局变量: 函数体外定义的变量就是全局变量。

```ts
var yangzi = '刘德华'

function zhengXing(): void{
    console.log('整形成了' + yangzi + '的样子')
}
zhengXing()
console.log(yangzi)
```

### 全局变量和局部变量重名

```ts
var yangzi: string = '刘德华'

function zhengXing(): void{
    console.log('技术胖整形成了' + yangzi + '的样子')
    var yangzi: string = '马德华'

    console.log('技术胖整形成了' + yangzi + '的样子')
}
zhengXing()
console.log(yangzi)
```

输出结果依次是：

```ts
//技术胖整形成了undefined的样子
//技术胖整形成了马德华的样子
//刘德华
```

产生这个结果的原因就是变量提升，他的真实代码是这样的：

```ts
var yangzi: string = '刘德华'

function zhengXing():void{
    var  yangzi: string 
    console.log('技术胖整形成了' + yangzi + '的样子')
    yangzi = '马德华'
    console.log('技术胖整形成了' + yangzi + '的样子')
}
zhengXing()
console.log(yangzi)
```

也就是当内部声明了和全局的变量同名时，就会出现变量提升的效果，声明语句会提升到函数的第一句。这就是著名的变量提升效果。

### let关键子的作用域

```ts
function zhengXing(): void{
   var yangzia: string = '刘德华'
   {
        let  yangzib: string = '小沈阳'
        console.log('技术胖整形成了' + yangzib + '的样子')
   }

    console.log('技术胖整形成了' + yangzia + '的样子')
    //console.log('技术胖整形成了' + yangzib + '的样子')  //找不到变量yangzib
}
zhengXing()
```

## 引用类型-数组

### 初识引用类型

```ts
let person = {
    name: 'liu',
    website: 'arrtone.com',
    age: 18,
    saySomething: function(){
        console.log('为了前端技术')
    }
}
console.log(person.name)
person.saySomething()
```

### 初始化数组

#### 数组的声明方法

```ts
let arr1: number[]     //声明一个数值类型的数组
let arr2: Array<string>  //声明一个字符串类型的数组
```

#### 给数组赋值

数组是存储大量数据的集合，声明数组之后，需要给数组存储数据。这时候有两种方法：

- 字面量赋值法
- 构造函数赋值法

** 字面量赋值法 **

```ts
//定义一个空数组，数组容量为0
let arr1: number[] = [] 
//定义一个数组时，直接给数组赋值
let arr2: number[] = [1, 2, 3, 4, 5]
//定义数组 的同事给数组赋值
let arr3: Array<string> = ['jspang', '技术胖', '金三胖']
let arr4: Array<boolean> = [ true, false, false]

//报错！ 必须存储number类型的数据
let arr5: number[] = [1, 2, true]
```

** 构造函数赋值法 **

```ts
let arr1: number[] = new Array()
let ara2: number[] = new Array(1, 2, 3, 4, 5)
let arr3: Array<string> = new Array('jspang', '技术胖', '金三胖')
let arr4: Array<boolean> = new Array(true, false, false)
```

### 认识元组，一种特殊的数组

```ts
//声明一个元组类型
let x: [string, number]
//正确的初始化
x = ['hello', 10]
//错误的初始化方法
x = [10, 'hello']
```

## 引用类型-字符串

### 字符串的两种类型

- 基本类型字符串：由单引号或者双引号括起来的一串字符串。
- 引用类型字符串：用new 实例化的 String类型。

```ts
let jspang: string = '技术胖'
let jspanga: String = new String("jspang.com")
console.log(jspang)  //技术胖
console.log(jspanga)  //[String: 'jspang.com']
```

### 字符串的长度length

```ts
let jspang: string = '技术胖'
let jspanga: String = new String("jspang.com")
console.log(jspang.length)  //3
console.log(jspanga.length)  //10
```

## 引用类型-日期对象

TypeScript中使用Date这个引用类型来存储日期对象，如果你要声明一个日期变量时，记得也要注明它的类型是Date。

### 创建日期对象

#### 1、不传递任何参数

```ts
let d: Date = new Date()
console.log(d)
```

#### 2、传递表示年月日时分秒的变量

```ts
let d: Date = new Date(year, month, day, hours, minutes, seconds, ms);
```
- year 表示年份，4位数字。
- month表示月份，数值是0(1月)~11(12月)之间的整数。
- day 表示日期。数值是1~31之间的整数。
- hours 表示小时，数值是0-23之间的整数。
- minutes 表示分钟数，数值是0~59之间的整数。
- seconds 表示秒数，数值是0~59之间的整数。
- ms 表示毫秒数，数值是0~999之间的整数。

## 引用类型-正则表达式

### 正则表达式的创建方法

- new 关键字
- 采用字面量的方式

```ts
let reg1: RegExp = new RegExp("jspang")  //表示字符串规则里含有jspang
console.log(reg1)
let reg2: RegExp = new RegExp("jspang",'gi')
console.log(reg2)

let reg3: RegExp = /jspang/
let reg4: RegExp = /jspang/gi
```

## 面向对象编程-类的声明和使用

```ts
class XiaoJieJie{
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name
        this.age = age 
    }
    say(){
        console.log('小哥哥好')
    }
}
let jiejie: XiaoJieJie = new XiaoJieJie('范冰冰',18)
console.log(jiejie)
jiejie.say()
```

## 面向对象编程-修饰符

### 访问修饰符

访问修饰符分为：public、protected、private。

- public：公有修饰符，可以在类内或者类外使用public修饰的属性或者行为，默认修饰符。
- protected：受保护的修饰符，可以本类和子类中使用protected修饰的属性和行为。
- private：私有修饰符，只可以在类内使用private修饰的属性和行为。

```ts
class XiaoJieJie2 {
	public sex: string;
	protected name: string;
	private age: number;
	public constructor(sex: string, name: string, age: number) {
		this.sex = sex;
		this.name = name;
		this.age = age;
	}
	public sayHello() {
		console.log('小哥哥好');
	}

	protected sayLove() {
		console.log('我爱你');
	}
}

var jiejie2: XiaoJieJie2 = new XiaoJieJie2('女', '热巴', 22);

console.log(jiejie2.sex);
console.log(jiejie2.name); //报错
console.log(jiejie2.age); //报错
jiejie2.sayHello();
jiejie2.sayLove(); //报错
```

### 只读属性修饰符

使用readonly修饰符将属性设置为只读，只读属性必须在生命时或者构造函数里被初始化（注意）。
我们声明一个man的抽象类，里边只有一个属性sex，并且是只读。

```ts
class Man{
    public readonly sex: string = '男'
}
var man: Man = new Man()
man.sex='女'  //报错
```

## 面向对象编程-继承和重写

### 类的继承

在使用TypeScript这门语言时，一个最重要基本功就是面向对象编程，那对类的扩展就变的格外重要，扩展经常使用的手段就是继承。
继承：允许我们创建一个类（子类），从已有的类（父类）上继承所有的属性和方法，子类可以新建父类中没有的属性和方法。

```ts
class Jspang {
	public name: string;
	public age: number;
	public skill: string;
	constructor(name: string, age: number, skill: string) {
		this.name = name;
		this.age = age;
		this.skill = skill;
	}
	public interest() {
		console.log('找小姐姐');
	}
}

let jspangObj: Jspang = new Jspang('技术胖', 18, 'web');
jspangObj.interest();
```

子类的创建

```ts
class JsShuai extends Jspang {
	public xingxiang: string = '帅气';
	public zhuangQian() {
		console.log('一天赚了一个亿');
	}
}

let shuai = new JsShuai('技术帅', 5, '演讲');
shuai.interest();
shuai.zhuangQian();
```

** 有一点需要注意，TypeScript不支持多重继承。 **

### 类的重写

```ts
class JsShuai extends Jspang {
	public xingxiang: string = '帅气';
	public interest() {
		super.interest();
		console.log('建立电商平台');
	}
	public zhuangQian() {
		console.log('一天赚了一个亿');
	}
}
```

## 面向对象编程-接口

### 认识接口

```ts
interface Husband {
	sex: string;
	interest: string;
}
let myhusband: Husband = { sex: '男', interest: '看书、作家务' };
console.log(myhusband);

```

### 可选参数的接口

```ts
interface Husband {
	sex: string;
	interest: string;
	maiBaoBao?: Boolean;
}
let myhusband: Husband = { sex: '男', interest: '看书、作家务', maiBaoBao: true };
console.log(myhusband);
```

### 规范函数类型接口

```ts
interface SearchMan {
	(source: string, subString: string): boolean;
}

let mySearch: SearchMan;

mySearch = function(source: string, subString: string): boolean {
	let flag = source.search(subString);
	return flag != -1;
};

console.log(mySearch('高、富、帅、德', '胖'));
```

## 面向对象编程-命名空间

在制作大型应用的时候，为了让程序更加有层次感和变量之间不互相干扰，我们可以使用命名空间来构建程序。

```ts
namespace shuaiGe {
	export class Dehua {
		public name: string = '刘德华';
		talk() {
			console.log('我是帅哥刘德华');
		}
	}
}

namespace bajie {
	export class Dehua {
		public name: string = '马德华';
		talk() {
			console.log('我是二师兄马德华');
		}
	}
}

let dehua1: shuaiGe.Dehua = new shuaiGe.Dehua();
let dehua2: shuaiGe.Dehua = new bajie.Dehua();
dehua1.talk();

```