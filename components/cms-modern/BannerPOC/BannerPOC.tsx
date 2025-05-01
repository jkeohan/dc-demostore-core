import React, { useEffect, useState } from 'react';
import { BannerPOCProps, TextBlocks, ImageData, Block } from './types';

const BannerPOC = ({ background = [], textBlocks, layout, ...other }: BannerPOCProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const { desktopBannerSize } = layout;

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const desktopContent = textBlocks?.contentBlocksDesktop?.[0] || { block: [] };
    const mobileContent = textBlocks?.contentBlocksMobile?.[0] || { block: [] };

    const { ctaAlignVerticalClass, halignClass, valignClass, textAlignClass, ctaAlignHorizontalClass } =
        alignment(textBlocks);

    const getMediaUrl = (mediaObj: ImageData) =>
        `https://${mediaObj?.defaultHost}/i/${mediaObj?.endpoint}/${mediaObj?.name}`;

    const backgroundItem = background[0];

    const renderBackgroundMedia = () => {
        if (!backgroundItem) return null;

        if (backgroundItem.type === 'backgroundColor') {
            const desktopColor = backgroundItem.bgColor?.desktop?.color1;
            return (
                <div
                    style={{
                        backgroundColor: desktopColor,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1,
                    }}
                />
            );
        }

        if (backgroundItem.type === 'image') {
            const desktopImg = backgroundItem.image?.desktop?.image?.[0]?.image;
            const mobileImg = backgroundItem.image?.mobile?.image?.[0]?.image;
            if (!desktopImg && !mobileImg) return null;

            return (
                <picture>
                    <source media="(max-width: 768px)" srcSet={mobileImg ? getMediaUrl(mobileImg) : ''} />
                    <img
                        className="banner-image"
                        src={desktopImg ? getMediaUrl(desktopImg) : ''}
                        alt={desktopImg?.altText || 'Banner'}
                    />
                </picture>
            );
        }

        if (backgroundItem.type === 'video') {
            const desktopVid = backgroundItem.video?.desktopVideo?.url;
            const mobileVid = backgroundItem.video?.mobileVideo?.url;
            const videoSource = isMobile ? mobileVid : desktopVid;
            if (!desktopVid && !mobileVid) return null;

            return videoSource ? (
                <video
                    className="banner-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    src={videoSource}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                    }}
                ></video>
            ) : null;
        }

        return null;
    };

    const renderBlock = (block: Block, index: number) => {
        if (!block) return null;

        switch (block.type) {
            case 'header':
                const HeaderTag = (block.text.class || 'h1') as keyof JSX.IntrinsicElements;
                return (
                    <HeaderTag key={index} style={{ color: block.text.color }}>
                        {block.text.text}
                    </HeaderTag>
                );

            case 'subheader':
                return (
                    <p key={index} style={{ color: block.text.color }}>
                        {block.text.text}
                    </p>
                );

            case 'eyebrow':
                return (
                    <p key={index} style={{ color: block.text.color }} className={block.text.class}>
                        {block.text.text}
                    </p>
                );

            case 'cta':
                const ctas = Array.isArray(block.text.ctas) ? block.text.ctas : [];
                const buttonStyles = block.text.buttonStyle || {};
                const buttonColor = buttonStyles?.buttonColor || '';
                const buttonStyle = buttonStyles?.buttonStyle || '';
                const buttonLayout = buttonStyles?.layoutType || '';

                return (
                    <div
                        key={index}
                        className={`cta-buttons ${ctaAlignVerticalClass} ${buttonLayout} ${ctaAlignHorizontalClass}`}
                    >
                        {ctas.map((cta, i) => (
                            <a
                                key={i}
                                href={cta.cta.buttonValue || '#'}
                                className={`button ${buttonStyle} ${buttonColor}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {cta.cta.buttonLabel}
                            </a>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className={`banner banner--${desktopBannerSize}`} style={{ position: 'relative' }}>
            {renderBackgroundMedia()}
            {textBlocks?.contentBlocksDesktop?.map((group, index) => (
                <div
                    key={index}
                    className={`banner-text halign-${group.halign} valign-${group.valign} text-align-${group.textAlign}`}
                >
                    {Array.isArray(group.block) && group.block.map((block, i) => renderBlock(block, i))}
                </div>
            ))}
        </section>
    );
};

export default BannerPOC;

function alignment(textBlocks: TextBlocks) {
    const textAlign = textBlocks?.contentBlocksDesktop?.[0]?.textAlign || 'center';
    const halign = textBlocks?.contentBlocksDesktop?.[0]?.halign || 'center';
    const valign = textBlocks?.contentBlocksDesktop?.[0]?.valign || 'middle';

    const ctaAlignVerticalClass = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }[textAlign];

    const halignClass = {
        left: 'halign-left',
        center: 'halign-center',
        right: 'halign-right',
    }[halign];

    const valignClass = {
        top: 'valign-top',
        middle: 'valign-middle',
        bottom: 'valign-bottom',
    }[valign];

    const textAlignClass = {
        left: 'text-align-left',
        center: 'text-align-center',
        right: 'text-align-right',
    }[textAlign];

    const ctaAlignHorizontalClass = {
        left: 'left',
        center: 'center',
        right: 'right',
    }[textAlign];

    return {
        ctaAlignVerticalClass,
        halignClass,
        valignClass,
        textAlignClass,
        ctaAlignHorizontalClass,
    };
}
