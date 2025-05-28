import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Link, SxProps } from '@mui/material';
// remarkGrm used for GitHub flavored markdown
import remarkGfm from 'remark-gfm';

const typographyVariants = {
    header: {
        fontFamily: 'serif',
        fontSize: '6.5rem',
        fontWeight: 400,
        lineHeight: 1.3,
        // '@media (max-width: 768px)': {
        //     fontSize: '40px',
        // },
    },
    subheader: {
        fontFamily: 'sans-serif',
        fontSize: '48px',
        fontWeight: 400,
        lineHeight: 1.6,
        '@media (max-width: 768px)': {
            fontSize: '24px',
        },
    },
    paragraph: {
        fontFamily: 'serif',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: 1.5,
        '@media (max-width: 768px)': {
            fontSize: '14px',
        },
    },
    eyebrow: {
        fontFamily: 'sans-serif"',
        fontSize: '16px',
        fontWeight: 300,
        '@media (max-width: 768px)': {
            fontSize: '12px',
        },
    },
    productCardHeader: {
        fontFamily: 'sans-serif',
        fontSize: '40px',
        fontWeight: 350,
        '@media (max-width: 768px)': {
            fontSize: '20px',
        },
    },
    productCardSubheader: {
        fontFamily: 'sans-serif',
        fontSize: '30px',
        fontWeight: 350,
        '@media (max-width: 768px)': {
            fontSize: '15px',
        },
    },
    productCardEyebrow: {
        fontFamily: 'sans-serif',
        fontSize: '20px',
        fontWeight: 350,
        '@media (max-width: 768px)': {
            fontSize: '16px',
        },
    },
    productCardBody: {
        fontFamily: 'sans-serif',
        fontSize: '20px',
        fontWeight: 350,
        '@media (max-width: 768px)': {
            fontSize: '16px',
        },
    },
    globalBanner: {
        fontFamily: 'serif',
        fontWeight: 400,
        lineHeight: 1.3,
        '@media (max-width: 768px)': {
            fontSize: '14px',
        },
    },
};

interface MarkdownTypographyProps {
    markdown: string;
    color?: string;
    category?: keyof typeof typographyVariants;
    fontSize?: number | string;
    fontFamily?: string;
    sx?: SxProps;
}

export const MarkdownTypography = ({
    markdown,
    color,
    category = 'paragraph',
    fontSize,
    fontFamily,
    sx,
}: MarkdownTypographyProps) => {

    const baseStyle = {
        color,
        ...typographyVariants[category],
        ...(fontSize !== undefined ? { fontSize } : {}),
        ...(fontFamily ? { fontFamily } : {}),
        ...sx,
    };


    return (
        <ReactMarkdown
            remarkPlugins={[]} // <-- disables GFM if you want to disable formatting
            components={{
                p: ({ children }) => <Typography sx={baseStyle}>{children}</Typography>,
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

// const MarkdownTypography = ({ markdown, color }: MarkdownTypographyProps) => {
//     const baseStyle = {
//         color,
//         fontFamily: '"Playfair Display", serif',
//     };

//     return (
//         <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             components={{
//                 p: ({ children }) => <Typography sx={baseStyle}>{children}</Typography>,
//                 strong: ({ children }) => (
//                     <Typography component="span" sx={{ ...baseStyle, fontWeight: 700 }}>
//                         {children}
//                     </Typography>
//                 ),
//                 em: ({ children }) => (
//                     <Typography component="span" sx={{ ...baseStyle, fontStyle: 'italic' }}>
//                         {children}
//                     </Typography>
//                 ),
//                 del: ({ children }) => (
//                     <Typography component="span" sx={{ ...baseStyle, textDecoration: 'line-through' }}>
//                         {children}
//                     </Typography>
//                 ),
//                 a: ({ href, children }) => (
//                     <Link
//                         href={href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         sx={{ ...baseStyle, textDecoration: 'underline' }}
//                     >
//                         {children}
//                     </Link>
//                 ),
//                 h1: ({ children }) => (
//                     <Typography variant="h1" gutterBottom sx={{ ...baseStyle, textTransform: 'none' }}>
//                         {children}
//                     </Typography>
//                 ),
//                 h2: ({ children }) => (
//                     <Typography variant="h2" gutterBottom sx={{ ...baseStyle, textTransform: 'none' }}>
//                         {children}
//                     </Typography>
//                 ),
//             }}
//         >
//             {markdown}
//         </ReactMarkdown>
//     );
// };

// export default MarkdownTypography;
