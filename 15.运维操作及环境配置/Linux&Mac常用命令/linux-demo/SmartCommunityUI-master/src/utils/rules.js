/**
 * 表单验证集合
 *
 */

// import { validUsername } from './validate'
import { vPhone, vChineseOrNumberOrLetter } from './verification'

const requiredRules = {
    /**
     *
     */
    name: {
        required: true,
        message: '请输入名称',
        trigger: 'blur'
    },
    type: {
        required: true,
        message: '请选择类型',
        trigger: 'blur'
    },
    level: {
        required: true,
        message: '请选择层级',
        trigger: 'blur'
    },
    address: {
        required: true,
        message: '请输入地址',
        trigger: 'blur'
    },
    eventsType: {
        required: true,
        message: '请选择事件类型',
        trigger: 'blur'
    },
    remark: {
        required: true,
        message: '请输入描述',
        trigger: 'blur'
    },
    role: {
        required: true,
        message: '请选择角色',
        trigger: 'blur'
    },
    phone: {
        required: true,
        validator: vPhone,
        trigger: 'blur'
    },
    effective: {
        required: true,
        message: '请选择时间',
        trigger: 'blur'
    },


    isPrivate: {
        required: true,
        message: '请选择设备属性',
        trigger: 'blur'
    },
    remark: {
        required: false,
        message: '请选择角色',
        trigger: 'blur'
    },
    code: {
        required: true,
        message: '请输入设备编号',
        trigger: 'blur'
    },
    status: {
        required: true,
        message: '请选择设备状态',
        trigger: 'blur'
    },
    url: {
        required: true,
        message: '请输入视频地址',
        trigger: 'blur'
    },
    gridId: {
        required: true,
        message: '请选择所属网格',
        trigger: 'blur'
    },
    position: {
        required: true,
        message: '请选择输入设备位置',
        trigger: 'blur'
    }



}

const unquiredRules = {
    nickName: {
        required: false,
        validator: vChineseOrNumberOrLetter(0, 10),
        trigger: 'blur'
    }
}

export { requiredRules, unquiredRules }