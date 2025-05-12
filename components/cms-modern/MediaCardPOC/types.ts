export interface ImageData {
    _meta: { schema: string };
        id: string;
        name: string;
        endpoint: string;
        defaultHost: string;
        mimeType: string;
}
interface DeviceImage {
    image: ImageData;
    altText?: string;
}

interface Background {
    bgColor: any;
    mobileVideo: any;
    desktopVideo: any;
    video: any;
    type: string;
    image: {
        image: any;
        desktop: DeviceImage;
        mobile: DeviceImage;
    };
}

interface ButtonStyle {
    buttonColor: string;
    buttonStyle: string;
}
export interface CTA {
    cta: {
        buttonLabel: string;
        buttonValue: string;
    };
}

export interface CTAStyle {
    buttonStyle?: 'solid' | 'outline' | 'underline';
    layoutType?: 'linear' | 'stacked';
}
export interface TextBlockText {
    text: string;
    color?: string;
    buttonStyle?: CTAStyle;
    ctas?: CTAWrapper[];
}

export interface Block {
    type: 'header' | 'subheader' | 'eyebrow' | 'cta' | 'paragraph';
    text?: TextBlockText;
}

export interface ContentBlocks {
    halign?: any;
    valign?: 'top' | 'middle' | 'bottom';
    color?: any;
    block?: Block[];

}

export interface TextBlocks {
    text?: ContentBlocks;
    cardType?: string
    halign?: string
}

interface Link {
    wrapper: {
        label: string;
        value: string;
    }
}

export type VerticalAlignment = 'top' | 'middle' | 'bottom';
export type HorizontalAlignment = 'left' | 'center' | 'right';

interface ContentBlockGroup {
    block: TextBlock[];
    halign: HorizontalAlignment;
    textAlign: HorizontalAlignment;
    valign: VerticalAlignment;
}

type TextBlock = HeaderBlock | SubheaderBlock | CTABlock;

interface HeaderBlock {
    type: 'header';
    text: {
        class: string;
        color: string;
        text: string;
    };
}

interface SubheaderBlock {
    type: 'subheader';
    text: {
        class: string;
        color: string;
        text: string;
    };
}

export interface CTAWrapper {
    cta: CTA;
}

interface CTABlock {
    type: 'cta';
    text: {
        ctas: {
            cta: {
                buttonLabel: string;
                buttonValue: string;
            };
        }[];
        buttonStyle: {
            buttonStyle: string;
            layoutType: string;
        };
    };
}

export interface MediaCardProps {
    background?: Background[];
        cardContent: {
            cardType?: string;
            text?: {
                block?: {
                    type: 'header' | 'subheader' | 'paragraph' | 'cta' | 'eyebrow';
                    text?: {
                        class?: string;
                        text?: string;
                        ctas?: {
                            cta: CTA;
                        }[];
                        buttonStyle?: CTAStyle;
                    };
                }[];
                halign?: 'left' | 'center' | 'right';
                valign?: 'top' | 'middle' | 'bottom';
                color?: string;
            };
        };
    link?: Link;
    color?: string;
    width?: string | number
    height?: string | number
}