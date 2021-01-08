let hotkeys = [];
let editType = '';
let sysState = 'open';
import keycode from 'keycode';
const addEvents = () => {
    document.getElementById('editOpen').addEventListener('click', (e) => {
        editType = 'open';
        openDialog();
    });
    document.getElementById('editClose').addEventListener('click', (e) => {
        editType = 'close';
        openDialog();
    });
    document.getElementById('dialogCancel').addEventListener('click', (e) => {
        closeDialog();
    });
    document.getElementById('dialogConfirm').addEventListener('click', (e) => {
        if(hotkeys.length > 0) {
            saveHotKey();
        }
        closeDialog();
    });
    document.getElementById('hotkey').addEventListener('keydown', (e) => {
        let code = e.keyCode;
        if(hotkeys.indexOf(code) == -1) {
            hotkeys.push(code);
        }
        e.preventDefault();
    });
    document.getElementById('hotkey').addEventListener('keyup', (e) => {
        keyToName();
        document.getElementById('hotkey').blur();
        let classNames = document.getElementById('hotkeyWrap').className;
        document.getElementById('hotkeyWrap').setAttribute('class', `${classNames} is-dirty`);
        e.preventDefault();
    });
    document.getElementById('hotkey').addEventListener('focus', (e) => {
        hotkeys = [];
    });
    document.getElementById('isOpen').addEventListener('change', (e) => {
        let state = e.target.checked?'open':'close';
        chrome.storage.sync.set({state: state}, () => {
            switchState();
            snackbar(`ClearRead ${e.target.checked?'enable':'disable'} success!`);
        });
    });
};
const keyToName = () => {
    let keyNames = ``;
    hotkeys.map((data, k) => {
        keyNames += `${keycode.names[data]}${k < (hotkeys.length - 1)?' + ':''}`;
    });
    document.getElementById('hotkey').value = keyNames;
};

const keyToLabel = (keys) => {
    let keyNames = ``;
    keys.map((data, k) => {
        keyNames += `${keycode.names[data]}${k < (keys.length - 1)?'+':''}`;
    });
    return keyNames;
};

const saveHotKey = () => {
    let obj = {};
    obj[editType] = hotkeys;
    chrome.storage.sync.set(obj, () => {
        initSetLabel();
        snackbar('The hotkey was successfully modified!');
    });
};

const snackbar = (msg) => {
    let snackbarContainer = document.querySelector('#toast');
    let data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

const openDialog = () => {
    if(sysState == 'close') return;
    hotkeys = [];
    chrome.storage.sync.get(editType, (data) => {
        if(data.hasOwnProperty(editType)) {
            hotkeys = data[editType];
        }
        keyToName();
        document.getElementsByClassName('hot-key-dialog')[0].style.display = 'flex';
        document.getElementById('hotkey').focus();
    });
};
const closeDialog = () => {
    document.getElementsByClassName('hot-key-dialog')[0].style.display = 'none';
};
const initSetLabel = () => {
    chrome.storage.sync.get('open', (data) => {
        if(data.hasOwnProperty('open')) {
            let label = keyToLabel(data.open);
            document.getElementById('openLabel').innerText = label;
        }else {
            document.getElementById('openLabel').innerText = `shift+enter`;
        }
    });
    chrome.storage.sync.get('close', (data) => {
        if(data.hasOwnProperty('close')) {
            let label = keyToLabel(data.close);
            document.getElementById('closeLabel').innerText = label;
        }else {
            document.getElementById('closeLabel').innerText = `esc`;
        }
    });
};
const switchState = (init) => {
    chrome.storage.sync.get('state', (data) => {
        if(data.hasOwnProperty('state')) {
            sysState = data.state;
        }else {
            sysState = 'open';
        }
        let wrap = document.getElementsByClassName('popup-wrap')[0];
        if(sysState == 'open') {
            chrome.browserAction.setIcon({
                path: 'icon.png'
            }, () => {});
            wrap.setAttribute('class', `popup-wrap`);
        }else {
            chrome.browserAction.setIcon({
                path: 'icon_gray.png'
            }, () => {});
            wrap.setAttribute('class', `popup-wrap popup-disable`);
        }
        if(init) {
            let switchEl = document.getElementsByClassName('mdl-switch')[0];
            let classNames = switchEl.className;
            if(sysState == 'open') {
                if(classNames.indexOf('is-checked') == -1) {
                    switchEl.setAttribute('class', `${classNames} is-checked`);
                }
            }else {
                if(classNames.indexOf('is-checked') > -1) {
                    switchEl.setAttribute('class', `${classNames.replace('is-checked', '')}`);
                }
            }
            document.getElementById('isOpen').checked = (sysState == 'open')?true:false;
        }
    });
};
switchState(true);
addEvents();
initSetLabel();