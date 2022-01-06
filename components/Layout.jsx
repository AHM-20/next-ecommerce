import React from 'react';
import { AppBar, Button, Container, Link, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import useStyles from '../utils/styles';
import NextLink from 'next/link';

const Layout = ({ children }) => {
	const classes = useStyles();
	return (
		<div>
			<Head>
				<title>Next Commerce</title>
			</Head>
			<AppBar position="static" className={classes.navBar}>
				<Toolbar>
					<NextLink href={'/'} passHref>
						<Link>
							<Typography className={classes.brand}>Next Commerce</Typography>
						</Link>
					</NextLink>
				</Toolbar>
                <div className={classes.grow}></div>
                <div className={classes.navActions}>
                    <NextLink href={'/cart'} passHref><Button>Cart</Button></NextLink>
                    <NextLink href={'/login'} passHref><Button>Login</Button></NextLink>
                </div>
				{/* <Link href={'/'}>Login</Link> */}
			</AppBar>
			<Container className={classes.main}>{children}</Container>
			<footer className={classes.footer}>
				<Typography>Footer Text</Typography>
			</footer>
		</div>
	);
};

export default Layout;
