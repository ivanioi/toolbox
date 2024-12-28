import { useGlobalStore } from "../App";

export function useAlert() {
    const { alertTo } = useGlobalStore(state => state)

    return {
        alertSuccess: (msg, isShortLived = true) => alertTo('success', msg, isShortLived),
        alertInfo: (msg, isShortLived = true) => alertTo('info', msg, isShortLived),
        alertWarning: (msg, isShortLived = true) => alertTo('warning', msg, isShortLived),
        alertError: (msg, isShortLived = true) => alertTo('error', msg, isShortLived),
    }
}

export function useDialog() {
    const { dialogTo } = useGlobalStore(state => state)
    return (title, msg, handleAgree = () => { }, handleDisagree = () => { }, haveAction = true) => {
        dialogTo(title, msg, haveAction, (closeF) => {
            handleAgree()
            closeF()
        }, (closeF) => {
            handleDisagree()
            closeF()
        })
    }
}