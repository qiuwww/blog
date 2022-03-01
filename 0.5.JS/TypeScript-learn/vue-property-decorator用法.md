# vue-property-decorator 用法

[vue-property-decorator npm 文档](https://www.npmjs.com/package/vue-property-decorator)

[参考文章](https://www.jianshu.com/p/d8ed3aa76e9b)

```ts
import { Vue, Component, Emit, Watch, Prop, Model, mixins } from 'vue-property-decorator';

// 定义要混入的类
declare module 'vue/types/vue' {
  interface Vue {
    value: string;
    hello: string;
    world: string;
  }
}

@Component
export class MyMixins extends Vue {
  value: string = 'Hello';
}

// You can declare mixins as the same style as components.
@Component
export class Hello extends Vue {
  hello = 'Hello';
}

@Component
export class World extends Vue {
  world = 'World';
}

// 1. 不管是有，必须添加@Component修饰
@Component({
  // 7. 混入类型，等价于继承
  mixins: [myMixins],
})
export default class MyComponent extends mixins(MyMixins, Hello, World) {
  // 2. 组件自身状态声明
  ValA: string = 'hello world';

  ValB: number = 1;

  // 3. 计算属性，get关键字
  get ValC() {
    return 1;
  }

  mounted() {
    // 监听事件回调
    this.$on('emit-todo', function (n) {
      console.log(n);
    });

    this.emitTodo('world');
  }

  // 4.自定义事件，通过emit触发
  // @Emit(event?: string) decorator
  // https://www.npmjs.com/package/vue-property-decorator#emitevent-string-decorator
  // the camelCase name will be converted to kebab-case
  // 在@Emit装饰器的函数会在运行之后触发等同于其函数名(驼峰式会转为横杠式写法)的事件, 并将其函数传递给$emit，传入的事件名为要触发的事件。
  // 当作属性传递给子组件或者slot
  @Emit()
  emitTodo(n: string) {
    console.log('hello');
  }

  // 5. @Watch
  // @Watch装饰器来替换Vue中的watch属性,以此来监听值的变化。
  // @Watch使用非常简单,接受第一个参数为要监听的属性名 第二个属性为可选对象.@Watch所装饰的函数即监听到属性变化之后的操作
  @Watch('child')
  onChangeValue(newVal: string, oldVal: string) {
    // todo...
  }

  @Watch('person', { immediate: true, deep: true })
  onChangeValue(newVal: Person, oldVal: Person) {
    // todo...
  }

  // 6. @Prop，这里 !和可选参数?是相反的, !告诉TypeScript我这里一定有值
  @Prop(Number) propA!: number;
  @Prop({ default: 'default value' }) propB!: string;
  @prop([String, Boolean]) propC: string | boolean;

  // 8. @Model
  // https://cn.vuejs.org/v2/api/#model
  // 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。
  // v-modle是最特殊的一个，他其实是model和.sync的特殊情况
  // Vue组件提供model: {prop?: string, event?: string}让我们可以定制prop和event
  // 用于v-model绑定的属性与事件的处理
  // @Model()接收两个参数, 第一个是event值, 第二个是prop的类型说明, 与@Prop类似, 这里的类型要用JS的。
  @Model('change', { type: Boolean }) checked!: boolean;
}
```
