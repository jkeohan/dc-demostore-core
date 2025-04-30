import React from 'react';
import { Box, Typography, Link, Stack, Button } from '@mui/material';
import { POCProductCardProps, CTA } from './types';

const getMediaUrl = (image?: POCProductCardProps['image'][0]['image']): string => {
    if (!image) return '';
    return `https://${image.defaultHost}/i/${image.endpoint}/${image.name}?w=800`;
};

const ProductCardPOC = ({ image, cardType, text }: POCProductCardProps) => {
    const backgroundImage = image?.[0]?.image;
    const altText = image?.[0]?.altText || 'Card image';
    const blocks = text?.block || [];

    const imageUrl = backgroundImage ? getMediaUrl(backgroundImage) : '';

    const renderBlock = (block: any, index: number) => {
        switch (block.type) {
            case 'header':
                return (
                    <Typography
                        key={index}
                        sx={{ fontWeight: 'bold', color: block.text?.color || '#000' }}
                        variant="h2"
                        component="h1"
                        gutterBottom
                    >
                        {block.text?.text}
                    </Typography>
                );
            case 'subheader':
                return (
                    <Typography key={index} variant="body1" component="p" gutterBottom>
                        {block.text?.text}
                    </Typography>
                );
            case 'cta': {
                const { ctas = [], buttonStyle = {} } = block.text || {};
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
                    <Stack
                        key={index}
                        direction={direction}
                        spacing={2}
                        justifyContent="center"
                        mt={2}
                        {...stackedProps}
                    >
                        {ctas.map((item: { cta: CTA }, i: number) => {
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
                                            minWidth: '150px', // or any other desired fixed width
                                            textAlign: 'center',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: isDark ? '#333' : '#e0e0e0',
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
            }

            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                textAlign: 'center',
                color: '#000',
            }}
        >
            <Box
                sx={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 600,
                    ...(cardType === 'overlay' && {
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        px: 2,
                    }),
                }}
            >
                {cardType === 'overlay' && (
                    <Box sx={{ marginBottom: 10, width: 270 }}>
                        {blocks.map((block, index) => renderBlock(block, index))}
                    </Box>
                )}
            </Box>

            {cardType === 'under' && (
                <Box sx={{ mt: 2, px: 2 }}>{blocks.map((block, index) => renderBlock(block, index))}</Box>
            )}
        </Box>
    );
};

export default ProductCardPOC;
