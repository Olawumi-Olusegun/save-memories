const Memories = require('./../models/memoryModel');
const User = require('./../models/userModel');
exports.memories = async (req, res) => {
      try {
            const memory = await Memories.find({});
            if(!memory) return res.status(404).json({ message: "Memories not found"});
            if(memory === []) return res.status(404).json({ message: "No memory in the database"});
            return res.status(202).json(memory);
      } catch (error) {
            console.log(error);
            return res.status(404).json({ message: "Unable "});
      }
}

exports.createMemories = async(req, res) => {

      // const { title, message, creator, tags, selectedFile } = req.body;
      try {
            const user = await User.findById(req.body.creator);    
            if(!user) return res.status(400).send("You must be registered to create post");
            req.body.creator = user._id;
            const newMemory = new Memories(req.body)
            const result = await newMemory.save();
            return res.status(200).json(result);
      } catch (error) {
            console.log(error);
            return res.status(404).json({ message: error });
      }
}

exports.updateMemories = async (req, res) => {
      const id = req.params.id;
      try {
            const memory = await Memories.findById(id);
            if(!memory) return res.status(404).json({ message: "Memory not found" });

            const memoryKeys = Object.keys(req.body);
            const memoryValues = Object.values(req.body);
            const updateMemory = {};

            for(let i = 0; i < memoryKeys.length; i++) {
                  updateMemory[memoryKeys[i]] = memoryValues[i];
            }

            let updatedMemory =  await Memories.updateOne({"_id": id}, { $set: {updateMemory} }, { new: true });

            return res.status(200).json({updatedMemory});

      } catch (error) {
            console.log(error)
            return res.status(404).json({ message: "No memory found" });
      }

}

exports.deleteMemories = async (req, res) => {
      const id = req.params.id;
      if(id) {
            try {
                  let memory = await Memories.findById(id);
                  if(!memory) return res.status(404).json({ message: "Memory not found" });
                  const result = await memory.deleteOne({ _id: id });
                  if(result)  return res.status(200).json(result)                 
      
            } catch (error) {
                  console.log(error)
                  return res.status(500).json({ message: "Unable to delete the given memory"})
            }
      }else {
            return res.status(404).send({ message: "Unable to find memory"})
      }

}

exports.likeAndDislike = async (req, res) => {
      const id = req.params.id;
      try {
            const memory = await Memories.findById(id);
            const user = await User.findById(req.body.creator);
            if(!memory) return res.status(404).send({ message: "Post not found"});

            if(!user) return res.status(404).send({ message: "User not found "});

            if(req.body.creator === memory.creator) return res.status(400).send({ message: "You can't like your post "});

            if(memory.likeCount.includes(user._id)) {
                  const result = await memory.updateOne({ $pull: { likeCount: `${req.body.creator}` } } );
                  if(result) {
                        const memory = await Memories.find({});
                        return res.status(200).send({ message: "You disliked a post ", memory})
                  }
            }else {
                  const result = await memory.updateOne({ $push: { likeCount: `${req.body.creator}` }});
                  if(result) {
                        const memory = await Memories.find({});
                        return res.status(200).send({ message: "You  liked this post ", memory })
                  }
            };

      } catch (error) {
            console.log(error)
            return res.status(500).send(error)
      }
      

}