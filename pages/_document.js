import { ServerStyleSheets } from '@mui/styles';
import Document, { Html, Main, Head, NextScript } from 'next/document';
import React from 'react';
// import Head from "next/head";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;
	ctx.renderPage = () => {
		return originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
		});
	};
	const initialProps = await Document.getInitialProps(ctx);
	return {
		...initialProps,
		styles: [ ...React.Children.toArray(initialProps.styles), sheets.getStyleElement() ]
	};
};
