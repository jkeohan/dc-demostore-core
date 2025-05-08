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

const WayfindingCardsPOC = ({ cardsDisplay = 4, gridType = "static", gridItems = [], text }: WayfindingCardsProps) => {
    console.log("WayfindingCardsPOC - gridItems", gridItems)
    const theme = useTheme();
    const color = text?.color === "primary" ? "black" : "white"
    const hjustify = text?.textAlign === 'left' ? 'flex-start' : text?.textAlign === 'right' ? 'flex-end' : 'center';


    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const columns = cardsDisplay >= 2 && cardsDisplay <= 4 ? cardsDisplay : 4;

    const content = Array.isArray(text?.block) ? text?.block.map((block, index) => {
        switch (block.type) {
            case 'header':
                 return (<MarkdownTypography
                     markdown={block?.text?.text}
                     key={index}
                     color={color}
                     category={'header'}
                 />)
            case 'subheader':
                return (
                    <MarkdownTypography markdown={block?.text?.text} key={index} color={color} category={'subheader'} />
                );
            case 'eyebrow':
            case 'paragraph':
                return <MarkdownTypography markdown={block?.text?.text} key={index} color={color} category={block.type}/>;
            case 'cta':
                return (
                    <CTAGroup
                        key={index}
                        ctas={block.text?.ctas || []}
                        buttonStyle={{ buttonStyle: block.text.buttonStyle.buttonStyle }}
                        halign={text?.textAlign}
                        color={text?.color}
                    />
                );
            default:
                return null;
        }
    }) : null

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: theme.spacing(4, 2, 4, 2),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: hjustify,
                    backgroundPosition: 'top',
                }}
            >
                <Box
                    sx={{
                        textAlign: text?.textAlign,
                        padding: theme.spacing(1,0, 0, 0),
                    }}
                >
                    {content}
                </Box>
                {/* <Box sx={{ width: 800 }}>{text?.block && <TextRenderer text={text} color={color} />}</Box> */}
            </Box>
            <Grid
                container
                spacing={1}
                // mt={2}
                sx={{
                    width: '100%', // 960 / 640 / 480 based on cardsDisplay
                    height: '720px',
                    margin: '0 auto',
                    overflow: 'hidden',
                }}
            >
                {Array.isArray(gridItems) &&
                    gridItems.length > 0 &&
                    gridItems.map((card, index) => {
                        console.log("card", card)
                          console.log("card", card)
                          if (!card || typeof card !== 'object') return null;

                        //   const cardContent = card.cardContent || { cardType: undefined, text: undefined };
                        return (
                            <Grid
                                item
                                key={index}
                                xs={12 / columns} // evenly distributes across row (e.g., 6, 4, or 3 columns)
                                sx={{
                                    height: '600px', // stretch to container height
                                }}
                            >
                                <ProductCardPOC
                                    cardContent={{
                                        cardType: undefined,
                                        text: undefined,
                                    }}
                                    {...card}
                                    width="100%"
                                    color={color}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Box>
    );
};

export default WayfindingCardsPOC;
