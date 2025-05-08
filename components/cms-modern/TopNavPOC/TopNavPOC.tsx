const TopNav = () => {
    const styles = {
        nav: {

        }
    }
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
            <div style={{ fontSize: '40px', fontFamily: 'serif' }}>Gap Inc Brand</div>

            {/* Center: Nav links */}
            <div
                style={{
                    display: 'flex',
                    gap: '40px',
                    flex: '1',
                    justifyContent: 'center',
                    letterSpacing: '1px',
                    fontSize: "15px"
                }}
            >
                <a style={{ width: '150px', textAlign: 'center' }} href="#">
                    Women
                </a>
                <a style={{ width: '150px', textAlign: 'center' }} href="#">
                    Men
                </a>
                <a style={{ width: '150px', textAlign: 'center' }} href="#">
                    Linen
                </a>
                <a style={{ width: '170px', textAlign: 'center' }} href="#">
                    Personal Styling
                </a>
                <a style={{ width: '150px', textAlign: 'center' }} href="#">
                    Sale
                </a>
            </div>

            {/* Right: Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                    type="text"
                    placeholder="Search"
                    style={{
                        border: 'none',
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
