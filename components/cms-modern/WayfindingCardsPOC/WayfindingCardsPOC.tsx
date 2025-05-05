import React from 'react';
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import ProductCardPOC from '../ProductCardPOC';
import { WayfindingCardsProps } from './types';
import { POCProductCardProps } from '../ProductCardPOC/types';
import TextRenderer from './components/TextRenderer';
import MarkdownTypography from './components/MarkdownTypography';
const WayfindingCardsPOC = ({ cardsDisplay, gridType, gridItems, text }: WayfindingCardsProps) => {
    const theme = useTheme();
    const color = text?.color;


    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const dynamicTheme = createTheme({
        palette: {
            primary: {
                main: color === 'primary' ? '#1976d2' : '#dc004e',
            },
            secondary: {
                main: color === 'primary' ? '#dc004e' : '#1976d2',
            },
        },
    });

    const columns = cardsDisplay >= 2 && cardsDisplay <= 4 ? cardsDisplay : 4;
    const widthMap = {
        2: 960,
        3: 640,
        4: 480,
    };

    // const containerWidth = widthMap[cardsDisplay] || 480;

    const halign = text?.halign === 'left' ? 'flex-start' : text?.halign === 'right' ? 'flex-end' : 'center';

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: theme.spacing(4, 2),
                backgroundColor: 'grey'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: halign,
                }}
            >
                <Box sx={{ width: 800 }}>{text?.block && <TextRenderer text={text} color={color} />}</Box>
            </Box>
            <Grid
                container
                spacing={0}
                mt={2}
                sx={{
                    width: '100%', // 960 / 640 / 480 based on cardsDisplay
                    height: 810,
                    margin: '0 auto',
                    overflow: 'hidden',
                }}
            >
                {gridItems.map((card: POCProductCardProps, index) => {
                    return (
                        <Grid
                            item
                            key={index}
                            xs={12 / columns} // evenly distributes across row (e.g., 6, 4, or 3 columns)
                            sx={{
                                height: '100%', // stretch to container height
                            }}
                        >
                            <ProductCardPOC {...card} width="100%" color={color}/>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default WayfindingCardsPOC;
