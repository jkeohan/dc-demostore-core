import { CTAStyle } from '@components/cms-modern/CTAGroupPOC/types';

type AllowedTextBlockType = 'header' | 'subheader' | 'paragraph' | 'cta' | 'eyebrow';
export interface POCProductCardProps {
    image: {
        _meta: { schema: string };
        id: string;
        name: string;
        endpoint: string;
        defaultHost: string;
        mimeType: string;
    };

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
            valign?: 'top' | 'middle' | 'bottom';
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
