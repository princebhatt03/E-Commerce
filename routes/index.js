var express = require('express');
var router = express.Router();
const userRegister = require('../models/user.models');
const AdminRegister = require('../models/admin.models');

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/userLogin');
}

// Middleware to check if admin is logged in
function isAdminLoggedIn(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  res.redirect('/adminLogin');
}

// USER's GET ROUTES

router.get('/', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('index', { username, name });
});

router.get('/userLogin', function (req, res, next) {
  const error = req.flash('error');
  res.render('userLogin', { error });
});

router.get('/userRegister', function (req, res, next) {
  const error = req.flash('error');
  res.render('userRegister', { error });
});

router.get('/col', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('col', { username, name });
});

router.get('/about', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('about', { username, name });
});

router.get('/contact', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('contact', { username, name });
});
router.get('/faq', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('faq', { username, name });
});
router.get('/furniture', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('furniture', { username, name });
});
router.get('/check', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('check', { username, name });
});
router.get('/shoes', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('shoes', { username, name });
});

router.get('/bags', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('bags', { username, name });
});

router.get('/gift', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('gift', { username, name });
});

router.get('/jew', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('jew', { username, name });
});

router.get('/wint', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('wint', { username, name });
});

router.get('/cos', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('cos', { username, name });
});

router.get('/bs', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('bs', { username, name });
});

router.get('/wish', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('wish', { username, name });
});

router.get('/comp', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('compare', { username, name });
});

router.get('/blog', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('blog', { username, name });
});

router.get('/cart', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('cart', { username, name });
});

router.get('/cart1', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('cart1', { username, name });
});

router.get('/cart2', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('cart2', { username, name });
});

router.get('/off', isLoggedIn, function (req, res, next) {
  const { username, name } = req.session.user;
  res.render('offers', { username, name });
});

// ADMIN's GET ROUTE

router.get('/adminLogin', function (req, res, next) {
  const error = req.flash('error');
  res.render('adminLogin', { error });
});

router.get('/adminRegister', function (req, res, next) {
  const error = req.flash('error');
  res.render('adminRegister', { error });
});

router.get('/adminHome', isAdminLoggedIn, function (req, res, next) {
  const success = req.flash('success'); // Get the success message
  const error = req.flash('error'); // Get the error message

  const { username, fullname } = req.session.admin;
  // Render 'adminHome' and pass the flash messages and admin data
  res.render('adminHome', {
    success, // Pass success message
    error, // Pass error message
    username, // Pass admin username
    fullname, // Pass admin fullname
  });
});

router.get('/dashboard', isAdminLoggedIn, async (req, res) => {
  const { username, fullname } = req.session.admin;
  res.render('dashboard', { username, fullname });
});

// router.get('/adminProfile', isAdminLoggedIn, function (req, res, next) {
//   const success = req.flash('success');
//   const error = req.flash('error');
//   res.render('adminProfile', { success, error });
// });

router.get('/adminProfile', isAdminLoggedIn, function (req, res, next) {
  // Retrieve the flash messages
  const success = req.flash('success');
  const error = req.flash('error');
  console.log(success, error);
  // Get the logged-in admin's data from the session
  const { username, fullname, ID } = req.session.admin;

  // Render the 'adminProfile' view and pass the admin data, success, and error messages
  res.render('adminProfile', {
    success,
    error,
    admin: { username, fullname, ID },
  });
});

// Admin's Update Profile Route...

router.post('/adminProfile', isAdminLoggedIn, async (req, res) => {
  try {
    const { fullname, username, ID } = req.body;
    const adminId = req.session.admin.id;

    // Check if the new username or ID already exists (to avoid conflicts)
    const existingUsername = await AdminRegister.findOne({
      username,
      _id: { $ne: adminId },
    });
    if (existingUsername) {
      req.flash('error', 'Username already exists. Please choose another one.');
      return res.redirect('/adminHome'); // Redirect to adminHome with error message
    }

    const existingID = await AdminRegister.findOne({
      ID,
      _id: { $ne: adminId },
    });
    if (existingID) {
      req.flash('error', 'Admin ID already exists. Please choose another one.');
      // req.flash('error', error.message);
      return res.redirect('/adminHome'); // Redirect to adminHome with error message
    }

    // Update the admin's information in MongoDB
    await AdminRegister.findByIdAndUpdate(adminId, { fullname, username, ID });

    // Update session data to reflect changes
    req.session.admin.fullname = fullname;
    req.session.admin.username = username;
    // console.log('Error:', error);

    req.flash('success', 'Profile updated successfully!');
    // req.flash('success', success.message);
    res.redirect('/adminHome'); // Redirect to adminHome with success message
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/adminProfile'); // Redirect to adminHome with error message
  }
});

// USER's POST ROUTES

router.post('/userRegister', async function (req, res, next) {
  try {
    const existingUser = await userRegister.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      req.flash('error', 'Username already exists');
      return res.redirect('/userRegister');
    }
    const registerEmployee = new userRegister({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await registerEmployee.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/userLogin');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/userRegister');
  }
});

router.post('/userLogin', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userRegister.findOne({ username });
    if (!user || user.password !== password) {
      req.flash('error', 'Username or Password is Incorrect');
      return res.redirect('/userLogin');
    }
    // Create a session for the user
    req.session.user = {
      id: user._id,
      username: user.username,
      name: user.name,
    };
    res.status(201).redirect('/');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ADMIN's POST ROUTES
router.post('/adminRegister', async function (req, res, next) {
  try {
    const existingAdmin = await AdminRegister.findOne({
      username: req.body.username,
    });
    if (existingAdmin) {
      req.flash('error', 'Username Already Exists');
      return res.redirect('/adminRegister');
    }

    const existingAdminID = await AdminRegister.findOne({ ID: req.body.ID });
    if (existingAdminID) {
      req.flash('error', 'Admin ID Already Exists');
      return res.redirect('/adminRegister');
    }

    const registerAdmin = new AdminRegister({
      username: req.body.username,
      ID: req.body.ID,
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    });
    await registerAdmin.save();
    res.status(201).redirect('/adminLogin');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/adminLogin', async (req, res) => {
  try {
    const username = req.body.username;
    const ID = req.body.ID;
    const password = req.body.password;

    const admin = await AdminRegister.findOne({ username, ID });
    if (!admin || admin.password !== password) {
      req.flash('error', 'Username, Password, or ID is Incorrect');
      return res.redirect('/adminLogin');
    }
    // Create a session for the admin
    req.session.admin = {
      id: admin._id,
      username: admin.username,
      fullname: admin.fullname,
    };
    res.status(201).redirect('/adminHome');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// USER's LOGOUT
router.get('/logout', function (req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/userLogin');
  });
});

// ADMIN's LOGOUT
router.get('/adminLogout', function (req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/adminLogin');
  });
});

module.exports = router;
