export interface BannerPayload {
    content: BannerContent;
}

export interface BannerContent {
    _meta: MetaData;
    backgroundColor: BackgroundColor;
    content: BannerBodyContent;
    link: {
        wrapper: {
            label: string;
            value: string;
        };
    };
    isMobile: boolean
}

export interface MetaData {
    name: string;
    schema: string;
    deliveryId: string;
}

export interface BackgroundColor {
    bgColor: string;
    showHideBasedOnScreenSize: 'alwaysShow' | 'mobileOnly' | 'desktopOnly';
    contentColor: string;
    customColor?: string
}

export interface BannerBodyContent {
    textBlocks: {
        contentBlocksDesktop: ContentBlockGroup;
        contentBlocksMobile?: ContentBlockGroup;
    };
}

export interface ContentBlockGroup {
    block: TextBlock[];
}

export type TextBlock = TextBlockText | TextBlockCTA | TextBlockLegal;

export interface TextBlockText {
    type: 'text';
    text: {
        text: string;
    };
}

export interface TextBlockCTA {
    type: 'cta';
    text: {
        ctas: CTA[];
    };
}

export interface CTA {
    cta: {
        buttonLabel: string;
        buttonValue: string;
    };
}

export interface TextBlockLegal {
    type: 'legal';
    text: {
        prefix?: string;
        label: string;
        pemole?: string;
        htmlModal?: string;
    };
}
