import { Api } from "../api/Api";

export function debounce(fn, delay) {
    let timer = null; // 定时器ID
    return function (...args) {
        clearTimeout(timer); // 清除上一个定时任务
        timer = setTimeout(() => {
            fn()
        }, delay); // 设置新的定时任务
    };
}


export function sendHttp(apiName, params = [], successFn = () => { }, failFn = () => { }) {

    return new Api().api[apiName](...params).then(
        ({ data }) => {
            if (data.success == '1') {
                return successFn(data)
            } else {
                return failFn(data.msg)
            }
        }
    )
}