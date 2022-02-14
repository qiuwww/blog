console.log("## section 8 -> keyof");

// 入口索引类型查询或者说 keyof; 索引类型查询 keyof T 会得出 T 可能的属性名称的类型.keyof T 类型被认为是 string 的子类型.

// 枚举类型，页面宽度切换的关键点
enum Breakpoint {
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs'
}

type BreakpointMap = { [index in keyof typeof Breakpoint]: string };

const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};

console.log("responsiveMap: ", responsiveMap);

interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string

// 一个常见的需求是取一个现有的类型, 并将他的所有属性转换为可选值.假设我们有 Person 类型:

interface Person {
  name: string;
  age: number;
  location: string;
}
// 它的部分类型(partial) 的版本会是这样:

// interface PartialPerson {
//   name?: string;
//   age?: number;
//   location?: string;
// }
// 有了映射类型, PartialPerson 就可以被写作对于 Person 类型的一般化转换:

// 就像是一个转换函数
type PartialConvert<T> = {
  [P in keyof T]?: T[P];
};

type PartialPerson = PartialConvert<Person>;
// 映射类型是获取字面量类型的并集, 再通过计算新对象的属性集合产生的. 
