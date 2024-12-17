const Post = require('../models/post');

exports.createPost = async (req, res) => {
    const { title, subtitle, content, tags } = req.body;

    try {
        const post = new Post({ title, subtitle, content, tags, author: req.user.id });
        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePost = async (req, res) => {
    const { title, subtitle, content, tags } = req.body;
    const { postId } = req.params;

    try {
        console.log('Updating post with ID:', postId); 
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

       

        post.title = title || post.title;
        post.subtitle = subtitle || post.subtitle;
        post.content = content || post.content;
        post.tags = tags || post.tags;

        await post.save();
        res.json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: 'Server error' });
    }
};



exports.deletePost = async (req, res) => {
    const { postId } = req.params;

    try {
        console.log('Deleting post with ID:', postId);  
        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);  // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllBlogPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId).populate('author', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPostsByTag = async (req, res) => {
    const { tag } = req.params;

    try {
        const posts = await Post.find({ tags: tag }).populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
