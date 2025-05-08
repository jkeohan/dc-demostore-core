import React from 'react';

const UtilityNav = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 40px',
                backgroundColor: '#f4f3ef',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
            }}
        >
            {/* Left: Brand Links */}
            <div style={{ display: 'flex', gap: '24px' }}>
                <a href="#">GAP</a>
                <a href="#">OLD NAVY</a>
                <a href="#" style={{ fontWeight: 'bold' }}>
                    BANANA REPUBLIC
                </a>
                <a href="#">ATHLETA</a>
            </div>

            {/* Center: Promo and Sign In */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px' }}>FREE SHIPPING ON $50+ FOR REWARDS MEMBERS</span>
                <a href="#" style={{ textDecoration: 'underline' }}>
                    SIGN IN OR JOIN
                </a>
                <a href="#" style={{ textDecoration: 'underline' }}>
                    DETAILS
                </a>
            </div>

            {/* Right: Icons */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <span style={{ fontSize: '18px' }}>👤</span>
                <span style={{ fontSize: '18px' }}>🛍️</span>
            </div>
        </div>
    );
};

export default UtilityNav;
