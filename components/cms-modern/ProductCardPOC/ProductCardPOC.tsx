import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import { POCProductCardProps } from './types';

const getMediaUrl = (
  image?: POCProductCardProps['image'][0]['image']
): string => {
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
          <Typography
            key={index}
            variant="body1"
            component="p"
            gutterBottom
          >
            {block.text?.text}
          </Typography>
        );
      case 'cta':
        return (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            justifyContent="center"
            mt={2}
          >
            {block.text?.ctas?.map((item: { cta: { buttonValue: string | undefined; buttonLabel: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }, i: React.Key | null | undefined) => (
              <Link
                key={i}
                href={item.cta.buttonValue}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
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
                {item.cta.buttonLabel}
              </Link>
            ))}
          </Stack>
        );
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
        <Box sx={{ mt: 2, px: 2 }}>
          {blocks.map((block, index) => renderBlock(block, index))}
        </Box>
      )}
    </Box>
  );
};

export default ProductCardPOC;
