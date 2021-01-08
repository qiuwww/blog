import Readability from './lib/Readability';
class ClearRead {
    constructor() {
        this.tpl = null;
        this.active = false;
        this.hotkeys = [];
        this.addEvents();
    }

    addReadPage() {
        if(this.active) return;
        if(!this.tpl) {
            let article = new Readability(document.cloneNode(true)).parse();
            let reg = /data-(\w*)src/g;
            let content = article.content.replace(reg, 'src');
            this.tpl = `<div class="center-area" id="clearReadCenterArea">
                            <div class="article">
                                <h1 class="title">${article.title}</h1>
                                <div class="content">${content}</div>
                            </div>
                        </div>`;
        }
        let div = document.createElement('div');
        div.id = 'clearRead';
        div.setAttribute('class', 'clearread-mode');
        div.innerHTML = this.tpl;
        document.body.appendChild(div);
        document.body.style.overflow = 'hidden';
        let imgs = div.getElementsByTagName('img');
        let areaWidth = document.getElementById('clearReadCenterArea').clientWidth;
        for(let i = 0; i < imgs.length; i++) {
            let width = imgs[i].naturalWidth;
            if(width) {
                let centerAreaWidth = areaWidth;
                if(width < (centerAreaWidth - 140)) {
                    imgs[i].setAttribute('class', 'img-c')
                }
            }
            imgs[i].onload = function () {
                let width = this.naturalWidth;
                let centerAreaWidth = areaWidth;
                if(width < (centerAreaWidth - 140)) {
                    this.setAttribute('class', 'img-c')
                }
            }
        }
        this.active = true;
        setTimeout(() => {
            div.setAttribute('class', 'clearread-mode clearread-mode-show');
            document.getElementById('clearReadCenterArea').setAttribute('class', 'center-area center-area-show');
        });
    }

    removeReadPage() {
        if(!this.active) return;
        let clearRead = document.getElementById('clearRead');
        let clearReadCenterArea = document.getElementById('clearReadCenterArea');
        clearReadCenterArea.setAttribute('class', 'center-area');
        setTimeout(() => {
            clearRead.setAttribute('class', 'clearread-mode');
            setTimeout(() => {
                document.body.style.overflow = '';
                let parentNode = clearRead.parentNode;
                parentNode.removeChild(clearRead);
                this.active = false;
            }, 250);
        }, 100);
    }

    addEvents() {
        document.addEventListener('click', (e) => {
            if(e.target.id === 'clearRead') {
                let classNames = e.target.className;
                if(classNames.indexOf('clearread-mode-show') > -1) {
                    this.removeReadPage();
                }
            }
        });
        document.addEventListener('keydown', (e) => {
            let code = e.keyCode;
            if(this.hotkeys.indexOf(code) == -1) {
                this.hotkeys.push(code);
            }
        });
        document.addEventListener('keyup', (e) => {
            chrome.storage.sync.get((data) => {
                if(data.hasOwnProperty('state') && data.state == 'close') return;
                if(data.hasOwnProperty('open')) {
                    let openkeys = data.open;
                    if(JSON.stringify(this.hotkeys) == JSON.stringify(openkeys)) {
                        this.addReadPage();
                    }
                }else {
                    if (e.shiftKey && e.keyCode == 13) {
                        this.addReadPage();
                    }
                }
                if(data.hasOwnProperty('close')) {
                    let closekeys = data.close;
                    if(JSON.stringify(this.hotkeys) == JSON.stringify(closekeys)) {
                        this.removeReadPage();
                    }
                }else {
                    if(e.keyCode == 27) {
                        this.removeReadPage();
                    }
                }
                this.hotkeys = [];
            });
        });
    }
}
const clearRead = new ClearRead();