interface LayoutSettings {
    desktopBannerSize: 'small' | 'medium' | 'large';
    mobileBannerSize: 'small' | 'medium' | 'large';
    layout: {
        showHideBasedOnScreenSize: 'alwaysShow' | 'hideOnMobile' | 'hideOnDesktop';
    };
}

interface BackgroundColor {
    type: 'backgroundColor';
    bgColor: {
        desktop: {
            color1: string;
        };
        mobile: {
            color1: string;
        };
    };
}

interface TextBlock {
    type: 'header' | 'subheader' | 'cta';
    text: {
        text?: string;
        buttonStyle?: {
            buttonStyle: 'solid' | 'outline';
            layoutType: 'linear' | 'stacked';
        };
        ctas?: Array<{
            cta: {
                buttonLabel: string;
                linkUrl?: string;
            };
        }>;
    };
}

interface ContentBlock {
    halign: 'left' | 'center' | 'right';
    valign: 'top' | 'middle' | 'bottom';
    textAlign: 'left' | 'center' | 'right';
    block: TextBlock[];
    color: 'primary' | 'secondary';
}

interface TextBlocks {
    contentBlocksDesktop: ContentBlock[];
    contentBlocksMobile?: ContentBlock[];
}

export interface SpotlightProps {
    layout: LayoutSettings;
    background: BackgroundColor[];
    textBlocks: TextBlocks;
}
