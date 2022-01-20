import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';

export default function Home({ products }) {
	// const { products } = props;
	return (
		<Layout>
			<div>
				<h1>Products</h1>
				<Grid container spacing={3}>
					{products.map((product) => (
						<Grid item md={4} key={product.name}>
							<Card>
								<NextLink href={`product/${product.slug}`} passHref>
									<CardActionArea>
										<CardMedia component={'img'} image={product.image} title={product.name} />
										<CardContent>
											<Typography>{product.name}</Typography>
										</CardContent>
									</CardActionArea>
								</NextLink>
								<CardActions>
									<Typography>$ {product.price}</Typography>
									<Button size="small" color="primary">
										Add to Cart
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</Layout>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find({}).lean();
	await db.disconnect();

	return {
		props: {
			products: products.map((doc) => db.converToObj(doc))
		}
	};
}
