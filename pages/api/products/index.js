import nextConnect from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nextConnect();

handler.get(async (req, res) => {
	await db.connect();
	const products = await Product.find({});
	res.send(products);
	await db.disconnect();
});

export default handler;
