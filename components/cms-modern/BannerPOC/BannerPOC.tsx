import React, { useEffect, useState } from 'react';
import { BannerPOCProps, TextBlocks, ImageData, Block } from './types';
import MarkdownTypography from '../MarkdownTypography';
import CTAGroup from '../CTAGroupPOC';

const BannerPOC = ({ background = [], textBlocks, layout }: BannerPOCProps) => {
    console.log('BannerPOC - layout', layout);
    const [isMobile, setIsMobile] = useState(false);
    const { desktopBannerSize } = layout || 'large';
    console.log('isMobile', isMobile);

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

    const activeContent = isMobile ? [mobileContent] : [desktopContent];
    const activeColor = activeContent[0].color === 'primary' ? 'black' : 'white';

    console.log('activeContent', activeContent);

    const { ctaAlignVerticalClass, halignClass, valignClass, textAlignClass, ctaAlignHorizontalClass } =
        alignment(textBlocks);

    const getMediaUrl = (mediaObj: ImageData) =>
        `https://${mediaObj?.defaultHost}/i/${mediaObj?.endpoint}/${mediaObj?.name}`;

    const backgroundItem = background[0];

    const renderBackgroundMedia = () => {
        if (!backgroundItem) return null;

        if (backgroundItem.type === 'backgroundColor') {
            const color = isMobile ? backgroundItem.bgColor?.mobile.color1 : backgroundItem.bgColor?.desktop?.color1;

            return (
                <div
                    style={{
                        backgroundColor: color,
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
            if ((isMobile && !mobileImg) || !desktopImg) return null;
            const activeImage = isMobile ? mobileImg : desktopImg;
            return (
                <picture>
                    <img
                        className="banner-image"
                        src={desktopImg ? getMediaUrl(activeImage) : ''}
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
            case 'eyebrow':
            case 'header':
            case 'subheader':
            case 'paragraph':
                return <MarkdownTypography markdown={block.text?.text} key={index} color={activeColor} />;

            case 'cta':
                const ctas = Array.isArray(block.text.ctas) ? block.text.ctas : [];
                const buttonStyles = block.text.buttonStyle || {};
                const buttonLayout = buttonStyles?.layoutType || '';
                console.log("ctas", ctas)

                return (
                    <div
                        key={index}
                        className={`cta-buttons ${ctaAlignVerticalClass} ${buttonLayout} ${ctaAlignHorizontalClass}`}
                    >
                        <CTAGroup
                            key={index}
                            ctas={block.text?.ctas as any|| []}
                            buttonStyle={block.text?.buttonStyle || {}}
                            color={activeContent[0].color}
                            halign={activeContent[0].textAlign}
                     
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className={`banner banner--${desktopBannerSize}`} style={{ position: 'relative' }}>
            {renderBackgroundMedia()}
            {activeContent.map((content, index) => (
                <div
                    key={index}
                    className={`banner-text halign-${content.halign} valign-${content.valign} text-align-${content.textAlign}`}
                >
                    {Array.isArray(content.block) &&
                        content.block.map((block: Block, i: number) => renderBlock(block, i))}
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
