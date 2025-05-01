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

export interface TextBlockText {
    buttonStyle: any;
    text: string;
    color?: string;
    class?: string;
    ctas?: {
        ctas: CTA[];
        buttonStyle: ButtonStyle;
    };
}

export interface Block {
    type: 'header' | 'subheader' | 'eyebrow' | 'cta';
    text: TextBlockText;
}

interface ContentBlocks {
    block: Block[];
    halign?: 'left' | 'center' | 'right';
    valign?: 'top' | 'middle' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
}

export interface TextBlocks {
    contentBlocksMobile: any;
    contentBlocksDesktop?: ContentBlocks[];
}

interface BannerProps {
    background: BackgroundImage[];
    contentPlacement?: string;
    layout?: string;
    textBlocks?: {
        contentBlocksDesktop?: ContentBlockGroup[];
        contentBlocksMobile?: ContentBlockGroup[];
    };
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
            buttonColor: string;
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
}
