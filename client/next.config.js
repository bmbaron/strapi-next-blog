module.exports = {
    reactStrictMode: true,
    env: {
        token: process.env.TOKEN,
        backendUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL
    },
    images: {
        loader: "default",
        domains: ["localhost"],
    },
};