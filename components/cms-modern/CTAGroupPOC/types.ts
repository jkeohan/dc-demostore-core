export interface CTA {
    buttonLabel?: string;
    buttonValue?: string;
}

export interface CTAStyle {
    buttonStyle?: 'solid' | 'outline' | 'underline';
    layoutType?: 'linear' | 'stacked';
}

export interface CTAGroupProps {
    ctas: { cta: CTA }[];
    buttonStyle?: CTAStyle;
    halign?: 'left' | 'center' | 'right';
    color?: string;
}
