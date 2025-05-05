import React, { useEffect, useState } from 'react';
import { BannerContent, TextBlock } from './types';
import MarkdownTypography  from './components/MarkdownTypography'

const styles = {
    cta: {
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        fontWeight: 600,
        height: '18px',
        display: 'inline-block',
    },
    legal: {
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        fontWeight: 400,
        height: '18px',
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

const GlobalBannerPOC = ({
    backgroundColor,
    link,
    content: { textBlocks },
    isMobile = false,
}: BannerContent) => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const blocks: TextBlock[] =
        isMobile && textBlocks.contentBlocksMobile
            ? textBlocks.contentBlocksMobile.block
            : textBlocks.contentBlocksDesktop.block;

    const content = (
        <div style={styles.bannerRow}>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'text':
                        return (
                            <MarkdownTypography
                                markdown={block.text.text}
                                key={index}
                                color={backgroundColor.contentColor}
                            />
                        );

                    case 'cta':
                        return block.text.ctas.map((ctaObj, i) => (
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
                            <a target="_blank" rel="noopener noreferrer" style={styles.legal}>
                                {block.text.prefix}
                            </a>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );

    const bgColor = backgroundColor.bgColor === 'custom' ? backgroundColor.customColor : backgroundColor.bgColor;

    return (
        <div style={{ backgroundColor: bgColor, color: backgroundColor.contentColor, padding: '10px' }}>
            {isHydrated && link?.wrapper?.value ? (
                <a
                    href={link.wrapper.value}
                    aria-label={link.wrapper.label || 'Promotional banner'}
                    style={{ display: 'block', textDecoration: 'none' }}
                >
                    {content}
                </a>
            ) : (
                content
            )}
        </div>
    );
};

export default GlobalBannerPOC;
