export default () => console.log('dynamicModule run');
// import的加载是加载的模块的引用。而import()加载的是模块的拷贝，就是类似于require()
export let counter = 3;
export function incCounter() {
  counter++;
}
