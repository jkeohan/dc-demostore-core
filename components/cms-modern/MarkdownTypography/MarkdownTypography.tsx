import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Link } from '@mui/material';
import remarkGfm from 'remark-gfm';

interface MarkdownTypographyProps {
    markdown?: string;
    color?: string;
}

const MarkdownTypography = ({ markdown, color }: MarkdownTypographyProps) => {
    console.log("MarkdownTypography - color", color)
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => <Typography sx={{ color }}>{children}</Typography>,
                strong: ({ children }) => (
                    <Typography component="span" sx={{ fontWeight: 700, color }}>
                        {children}
                    </Typography>
                ),
                em: ({ children }) => (
                    <Typography component="span" sx={{ fontStyle: 'italic', color }}>
                        {children}
                    </Typography>
                ),
                del: ({ children }) => (
                    <Typography component="span" sx={{ textDecoration: 'line-through', color }}>
                        {children}
                    </Typography>
                ),
                a: ({ href, children }) => (
                    <Link href={href} target="_blank" rel="noopener noreferrer" sx={{ color }}>
                        {children}
                    </Link>
                ),
                h1: ({ children }) => (
                    <Typography variant="h1" gutterBottom sx={{ color }}>
                        {children}
                    </Typography>
                ),
                h2: ({ children }) => (
                    <Typography variant="h2" gutterBottom sx={{ color }}>
                        {children}
                    </Typography>
                ),
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownTypography