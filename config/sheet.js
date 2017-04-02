function mapping(i, tmp) {
  return {
    id : i,
    name: tmp[2],
    gender: tmp[3],
    school: tmp[4],
    college: tmp[5],
    department: tmp[6],
    grade: tmp[7],
    student_id: tmp[8],
    email: tmp[9],
    phone_number: tmp[10],
    facebook_link: tmp[11],
    club_name: tmp[15],
    club_role: tmp[16],
    club_story: tmp[17],
    // scholarships: null,
    // scholarships_other: null,
    // poor_allowance: null,
    // poor_allowance_other: null,
    exchange_student: tmp[12],
    exchange_student_other: tmp[13],

    course_takes: tmp[18],
    // course_takes_service_design: 1,
    // course_takes_art_create: false,
    // course_takes_art_design_sale: false,
    // course_takes_novel_design: false,
    // course_takes_visual_design: false,
    // course_takes_novel_bm_design: false,
    // course_takes_art_create: false,
    // course_takes_ux: false,
    // course_takes_global_youth: false,
    // course_takes_med: false,
    // course_takes_dt: false,
    // course_takes_global_theory_do: false,
    // course_takes_oldman: false,
    // course_takes_novel_cars: false,
    // course_takes_warm_tech: false,
    // course_takes_none: false,
    course_takes_reviews: tmp[19],

    startup_activities: tmp[20],
    // startup_activities_none: false,
    // startup_activities_cep_forum: false,
    // startup_activities_dt_workshop: false,
    // startup_activities_social_project: false,
    // startup_activities_intro_seminar: false,
    // startup_activities_HackNTU: false,
    // startup_activities_NTU_Startup_Day: false,
    // startup_activities_startup_matchmaking: false,
    startup_activities_reviews: tmp[21],

    startup_problems_region: tmp[22],
    startup_problems: tmp[23],
    startup_problems_reviews: tmp[24],
    startup_skills: tmp[25],
    what_to_learn: tmp[26],
    video_link: tmp[27],

    contact1_name: tmp[28],
    contact1_job: tmp[29],
    contact1_relationship: tmp[30],
    contact1_phone: tmp[31],
    contact1_time: tmp[32],
    contact1_email: tmp[33],
    contact2_name: tmp[34],
    contact2_job: tmp[35],
    contact2_relationship: tmp[36],
    contact2_phone: tmp[37],
    contact2_time: tmp[38],
    contact2_email: tmp[39],
    contact3_name: tmp[40],
    contact3_job: tmp[41],
    contact3_relationship: tmp[42],
    contact3_phone: tmp[43],
    contact3_time: tmp[44],
    contact3_email: tmp[45],
  }
}

function loadAll(data) {
  var result = []
  for(let i = 2; i <= Object.keys(data).length; i++) {
    tmp = data[i]
    result.push(mapping(i - 1, tmp))
  }
  return result
}

function loadOne(i, data) {
  return mapping(i, data[i + 1])
}

module.exports = 
{
  load: function(sheet, cb) {
    sheet.receive( (err, rows, info) => {
      if(err) console.error(err)
      cb(loadAll(rows))
      // cb(rows)
    })
  },
  findOne: function(sheet, id, cb) {
    sheet.receive( (err, rows, info) => {
      if(err) console.error(err)
      cb(loadOne(id, rows))
    })
  }
}
