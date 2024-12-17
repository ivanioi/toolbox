import { Outlet } from "react-router";

export default function FeatureReoutPage() {
    return (
        <div style={{ padding: '20px' }}>
            <Outlet />
        </div>
    )
}