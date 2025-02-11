let util = {

};

util.title = function (title) {
    title = title || 'XBoot 前后端分离开发平台';
    window.document.title = title;
};

util.millsToTime = function (mills) {
    if (!mills) {
        return "";
    }
    let s = mills / 1000;
    if (s < 60) {
        return s.toFixed(0) + " 秒"
    }
    let m = s / 60;
    if (m < 60) {
        return m.toFixed(0) + " 分钟"
    }
    let h = m / 60;
    if (h < 24) {
        return h.toFixed(0) + " 小时"
    }
    let d = h / 24;
    if (d < 30) {
        return d.toFixed(0) + " 天"
    }
    let month = d / 30
    if (month < 12) {
        return month.toFixed(0) + " 个月"
    }
    let year = month / 12
    return year.toFixed(0) + " 年"

};

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};


util.handleTitle = function (vm, item) {
    if (typeof item.title == 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};



util.openNewPage = function (vm, name, argu, query) {
    if (!vm.$store) {
        return;
    }
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name == pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name == item.children[0].name;
            } else {
                return name == item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};


// 将Csv文件解析为二维数组
export const getArrayFromFile = (file) => {
    let nameSplit = file.name.split('.')
    let format = nameSplit[nameSplit.length - 1]
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsText(file) // 以文本格式读取
        let arr = []
        reader.onload = function (evt) {
            let data = evt.target.result // 读到的数据
            let pasteData = data.trim()
            arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
                return row.split('\t')
            }).map(item => {
                return item[0].split(',')
            })
            if (format == 'csv') resolve(arr)
            else reject(new Error('[Format Error]:不是Csv文件'))
        }
    })
}

// 将二维数组转为表格数据
export const getTableDataFromArray = (array) => {
    let columns = []
    let tableData = []
    if (array.length > 1) {
        let titles = array.shift()
        columns = titles.map(item => {
            return {
                title: item,
                key: item
            }
        })
        tableData = array.map(item => {
            let res = {}
            item.forEach((col, i) => {
                res[titles[i]] = col
            })
            return res
        })
    }
    return {
        columns,
        tableData
    }
}

export default util;
