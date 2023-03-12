
const generateRandomAvatar = require("./avatar");

exports.avatar = (req, res) => {
const avatarUrl =  generateRandomAvatar(req.body.email)
return avatarUrl;
};
