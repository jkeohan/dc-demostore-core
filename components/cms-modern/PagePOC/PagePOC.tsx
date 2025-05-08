import React from 'react';
import { ComponentMapping } from '@components/cms-modern/ContentBlock';
import TopNav from '@components/cms-modern/TopNavPOC'

interface PageProps {
    globalCarousel?: any;
    content: any[];
}

interface PageProps {
    globalCarousel?: any;
    content: any[];
}

const Page: React.FC<PageProps> = ({ globalCarousel, content }) => {
    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                // maxWidth: '1440px',
                margin: '0 auto',
                // padding: '0 16px',
            }}
        >
            {/* Optional Global Carousel */}
            {globalCarousel && Object.keys(globalCarousel).length > 0 && (
                <>
                    {ComponentMapping['https://cms.gap.com/schema/v1/poc-carousel.json'] &&
                        React.createElement(ComponentMapping['https://cms.gap.com/schema/v1/poc-carousel.json'], {
                            ...globalCarousel,
                        })}
                </>
            )}

            <TopNav />

            {/* Dynamic Content Blocks */}
            {content?.map((block, index) => {
                const Component = ComponentMapping[block._meta?.schema];

                if (!Component) {
                    console.warn(`No component found for schema: ${block._meta?.schema}`);
                    return null;
                }

                return (
                    <section key={block._meta?.deliveryId || index} style={{ width: '100%', padding:'0 !important' }}>
                        <Component {...block} />
                    </section>
                );
            })}
        </main>
    );
};

export default Page;
