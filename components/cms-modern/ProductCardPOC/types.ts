type AllowedTextBlockType = 'header' | 'subheader' | 'cta' | 'eyebrow';
import { CTAStyle } from '@components/cms-modern/CTAGroupPOC/types'
export interface POCProductCardProps {
    image: {
        image: {
            _meta: { schema: string };
            id: string;
            name: string;
            endpoint: string;
            defaultHost: string;
            mimeType: string;
        };
        altText?: string;
        variations?: { variation: string }[];
        fliph?: boolean;
        flipv?: boolean;
        enableChroma?: boolean;
        chromaQuality?: number;
    }[];
    cardContent: {
        cardType?: string;
        text?: {
            block?: {
                type: AllowedTextBlockType;
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
            color?: string;
        };
    };
    width?: number | string;
    color?: string;
}

export interface CTA {
    buttonLabel: string | undefined;
    buttonValue: string | undefined;
}
