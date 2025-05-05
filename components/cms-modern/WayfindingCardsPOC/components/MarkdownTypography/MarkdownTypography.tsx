import ReactMarkdown from 'react-markdown';
import { Typography, Link } from '@mui/material';
import remarkGfm from 'remark-gfm';

const MarkdownTypography = ({ markdown, variant = 'body1', color = 'textPrimary' }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => (
                    <Typography variant={variant} color={color} paragraph>
                        {children}
                    </Typography>
                ),
                strong: ({ children }) => (
                    <Typography component="span" sx={{ fontWeight: 700 }}>
                        {children}
                    </Typography>
                ),
                em: ({ children }) => (
                    <Typography component="span" sx={{ fontStyle: 'italic' }}>
                        {children}
                    </Typography>
                ),
                del: ({ children }) => (
                    <Typography component="span" sx={{ textDecoration: 'line-through' }}>
                        {children}
                    </Typography>
                ),
                a: ({ href, children }) => (
                    <Link href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                    </Link>
                ),
                h1: ({ children }) => (
                    <Typography variant="h1" gutterBottom>
                        {children}
                    </Typography>
                ),
                h2: ({ children }) => (
                    <Typography variant="h2" gutterBottom>
                        {children}
                    </Typography>
                ),
                h3: ({ children }) => (
                    <Typography variant="h3" gutterBottom>
                        {children}
                    </Typography>
                ),
                // ...add h4–h6 and others as needed
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownTypography;
