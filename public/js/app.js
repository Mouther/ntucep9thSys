angular.module('app', ['ngSanitize', 'chart.js'])

.controller('MainCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  $http.get('/api/alldata')
  .success(function(data, status, headers, config) {
    $scope.users = data.users;
    $scope.user_id = data.id;

  })
  .error(function(data, status, headers, config) {
    console.log(data);
  });
  $scope.submitNote = function(uid) {
      var myNote = $('.note_input#'+uid).val();
      console.log(myNote);
      $http.get('/note/'+uid+'/'+myNote)
      .success(function(data, status, header, config) {
        alert('系統已記錄成績');
        window.location.href = '/'
      })
      .error(function(data, status, header, config){
        alert('有錯誤');
      });
    }
}])

.controller('ScoreCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  var idArray = location.href.split('/');
  var id = idArray[4];
  // console.log(id);
  $http.get('/api/applicants/'+id)
  .success(function(data, status, headers, config) {
    $scope.user = data
  })
  .error(function(data, status, header, config) {
    console.log(status);
  });

  $scope.JRsubmitScore = function() {
    var id = $scope.user.id;
    var all_score = $('.ui.rating#thisStudent i.active').length;
    // var skill_score = $scope.user.score.skill_score;
    console.log(id);
    console.log(all_score);
    $http.get('/api/score/jr/'+id+'/'+all_score)
    .success(function(data, status, header, config) {
      alert('系統已記錄成績');
      window.location.href = '/'
    })
    .error(function(data, status, header, config){
      alert('有錯誤');
    });
  };
  $scope.CSsubmitScore = function() {
    var id = $scope.user.id;
    var all_score = $('.ui.rating#thisStudent i.active').length;
    // var skill_score = $scope.user.score.skill_score;
    console.log(id);
    console.log(all_score);
    $http.get('/api/score/cs/'+id+'/'+all_score)
    .success(function(data, status, header, config) {
      alert('系統已記錄成績');
      window.location.href = '/'
    })
    .error(function(data, status, header, config){
      alert('有錯誤');
    });
  };
  $scope.WANGsubmitScore = function() {
    var id = $scope.user.id;
    var all_score = $('.ui.rating#thisStudent i.active').length;
    // var skill_score = $scope.user.score.skill_score;
    console.log(id);
    console.log(all_score);
    $http.get('/api/score/jack/'+id+'/'+all_score)
    .success(function(data, status, header, config) {
      alert('系統已記錄成績');
      window.location.href = '/'
    })
    .error(function(data, status, header, config){
      alert('有錯誤');
    });
  };
  $scope.LFsubmitScore = function() {
    var id = $scope.user.id;
    var all_score = $('.ui.rating#thisStudent i.active').length;
    // var skill_score = $scope.user.score.skill_score;
    console.log(id);
    console.log(all_score);
    $http.get('/api/score/lf/'+id+'/'+all_score)
    .success(function(data, status, header, config) {
      alert('系統已記錄成績');
      window.location.href = '/'
    })
    .error(function(data, status, header, config){
      alert('有錯誤');
    });
  };
  // $scope.SCsubmitScore = function() {
  //   var id = $scope.user.id;
  //   var youtube_link_score = $scope.user.score.youtube_link_score;
  //   $http.get('/api/score/sc/'+id+'/'+youtube_link_score)
  //   .success(function(data, status, header, config) {
  //     alert('系統已記錄成績');
  //     window.location.href = '/'
  //   })
  //   .error(function(data, status, header, config){
  //     alert('有錯誤');
  //   });
  // }

  // $scope.TMsubmitScore = function() {
  //   var id = $scope.user.id;
  //   var success_item_score = $scope.user.score.success_item_score;
  //   var fail_item_score = $scope.user.score.fail_item_score;
  //   $http.get('/api/score/tm/'+id+'/'+success_item_score+'/'+fail_item_score)
  //   .success(function(data, status, header, config) {
  //     alert('系統已記錄成績');
  //     window.location.href = '/'
  //   })
  //   .error(function(data, status, header, config){
  //     alert('有錯誤');
  //   });
  // }
}])

.controller('DashBoardCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  $http.get('/api/alldata')

  .success(function(data, status, header, config) {
    $scope.users = data.users.map(function(user) {
      var obj = {};
      obj.id = user.id;
      obj.is_team = user.is_team;
      obj.name = user.name;
      obj.student_id = user.student_id;
      if (user.hasOwnProperty('school')) {
        obj.school = user.school
      };
      // obj.school = user.school;
      obj.college = user.college;
      obj.department = user.department;
      obj.facebook_link = user.facebook_link;
      obj.grade = user.grade;
      obj.note = user.note;
      obj.is_team = user.is_team;
      obj.team_name= user.team_name;

      obj.leader_name= user.leader_name;
      
      obj.member1_name= user.member1_name;
      
      obj.member2_name= user.member2_name;
  
      if (user.hasOwnProperty('gender')) {
        obj.gender = user.gender
      };
      obj.score = {};
      obj.score.total = 0;
      obj.result = user.result;
      if (user.hasOwnProperty('score')) {
        if (user.score.hasOwnProperty('mentor1_score')) {
          obj.score.mentor1_score = parseInt(user.score.mentor1_score);
          obj.score.total += parseInt(user.score.mentor1_score);
        };
        if (user.score.hasOwnProperty('mentor2_score')) {
          obj.score.mentor2_score = parseInt(user.score.mentor2_score);
          obj.score.total += parseInt(user.score.mentor2_score);          
        };
        if (user.score.hasOwnProperty('mentor3_score')) {
          obj.score.mentor3_score = parseInt(user.score.mentor3_score);
          obj.score.total += parseInt(user.score.mentor3_score);          
        };
        if (user.score.hasOwnProperty('mentor4_score')) {
          obj.score.mentor4_score = parseInt(user.score.mentor4_score);
          obj.score.total += parseInt(user.score.mentor4_score);          
        };
        
      };
      // console.log(obj.score.total);
      return obj;
    });
    // $scope.users = data;
    // console.log($scope.users);

    // peichart default data
    // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    // $scope.data = [300, 500, 100, 200, 300, 400, 500, 400, 500];
    
    $scope.chart_member = 60;

    $scope.updateChart = function() { 
      // default get first 80 students
      $scope.chart_data = $scope.users.map(function(a) {
        if(a.result=="pass"){
          return a;
        }
        else{
          return null;
        }
      });
      // get first 80 student each college
      $scope.all_college = $scope.chart_data.map(function(obj) { return obj.college });
      $scope.all_school = $scope.chart_data.map(function(obj) { return obj.school });
      $scope.all_gender = $scope.chart_data.map(function(obj) { return obj.gender });

      var temp = removeDuplicateAndCountAmount($scope.all_college); // return array of array
      var temp_gender = removeDuplicateAndCountAmount($scope.all_gender); // return array of array
      var temp_school = removeDuplicateAndCountAmount($scope.all_school); // return array of array

      $scope.final_data = [];
      for (i = 0; i < temp[0].length; i++) {
        var obj = {
          label:temp[0][i],
          data: temp[1][i]
        };
        $scope.final_data.push(obj);
      }
      $scope.sorted_final_data = $scope.final_data.sort(compare2);
      $scope.labels = [];
      $scope.data = [];
      for (i = 0; i < $scope.sorted_final_data.length; i++) {
        $scope.labels.push($scope.sorted_final_data[i].label);
        $scope.data.push($scope.sorted_final_data[i].data);
      }

      $scope.final_data_school = [];
      for (i = 0; i < temp_school[0].length; i++) {
        var obj = {
          label:temp_school[0][i],
          data: temp_school[1][i]
        };
        $scope.final_data_school.push(obj);
      }
      $scope.labels_school = [];
      $scope.data_school = [];
      for (i = 0; i < $scope.sorted_final_data.length; i++) {
        if($scope.final_data_school[i] && $scope.final_data_school[i].hasOwnProperty("label") && $scope.final_data_school[i].hasOwnProperty("data")){
          $scope.labels_school.push($scope.final_data_school[i].label);
          $scope.data_school.push($scope.final_data_school[i].data);
        }
      }

      $scope.final_data_gender = [];
      for (i = 0; i < temp_gender[0].length; i++) {
        var obj = {
          label:temp_gender[0][i],
          data: temp_gender[1][i]
        };
        $scope.final_data_gender.push(obj);
      }
      $scope.labels_gender = [];
      $scope.data_gender = [];
      for (i = 0; i < $scope.sorted_final_data.length; i++) {
        if($scope.final_data_gender[i] && $scope.final_data_gender[i].hasOwnProperty("label") && $scope.final_data_gender[i].hasOwnProperty("data")){
          $scope.labels_gender.push($scope.final_data_gender[i].label);
          $scope.data_gender.push($scope.final_data_gender[i].data);
        }
      }

      

    };
    // default get first 80 students

    var chart_dataArr = [];
    $scope.users.forEach(function(thisUser){
        if(thisUser.result=="pass"){
          chart_dataArr.push(thisUser);
        }
    });
    $scope.chart_data = chart_dataArr;
    // console.log($scope.chart_data);
    // get first 80 student each college
    $scope.all_college = $scope.chart_data.map(function(obj) { return obj.college });
    $scope.all_school = $scope.chart_data.map(function(obj) { return obj.school });
    
    $scope.all_gender = $scope.chart_data.map(function(obj) { return obj.gender });

    var temp = removeDuplicateAndCountAmount($scope.all_college); // return array of array
    var temp_gender = removeDuplicateAndCountAmount($scope.all_gender); // return array of array
    var temp_school = removeDuplicateAndCountAmount($scope.all_school); // return array of array

    $scope.final_data = [];
    for (i = 0; i < temp[0].length; i++) {
       var obj = {
        label:temp[0][i],
        data: temp[1][i]
      };
      $scope.final_data.push(obj);
    }
    $scope.sorted_final_data = $scope.final_data.sort(compare2);
    $scope.labels = [];
    $scope.data = [];
    for (i = 0; i < $scope.sorted_final_data.length; i++) {
      $scope.labels.push($scope.sorted_final_data[i].label);
      $scope.data.push($scope.sorted_final_data[i].data);
    }

    $scope.final_data_school = [];
    for (i = 0; i < temp_school[0].length; i++) {
      var obj = {
        label:temp_school[0][i],
        data: temp_school[1][i]
      };
      
      $scope.final_data_school.push(obj);
    }

    $scope.labels_school = [];
    $scope.data_school = [];
    for (i = 0; i < $scope.sorted_final_data.length; i++) {
      if($scope.final_data_school[i] && $scope.final_data_school[i].hasOwnProperty("label") && $scope.final_data_school[i].hasOwnProperty("data")){
        $scope.labels_school.push($scope.final_data_school[i].label);
        $scope.data_school.push($scope.final_data_school[i].data);
      }
    }

    $scope.final_data_gender = [];
    for (i = 0; i < temp_gender[0].length; i++) {
       var obj = {
        label:temp_gender[0][i],
        data: temp_gender[1][i]
      };
      $scope.final_data_gender.push(obj);
    }
    $scope.labels_gender = [];
    $scope.data_gender = [];
    for (i = 0; i < $scope.sorted_final_data.length; i++) {
      if($scope.final_data_gender[i] && $scope.final_data_gender[i].hasOwnProperty("label") && $scope.final_data_gender[i].hasOwnProperty("data")){
        $scope.labels_gender.push($scope.final_data_gender[i].label);
        $scope.data_gender.push($scope.final_data_gender[i].data);
      }
    }
    
    // console.log($scope.data_school);
  })
  .error(function(data, status, header, config) {
    console.log(data);
    window.location.href = '/';
  });

  $scope.predicate = 'id';



}])


function getYoutubeID(original_URL) {
  var temp = original_URL.split('=');
  return temp[1];
}

function changetoHTML() {
  $('skill-frame').text()
}

function compare(a,b) {
  if (a.score.total < b.score.total)
    return 1;
  if (a.score.total > b.score.total)
    return -1;
  return 0;
}
function compare2(a,b) {
  if (a.data < b.data)
    return 1;
  if (a.data > b.data)
    return -1;
  return 0;
}
function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}
function removeDuplicateAndCountAmount(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}