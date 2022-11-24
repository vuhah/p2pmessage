import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

export function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token==null) return res.send({err})

    jwt.verify(token, config.ACCESS_TOKEN_SCERET, (err,user)=>{
        if (err) return res.send(err)
        req.user = user
        console.log(req.user);
        next()
    })
}   



