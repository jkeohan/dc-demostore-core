import React, { useEffect, useState } from 'react';
import { BannerPOCProps, TextBlocks, ContentBlocks, ImageData, Block } from './types';
import { MarkdownTypography } from './components/MarkdownTypography';
import CTAGroup from '../CTAGroupPOC';
import Typography from '@mui/material/Typography';
import { Link, Box } from '@mui/material';
import { ResponsiveImage } from './components/ResponsiveImage';

const DynamicBanner = ({ background = [], textBlocks, layout, images = [] }: BannerPOCProps & { images?: any[] }) => {
    // console.log('textBlocks', textBlocks);
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

    // const activeContent = isMobile
    //     ? [mergedBlocks] // optionally: handle multiple mobile blocks in future
    //     : textBlocks?.contentBlocksDesktop || [defaultContentBlock];

          const activeContent = textBlocks?.contentBlocksDesktop || [defaultContentBlock];

    // console.log('activeContent', activeContent);

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

            // console.log('background', backgroundItem, backgroundImage);
            return (
                <>
                    {backgroundImage ? (
                        <picture>
                            <img
                                src={getMediaUrl(backgroundImage)}
                                alt=""
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
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
            // console.log('isMobile', isMobile, backgroundVideo);

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
        // console.log('color', block.text?.color);
        if (!block) return null;
        const activeColor = content.color === 'primary' ? 'black' : 'white';
        const bgcolor = content.color;
        const position = block.text?.position;
        const left = position?.left;
        const right = position?.right;
        const top = position?.top !== undefined ? `${position.top}vw` : undefined;
        const bottom = position?.bottom;
        const baseFontSize = block.text?.fontSize ?? 1.2;
        const responsiveFontSize = `clamp(${baseFontSize}rem, ${baseFontSize * 4}vw, 6rem)`;
        // console.log('responsiveFontSize', responsiveFontSize);
        const fontFamily = block.text?.fontFamily;
        const color = block.text?.color;
        console.log('Rendering block:', block, 'isMobile:', isMobile);
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
                            ...(left !== undefined ? { left: `${left}%` } : {}),
                            ...(right !== undefined ? { right: `${right}%` } : {}),
                            ...(top !== undefined ? { top: top } : {}),
                            ...(bottom !== undefined ? { bottom: `${bottom}%` } : {}),
                            ...(color !== undefined ? { color: color } : {}),
                            backgroundColor: bgcolor,
                            zIndex: 100,
                            padding: '10px',
                        }}
                    >
                        <MarkdownTypography
                            markdown={block.text?.text}
                            color={color}
                            category={block.type}
                            fontFamily={fontFamily}
                            sx={{ fontSize: responsiveFontSize }}
                            //fontSize={responsiveFontSize}
                        />
                    </Box>
                );
            case 'cta':
                const ctas = Array.isArray(block.text.ctas) ? block.text.ctas : [];
                const buttonStyles = block.text.buttonStyle || {};
                const buttonLayout = buttonStyles?.layoutType || '';
                // console.log('content', content);
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
        <Box
            // className={`banner banner--${desktopBannerSize}`}
            sx={{
                position: 'relative',
                fontFamily: ['Roboto', 'Arial', 'Helvetica', 'serif'],
                width: '100%',
                // height: desktopBannerSize === 'large' ? '100vh' : '100%',
                height: '100%',
                display: 'flex',
                overflow: 'hidden',
                padding: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {background.length > 0 && renderBackgroundMedia()}
            {Array.isArray(images) &&
                images.map((imgObj, idx) => {
                    const { image, position, width } = imgObj;
                    if (!image) return null;
                    const left = position?.left !== undefined ? `${position.left}%` : undefined;
                    const right = position?.right !== undefined ? `${position.right}%` : undefined;
                    const top = position?.top !== undefined ? `${position.top}vw` : undefined;
                    const bottom = position?.bottom !== undefined ? `${position.bottom}%` : undefined;
                    return (
                        <Box
                            key={image.id || idx}
                            sx={{
                                position: 'absolute',
                                left,
                                right,
                                top,
                                bottom,
                                width: width ? `${width}%` : 'auto',
                                height: 'auto',
                                zIndex: 1,
                                pointerEvents: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ResponsiveImage
                                src={getMediaUrl(image)}
                                alt={image.name || ''}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    position: 'static',
                                }}
                            />
                        </Box>
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
        </Box>
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
