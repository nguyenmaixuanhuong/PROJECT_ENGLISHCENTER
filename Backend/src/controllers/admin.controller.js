const config = require('../config');
const {  deactivateAccount, activateAccount} = require('../Service/index.service');
exports.loginAdmin = async (req, res, next) => {
   const { username, password } = req.body;
   if (!(username && password)) {
      return res
         .status(401)
         .send({ error: "Nhập đầy đủ tài khoản và mật khẩu" });
   }
   else if (username === config.account_admin.username && password === config.account_admin.password) {
      return res.status(200).json({success: true});
   }
   else {
      return res.status(404).send('Username or password is incorrect');
   }
};

exports.deactivedAccount = async (req, res) =>{
   
   const id = req.query.id;
   const account = deactivateAccount(id);
   if(account){
       res.status(200).send('Deactivated successfully');
   }
   else{
       res.status(500).send('Deactivated failed');
   }
}

exports.activedAccount = async (req, res) =>{
   
   const id = req.query.id;
   const account = activateAccount(id);
   if(account){
       res.status(200).send('Activated successfully');
   }
   else{
       res.status(500).send('Activated failed');
   }
}
