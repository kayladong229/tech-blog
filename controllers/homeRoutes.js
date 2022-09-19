const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize post data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render serialized data
    res.render('all-posts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one specific post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'body', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    // Serialize post data
    const post = postData.get({ plain: true });

    res.render('single-post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to the home page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Get signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to the home page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
