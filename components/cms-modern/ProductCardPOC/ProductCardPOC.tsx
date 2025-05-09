import React from 'react';
import { Box, Typography, Link, Stack, Button } from '@mui/material';
import { POCProductCardProps, CTA } from './types';
import CTAGroup from '@components/cms-modern/CTAGroupPOC';
import MarkdownTypography from '@components/cms-modern/MarkdownTypography';

const getMediaUrl = (image?: POCProductCardProps['image']): string => {
    if (!image) return '';
    return `https://${image.defaultHost}/i/${image.endpoint}/${image.name}?w=800`;
};

const ProductCardPOC = ({ image, cardContent, width }: POCProductCardProps) => {
    const { text, cardType } = cardContent;
    const valign = text?.valign;
    const halign = text?.halign;
    const color = text?.color === 'primary' ? 'black' : 'white';

    const altText = image || 'Card image';
    const blocks = text?.block || [];

    const imageUrl = image ? getMediaUrl(image) : '';


    const valignment = {
        top: 'flex-start',
        middle: 'center',
        bottom: 'flex-end',
    }[valign ?? 'top'];

    const halignment = {
        left: 'left',
        center: 'center',
        right: 'right',
    }[halign ?? 'center'];

    const content = text?.block?.map((block, index) => {
        switch (block.type) {
            case 'eyebrow':
                return (
                    <MarkdownTypography
                        markdown={block.text?.text || ''}
                        key={index}
                        color={color}
                        category={'productCardEyebrow'}
                    />
                );
            case 'header':
                return (
                    <MarkdownTypography
                        markdown={block.text?.text || ''}
                        key={index}
                        color={color}
                        category={'productCardHeader'}
                    />
                );
            case 'subheader':
                    return <MarkdownTypography markdown={block.text?.text || ''} key={index} color={color} category={'productCardSubheader'} />;
            case 'paragraph':
                return <MarkdownTypography markdown={block.text?.text || ''} key={index} color={color} category={'productCardBody'} />;
            case 'cta':
                return (
                    <CTAGroup
                        key={index}
                        ctas={block.text?.ctas || []}
                        buttonStyle={block.text?.buttonStyle || {}}
                        halign={text?.halign}
                        color={text?.color}
                    />
                );
            default:
                return null;
        }
    });

    return (
        <Box
            sx={{
                maxWidth: width ?? 400,
                textAlign: 'center',
                color: '#000',
                height: '100%',
                // height: 'auto'
            }}
        >
            <Box
                sx={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    minHeight: 500,
                    ...(cardType === 'overlay' && {
                        display: 'flex',
                        alignItems: valignment,
                        justifyContent: 'center',
                        px: 2,
                    }),
                }}
            >
                {cardType === 'overlay' && <Box sx={{ mt: 2, mb: 2 }}>{content}</Box>}
            </Box>

            {cardType === 'under' && content && (
                <Box
                    sx={{
                        mt: 1,
                        textAlign: halignment,
                        padding: '0 0 5px 0',
                    }}
                >
                    {content}
                </Box>
            )}
        </Box>
    );
};

export default ProductCardPOC;
