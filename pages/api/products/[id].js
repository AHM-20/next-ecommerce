import nextConnect from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nextConnect();

handler.get(async (req, res) => {
	await db.connect();
	const product = await Product.findById(req.query.id);
	res.send(product);
	await db.disconnect();
});

export default handler;
