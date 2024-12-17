import { useState } from "react"

/**
 * 用于依赖 useEffect 来刷新列表的页面，它依赖于 query condition 以及 refresh status
 * 用于手动控制该 useEffect 的执行
 */
export default function useRefresh() {
    const [status, setStatus] = useState(true)

    return [status, () => { setStatus(!status) }]
}