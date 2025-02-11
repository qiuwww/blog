import { format } from "date-fns";

/**
 * 将对象中时间类型属性转为时间格式字符串后端接收
 */
export const dateUtil = (data) => {
    if (!data) return;
    for (let attr in data) {
        if (data[attr] == null || data[attr] == undefined) {
            delete data[attr];
        } else if (data[attr] instanceof Date) {
            data[attr] = format(data[attr], "YYYY-MM-DD HH:mm:ss");
        }
    }
    return data;
}