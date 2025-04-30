import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import ProductCardPOC from '../ProductCardPOC';
import { WayfindingCardsProps } from './types'
import { POCProductCardProps } from '../ProductCardPOC/types';

const WayfindingCardsPOC = ({ gridItems }: WayfindingCardsProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    let columns = 4; // default for large screens
    if (isXs) columns = 2;
    else if (isSm) columns = 3;
    else if (isMd) columns = 4;

    return (
        <Grid container spacing={2}>
            {gridItems.map(
                (card: React.JSX.IntrinsicAttributes & POCProductCardProps, index: React.Key | null | undefined) => (
                    <Grid item xs={12 / columns} key={index}>
                        <ProductCardPOC {...card} />
                    </Grid>
                ),
            )}
        </Grid>
    );
};

export default WayfindingCardsPOC;
