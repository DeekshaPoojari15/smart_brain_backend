const Clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ab5a3c36f5cb4a709ad4bf0963c7f80a'
});

const handleApiCall =(req, res) => {
	app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
	.then( data => {
		res.json(data);
	})
	.catch( err => res.status(400).json('Unable to work with API'))
}


const handleImage = (req,res,db) => {
	const { id } =req.body;
	db('users').where('id','=',id)
	.increment('enteries',1)
	.returning('enteries')
	.then(enteries => {
		res.json(enteries[0]);
	})
	.catch(err => res.status(400).json('Unable to get enteries'))
}

module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall
};