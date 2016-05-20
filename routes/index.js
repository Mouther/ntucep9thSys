var express = require('express');
var router = express.Router();
var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var KEY = '4d8291a1a41b556f1b33e6b4b2fe71c87b04b55f';

var users = [
  {
    id: 1, username: 'jrlee', password: 'jrleecep', email: 'jiren@ntu.edu.tw', name: '李吉仁 老師'
  },
  {
    id: 2, username: 'cslin', password: 'cslincep', email: 'chinghsuanlin@ntu.edu.tw', name: '林晉玄 老師'
  },
  {
    id: 3, username: 'jackwang', password: 'jackwangcep', email: 'jack-03703@email.esunbank.com.tw', name: '王振吉 老師'
  },
  {
    id: 4, username: 'lfhsu', password: 'lfhsucep', email: 'sophialifanghsu@gmail.com', name: '徐黎芳 老師'
  },
  {
    id: 5, username: 'ntucep', password: 'ntucepcep', email: 'ntucep@ntu.edu.tw', name: '創創'
  }
];

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
    done(new Error('User ' + id + 'does not exist'));
  }
});

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
  if (req.user.id == '5') {
    return res.redirect('/dashboard');
  };
  return res.render('index', { title: '創九報名 批改系統' , user: req.user});
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
  return res.render('dashboard', { title: '成績總覽', user: req.user});
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
      return res.send('Respond with a info.');
    }

    req.logIn(user, function(err) {
      if (err) {
        return res.send('Respond with a err');  
      }
      res.redirect('/');
    });

  })(req, res); // immediately invoke authenticate() function
});

router.get('/api', function(req, res) {
  var URL = 'https://api.typeform.com/v0/form/iHKWCT?key='+ KEY +'&completed=true';
  request(URL, function(err, response, html) {
    // res.json(JSON.parse(response.body));
    res.send(response)
  });
});

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

router.get('/api/alldata', apiEnsureAuthenticated, function(req, res) {
  User.find({}).exec(function(err, users) {
    if (err) {
      return console.log(err);
    };
    // console.log(users);
    var returnObj = {
      users: users,
      id: req.user.id
    }
    return res.json(returnObj);
  });
});

router.get('/api/score/jr/:id/:all_score', apiEnsureAuthenticated, function(req, res) {
  var id = req.params.id;
  var all_score = req.params.all_score;
  // var skill_score = req.params.skill_score;
  // console.log('all_score: ', all_score);
  // console.log('skill_score: ', skill_score);
  User.findOneAndUpdate({id: id}, {
    $set: {
      'score.mentor1_score': all_score,
      // 'score.skill_score': skill_score
    }}, {upsert: true}, function(err) {
      if (err) {
        res.json({message:'error'});
      } else {
        res.json({message:'success'});
      }
    })
});

router.get('/api/score/cs/:id/:all_score', apiEnsureAuthenticated, function(req, res) {
  var id = req.params.id;
  var all_score = req.params.all_score;
  // var skill_score = req.params.skill_score;
  // console.log('all_score: ', all_score);
  // console.log('skill_score: ', skill_score);
  User.findOneAndUpdate({id: id}, {
    $set: {
      'score.mentor2_score': all_score,
      // 'score.skill_score': skill_score
    }}, {upsert: true}, function(err) {
      if (err) {
        res.json({message:'error'});
      } else {
        res.json({message:'success'});
      }
    })
});

router.get('/api/score/jack/:id/:all_score', apiEnsureAuthenticated, function(req, res) {
  var id = req.params.id;
  var all_score = req.params.all_score;
  // var skill_score = req.params.skill_score;
  // console.log('all_score: ', all_score);
  // console.log('skill_score: ', skill_score);
  User.findOneAndUpdate({id: id}, {
    $set: {
      'score.mentor3_score': all_score,
      // 'score.skill_score': skill_score
    }}, {upsert: true}, function(err) {
      if (err) {
        res.json({message:'error'});
      } else {
        res.json({message:'success'});
      }
    })
});
router.get('/api/score/lf/:id/:all_score', apiEnsureAuthenticated, function(req, res) {
  var id = req.params.id;
  var all_score = req.params.all_score;
  // var skill_score = req.params.skill_score;
  // console.log('all_score: ', all_score);
  // console.log('skill_score: ', skill_score);
  User.findOneAndUpdate({id: id}, {
    $set: {
      'score.mentor4_score': all_score,
      // 'score.skill_score': skill_score
    }}, {upsert: true}, function(err) {
      if (err) {
        res.json({message:'error'});
      } else {
        res.json({message:'success'});
      }
    })
});

router.get('/api/applicants/:id', function(req, res) {
  User.findOne({id: req.params.id}).exec(function(err, user) {
    if (err) {
      console.log(err);
      return 'There is an error';
    };
    return res.json(user);
  });
});

router.get('/application-form', function(req, res) {
  res.render('application-form', {title: '創創第八屆申請表'});
});

router.get('/applicants/:id', function(req, res) {

  if (req.user.id == '1') {
    // jrlee
    res.render('jrlee', {user: req.user});

  } else if (req.user.id == '2') {
    // chung
    res.render('cslin', {user: req.user});

  } else if (req.user.id == '3') {
    // tmliu
    res.render('jackwang', {user: req.user});

  } else if (req.user.id == '4') {
    // tmliu
    res.render('lfhsu', {user: req.user});
  } else {
    res.redirect('/');
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


//@TODO remove return next for production
function apiEnsureAuthenticated(req, res, next) {
  // if (req.isAuthenticated()) { return next(); }
  // res.status(400);
  // res.json({
  //   "status": 400,
  //   "message": "Not Authenticated"
  // });
  // return;
  return next();
}

module.exports = router;
