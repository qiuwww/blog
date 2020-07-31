export declare enum ENV_ENUM {
    PRE = "pre",
    QA = "qa",
    PRODUCTION = ""
}
declare class Env {
    inAPP: boolean;
    inGZZ: boolean;
    inWechat: boolean;
    inAndroid: boolean;
    inIOS: boolean;
    inAliApp: boolean;
    inAlipay: boolean;
    inUC: boolean;
    inQQ: boolean;
    inH5: boolean;
    appInfo: string;
    deviceId: string;
    constructor();
    private getCustomUaInfo;
    get devEnv(): string;
}
declare const _default: Env;
export default _default;
