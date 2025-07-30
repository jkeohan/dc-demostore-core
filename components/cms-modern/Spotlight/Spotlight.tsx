import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { SpotlightProps } from './Spotlight.types';

const Spotlight = ({ layout, background, textBlocks }: SpotlightProps) => {
    console.log('Spotlight', textBlocks);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Get background color based on screen size
    const getBackgroundColor = () => {
        const bgItem = background?.[0];
        if (!bgItem || bgItem.type !== 'backgroundColor') return undefined;

        return isMobile ? bgItem.bgColor.mobile.color1 : bgItem.bgColor.desktop.color1;
    };

    // Get appropriate content blocks based on screen size
    const getContentBlocks = () => {
        if (isMobile && textBlocks.contentBlocksMobile) {
            return textBlocks.contentBlocksMobile;
        }
        return textBlocks.contentBlocksDesktop || [];
    };

    // Handle layout visibility
    const shouldShow = () => {
        const showHideSettings = layout.layout.showHideBasedOnScreenSize;
        if (showHideSettings === 'hideOnMobile' && isMobile) return false;
        if (showHideSettings === 'hideOnDesktop' && !isMobile) return false;
        return true;
    };

    // Get banner height based on size setting
    const getBannerHeight = () => {
        const size = isMobile ? layout.mobileBannerSize : layout.desktopBannerSize;
        switch (size) {
            case 'small':
                return '300px';
            case 'medium':
                return '500px';
            case 'large':
                return '700px';
            default:
                return '500px';
        }
    };

    // Convert alignment props to CSS values
    const getJustifyContent = (halign: string) => {
        switch (halign) {
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
            default:
                return 'center';
        }
    };

    const getAlignItems = (valign: string) => {
        switch (valign) {
            case 'top':
                return 'flex-start';
            case 'middle':
                return 'center';
            case 'bottom':
                return 'flex-end';
            default:
                return 'center';
        }
    };

    const renderTextBlock = (block: any) => {
        switch (block.type) {
            case 'header':
                return (
                    <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                        {block.text.text}
                    </Typography>
                );
            case 'subheader':
                return (
                    <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                        {block.text.text}
                    </Typography>
                );
            case 'cta':
                const ctaData = block.text.ctas?.[0]?.cta;
                if (!ctaData) return null;

                return (
                    <Button
                        variant={block.text.buttonStyle?.buttonStyle === 'outline' ? 'outlined' : 'contained'}
                        size="large"
                        href={ctaData.linkUrl}
                        sx={{ mt: 2 }}
                    >
                        {ctaData.buttonLabel}
                    </Button>
                );
            default:
                return null;
        }
    };

    if (!shouldShow()) {
        return null;
    }

    const contentBlocks = getContentBlocks();

    return (
        <Box
            sx={{
                backgroundColor: getBackgroundColor(),
                minHeight: getBannerHeight(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: theme.spacing(2),
            }}
        >
            {contentBlocks.map((contentBlock, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: getJustifyContent(contentBlock.halign),
                        alignItems: getAlignItems(contentBlock.valign),
                        textAlign: contentBlock.textAlign,
                        width: '100%',
                        maxWidth: '1200px',
                        mx: 'auto',
                    }}
                >
                    {contentBlock.block.map((block, blockIndex) => (
                        <Box key={blockIndex}>{renderTextBlock(block)}</Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default Spotlight;
