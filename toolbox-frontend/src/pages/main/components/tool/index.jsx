import { Outlet } from "react-router";

export default function ToolRoutePage() {
    return (
        <div style={{ padding: '20px' }}>
            <Outlet />
        </div>
    )
}