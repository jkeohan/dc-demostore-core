import { Box } from '@mui/material';
import { MediaCardProps, ImageData, Block, VerticalAlignment, HorizontalAlignment } from './types';
import CTAGroup from '@components/cms-modern/CTAGroupPOC';
import { CTAWrapper } from '@components/cms-modern/CTAGroupPOC/types';
import MarkdownTypography from '@components/cms-modern/MarkdownTypography';

const MediaCardPOC = ({
    background,
    cardContent,
    width = '500px',
    height = '600px',
    color: wayFindingColor,
}: MediaCardProps) => {
    const { text, cardType } = cardContent;
    const valign = text?.valign;
    const halign = text?.halign;
    const color = text?.color === 'primary' ? 'black' : 'white';

    const blocks = text?.block || [];
    const getMediaUrl = (image?: ImageData): string => {
        if (!image) return '';
        return `https://${image.defaultHost}/i/${image.endpoint}/${image.name}?w=800`;
    };

    const vAlignmentMap: Record<VerticalAlignment, string> = {
        top: 'flex-start',
        middle: 'center',
        bottom: 'flex-end',
    };

    const valignment = vAlignmentMap[(valign as VerticalAlignment) ?? 'top'];

    const alignmentMap: Record<HorizontalAlignment, string> = {
        left: 'left',
        center: 'center',
        right: 'right',
    };

    const halignment = alignmentMap[(halign as HorizontalAlignment) ?? 'center'];

    const content = text?.block?.map((block: Block, index: number) => {
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
                return (
                    <MarkdownTypography
                        markdown={block.text?.text || ''}
                        key={index}
                        color={color}
                        category={'productCardSubheader'}
                    />
                );
            case 'paragraph':
                return (
                    <MarkdownTypography
                        markdown={block.text?.text || ''}
                        key={index}
                        color={color}
                        category={'productCardBody'}
                    />
                );
            case 'cta':
                return (
                    <CTAGroup
                        key={index}
                        ctas={(block.text?.ctas || []).map((cta) => ('cta' in cta ? cta : { cta })) as CTAWrapper[]}
                        buttonStyle={block.text?.buttonStyle || {}}
                        halign={text?.halign}
                        color={text?.color}
                    />
                );
            default:
                return null;
        }
    });

    const renderBackgroundMedia = () => {
        const backgroundItem = background?.[0];
        if (!backgroundItem) return null;

        if (backgroundItem.type === 'backgroundColor') {
            const color = backgroundItem.bgColor?.color1;

            return (
                <Box
                    sx={{
                        backgroundColor: color,
                        height,
                        width,
                        ...(cardType === 'overlay' && {
                            display: 'flex',
                            alignItems: valignment,
                            justifyContent: 'center',
                            // px: 2,
                        }),
                    }}
                >
                    {cardType === 'overlay' && <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>{content}</Box>}
                </Box>
            );
        }
        if (backgroundItem.type === 'image') {
            const backgroundImage = backgroundItem.image?.image;
            const imageUrl = getMediaUrl(backgroundImage);

            return (
                <Box
                    sx={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                        height,
                        ...(cardType === 'overlay' && {
                            display: 'flex',
                            alignItems: valignment,
                            justifyContent: 'center',
                            // px: 2,
                        }),
                    }}
                >
                    {cardType === 'overlay' && <Box sx={{ mt: 2, mb: 2 }}>{content}</Box>}
                </Box>
            );
        }
        // https://cdn.media.amplience.net/v/gapincdemostore/ab4f2ad2-c6f2-4ead-815e-80a1cdb9dc0a/mp4_1440p
        if (backgroundItem.type === 'video') {
            const backgroundVideo = backgroundItem.video;
            return backgroundVideo ? (
                <Box
                    sx={{
                        width,
                        height,
                        ...(cardType === 'overlay' && {
                            display: 'flex',
                            alignItems: valignment,
                            justifyContent: 'center',
                            // px: 2,
                            textAlign: 'center',
                        }),
                    }}
                >
                    <video
                        className="banner-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        src={backgroundVideo.url}
                        style={{
                            position: 'relative',
                            width,
                            height,
                            objectFit: 'cover',
                            zIndex: -1,
                        }}
                    ></video>
                    {cardType === 'overlay' && <Box sx={{ mt: 2, mb: 2, position: 'absolute' }}>{content}</Box>}
                </Box>
            ) : null;
        }

        return null;
    };

    return (
        <Box
            sx={{
                maxWidth: width ?? 400,
                // textAlign: 'center',
                color: '#000',
                height: '750px',
                position: 'relative',
                // display: "flex",
                // flexDirection: "column",
            
            }}
        >
            {background && renderBackgroundMedia()}
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

export default MediaCardPOC;
