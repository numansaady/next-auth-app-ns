import { hash } from 'bcryptjs';
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';

export default async function handler(req, res){
    connectMongo().catch(error => res.json({error: 'Connection Failed!'}))

    // Only POST method is accepted
    if(req.method === 'POST'){
        if(!req.body) return res.status(404).json({error: "Don't have form data"})
        const {username, email, password} = req.body;

        // Check duplicate user
        const checkExisting = await Users.findOne({email})
        if(checkExisting) return res.status(422).json({message : "User already exists"})

        // hash password
        Users.create({username, email, password:await hash(password, 12)}, function(err, data){
            if(err) return res.status(404).json({err})
            res.status(201).json({status:ture, user: data})
        })

    }else {
        res.status(500).json({error: 'HTTP method not valid only POST method accepted'})
    }
}