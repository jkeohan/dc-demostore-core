
import { CTAStyle } from '@components/cms-modern/CTAGroupPOC/types'
import {POCProductCardProps} from "@components/cms-modern/ProductCardPOC/types"
export interface WayfindingCardsProps {
    cardsDisplay: number;
    gridType: string;
    gridItems: POCProductCardProps[];
    text?: {
        block: TextBlock[];
        textAlign: 'left' | 'center' | 'right';
        color: string;
    };
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

type TextBlock = HeaderBlock | SubheaderBlock | CTABlock | EyebrowBlock | Paragraph;

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

interface Paragraph {
    type: 'paragraph';
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
    color?: string;
    text: string;
}

interface CTA {
    buttonLabel: string;
    buttonValue: string;
}
