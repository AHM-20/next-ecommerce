import React, { useContext } from 'react';
import {
	AppBar,
	Badge,
	Button,
	Container,
	CssBaseline,
	IconButton,
	Link,
	Switch,
	Toolbar,
	Typography
} from '@mui/material';
import Head from 'next/head';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
// import { ThemeProvider } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Store } from '../utils/Store';
import { DarkModeSwitch } from './dark-switch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Cookies from 'js-cookie';

// import { createTheme } from '@mui/system';

const Layout = ({ title, description, children }) => {
	const { state, dispatch } = useContext(Store);
	const { darkMode, cart } = state;

	const theme = createTheme({
		typography: {
			h1: {
				fontSize: '1.6rem',
				fontWeight: 400,
				margin: '1rem 0'
			},
			h2: {
				fontSize: '1.4rem',
				fontWeight: 400,
				margin: '1rem 0'
			}
		},
		palette: {
			type: 'dark'
			// primary: {
			// 	main: '#07385e'
			// },
			// secondary: {
			// 	main: '#f50057'
			// }
		}
	});
	const classes = useStyles();

	const changeDarkMode = () => {
		dispatch({ type: darkMode ? 'DARK_MODE_ON' : 'DARK_MODE_OFF' });
		const newDarkValue = !darkMode;
		Cookies.set('darkMode', newDarkValue ? 'ON' : 'OFF');
	};


	return (
		<div>
			<Head>
				<title>{title ? `${title} - Next Commerce` : `Next Commerce`}</title>
				{description && <meta name="description" content={description} />}
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static" className={classes.navBar}>
					<Toolbar>
						<NextLink href={'/'} passHref>
							<Link>
								<Typography className={classes.brand}>Next Commerce</Typography>
							</Link>
						</NextLink>
					</Toolbar>
					<div className={classes.grow} />
					<div className={classes.navActions}>
						<Switch checked={darkMode} onChange={changeDarkMode} />
						<DarkModeSwitch sx={{ m: 1 }} checked={darkMode} onChange={changeDarkMode} />
						<NextLink href={'/cart'} passHref>
							{/* <Button>
								<Badge badgeContent={3} /> Cart
							</Button> */}
							<IconButton aria-label="cart">
								{cart.cartItems.length > 0 ? (
									<Badge badgeContent={cart.cartItems.length} color="secondary">
										<ShoppingCartIcon />
									</Badge>
								) : (
									<ShoppingCartIcon />
								)}
							</IconButton>
						</NextLink>
						<NextLink href={'/login'} passHref>
							<Button>Login</Button>
						</NextLink>
					</div>
				</AppBar>
				<Container className={classes.main}>{children}</Container>
				<footer className={classes.footer}>
					<Typography>Footer Text</Typography>
				</footer>
			</ThemeProvider>
		</div>
	);
};

export default Layout;
