import mongoose from 'mongoose';

const connection = {};

const connect = async () => {
	if (connection.isConnected) {
		console.log('already connected');
		return;
	}
	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState;
		if (connection.isConnected === 1) {
			console.log('using previos connection');
			return;
		}
		await mongoose.disconnect();
	}
	const db = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	console.log('new connection');
	connection.isConnected = db.connections[0].readyState;
};

const disconnect = async () => {
	if (connection.isConnected) {
		if (process.env.NODE_ENV === 'production') {
			await mongoose.disconnect();
			connection.isConnected = false;
		} else {
			console.log('not disconnected');
		}
	}
};

const converToObj = (doc) => {
	doc._id = doc._id.toString();
	doc.updatedAt = doc.updatedAt.toString();
	doc.createdAt = doc.createdAt.toString();
	return doc;
};

const db = { connect, disconnect, converToObj };
export default db;
