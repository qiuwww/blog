export default class Element {
    constructor(config) {
        this.config = config || {};
        this.selected = false;
        this.selectedPoint = null;
    }
    setSelected(selected, point) {
        this.selected = selected;
        this.selectedPoint = point;
    }
    getSelected() {
        return this.selected;
    }
    selectedMoveHandler(point) {

    }
    isValid() {
        // 需要检查是否有小 比如过大或者过小
    }
    isSelected(point) {

    }
    setConfig(config) {
        this.config = config;
    }
}
