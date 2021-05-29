const { Router } = require('express');
const User = require('../models/User');
const File = require('../models/File');

// defining associations.
User.hasMany(File);
File.belongsTo(User);

User.sync()
.then(() => {
  console.log("table creation success...")
})
.catch(err => {
  console.log(err);
})

const router = Router();

router.post('/', async (req, res) => {

	// creating tables
	File.sync()
	.then(() => {
		console.log("tables created...");
	})
	.catch(err => {
		console.log("error :: ", err);
	})

	if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({msg:"no file object found..."});
  	}

  try {	
  		const f = req.files.file;
  		const file_name = `${Date.now()}_${f.name}`;
  		f.mv(`${process.cwd()}/uploads/${file_name}`);
  		const user = await User.create({
  			email:req.query.email
  		})
  		await user.createFile({
  			fileName:file_name
  		});
	  	res.json({
	  		msg:"file uploaded success",
	  		file_path:`${__dirname}/uploads/${file_name}`,
	  		email: req.query.email
	  	});
  } catch(err) {
  	console.log(err)
  	res.status(400).json({msg:err})
  }
});

module.exports = router;