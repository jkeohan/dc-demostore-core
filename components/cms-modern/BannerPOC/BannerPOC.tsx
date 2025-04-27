// import './styles.css';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

interface ImageData {
    image: any;
    defaultHost: string;
    endpoint: string;
    name: string;
}

interface DeviceImage {
    image: ImageData[];
    altText?: string;
}

interface BackgroundImage {
    image: {
        desktop: DeviceImage;
        mobile: DeviceImage;
    };
}

interface CTA {
    cta: {
        buttonLabel: string;
        buttonValue: string;
    };
}

interface ButtonStyle {
    buttonColor: string;
    buttonStyle: string;
}

interface TextBlockText {
    buttonStyle: any;
    text: string;
    color?: string;
    class?: string;
    ctas?: {
        ctas: CTA[];
        buttonStyle: ButtonStyle;
    };
}

interface Block {
    type: 'header' | 'subheader' | 'eyebrow' | 'cta';
    text: TextBlockText;
}

interface ContentBlocks {
    block: Block[];
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
}

interface TextBlocks {
    contentBlocksMobile: any;
    contentBlocksDesktop?: ContentBlocks[];
}

interface BannerProps {
    background: BackgroundImage[];
    contentPlacement?: string;
    layout?: string;
    textBlocks: TextBlocks;
}

interface BannerPOCProps {
    background: BackgroundImage[];
    textBlocks: TextBlocks;
    layout?: string;
    contentPlacement?: string;
}

function alignment(textBlocks: TextBlocks) {
    const textAlign = textBlocks.contentBlocksDesktop?.[0]?.textAlign || 'center';
    const halign = textBlocks.contentBlocksDesktop?.[0]?.halign || 'center';
    const valign = textBlocks.contentBlocksDesktop?.[0]?.valign || 'middle';

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
    }[textAlign]

    return {
        ctaAlignVerticalClass,
        halignClass,
        valignClass,
        textAlignClass,
        ctaAlignHorizontalClass,
    };
}

const BannerPOC = ({ background, textBlocks, layout, contentPlacement, ...other }: BannerPOCProps) => {
     const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const checkIfMobile = () => {
                setIsMobile(window.innerWidth <= 768); // Run this on the client-side only
            };

            // Check on component mount
            checkIfMobile();

            // Add event listener to handle window resize
            window.addEventListener('resize', checkIfMobile);
            return () => window.removeEventListener('resize', checkIfMobile); // Cleanup on unmount
        }, []);

    const desktopContent = textBlocks?.contentBlocksDesktop?.[0];
    const mobileContent = textBlocks?.contentBlocksMobile?.[0];

    const activeContent =
        isMobile && mobileContent
            ? { ...desktopContent, ...mobileContent } // mobile overrides desktop
            : desktopContent;

    console.log('activeContent', activeContent)

    const blocks = activeContent?.block || [];

    
    const desktopImage = background[0]?.image?.desktop?.image[0].image;
    const mobileImage = background[0]?.image?.mobile?.image[0].image;
    // const blocks = textBlocks?.contentBlocksDesktop?.[0]?.block || [];

    const { ctaAlignVerticalClass, halignClass, valignClass, textAlignClass, ctaAlignHorizontalClass } =
        alignment(textBlocks);

    const getImageUrl = (imageObj: ImageData) =>
        `https://${imageObj?.defaultHost}/i/${imageObj?.endpoint}/${imageObj?.name}`;

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
                console.log('block.text.ctas?.ctas', block.text.ctas);
                const ctas = block.text.ctas || [];
                const buttonStyles = block.text.buttonStyle || {};
                const buttonColor = buttonStyles?.buttonColor || '';
                const buttonStyle = buttonStyles?.buttonStyle || '';
                const buttonLayout = buttonStyles?.layoutType || '';

                console.log('buttonStyle', block.text.buttonStyle);
                console.log('buttonStyle', buttonStyle, buttonLayout);
                return (
                    <div
                        key={index}
                        className={`cta-buttons ${ctaAlignVerticalClass} ${buttonLayout} ${ctaAlignHorizontalClass}`}
                    >
                        {ctas.map((cta, i) => (
                            <a
                                key={i}
                                href={cta.cta.buttonValue}
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
        <section className="banner">
            <picture>
                <source media="(max-width: 768px)" srcSet={mobileImage ? getImageUrl(mobileImage) : ''} />
                <img
                    className="banner-image"
                    src={desktopImage ? getImageUrl(desktopImage) : ''}
                    alt={background[0]?.image?.desktop?.image[0]?.image.altText || 'BannerPOC'}
                />
            </picture>

            <div className={`banner-text ${halignClass} ${valignClass} ${textAlignClass}`}>
                {blocks.length > 0 ? (
                    blocks.map((block, index) => renderBlock(block, index))
                ) : (
                    <p>No content available</p>
                )}
            </div>
        </section>
    );
};

export default BannerPOC;
