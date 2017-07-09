

/**
 * 这段代码将target对象保护起来，对外暴露proxy变量，这样对target对象的操作都要经过代理层proxy，
 * 在代理层可以设置各种规则进而完成对target的保护。
 * 这个看上去没什么用，其实不然，设想一下一些核心的数据可以封装在target对象，数据校验放在proxy来做，
 * 这样用户是不能直接操作核心数据的进而保证了代码安全。当然，proxy的作用不只如此。
 */
let target = {
    foo: "Welcome, foo"
}
let proxy = new Proxy(target, {
    get (receiver, name) {
        return name in receiver ? receiver[name] : `Hello, ${name}`
    }
})
proxy.foo   === "Welcome, foo"
proxy.world === "Hello, world"