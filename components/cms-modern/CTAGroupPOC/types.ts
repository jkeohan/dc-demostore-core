export interface CTA {
    buttonLabel: string;
    buttonValue: string;
}

export interface CTAStyle {
    buttonStyle?: 'solid' | 'border' | 'underline';
    buttonColor?: 'dark' | 'light';
    layoutType?: 'linear' | 'stacked';

}

export interface CTAGroupProps {
    ctas: { cta: CTA }[];
    buttonStyle?: CTAStyle;
    halign?: 'left' | 'center' | 'right';
}
