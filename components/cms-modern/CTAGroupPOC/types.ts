export interface CTA {
    buttonLabel?: string;
    buttonValue?: string;
}

export interface CTAWrapper {
    cta: CTA;
}
export interface CTAStyle {
    buttonStyle?: 'solid' | 'outline' | 'underline';
    layoutType?: 'linear' | 'stacked';
}

export interface CTAGroupProps {
    ctas: CTAWrapper[]; // this is now always { cta: CTA }[]
    buttonStyle?: CTAStyle;
    halign?: 'left' | 'center' | 'right';
    color?: string;
}