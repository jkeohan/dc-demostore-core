export interface ImageData {
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
    bgColor: any;
    mobileVideo: any;
    desktopVideo: any;
    video: any;
    type: string;
    image: {
        desktop: DeviceImage;
        mobile: DeviceImage;
    };
}

interface ButtonStyle {
    buttonColor: string;
    buttonStyle: string;
}
interface CTA {
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
    class?: string;
    buttonStyle?: CTAStyle;
    ctas?: CTAWrapper[];
}

export interface Block {
    type: 'header' | 'subheader' | 'eyebrow' | 'cta' | 'paragraph';
    text: TextBlockText;
}

interface ContentBlocks {
    [x: string]: any;
    block: Block[];
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
}

export interface TextBlocks {
    contentBlocksMobile: any;
    contentBlocksDesktop?: ContentBlocks[];
}

interface Link {
    wrapper: {
        label: string;
        value: string;
    }
}
interface ContentBlockGroup {
    block: TextBlock[];
    halign: 'left' | 'center' | 'right';
    textAlign: 'left' | 'center' | 'right';
    valign: 'top' | 'middle' | 'bottom';
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

export interface BannerPOCProps {
    background: BackgroundImage[];
    textBlocks: TextBlocks;
    layout: {
        desktopBannerSize: string;
        mobileBannerSize: string;
        layout: {
            showHideBasedOnScreenSize: string;
        };
        contentPlacement?: string;
    };
    link?: Link;
}