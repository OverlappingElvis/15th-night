module.exports = function(app) {
	app.models.Profile.create({
		username: 'admin',
		email: 'test@example.com',
		password: '1'
	}, function(err, profiles) {
		if (err) {
			throw err;
		}
		console.log(profiles);
	});
};
