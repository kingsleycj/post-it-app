const generateRandomAvatar = require("./avatar");

// exporting avatar to be implemented in imgTag
exports.avatar = (req, res) => {
const avatarUrl =  generateRandomAvatar(req.body.email)
return avatarUrl;
};
