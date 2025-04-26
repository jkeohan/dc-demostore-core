// import './styles.css';
import Button from '@mui/material/Button';
import React from 'react';

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

    const ctaAlignClass = {
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

    return {
        ctaAlignClass,
        halignClass,
        valignClass,
        textAlignClass,
    };
}

const BannerPOC = ({ background, textBlocks, layout, contentPlacement, ...other }: BannerPOCProps) => {
    console.log("background", background)
    const desktopImage = background[0]?.image?.desktop?.image[0].image;
    const mobileImage = background[0]?.image?.mobile?.image[0].image;
    console.log({ desktopImage });
    const blocks = textBlocks?.contentBlocksDesktop?.[0]?.block || [];

    const { ctaAlignClass, halignClass, valignClass, textAlignClass } = alignment(textBlocks);

    const getImageUrl = (imageObj: ImageData) =>
        `https://${imageObj?.defaultHost}/i/${imageObj?.endpoint}/${imageObj?.name}`;
    console.log('mobileImage', mobileImage, getImageUrl(mobileImage));

    const renderBlock = (block: Block, index: number) => {
        if (!block) return null;

        console.log("renderBlock", block.type)

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
                const buttonColor = block.text.buttonStyle?.buttonColor || '';
                const buttonStyle = block.text.buttonStyle?.buttonStyle || '';
                      console.log('buttonColor', buttonColor);
                return (
                    <div key={index} className={`cta-buttons ${ctaAlignClass}`}>
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
