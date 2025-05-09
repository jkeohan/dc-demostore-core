import React from 'react';
import { ComponentMapping } from '@components/cms-modern/ContentBlock';
import TopNav from '@components/cms-modern/TopNavPOC';
import UtilityNav from '@components/cms-modern/UtilityNav';

interface PageProps {
    globalCarousel?: any;
    content: any[];
}

interface PageProps {
    globalCarousel?: any;
    content: any[];
}

const Page: React.FC<PageProps> = ({ globalCarousel, content }) => {
    const sitewideBanner = content.find(
        (item) => item._meta?.schema === 'https://cms.gap.com/schema/v1/sitewide-banner.json',
    );

    const renderGlobalBanner = () => {
        if (globalCarousel && globalCarousel._meta?.schema) {
            const schema = globalCarousel._meta.schema;
            const Component = ComponentMapping[schema];

            if (Component) {
                return <Component {...globalCarousel} />;
            } else {
                console.warn(`No component found for globalCarousel schema: ${schema}`);
            }
        }

        // Optional fallback: look in content array for a sitewide banner
        const sitewideBanner = content.find(
            (item) => item._meta?.schema === 'https://cms.gap.com/schema/v1/sitewide-banner.json',
        );

        if (sitewideBanner) {
            const Component = ComponentMapping[sitewideBanner._meta.schema];
            return Component ? <Component {...sitewideBanner} /> : null;
        }

        return null;
    };

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
            <UtilityNav />

            {renderGlobalBanner()}
            {/* Optional Global Carousel */}
            {/* {globalCarousel && Object.keys(globalCarousel).length > 0
                ? ComponentMapping['https://cms.gap.com/schema/v1/poc-carousel.json'] &&
                  React.createElement(ComponentMapping['https://cms.gap.com/schema/v1/poc-carousel.json'], {
                      ...globalCarousel,
                  })
                : sitewideBanner
                  ? ComponentMapping['https://cms.gap.com/schema/v1/sitewide-banner.json'] &&
                    React.createElement(ComponentMapping['https://cms.gap.com/schema/v1/sitewide-banner.json'], {
                        ...sitewideBanner,
                    })
                  : null}
                   */}
            <TopNav />

            {/* Dynamic Content Blocks */}
            {content?.map((block, index) => {
                const Component = ComponentMapping[block._meta?.schema];

                if (!Component) {
                    console.warn(`No component found for schema: ${block._meta?.schema}`);
                    return null;
                }

                return (
                    <section key={block._meta?.deliveryId || index} style={{ width: '100%', padding: '0 !important' }}>
                        <Component {...block} />
                    </section>
                );
            })}
            <div style={{ width: '100%' }}>
                <img
                    src="https://jkeohandemo.a.bigcontent.io/v1/static/footer1?fmt=auto"
                    alt="example"
                    style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                />
            </div>
        </main>
    );
};

export default Page;
