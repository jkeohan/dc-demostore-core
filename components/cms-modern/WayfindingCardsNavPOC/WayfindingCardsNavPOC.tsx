import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, List, ListItem, ListItemText, Button } from '@mui/material';
import WayfindingCardsPOC from '@components/cms-modern/WayfindingCardsPOC';

interface WayfindingCardsNavProps {
    nav?: any;
    navHeader?: string;
    navParentLabel?: string;
    navParentLink?: string;
}

const WayfindingCardsNavPOC = ({ nav, navHeader, navParentLabel, navParentLink }: WayfindingCardsNavProps) => {
    const [selectedNavIndex, setSelectedNavIndex] = useState<number>(0);

    // Ensure first nav item is selected when nav is available
    useEffect(() => {
        if (nav && Array.isArray(nav) && nav.length > 0) {
            // Only reset to 0 if current index is out of bounds
            if (selectedNavIndex >= nav.length) {
                setSelectedNavIndex(0);
            }
        }
    }, [nav, selectedNavIndex]);

    const handleNavItemClick = (index: number) => {
        setSelectedNavIndex(index);
    };

    const selectedNavItem = nav && Array.isArray(nav) && nav[selectedNavIndex] ? nav[selectedNavIndex] : null;

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Left Navigation */}
            <Box
                sx={{
                    width: 280,
                    height: '100vh',
                    backgroundColor: '#ffffff',
                    padding: 4,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Navigation Header */}
                {navHeader && (
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 400,
                            marginBottom: 6,
                            color: '#333',
                            textAlign: 'center',
                            lineHeight: 1.2,
                        }}
                    >
                        {navHeader}
                    </Typography>
                )}

                {/* Navigation Items */}
                {nav && Array.isArray(nav) && (
                    <List sx={{ padding: 0 }}>
                        {nav.map((navItem, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    padding: 0,
                                    marginBottom: 4,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    onClick={() => handleNavItemClick(index)}
                                    sx={{
                                        display: 'inline-block',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '1.1rem',
                                            fontWeight: 400,
                                            color: '#333',
                                            marginBottom: 1,
                                            display: 'inline-block',
                                            borderBottom: selectedNavIndex === index ? '2px solid #333' : 'none',
                                            '&:hover': {
                                                color: '#000',
                                            },
                                        }}
                                    >
                                        {navItem.navLabel}
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                )}

                {/* ALL ACTIVEWEAR Button */}
                {navParentLabel && navParentLink && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <Button
                            href={navParentLink}
                            variant="contained"
                            sx={{
                                backgroundColor: '#1a2332',
                                color: 'white',
                                borderRadius: '25px',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                padding: '8px 16px',
                                minWidth: 'auto',
                                width: 'fit-content',
                                '&:hover': {
                                    backgroundColor: '#0f1620',
                                },
                            }}
                        >
                            {navParentLabel}
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    marginLeft: '280px',
                    padding: 3,
                    width: 'calc(100% - 280px)',
                }}
            >
                {selectedNavItem ? (
                    <WayfindingCardsPOC
                        cardsDisplay={selectedNavItem.cardsDisplay || selectedNavItem.grid?.cardsDisplay || 4}
                        gridType={selectedNavItem.gridType || selectedNavItem.grid?.gridType || 'static'}
                        gridItems={selectedNavItem.grid?.gridItems || []}
                        text={selectedNavItem.text || selectedNavItem.grid?.text}
                    />
                ) : (
                    <Typography variant="h6" sx={{ color: '#666' }}>
                        Select a navigation item to view content
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default WayfindingCardsNavPOC;
