import React from "react";

export default function CustomMenuLabel({ children, icon, sx, type }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: '5px', ...sx }}>
            {
                icon
            }
            <span style={{ whiteSpace: 'nowrap' }}>
                {type == 'open' ? children : ''}
            </span>
        </div>
    );
}