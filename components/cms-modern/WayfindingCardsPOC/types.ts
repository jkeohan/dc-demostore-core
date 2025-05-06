
import { CTAStyle } from '@components/cms-modern/CTAGroupPOC/types'
export interface WayfindingCardsProps {
    cardsDisplay: number;
    gridType: string;
    gridItems: ProductCardPOCProps[];
    text?: {
        block: TextBlock[];
        halign: 'left' | 'center' | 'right'
        color: string
    };
}

export interface ProductCardPOCProps {
    image: ImageObject[];
    cardType: 'overlay' | 'under'; // adjust if more types exist
    text: {
        block: TextBlock[];
    };
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

type TextBlock = HeaderBlock | SubheaderBlock | CTABlock | EyebrowBlock;

type TypographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'button';

interface HeaderBlock {
    type: 'header';
    text: StyledText;
}

interface SubheaderBlock {
    type: 'subheader';
    text: StyledText;
}

interface EyebrowBlock {
    type: 'eyebrow';
    text: StyledText;
}

interface CTABlock {
    type: 'cta';
    text: {
        ctas: {
            cta: CTA;
        }[];
        buttonStyle: CTAStyle;
    };
}

interface StyledText {
    class: TypographyVariant;
    color: string;
    text: string;
}

interface CTA {
    buttonLabel: string;
    buttonValue: string;
}
