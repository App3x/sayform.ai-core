import dbConnect from '../../lib/mongodb';
import PostModel from '../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}