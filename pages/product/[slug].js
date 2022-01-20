import React, { useContext } from 'react';
import NextLink from 'next/link';
import { Link, Grid, List, ListItem, Typography, Rating, Card, Chip, Button } from '@mui/material';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { Store } from '../../utils/Store';

const ProductScreen = ({ product }) => {
	const { dispatch } = useContext(Store);

	const classes = useStyles();

	if (!product) {
		return <h1>Product not found</h1>;
	}

	const addToCartHandler = async () => {
		const { data } = await axios.get(`/api/products/${product._id}`);
		if(data.countInStock <= 0){
			return window.alert('asdasd')
		}
		dispatch({ type: 'CART_ADD', payload: { ...product, quatity: 1 } });
	};

	return (
		<Layout title={product.name} description={product.description}>
			<div className={classes.section}>
				<NextLink href="/" passHref>
					<Link>
						<Typography>Back to products</Typography>
					</Link>
				</NextLink>
			</div>
			<Grid container spacing={1}>
				<Grid item md={6} xs={12}>
					<Image src={product.image} alt={product.name} width={640} height={640} layout="responsive" />
				</Grid>
				<Grid item md={3} xs={12}>
					<List>
						<ListItem>
							<Typography component={'h1'} variant="h1">
								{product.name}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>Category: {product.category}</Typography>
						</ListItem>
						<ListItem>
							<Typography>Category: {product.category}</Typography>
						</ListItem>
						<ListItem>
							<Typography>Brand: {product.brand}</Typography>
						</ListItem>
						<ListItem>
							<Typography>Rating: </Typography>

							<Rating name="read-only" value={product.rating} readOnly />
						</ListItem>
						<ListItem>
							<Typography>Description: &nbsp;</Typography>
							<Typography>{product.description}</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid item md={3} xs={12}>
					<Card>
						<List>
							<ListItem>
								<Grid container>
									<Grid item>
										<Typography>Price</Typography>
									</Grid>
									<Grid item>
										<Typography>$ {product.price}</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container>
									<Grid item>
										<Typography>Status &nbsp;</Typography>
									</Grid>
									<Grid item>
										<Typography>
											{product.countInStock > 0 ? (
												<Chip label="In Stock" variant="outlined" color="primary" />
											) : (
												<Chip label="Unavailable" variant="outlined" color="error" />
											)}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
									Add to cart
								</Button>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();

	return {
		props: {
			product: db.converToObj(product)
		}
	};
}

export default ProductScreen;
