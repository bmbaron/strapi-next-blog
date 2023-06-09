import Document, { Html, Head, Main, NextScript } from "next/document";
import {ServerStyleSheet} from "styled-components";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* eslint-disable-next-line */}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Staatliches"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/uikit@3.10.1/dist/css/uikit.min.css"
                    />
                    <script
                        async
                        src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
                    />
                    <script
                        async
                        src="https://cdn.jsdelivr.net/npm/uikit@3.10.1/dist/js/uikit-icons.min.js"
                    />
                    <script
                        async
                        src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;