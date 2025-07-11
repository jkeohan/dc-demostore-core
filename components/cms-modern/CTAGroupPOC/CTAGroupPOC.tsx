import React from 'react';
import { Stack, Button, Link, Box } from '@mui/material';
import { CTAGroupProps } from './types';

const CTAGroup = ({ ctas = [], buttonStyle = {}, halign, color }: CTAGroupProps) => {

    const direction = buttonStyle.layoutType === 'linear' ? 'row' : 'column';
    const isSolid = buttonStyle.buttonStyle === 'solid';
    const buttonColor = color === 'primary' ? 'black' : 'white';
    const hjustify = halign === 'left' ? 'flex-start' : halign === 'right' ? 'flex-end' : 'center';

    const stackedProps =
        direction === 'column'
            ? {
                  alignItems: hjustify,
                  //   sx: { width: 'max-content' },
              }
            : {};

    const content = ctas.map((cta, i) => {
        
        const button = cta.cta;
        // console.log('cta', cta, cta.cta.buttonLabel);
        switch (buttonStyle.buttonStyle) {
            case 'solid':
                return (
                    <Button
                        key={i}
                        component="a"
                        href={button.buttonValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        sx={{
                            backgroundColor: buttonColor === 'black' ? 'black' : 'white',
                            color: buttonColor === 'black' ? 'white' : 'black',
                            padding: '25px 40px',
                            fontSize: '12px',
                            borderRadius: 0,
                            minWidth: '150px',
                            textAlign: 'center',
                            boxShadow: 'none',
                            fontWeight: 600,
                            letterSpacing: '1px',
                            fontFamily: 'sans-serif',
                            textTransform: 'uppercase',
                            width: '280px',
                            height: '16px',
                            lineHeight: 2,
                            // ✅ Media query override
                            '@media (max-width: 768px)': {
                                padding: '16px 14px',
                                fontSize: '10px',
                                width: '47%',
                                letterSpacing: '1px'
                     
                            },
                        }}
                    >
                        {button.buttonLabel}
                    </Button>
                );
            case 'outline':

            case 'underline':
                return (
                    <Link
                        key={i}
                        href={button.buttonValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{
                            display: 'inline-block',

                            color: buttonColor,
                            textDecoration: `underline 2px solid ${buttonColor}`,
                            textUnderlineOffset: '4px', // optional: space between text and underline,
                            paddingBottom: '2px',
                            fontFamily: 'sans-serif',
                            fontSize: '12px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}
                    >
                        {button.buttonLabel}
                    </Link>
                );
            default:
                return null;
        }
    });

    return (
        <Stack
            direction={direction}
            spacing={2}
            justifyContent={halign === 'left' ? 'flex-start' : halign === 'right' ? 'flex-end' : 'center'}
            mt={2}
            sx={{ width: '100%'}}
            {...stackedProps}
        >
            {content}
        </Stack>
    );
};

export default CTAGroup;
