import React, { useEffect, useState } from 'react';

const TopNav = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const searchSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            style={{ display: 'block' }}
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );

    const personSvg = (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9545 5.45456C15.9545 7.6386 14.184 9.40911 12 9.40911C9.81597 9.40911 8.04545 7.6386 8.04545 5.45456C8.04545 3.27051 9.81597 1.5 12 1.5C14.184 1.5 15.9545 3.27051 15.9545 5.45456ZM14.6693 10.2125C16.3316 9.27788 17.4545 7.49736 17.4545 5.45456C17.4545 2.44209 15.0125 0 12 0C8.98754 0 6.54545 2.44209 6.54545 5.45456C6.54545 7.49736 7.66843 9.27788 9.33073 10.2125C3.98807 11.7888 0 17.7136 0 21.0555C0 22.2576 0 22.9844 0.357128 23.4151C0.903336 24.0738 2.28494 24.0399 5.77962 23.954C7.37326 23.9148 9.40634 23.8649 12 23.8649C14.5937 23.8649 16.6267 23.9148 18.2204 23.954C21.7151 24.0399 23.0967 24.0738 23.6429 23.4151C24 22.9844 24 22.2576 24 21.0555C24 17.7136 20.0119 11.7888 14.6693 10.2125ZM22.5 21.0555C22.5 21.5577 22.4992 21.9077 22.4801 22.1873C22.4739 22.2769 22.4665 22.3463 22.4593 22.3993C22.4141 22.4092 22.3567 22.4199 22.2848 22.4303C21.6881 22.5168 20.7093 22.5126 18.9727 22.4718C18.7456 22.4665 18.5077 22.4606 18.2586 22.4545C16.6647 22.4153 14.6133 22.3649 12 22.3649C9.38669 22.3649 7.33534 22.4153 5.74138 22.4545L5.73605 22.4546C5.48891 22.4607 5.25277 22.4665 5.02725 22.4718C3.2907 22.5126 2.31195 22.5168 1.71522 22.4303C1.6433 22.4199 1.58587 22.4092 1.54073 22.3993C1.53349 22.3464 1.52606 22.2769 1.51993 22.1873C1.50076 21.9077 1.5 21.5577 1.5 21.0555C1.5 20.3968 1.73967 19.4429 2.28918 18.325C2.82847 17.2279 3.62123 16.0655 4.61082 15.0063C6.61463 12.8614 9.24561 11.3182 12 11.3182C14.7544 11.3182 17.3854 12.8614 19.3892 15.0063C20.3788 16.0655 21.1715 17.2279 21.7108 18.325C22.2603 19.4429 22.5 20.3968 22.5 21.0555Z"
                fill="currentColor"
            />
        </svg>
    );

    const hamburgerSvg = (
        <svg
            width="44"
            height="44"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <g fill="#000000" fillRule="nonzero">
                <path d="M12.2246 14.7499C12.2246 14.3357 12.5604 13.9999 12.9746 13.9999H33.5264C33.9406 13.9999 34.2764 14.3357 34.2764 14.7499C34.2764 15.1641 33.9406 15.4999 33.5264 15.4999L12.9746 15.4999C12.5604 15.4999 12.2246 15.1641 12.2246 14.7499ZM12.2246 22.4584C12.2246 22.0442 12.5604 21.7084 12.9746 21.7084L33.5264 21.7084C33.9406 21.7084 34.2764 22.0442 34.2764 22.4584C34.2764 22.8726 33.9406 23.2084 33.5264 23.2084L12.9746 23.2084C12.5604 23.2084 12.2246 22.8726 12.2246 22.4584ZM12.9746 29.5033C12.5604 29.5033 12.2246 29.8391 12.2246 30.2533C12.2246 30.6675 12.5604 31.0033 12.9746 31.0033L33.5264 31.0033C33.9406 31.0033 34.2764 30.6675 34.2764 30.2533C34.2764 29.8391 33.9406 29.5033 33.5264 29.5033L12.9746 29.5033Z" />
            </g>
        </svg>
    );

    if (isMobile) {
        return (
            <nav
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderBottom: '1px solid #ccc',
                    fontFamily: 'serif',
                }}
            >
                {/* Left: Hamburger and Search */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ cursor: 'pointer' }}>{hamburgerSvg}</div>
                    {/* <div style={{ cursor: 'pointer' }}>{searchSvg}</div> */}
                </div>

                {/* Center: Logo */}
                <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '4px' }}>GAP</div>

                {/* Right: Profile */}
                <div style={{ cursor: 'pointer' }}>{personSvg}</div>
            </nav>
        );
    }

    // Desktop nav remains unchanged
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
            <div style={{ fontSize: '40px', fontFamily: 'serif' }}>Gap Inc</div>

            <div
                style={{
                    display: 'flex',
                    gap: '40px',
                    flex: '1',
                    justifyContent: 'center',
                    letterSpacing: '1px',
                    fontSize: '15px',
                }}
            >
                {['Women', 'Men', 'Linen', 'Personal', 'Sale'].map((label, idx) => (
                    <a key={idx} style={{ width: '150px', textAlign: 'center' }} href="#">
                        {label}
                    </a>
                ))}
            </div>

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
                <div style={{ cursor: 'pointer' }}>{searchSvg}</div>
            </div>
        </nav>
    );
};

export default TopNav;
