import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ReactMarkdown from 'markdown-to-jsx';
import { Link, Typography, Box } from '@mui/material';

type StoreCardProps = {} & CmsContent;

const Text = ({ text, align }: StoreCardProps) => {
    // Pre-process text to handle soft line breaks (backslash + newline)
    const processedText = text?.replace(/\\\n/g, '  \n'); // Convert \ + newline to two spaces + newline (markdown line break)

    const options = {
        overrides: {
            h1: { component: Typography, props: { variant: 'h1' } },
            h2: { component: Typography, props: { variant: 'h2' } },
            h3: { component: Typography, props: { variant: 'h3' } },
            h4: { component: Typography, props: { variant: 'h4' } },
            h5: { component: Typography, props: { variant: 'h5' } },
            h6: { component: Typography, props: { variant: 'h6' } },
            p: { component: Typography, props: { variant: 'body1' } },
            a: { component: Link },
            li: {
                component: ({ ...props }) => (
                    <li>
                        <Typography variant="body1" component="span" {...props} />
                    </li>
                ),
            },
        },
    };

    return (
        <Box style={{ textAlign: align }}>
            {processedText && <ReactMarkdown options={options}>{processedText}</ReactMarkdown>}
        </Box>
    );
};

export default Text;
