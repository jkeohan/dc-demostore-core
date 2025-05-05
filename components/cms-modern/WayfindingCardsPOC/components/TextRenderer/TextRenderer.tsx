import React from 'react';
import { Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface TextBlock {
  type: 'header' | 'subheader';
  text: {
    class: string; // You can narrow this if you want stricter typing
    color: string;
    text: string;
  };
}

interface TextProps {
  block: TextBlock[];
  color: string;
}

const TextRenderer = ({ text, color = 'inherit' }: { text: TextProps; color?: string }) => {
      console.log('color', color)
    return (
        <>
            {text.block.map((block, index) => {
                console.log('block.type', block.type);
                switch (block.type) {
                    case 'header':
                        return (
                            <Typography
                                key={index}
                                variant={block.text.class as any} // Ideally narrow the class type
                                color={color}
                                gutterBottom
                            >
                                {block.text.text}
                            </Typography>
                        );
                    case 'subheader':
                        return (
                            <Typography
                                key={index}
                                variant="body1" // Map to an appropriate variant or make this dynamic
                                color={color}
                                paragraph
                            >
                                {block.text.text}
                            </Typography>
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default TextRenderer;
