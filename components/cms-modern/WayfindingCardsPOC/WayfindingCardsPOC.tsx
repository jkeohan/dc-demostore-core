import React from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import ProductCardPOC from '../ProductCardPOC';
import { WayfindingCardsProps } from './types';
import { POCProductCardProps } from '../ProductCardPOC/types';
import TextRenderer from './components/TextRenderer';
import MarkdownTypography from './components/MarkdownTypography';
const WayfindingCardsPOC = ({ cardsDisplay, gridType, gridItems, text }: WayfindingCardsProps) => {
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    console.log('theme', theme, isXs, isSm, isMd);

    let columns = 4; // default for large screens
    if (isXs) columns = 2;
    else if (isSm) columns = 3;
    else if (isMd) columns = 4;

    const halign = text?.halign === 'left' ? 'flex-start' : text?.halign === 'right' ? 'flex-end' : 'center'

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: theme.spacing(4, 2),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: halign    
                }}
            >
                <Box sx={{ width: 800 }}>{text?.block && <TextRenderer text={text} />}</Box>
            </Box>
            <Grid container spacing={2} mt={2}>
                {gridItems.map(
                    (
                        card: React.JSX.IntrinsicAttributes & POCProductCardProps,
                        index: React.Key | null | undefined,
                    ) => (
                        <Grid item xs={12 / columns} key={index}>
                            <ProductCardPOC {...card} />
                        </Grid>
                    ),
                )}
            </Grid>
        </Box>
    );
};

export default WayfindingCardsPOC;
