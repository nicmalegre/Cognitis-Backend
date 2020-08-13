   User.findOne({
        where: {
           mail : req.body.mail
   }
    })
   .then(usuario =>{
    if(!usuario){
        const hash =bcrypt.hashSync(user.password, salt); 
        user.password = hash
        user.save();
        res.send('Usuario guardado en la base de datos')
    } else {
        res.json({error:'el usuario ya existe'})
    }
})
.catch(err => {
    res.send('error:' + err)
})