export interface WayfindingCardsProps {
    _meta: Meta;
    gridType: string;
    gridItems: ProductCardPOCProps[];
    text?: {
        block: TextBlock[];
    };
}

export interface ProductCardPOCProps {
    _meta: Meta;
    image: ImageObject[];
    cardType: 'overlay' | 'under'; // adjust if more types exist
    text: {
        block: TextBlock[];
    };
}

interface Meta {
    name: string;
    schema: string;
    deliveryId: string;
}

interface ImageObject {
    image: ImageLink;
    altText: string;
    variations: Variation[];
    fliph: boolean;
    flipv: boolean;
    enableChroma: boolean;
    chromaQuality: number;
}

interface ImageLink {
    _meta: {
        schema: string;
    };
    id: string;
    name: string;
    endpoint: string;
    defaultHost: string;
    mimeType: string;
}

interface Variation {
    variation: string;
}

type TextBlock = HeaderBlock | SubheaderBlock | CTABlock;

interface HeaderBlock {
    type: 'header';
    text: StyledText;
}

interface SubheaderBlock {
    type: 'subheader';
    text: StyledText;
}

interface CTABlock {
    type: 'cta';
    text: {
        ctas: {
            cta: CTA;
        }[];
        buttonStyle: {
            buttonColor: string;
            buttonStyle: string;
            layoutType: string;
        };
    };
}

interface StyledText {
    class: string;
    color: string;
    text: string;
}

interface CTA {
    buttonLabel: string;
    buttonValue: string;
}
