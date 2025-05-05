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
        cardType?: string;
        text?: {
            block?: {
                type: 'header' | 'cta' | 'subheader'
                text: {
                    class?: string;
                    color?: string;
                    text?: string;
                    ctas?: {
                        cta: CTA
                    }[];
                    buttonStyle?: {
                        buttonColor?: string;
                        buttonStyle?: string;
                        layoutType?: string;
                    };
                };
            }[];
        };
        width?: number;

}

export interface CTA {
    buttonLabel: string | undefined;
    buttonValue: string | undefined;
}
