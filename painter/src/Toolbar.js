export default class Toolbar {
    constructor(id, parent) {
        this.parent = parent;
        this.frame = document.getElementById(id);
        this.selected = null;
        this.bind();
    }
    bind() {
        this.frame.addEventListener('click', (e)=>{
            let target = e.target;
            if (!target.classList.contains('button')) return false;
            if (this.selected) this.selected.classList.remove('selected');
            this.selected = target;
            this.selected.classList.add('selected');
            let name = this.selected.getAttribute('data-name');
            this.onChange(name);
        });
    }
    setMode(switchName) {
        let buttons = this.frame.querySelectorAll('.button');
        Array.from(buttons).forEach((button)=>{
            let name = button.getAttribute('data-name');
            if (switchName === name) {
                button.classList.add('selected');
                this.selected = button;
            } else {
                button.classList.remove('selected');
            }
        });
    }
    onChange(name) {
        this.parent.setModeName(name);
    }
}

window.Toolbar = Toolbar;
