const listModel = require('../models/listModel');
const UserModel = require('../models/userModel');

exports.createContent = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, content } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // Create an Instance of the content
        const list = new listModel({
            title,
            content
        })

        list.user = userId;
        user.list.push(list._id);

        // Save the documents too the database
        await list.save();
        await user.save();

        // Send a success response
        res.status(201).json({
            message: "Todo_List content created successfully",
            data: list
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneContent = async (req, res) => {
    try {
        const { listId } = req.params;
        const list = await listModel.findById(listId);
        if (!list) {
            return res.status(404).json({
                message: 'Todo_List Content Not Found'
            })
        }
        res.status(200).json({
            message: 'Content retrieved successfully',
            data: list
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllContent = async (req, res) => {
    try {
        const { userId } = req.user;
        const contents = await listModel.find({ user: userId });
        res.status(200).json({
            message: 'All contents found',
            data: contents
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateContent = async (req, res) => {
    try {
        const { userId } = req.user;
        const { listId } = req.params;
        const { title, content } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const list = await listModel.findById(listId);
        if (!list) {
            return res.status(404).json({
                message: 'Todo_List Content Not Found'
            })
        }

        if(list.user.toString() !== userId.toString()){
            return res.status(401).json({
                message: 'You are not allowed to update a content by another user.'
            })
        }

        const data = {
            title: title || list.title,
            content: content || list.content
        }

        const updatedContent = await listModel.findByIdAndUpdate(listId, data, { new: true });
        res.status(200).json({
            message: 'Content updated successfully',
            data: updatedContent
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteContent = async (req, res) => {
    try {
        const { listId } = req.params;
        const list = await listModel.findById(listId);
        if (!list) {
            return res.status(404).json({
                message: 'Todo Content Not Found'
            })
        }
        const deletedContent = await listModel.findByIdAndDelete(listId);
        res.status(200).json({
            message: 'Content deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
