const userCrtl = {};
const user = require('../models/user');

//GET ALL THE USERS
userCrtl.getUsers= async(req,res) => {
    const users = await user.findAll(); //devuelve todos los usuarios
    res.json(users)
}

//FIND ONE USER WITH AN EMAIL
userCrtl.getUser= async(req,res) => {
    const newuser = await user.findOne({
        where: {
            user_mail: req.body.user_mail
        }
    })
    if(newuser){
        res.send(newuser)
    }else
    {
        res.send(false)
    }
}

//SAVE ONE NEW USER
userCrtl.saveUser= async(req,res) => {
    //Check if the email exists in the DB
  user.findOne({
    where: {
      user_mail: req.body.user_mail,
    },
  })
    .then(async(usuario) => {
      //In case the email does not exist in the DB, the password is encrypted
      if (!usuario) {
        //let hash = await bcrypt.hash(req.body.password, 10);
        const Newuser = user.build({
          user_id: req.body.user_id,
          user_name: req.body.user_name,
          user_mail: req.body.user_mail,
          user_password: req.body.user_password,
          user_password_expired: req.body.user_password_expired,
          user_branch_office_house_id: req.body.user_branch_office_house_id,
          users_role_id: req.body.users_role_id,
        });
        Newuser.save();
        res.send("Usuario guardado en la base de datos");
      }
      // If email exists in BD, please reply error message
      else {
        res.json({ error: "el usuario ya existe" });
      }
    })
    .catch((err) => {
      res.send("error:" + err);
    });
}


//CONTROL IF THE EMAIL EXISTS IN THE DATABASE
userCrtl.emailVerification= async(req,res) => {
    const newuser = await user.findOne({
        where: {
            user_mail: req.body.user_mail
        }
    })

    if(newuser){
        console.log('already used');
        console.log(newuser);
        res.json({
            'alreadyUsed' : true
        })
    }else
    {
        console.log('not used yet');
        res.json({
            'alreadyUsed' : false
        })
    }
}

//Method for update the passwordExpired field of one user
userCrtl.updatePasswExpired =  async(req, res) => {
    user.update(
        {user_password_expired: req.body.passwordExpired},
        {returning: true, where: {user_mail: req.params.mail} }
    )
    .then(res.send("User updated"))
    .catch(console.log("Can't update the user"))
}

//export module
module.exports = userCrtl;
