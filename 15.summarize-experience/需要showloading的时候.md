## 需要showloading的时候的控制

定义状态来保存loading是否显示，
通过函数来控制loading的状态，切记每次传入准确的显示还是隐藏，不要来更改状态（亲测，like a fool）。

```
@observable loadingShow = false;
@computed loadingShowToJS() {
    return mobx.toJS(this.loadingShow);
}
@action.bound
showLoadingChange(state) {
    this.loadingShow = state;
}

```