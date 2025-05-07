import React from 'react';
import { Stack, Button, Link, Box } from '@mui/material';
import { CTAGroupProps } from './types';

const CTAGroup = ({ ctas = [], buttonStyle = {}, halign, color }: CTAGroupProps) => {
    const direction = buttonStyle.layoutType === 'linear' ? 'row' : 'column';
    const isSolid = buttonStyle.buttonStyle === 'solid';
    const buttonColor = color === 'primary' ? "black" : "white"
    const hjustify = halign === 'left' ? 'flex-start' : halign === 'right' ? 'flex-end' : 'center';

    console.log("hjustify", halign, hjustify)

    const stackedProps =
        direction === 'column'
            ? {
                  alignItems:hjustify,
                //   sx: { width: 'max-content' },
              }
            : {};

    const content = ctas.map((cta, i) => {
        const button = cta.cta
        console.log("CTA", cta)
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
                            backgroundColor: buttonColor === 'black' ? 'black' : 'lightgrey',
                            color: buttonColor === 'black' ? 'white' : 'black',
                            padding: '0.75rem 1.5rem',
                            fontSize: '8px',
                            borderRadius: 0,
                            minWidth: '150px',
                            textAlign: 'center',
                            boxShadow: 'none',
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
                            fontWeight: 'bold',
                            color: buttonColor,
                            textDecoration: 'none',
                            borderBottom: `2px solid ${buttonColor}`,
                            paddingBottom: '2px',
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
            sx={{ width: '100%' }}
            {...stackedProps}
        >
            {content}
        </Stack>
    );
};

export default CTAGroup;
