import React, { useEffect, useState } from 'react';
import { BannerContent, TextBlock } from './types';
import MarkdownTypography from '@components/cms-modern/MarkdownTypography';
import { Typography, Box } from '@mui/material';

const styles: {
    cta: React.CSSProperties;
    legal: React.CSSProperties;
    legalPrefix: React.CSSProperties;
    bannerRow: React.CSSProperties;
} = {
    cta: {
        textDecoration: 'underline',
        textTransform: 'uppercase',
        textUnderlineOffset: '1px',
        fontFamily: 'sans-serif',
        fontWeight: 900,
        height: '18px',
        display: 'inline-block',
        fontSize: '14px',
    },
    legal: {
        textDecoration: 'underline',
        textUnderlineOffset: '1px',
        fontWeight: 400,
        height: '18px',
        fontSize: '14px',
        display: 'inline-block',
    },
    legalPrefix: {
        fontWeight: 400,
        height: '18px',
        fontSize: '14px',
        display: 'inline-block',
    },
    bannerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: '24px',
        textAlign: 'center',
        overflowX: 'auto',
        overflowY: 'hidden',
    } as const,
};

const GlobalBannerPOC = ({ backgroundColor, link, content }: BannerContent) => {
    const textBlocks = content?.textBlocks;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const blocks: TextBlock[] =
        isMobile && textBlocks?.contentBlocksMobile?.block
            ? textBlocks.contentBlocksMobile.block
            : textBlocks?.contentBlocksDesktop?.block || [];

    const contentBlock = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'baseline',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                textAlign: 'center',
                overflowX: 'auto',
                overflowY: 'hidden',
                gap: {
                    xs: '8px',
                    sm: '12px',
                    md: '16px',
                    lg: '24px',
                },
            }}
        >
            {blocks.map((block, index) => {
                console.log('block', block);
                switch (block.type) {
                    case 'text':
                        return (
                            <MarkdownTypography
                                markdown={block?.text?.text || ''}
                                key={index}
                                color={backgroundColor.contentColor}
                                category="globalBanner"
                            />
                        );

                    case 'cta':
                        return block?.text?.ctas.map((ctaObj, i) => (
                            <a
                                key={`${index}-${i}`}
                                href={ctaObj.cta.buttonValue}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.cta}
                            >
                                {ctaObj.cta.buttonLabel}
                            </a>
                        ));

                    case 'legal':
                        return (
                            <>
                                <Typography
                                    sx={styles.legalPrefix}
                                    variant="body2" // Map to an appropriate variant or make this dynamic
                                    color={backgroundColor.contentColor}
                                >
                                    {block?.text?.prefix || ''}
                                </Typography>
                                <a target="_blank" rel="noopener noreferrer" style={styles.legal}>
                                    {block?.text?.label || ''}
                                </a>
                            </>
                        );

                    default:
                        return null;
                }
            })}
        </Box>
    );

    const bgColor =
        backgroundColor.bgColor === 'custom'
            ? backgroundColor.customColor
            : backgroundColor.bgColor === 'black'
              ? 'white'
              : 'black';

    return (
        <div style={{ backgroundColor: bgColor, color: backgroundColor.contentColor }}>
            <div style={{ padding: '10px' }}>{contentBlock}</div>
        </div>
    );
};

export default GlobalBannerPOC;
