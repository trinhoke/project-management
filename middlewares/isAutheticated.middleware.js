const systemConfig = require("../config/system");
const Account = require("../models/account.model");
const Role = require("../models/role.model");

module.exports = async (req, res, next) => {
// Fix loops 
    if(req.originalUrl == `${systemConfig.prefixAdmin}/auths/login`){
        next();
        return;
    }
//
    const token = req.cookies.token;
    if(!token){
        res.redirect(`${systemConfig.prefixAdmin}/auths/login`);
        return;
    }
    const user = await Account.findOne( {token : token} ).select("-password");
    
    if(!user){
        res.redirect(`${systemConfig.prefixAdmin}/auths/login`);
        return;
    }
    const role = await Role.findOne({_id: user.role});
    res.locals.user = user;
    res.locals.role = role;
    next();
};