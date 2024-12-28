import { create } from 'zustand'
import { produce } from 'immer'
import RouteConfigurations from './route/routeConfigurations'
import { useRoutes } from 'react-router'
/**
 * 全局状态
 */
export const useGlobalStore = create((set) => ({
  // 全局状态反馈
  alert: { severity: 'info', msg: 'Everything is fine!', isOpen: false, shortLived: true },
  // 全局提示框, 交互
  dialog: { title: 'Default', msg: 'Default', isOpen: false, haveAction: true, handleAgree: () => { }, handleDisagree: () => { } },
  dialogTo: (title, msg, haveAction, ha, hda) => set(produce(df => {
    df.dialog.title = title;
    df.dialog.msg = msg;
    df.dialog.handleAgree = ha;
    df.dialog.handleDisagree = hda;
    df.dialog.haveAction = haveAction
    df.dialog.isOpen = true
  })),
  closeDialog: () => set(produce(df => {
    df.dialog.isOpen = false
  })),
  alertTo: (type, msg, isShortLived) => set(produce(df => {
    df.alert.severity = type;
    df.alert.msg = msg;
    df.alert.shortLived = isShortLived;
    df.alert.isOpen = true;
  })),
  closeAlert: () => set(produce(df => { df.alert.isOpen = false }))
}))



function App() {
  const element = useRoutes(RouteConfigurations);
  return element;
}

export default App
