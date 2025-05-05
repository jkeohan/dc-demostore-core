import React from 'react';
import { Box, Typography, Link, Stack, Button } from '@mui/material';
import { POCProductCardProps, CTA } from './types';
import CTAGroup from '../CTAGroupPOC';

const getMediaUrl = (image?: POCProductCardProps['image'][0]['image']): string => {
    if (!image) return '';
    return `https://${image.defaultHost}/i/${image.endpoint}/${image.name}?w=800`;
};

const ProductCardPOC = ({ image, cardType, text, width }: POCProductCardProps) => {
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
            case 'cta':
                return <CTAGroup key={index} ctas={block.text?.ctas || []} buttonStyle={block.text?.buttonStyle} />;

            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                maxWidth: width ?? 400,
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
