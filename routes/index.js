var express = require('express');
var router = express.Router();
var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sheetFunc = require('../config/sheet');
var loadSheet = sheetFunc.load;
var findOne = sheetFunc.findOne;

var users = require('../config/users');

function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
};

passport.use(new LocalStrategy(

  function(username, password, done) {

    var index = 0;
    var total = users.length;

    for (index; index < total; index++) {

      var user = users[index];

      if (user.username === username) {

        if (user.password != password) {

          return done(null, false, {message: 'Invalid passpord.'});
      
        }

        return done(null, user);

      };
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var index = id - 1;

  if (users[index]) {
    done(null, users[index]);
  } else {
    done(new Error('User ' + id + ' does not exist'));
  }
});

router.get('/test', function(req, res) {
  // res.send(router.sheet);
  loadSheet(router.sheet, function(data) {res.send(data);});
});

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
  if (req.user.id == '-1') {
    return res.redirect('/dashboard');
  };
  return res.render('index', { title: '創十報名 批改系統' , user: req.user});
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
  return res.render('dashboard', { title: '成績總覽', user: req.user});
});
router.get('/billboard', function(req, res) {
  return res.render('billboard', { title: '創十錄取名單'});
});

router.get('/login', function(req, res) {
  return res.render('login');
});

router.get('/logout', function(req, res) {
  req.logOut();
  res.redirect('/');
});

router.post('/login', function(req, res) {

  passport.authenticate('local', function(err, user, info) {

    if (err) {
      console.log(err);
      return res.send('Respond with a err.');
    }

    if (!user) {
      return res.send('帳號或密碼錯誤！');
    }

    req.logIn(user, function(err) {
      if (err) {
        return res.send('Respond with a err');  
      }
      res.redirect('/');
    });

  })(req, res); // immediately invoke authenticate() function
});

// router.get('/api', function(req, res) {
//   var URL = 'https://api.typeform.com/v0/form/iHKWCT?key='+ KEY +'&completed=true';
//   request(URL, function(err, response, html) {
//     // res.json(JSON.parse(response.body));
//     res.send(response)
//   });
// });

// router.get('/api/all', function(req, res) {
//   var URL = 'https://api.typeform.com/v0/form/iHKWCT?key='+ KEY +'&completed=true';
//   request(URL, function(err, response, html) {
//     // var res = JSON.parse(response.body);
//     var res = JSON.parse(response);
//     console.log(res);
//     console.log(res.stats);
//     console.log(res.stats.responses);
//     console.log(res.stats.responses.completed);
//     res.json(response);
//   });
// });

router.get('/api/alldata', function(req, res) {
  loadSheet(router.sheet, function(users) {
    User.find({}).exec(function(err, users_) {
      if (err) console.error(err);
      for (let i = 0; i < users.length; i++) {
        var user_ = users_.find(function(u) { return u.id == users[i].id });
        if (!user_) { continue }
        else { users[i] = import$(users[i], user_._doc) }
      }
      var returnObj = {
        users: users,
        id: req.user ? req.user.id : 'quest',
        name: req.user ? req.user.username : 'quest',
      };
      return res.json(returnObj);
    });
  });

  // User.find({}).exec(function(err, users) {
  //   if (err) {
  //     return console.log(err);
  //   };
  //   // console.log(users);
  //   var returnObj = {
  //     users: users,
  //     id: req.user?req.user.id:'quest'
  //   }
  //   return res.json(returnObj);
  // });
});

router.get('/api/score/:uid/:id/:all_score', apiEnsureAuthenticated, function(req, res) {
  var id = req.params.id;
  var all_score = req.params.all_score;
  var uid = req.params.uid;
  var set = {};
  var tmp = 'score.mentor' + uid + '_score';
  set[tmp] = all_score;
  // var skill_score = req.params.skill_score;
  // console.log('all_score: ', all_score);
  // console.log('skill_score: ', skill_score);
  User.findOneAndUpdate({id: id}, {
    $set: set
  }, {upsert: true}, function(err) {
    if (err) {
      res.json({message:'error'});
    } else {
      res.json({message:'success'});
    }
  })
});

router.get('/api/applicants/:id', function(req, res) {
  findOne(router.sheet, parseInt(req.params.id), function(user) {
    User.findOne({id: req.params.id}).exec(function(err, user_) {
      if (err) console.error(err);
      if (user_) user = import$(user, user_._doc);
      return res.json(user);
    });
  });

  // User.findOne({id: req.params.id}).exec(function(err, user) {
  //   if (err) {
  //     console.log(err);
  //     return 'There is an error';
  //   };
  //   return res.json(user);
  // });
});

// router.get('/application-form', function(req, res) {
//   res.render('application-form', {title: '創創第八屆申請表'});
// });

router.get('/backStu/:id', function(req, res) {
  var id = req.params.id;
  User.findOneAndUpdate({id: id}, {
    $set: {
      'result': 'back',
      // 'score.skill_score': skill_score
    }}, {upsert: true}, function(err) {
      if (err) {
        res.json({message:'error'});
      } else {
        res.redirect('/');
      }
    })
});
router.get('/passStu/:id', function(req, res) {
  var id = req.params.id;
  User.findOneAndUpdate({id: id}, {
    $set: {
      'result': 'pass',
      // 'score.skill_score': skill_score
    }}, {upsert: true}, function(err) {
      if (err) {
        res.json({message:'error'});
      } else {
        res.redirect('/');
      }
    })
});
router.get('/note/:id/:mynote', function(req, res) {
  var id = req.params.id;
  var mynote = req.params.mynote;
  User.findOneAndUpdate({id: id}, {
    $set: {
      'note': mynote,
      // 'score.skill_score': skill_score
    }}, {upsert: true}, function(err) {
      if (err) {
        res.json({message:'error'});
      } else {
        res.redirect('/');
      }
    })
});

router.get('/applicants/:id', function(req, res) {
  if (u = users.find(function(obj) {return obj.id == req.user.id})) {
    if (u.id == -1)
      return res.redirect('/');
    else
      return res.render('applicant', {user: req.user});
  }
  else
    return res.redirect('/');

  // if (req.user.id == '1') {
  //   // jrlee
  //   res.render('jrlee', {user: req.user});

  // } else if (req.user.id == '2') {
  //   // chung
  //   res.render('cslin', {user: req.user});

  // } else if (req.user.id == '3') {
  //   // tmliu
  //   res.render('jackwang', {user: req.user});

  // } else if (req.user.id == '4') {
  //   // tmliu
  //   res.render('lfhsu', {user: req.user});
  // } else {
  //   res.redirect('/');
  // }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/billboard');
}


//@TODO remove return next for production
function apiEnsureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(400);
  return res.json({
    "status": 400,
    "message": "Not Authenticated"
  });
}

module.exports = router;
