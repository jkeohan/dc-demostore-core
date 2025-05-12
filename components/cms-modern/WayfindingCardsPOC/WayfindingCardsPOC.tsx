import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import ProductCardPOC from '@components/cms-modern/ProductCardPOC';
import MediaCardPOC from '@components/cms-modern/MediaCardPOC'
import { WayfindingCardsProps } from './types';
import MarkdownTypography from '@components/cms-modern/MarkdownTypography';
import CTAGroup from '../CTAGroupPOC';
import { MediaCardProps } from '@components/cms-modern/MediaCardPOC/types';

const WayfindingCardsPOC = ({ cardsDisplay = 4, gridType = 'static', gridItems = [], text }: WayfindingCardsProps) => {
    console.log('WayfindingCardsPOC - gridItems', gridItems, gridType);
    const theme = useTheme();
    const color = text?.color === 'primary' ? 'black' : 'white';
    console.log('Wayfinding - gridItems', gridItems);
    const hjustify = text?.textAlign === 'left' ? 'flex-start' : text?.textAlign === 'right' ? 'flex-end' : 'center';

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const columns = cardsDisplay >= 2 && cardsDisplay <= 4 ? cardsDisplay : 4;

    const content = Array.isArray(text?.block)
        ? text?.block.map((block, index) => {
              switch (block.type) {
                  case 'header':
                      return (
                          <MarkdownTypography
                              markdown={block?.text?.text}
                              key={index}
                              color={color}
                              category={'header'}
                          />
                      );
                  case 'subheader':
                      return (
                          <MarkdownTypography
                              markdown={block?.text?.text}
                              key={index}
                              color={color}
                              category={'subheader'}
                          />
                      );
                  case 'eyebrow':
                  case 'paragraph':
                      return (
                          <MarkdownTypography
                              markdown={block?.text?.text}
                              key={index}
                              color={color}
                              category={block.type}
                          />
                      );
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
          })
        : null;

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: {
                    xs: '10px', // mobile
                    sm: theme.spacing(4, 2, 4, 2), // tablet and up
                    position: 'relative',
                },
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
                        padding: {
                            xs: '10px', // mobile
                            paddingLeft: '5px',
                        },
                    }}
                >
                    {content}
                </Box>
                {/* <Box sx={{ width: 800 }}>{text?.block && <TextRenderer text={text} color={color} />}</Box> */}
            </Box>
            {gridType === 'carousel' && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 20,
                        height: '100%',
                        width: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        cursor: 'pointer',
                    }}
                >
                    <svg width="32" height="64" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18 4 L6 24 L18 44"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Box>
            )}
            <Grid
                container
                spacing={1}
                // mt={2}
                sx={{
                    width: '100%', // 960 / 640 / 480 based on cardsDisplay
                    // height: '720px',
                    margin: '0 auto',
                    overflow: 'hidden',
                }}
            >
                {Array.isArray(gridItems) &&
                    gridItems.length > 0 &&
                    gridItems.map((card, index) => {
                        const isMediaCard = card._meta.schema === 'https://cms.gap.com/schema/v1/poc-media-card.json' ? true : false;
                        if (!card || typeof card !== 'object') return null;
                        console.log("card", card)

                        //   const cardContent = card.cardContent || { cardType: undefined, text: undefined };
                        return (
                            <Grid
                                item
                                key={index}
                                xs={isXs ? 6 : 12 / columns} // evenly distributes across row (e.g., 6, 4, or 3 columns)
                                sx={{
                                    // height: '600px', // stretch to container height
                                    height: 'auto',
                                    paddingLeft: {
                                        xs: '2px !important',
                                        sm: '0px !important',
                                        md: '8px',
                                        lg: '8px',
                                        xl: '8px',
                                    },
                                }}
                            >
                                {isMediaCard ? (
                                    <MediaCardPOC {...(card as MediaCardProps)} width="100%" color={color} />
                                ) : (
                                    <ProductCardPOC {...card} width="100%" color={color} />
                                )}
                            </Grid>
                        );
                    })}
            </Grid>
            {gridType === 'carousel' && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 20,
                        height: '100%',
                        width: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        cursor: 'pointer',
                    }}
                >
                    <svg width="32" height="64" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 4L18 24L6 44"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Box>
            )}
        </Box>
    );
};

export default WayfindingCardsPOC;
