import React, { useEffect, useState } from 'react';
import { BannerContent, TextBlock } from './types';
import MarkdownTypography from '@components/cms-modern/MarkdownTypography';
import { Typography } from '@mui/material';

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
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
        gap: '24px',
        textAlign: 'center',
        overflowX: 'auto',
    } as const,
};

const GlobalBannerPOC = ({ backgroundColor, link, content, isMobile = false }: BannerContent) => {
    const textBlocks = content?.textBlocks;

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const blocks: TextBlock[] =
        isMobile && textBlocks?.contentBlocksMobile?.block
            ? textBlocks.contentBlocksMobile.block
            : textBlocks?.contentBlocksDesktop?.block || [];

    const contentBlock = (
        <div style={styles.bannerRow}>
            {blocks.map((block, index) => {
                console.log('block', block);
                switch (block.type) {
                    case 'text':
                        return (
                            <MarkdownTypography
                                markdown={block?.text?.text || ''}
                                key={index}
                                color={backgroundColor.contentColor}

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
        </div>
    );

    const bgColor =
        backgroundColor.bgColor === 'custom'
            ? backgroundColor.customColor
            : backgroundColor.bgColor === 'black'
              ? 'white'
              : 'black';

    return (
        <div style={{ backgroundColor: bgColor, color: backgroundColor.contentColor }}>
            {isHydrated && link?.wrapper?.value ? (
                <a
                    href={link.wrapper.value}
                    aria-label={link.wrapper.label || 'Promotional banner'}
                    style={{ display: 'block', textDecoration: 'none' }}
                    target="_blank"
                >
                    <div style={{ padding: '10px' }}>{contentBlock}</div>
                </a>
            ) : (
                <div style={{ padding: '10px' }}>{contentBlock}</div>
            )}
        </div>
    );
};

export default GlobalBannerPOC;
