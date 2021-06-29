const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

const User = require('./../models/userModel');

exports.registerUser = async (req, res) => {
      console.log(req.body);
      const { username, email, password, confirmPassword } = req.body;

      try {
            let newUser = await User.findOne({ email });
            if(newUser) return res.status(400).send({ message: "User already exist"});
            if(password !== confirmPassword) return res.status(400).send({ message: "Password doesn't match"});
            const hashedPassword  = await bcrypt.hash(password, 10);
            newUser = await User.create({ username, email, password: hashedPassword });
            return res.status(200).send({ message: "User created successfully"});

      } catch (error) {
            return res.status(404).send({ message: error});
      }

}

exports.loginUser = async (req, res) => {
      const { email, password } = req.body;
      try {
            const user = await User.findOne({email: email });
            if(!user) return res.status(404).send({ message: "User not found "});
            // if(!user) return res.status(404).json({ message: "User not found "});
            
            const verifyPassword = await bcrypt.compare(password, user.password);
            if(!verifyPassword) return res.status(400).json({ message: "Password is incorrect"});
            const userprofile =  { _id: user._id, email: user.email, isAdmin: user.isAdmin }
            
            jwt.sign(userprofile, process.env.SECRET, { expiresIn: '1h'}, (err, token) => {
                  if(err) throw new err;
                  return res.status(200).json({ token, userprofile });
            } );
            
      } catch (error) {
            console.log("Ann error occured: ", error)
            return res.status(404).json(error);
      }

}

exports.editUser = async (req, res) => {
      const id = req.params.id;
      try {
            const user = await User.findById(id);
            if(!user) return res.status(404).json({ message: "User not found"});
            return res.status(200).json(user);

      } catch (error) {
            return res.status(404).json({ message: "Unable to get user"});
      }
}

exports.updateUser = async (req, res) => {
      const id = req.params.id;
      const userKeys = Object.keys(req.body);
      const userValues = Object.values(req.body);
      const updateUser = {};
      
      try {
            let user = await User.findById(id);
            if(!user) return res.status(404).json({ message: "User not found"});
            for(let i = 0; i < userKeys.length; i++) {
                  updateUser[userKeys[i]] = userValues[i];
            }
                  user = await User.updateOne({"_id": id }, { $set: { updateUser }}, { new: true });
                  return res.status(200).json({ user });
      } catch (error) {
            console.log(error)
            return res.status(404).json({ message: "Unable to update user" });
      }
}

exports.deleteUser = async (req, res) => {
      const id = req.params;
      try {
            const user = await User.findById(id);
            if(!user) return res.status(404).json({ message: "User not found "});
            await User.findByIdAndDelete(id);
            return res.status(200).json({ message: "User deleted successfully"});
      } catch (error) {
            console.log(error);
            return res.status(404).json({ message: "User not found"});
            
      }
}