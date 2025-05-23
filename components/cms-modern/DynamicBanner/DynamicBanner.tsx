import React, { useEffect, useState } from 'react';
import { BannerPOCProps, TextBlocks, ContentBlocks, ImageData, Block } from './types';
import MarkdownTypography from '@components/cms-modern/MarkdownTypography';
import CTAGroup from '../CTAGroupPOC';
import Typography from '@mui/material/Typography';
import { Link, Box } from '@mui/material';

const DynamicBanner = ({ background = [], textBlocks, layout, images = [] }: BannerPOCProps & { images?: any[] }) => {
    console.log('textBlocks', textBlocks);
    const [isMobile, setIsMobile] = useState(false);
    const { desktopBannerSize } = layout || 'large';

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const defaultContentBlock: ContentBlocks = {
        color: 'primary',
        block: [],
        halign: 'center',
        valign: 'middle',
        textAlign: 'center',
    };

    const desktopContent = textBlocks?.contentBlocksDesktop?.[0] || defaultContentBlock;
    const mobileContent = textBlocks?.contentBlocksMobile?.[0] || defaultContentBlock;

    const desktopBlocksByType = Object.fromEntries(
        (desktopContent.block || []).map((block: any) => [block.type, block]),
    );

    const mobileBlocksByType = Object.fromEntries((mobileContent.block || []).map((block: any) => [block.type, block]));

    const mergedBlockTypes = new Set([...Object.keys(desktopBlocksByType), ...Object.keys(mobileBlocksByType)]);

    const mergedBlocks: ContentBlocks = {
        ...desktopContent,
        ...mobileContent,
        block: Array.from(mergedBlockTypes).map((type) => ({
            ...desktopBlocksByType[type],
            ...mobileBlocksByType[type],
        })),
        halign: mobileContent.halign ?? desktopContent.halign,
        valign: mobileContent.valign ?? desktopContent.valign,
        textAlign: mobileContent.textAlign ?? desktopContent.textAlign,
        color: mobileContent.color ?? desktopContent.color,
    };

    const activeContent = isMobile
        ? [mergedBlocks] // optionally: handle multiple mobile blocks in future
        : textBlocks?.contentBlocksDesktop || [defaultContentBlock];

    console.log('activeContent', activeContent);

    const { ctaAlignVerticalClass, ctaAlignHorizontalClass } = alignment(textBlocks);

    const getMediaUrl = (mediaObj: ImageData) =>
        `https://${mediaObj?.defaultHost}/i/${mediaObj?.endpoint}/${mediaObj?.name}`;

    const renderBackgroundMedia = () => {
        const backgroundItem = background[0];
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
            const backgroundImage =
                isMobile && backgroundItem.image?.mobile?.image
                    ? backgroundItem.image.mobile.image
                    : backgroundItem.image?.desktop?.image;

            console.log('background', backgroundItem, backgroundImage);
            return (
                <>
                    {backgroundImage ? (
                        <picture>
                            <img className="banner-image" src={getMediaUrl(backgroundImage)} alt="" />
                        </picture>
                    ) : null}
                </>
            );
        }
        if (backgroundItem.type === 'video') {
            const backgroundVideo =
                isMobile && backgroundItem.video?.mobileVideo
                    ? backgroundItem.video.mobileVideo
                    : backgroundItem.video?.desktopVideo;
            console.log('isMobile', isMobile, backgroundVideo);

            return backgroundVideo ? (
                <video
                    className="banner-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    src={backgroundVideo.url}
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

    const renderBlock = (block: Block, index: number, content: ContentBlocks) => {
        console.log('color', block.text?.color);
        if (!block) return null;
        const activeColor = content.color === 'primary' ? 'black' : 'white';
        const position = block.text?.position;
        const left = position?.left;
        const right = position?.right;
        const top = position?.top;
        const bottom = position?.bottom;
        const fontSize = block.text?.fontSize;
        const fontFamily = block.text?.fontFamily;
        const color = block.text?.color;
        switch (block.type) {
            case 'eyebrow':
            case 'header':
            case 'subheader':
            case 'paragraph':
                return (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            ...(left !== undefined ? { left: `${left}px` } : {}),
                            ...(right !== undefined ? { right: `${right}px` } : {}),
                            ...(top !== undefined ? { top: `${top}px` } : {}),
                            ...(bottom !== undefined ? { bottom: `${bottom}px` } : {}),
                            ...(fontSize !== undefined ? { fontSize: `${fontSize}px` } : {}),
                            ...(color !== undefined ? { color: color } : {}),
                        }}
                    >
                        <MarkdownTypography
                            markdown={block.text?.text}
                            color={color}
                            category={block.type}
                            fontSize={fontSize}
                            fontFamily={fontFamily}
                        />
                    </Box>
                );
            case 'cta':
                const ctas = Array.isArray(block.text.ctas) ? block.text.ctas : [];
                const buttonStyles = block.text.buttonStyle || {};
                const buttonLayout = buttonStyles?.layoutType || '';
                console.log('content', content);
                return (
                    <div
                        key={index}
                        className={`cta-buttons ${ctaAlignVerticalClass} ${buttonLayout} ${ctaAlignHorizontalClass}`}
                    >
                        <CTAGroup
                            key={index}
                            ctas={(block.text?.ctas as any) || []}
                            buttonStyle={block.text?.buttonStyle || {}}
                            color={content.color}
                            halign={content.textAlign}
                        />
                    </div>
                );
            case 'legal':
                return (
                    <>
                        <Typography
                            sx={{
                                fontWeight: 400,
                                height: '18px',
                                fontSize: '14px',
                                display: 'inline-block',
                                marginRight: '10px !important',
                                color: (theme) => `${activeColor} !important`,
                            }}
                            variant="body2" // Map to an appropriate variant or make this dynamic
                        >
                            {block?.text?.prefix || ''}
                        </Typography>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                textDecoration: 'underline',
                                textUnderlineOffset: '1px',
                                fontWeight: 400,
                                height: '18px',
                                fontSize: '14px',
                                display: 'inline-block',
                                color: `${activeColor} !important`,
                            }}
                        >
                            {block?.text?.label || ''}
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <section
            className={`banner banner--${desktopBannerSize}`}
            style={{
                position: 'relative',
                fontFamily: 'serif !important',
                width: '100%',
                height: '100%',
                display: 'block',
            }}
        >
            {background.length > 0 && renderBackgroundMedia()}
            {Array.isArray(images) &&
                images.map((imgObj, idx) => {
                    const { image, position, width } = imgObj;
                    console.log('width', width);
                    if (!image) return null;
                    const left = position?.left !== undefined ? `${position.left}px` : undefined;
                    const right = position?.right !== undefined ? `${position.right}px` : undefined;
                    const top = position?.top !== undefined ? `${position.top}px` : undefined;
                    const bottom = position?.bottom !== undefined ? `${position.bottom}px` : undefined;
                    return (
                        <Box
                            key={image.id || idx}
                            component="img"
                            src={getMediaUrl(image)}
                            alt={image.name || ''}
                            sx={{
                                position: 'absolute',
                                left,
                                right,
                                top,
                                bottom,
                                height: 'auto !important',
                                width: width ? `${width}px !important` : 'auto !important',
                                zIndex: 1,
                                pointerEvents: 'none',
                                objectFit: 'contain',
                            }}
                        />
                    );
                })}
            {activeContent.map((content, index) => {
                return (
                    <Box
                        key={index}
                        // className={`banner-text halign-${content.halign} valign-${content.valign} text-align-${content.textAlign}`}
                        // sx={{ position: 'relative' }}
                    >
                        {Array.isArray(content.block) &&
                            content.block.map((block: Block, i: number) => renderBlock(block, i, content))}
                    </Box>
                );
            })}
        </section>
    );
};

export default DynamicBanner;

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
