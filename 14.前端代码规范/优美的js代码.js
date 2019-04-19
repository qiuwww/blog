
// 使用没有意义的变量名将会导致我们的程序难于理解，将会伤害我们的读者， 所以请使用可检索的变量名。
Bad:
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000)


Good:
// Declare them as capitalized `const` globals.
const MILLISECONDS_IN_A_DAY = 86400000
setTimeout(blastOff, MILLISECONDS_IN_A_DAY)



// 使用说明性的变量(即有意义的变量名)

Bad:
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
saveCityZipCode(
    address.match(cityZipCodeRegex)[1],
    address.match(cityZipCodeRegex)[2],
)

Good:
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
const [, city, zipCode] = address.match(cityZipCodeRegex) || []
saveCityZipCode(city, zipCode)


// 保持函数功能的单一性这是软件工程中最重要的一条规则，
// 当函数需要做更多的事情时，它们将会更难进行编写、测试、理解和组合。
// 当你能将一个函数抽离出只完成一个动作，他们将能够很容易的进行重构并且你的代码将会更容易阅读。
// 如果你严格遵守本条规则，你将会领先于许多开发者。
Bad:

function emailClients(clients) {
    clients.forEach(client => {
        const clientRecord = database.lookup(client)
        if (clientRecord.isActive()) {
            email(client)
        }
    })
}

Good:
function emailActiveClients(clients) {
    clients.filter(isActiveClient).forEach(email)
}

function isActiveClient(client) {
    const clientRecord = database.lookup(client)
    return clientRecord.isActive()
}


// 使用默认变量替代短路运算或条件
Bad:
function createMicrobrewery(name) {
    const breweryName = name || 'Hipster Brew Co.'
    // ...
}
Good:
function createMicrobrewery(breweryName = 'Hipster Brew Co.') {
    // ...
}


// 函数参数 (理想情况下应不超过 2 个)限制函数参数数量很有必要，
// 这么做使得在测试函数时更加轻松。
// 过多的参数将导致难以采用有效的测试用例对函数的各个参数进行测试。
// 应避免三个以上参数的函数。通常情况下，参数超过三个意味着函数功能过于复杂，
// 这时需要重新优化你的函数。
// 当确实需要多个参数时，大多情况下可以考虑这些参数封装成一个对象。

Bad:
function createMenu(title, body, buttonText, cancellable) {
    // ...
}
Good:
function createMenu({ title, body, buttonText, cancellable }) {
    // ...
}

// 这里注意，如果不传参数的时候，需要传一个空对象进来，不然会报错
createMenu({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
})


// 移除重复代码重复代码在 Bad Smell 中排在第一位，
// 所以，竭尽你的全力去避免重复代码。
// 因为它意味着当你需要修改一些逻辑时会有多个地方需要修改。
// 重复代码通常是因为两个或多个稍微不同的东西， 它们共享大部分，
// 但是它们的不同之处迫使你使用两个或更多独立的函数来处理大部分相同的东西。
// 移除重复代码意味着创建一个可以处理这些不同之处的抽象的函数/模块/类。


// 避免副作用当函数产生了除了“接受一个值并返回一个结果”之外的行为时，
// 称该函数产生了副作用。比如写文件、修改全局变量或将你的钱全转给了一个陌生人等。
// 程序在某些情况下确实需要副作用这一行为，这时应该将这些功能集中在一起，
// 不要用多个函数/类修改某个文件。用且只用一个 service 完成这一需求。
