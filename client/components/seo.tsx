import Head from "next/head";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { getStrapiMedia } from "../lib/media";

// @ts-ignore
const Seo = ({ seo }) => {
    return (
        <Head>
            {seo.data && (
                <>
                    <title>{seo.metaTitle}</title>
                    <meta property="og:title" content={seo.metaTitle} />
                    <meta name="twitter:title" content={seo.metaTitle} />
                </>
            )}
            {seo.metaDescription && (
                <>
                    <meta name="description" content={seo.metaDescription} />
                    <meta property="og:description" content={seo.metaDescription} />
                    <meta name="twitter:description" content={seo.metaDescription} />
                </>
            )}
            {seo.shareImage && (
                <>
                    <meta property="og:image" content={process.env.NEXT_PUBLIC_STRAPI_API_URL + seo.shareImage.data.attributes.url} />
                    <meta name="twitter:image" content={process.env.NEXT_PUBLIC_STRAPI_API_URL + seo.shareImage.data.attributes.url} />
                    <meta name="image" content={process.env.NEXT_PUBLIC_STRAPI_API_URL + seo.shareImage.data.attributes.url} />
                </>
            )}
            {seo.article && <meta property="og:type" content="article" />}
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
};

export default Seo;