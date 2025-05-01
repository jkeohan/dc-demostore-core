import React from 'react';
import { Stack, Button, Link } from '@mui/material';

interface CTA {
    buttonLabel: string;
    buttonValue: string;
}

interface CTAStyle {
    buttonStyle?: 'solid' | 'border' | 'underline';
    buttonColor?: 'dark' | 'light';
    layoutType?: 'linear' | 'stacked';
}

interface CTAGroupProps {
    ctas: { cta: CTA }[];
    buttonStyle?: CTAStyle;
}

const CTAGroup = ({ ctas = [], buttonStyle = {} }: CTAGroupProps) => {
    const direction = buttonStyle.layoutType === 'linear' ? 'row' : 'column';
    const isSolid = buttonStyle.buttonStyle === 'solid';
    const isDark = buttonStyle.buttonColor === 'dark';

    const stackedProps =
        direction === 'column'
            ? {
                  alignItems: 'center',
                  sx: { width: 'max-content', marginX: 'auto' },
              }
            : {};

    return (
        <Stack direction={direction} spacing={2} justifyContent="center" mt={2} {...stackedProps}>
            {ctas.map((item, i) => {
                const { buttonLabel, buttonValue } = item.cta;

                if (isSolid) {
                    return (
                        <Button
                            key={i}
                            component="a"
                            href={buttonValue}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            sx={{
                                backgroundColor: isDark ? '#000' : '#f5f5f5',
                                color: isDark ? '#fff' : '#000',
                                padding: '0.75rem 1.5rem',
                                fontSize: '8px',
                                borderRadius: 0,
                                minWidth: '150px',
                                textAlign: 'center',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: isDark ? '#333' : '#e0e0e0',
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            {buttonLabel}
                        </Button>
                    );
                }

                return (
                    <Link
                        key={i}
                        href={buttonValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{
                            display: 'inline-block',
                            fontWeight: 'bold',
                            color: 'black',
                            textDecoration: 'none',
                            borderBottom: '2px solid black',
                            paddingBottom: '2px',
                            '&:hover': {
                                borderBottom: '2px solid black',
                            },
                        }}
                    >
                        {buttonLabel}
                    </Link>
                );
            })}
        </Stack>
    );
};

export default CTAGroup;
