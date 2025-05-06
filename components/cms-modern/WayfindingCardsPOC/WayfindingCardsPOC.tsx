import React from 'react';
import {
    Box,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import ProductCardPOC from '../ProductCardPOC';
import { WayfindingCardsProps } from './types';
import { POCProductCardProps } from '../ProductCardPOC/types';
import MarkdownTypography from '@components/cms-modern/MarkdownTypography';
import CTAGroup from '../CTAGroupPOC';
const WayfindingCardsPOC = ({ cardsDisplay, gridType, gridItems, text }: WayfindingCardsProps) => {
    const theme = useTheme();
    const color = text?.color === "primary" ? "black" : "white"
    const halign = text?.halign === 'left' ? 'flex-start' : text?.halign === 'right' ? 'flex-end' : 'center';

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const columns = cardsDisplay >= 2 && cardsDisplay <= 4 ? cardsDisplay : 4;

    const content = text?.block.map((block, index) => {
        switch (block.type) {
            case 'header':
                return <MarkdownTypography markdown={block.text.text} key={index} color={color} />;
            case 'subheader':
                return <MarkdownTypography markdown={block.text.text} key={index} color={color} />;
            case 'eyebrow':
                return <MarkdownTypography markdown={block?.text.text} key={index} color={color} />;
                

            case 'cta':
                return (
                    <CTAGroup
                        key={index}
                        ctas={block.text?.ctas || []}
                        // buttonStyle={block.text?.buttonStyle.buttonStyle}
                        buttonStyle={{ buttonStyle: block.text.buttonStyle.buttonStyle }}
                        halign={text?.halign}
                        color={color}
                    />
                );
            default:
                return null;
        }
    });

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
                    justifyContent: halign,
                    backgroundPosition: 'top',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        padding: theme.spacing(2, 2),
                    }}
                >
                    {content}
                </Box>
                {/* <Box sx={{ width: 800 }}>{text?.block && <TextRenderer text={text} color={color} />}</Box> */}
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
                {gridItems.map((card, index) => {
                    console.log('WayfindingCards - card', card);
                    return (
                        <Grid
                            item
                            key={index}
                            xs={12 / columns} // evenly distributes across row (e.g., 6, 4, or 3 columns)
                            sx={{
                                height: '100%', // stretch to container height
                            }}
                        >
                            <ProductCardPOC cardContent={{
                                cardType: undefined,
                                text: undefined
                            }} {...card} width="100%" color={color} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default WayfindingCardsPOC;
