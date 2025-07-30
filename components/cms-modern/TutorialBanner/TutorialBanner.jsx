// import './styles.css';
import ReactMarkdown from 'markdown-to-jsx';
import ReactMarkdownNew from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { marked } from 'marked';
import { Link, Typography, Box } from '@mui/material';

// Configure marked for soft returns
// marked.setOptions({
//     // breaks: true, // Convert single line breaks to <br>
//     gfm: true, // GitHub Flavored Markdown
//     headerIds: false, // Disable auto-generated header IDs
//     mangle: false, // Disable header ID mangling
// });

// original Banner
const Banner = ({ headline, strapline, markdown, customRichText, background = {}, link = {} }) => {
    console.log('richText', customRichText);
    // console.dir(richText.data);
    // Approach 1: markdown-to-jsx with preprocessing
    const processedMarkdown = markdown?.replace(/\\\n/g, '<br>');
    const processedText = customRichText ? customRichText : '';
    console.log('processedText', processedText);

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
            br: { component: 'br' },
            li: {
                component: ({ ...props }) => (
                    <li>
                        <Typography variant="body1" component="span" {...props} />
                    </li>
                ),
            },
        },
    };

    // Approach 2: marked library with built-in soft return handling
    const markedHtml = marked.parse(markdown || '');
    const markedRichText = marked.parse(customRichText || '');

    // Approach 3: react-markdown component configuration
    const components = {
        h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
        h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
        h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
        h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
        h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
        h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
        p: ({ children }) => <Typography variant="body1">{children}</Typography>,
        a: ({ href, children }) => <Link href={href}>{children}</Link>,
        li: ({ children }) => (
            <li>
                <Typography variant="body1" component="span">
                    {children}
                </Typography>
            </li>
        ),
    };

    return (
        <section className="banner" style={{ textAlign: 'left !important' }}>
            <header style={{ textAlign: 'left !important' }}>
                <h1>{headline}</h1>
                {/* Approach 1: marked library */}
                <Box
                    sx={{
                        margin: '10px 0',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                >
                    <Typography variant="caption" color="textSecondary">
                        <h4>marked</h4>
                    </Typography>
                    <Box dangerouslySetInnerHTML={{ __html: markedHtml }} />
                    <Box dangerouslySetInnerHTML={{ __html: markedRichText }} />
                </Box>

                {/* Approach 2: markdown-to-jsx */}
                <Box
                    sx={{
                        margin: '10px 0',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                >
                    <Typography variant="caption" color="textSecondary">
                        <h4>markdown-to-jsx</h4>
                    </Typography>

                    <Box>
                        <ReactMarkdown options={options}>{processedMarkdown}</ReactMarkdown>
                        {/* <ReactMarkdown options={options}>{markdown}</ReactMarkdown> */}
                        <div style={{ fontSize: '40px !important' }}>
                            <ReactMarkdown options={options}>{processedText}</ReactMarkdown>
                        </div>
                    </Box>
                </Box>

                {/* Approach 3: react-markdown */}
                <Box
                    sx={{
                        margin: '10px 0',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                >
                    <Typography variant="caption" color="textSecondary">
                        <h4>react-markdown</h4>
                    </Typography>
                    <Box>
                        <ReactMarkdownNew components={components}>{markdown}</ReactMarkdownNew>
                        <ReactMarkdownNew components={components}>{customRichText}</ReactMarkdownNew>
                        <h4>rehypeRaw</h4>
                        <ReactMarkdownNew components={components} rehypePlugins={[rehypeRaw]}>
                            {markdown}
                        </ReactMarkdownNew>
                        <ReactMarkdownNew components={components} rehypePlugins={[rehypeRaw]}>
                            {customRichText}
                        </ReactMarkdownNew>
                    </Box>
                </Box>
            </header>
            {/* <img src={background.image?.url().build()} alt={background.alt} /> */}
            <a href={link.url}>{link.title}</a>
        </section>
    );
};

export default Banner;

// import { client } from './dc-sdk-testing';
// console.log('banner - client', client);
