const TopNav = () => {
    return (
        <nav
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 40px',
                borderBottom: '1px solid #ccc',
                fontFamily: 'serif',
                textTransform: 'uppercase',
                fontSize: '14px',
            }}
        >
            {/* Left: Logo */}
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Banana Republic</div>

            {/* Center: Nav links */}
            <div
                style={{
                    display: 'flex',
                    gap: '40px',
                    flex: '1',
                    justifyContent: 'center',
                    letterSpacing: '1px',
                }}
            >
                <a href="#">Women</a>
                <a href="#">Men</a>
                <a href="#">Linen</a>
                <a href="#">Personal Styling</a>
                <a href="#">Sale</a>
            </div>

            {/* Right: Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                    type="text"
                    placeholder="Search"
                    style={{
                        border: 'none',
                        borderBottom: '1px solid black',
                        outline: 'none',
                        fontSize: '14px',
                        padding: '4px',
                        width: '120px',
                    }}
                />
                <span style={{ fontSize: '16px', cursor: 'pointer' }}>🔍</span>
            </div>
        </nav>
    );
};

export default TopNav;
