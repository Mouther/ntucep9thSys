require! <[edit-google-spreadsheet]>

config =
  single: require \../config/sheet-config.js
  group:  require \../config/group-sheet-config.js
  offset:
    single: 46
    group: 2

function parse-sheet rows
  result = []
  for i from 2 to Object.keys rows .length
    tmp = {}
    for key of rows[i]
      tmp[rows.1[key]] = rows[i][key]
    result.push tmp
  result

(err, single-sheet) <-! edit-google-spreadsheet.load config.single
return console.error err if err
(err, group-sheet) <-! edit-google-spreadsheet.load config.group
return console.error err if err

(err, si, info) <-! single-sheet.receive
return console.error err if err
(err, gr, info) <-! group-sheet.receive
return console.error err if err

single = parse-sheet si

for i from 2 to Object.keys gr .length
  indexes = []
  for j til 5
    k = j * 5
    continue if !gr[i][k + 3]
    user = single.find -> it[\姓名] is gr[i][k + 3] and it[\學校] is gr[i][k + 4] and it[\學院] is gr[i][k + 5] and it[\系所] is gr[i][k + 6] and it[\年級] is gr[i][k + 7]
    indexes.push((single.index-of user) + 2)

  tmp = {}
  for index in indexes
    tmp[index] = {}
    for l til 29
      tmp[index][config.offset.single + l] = gr[i][config.offset.group + l]

  single-sheet.add tmp

# single-sheet.add 2: 46: <[t e s t]>

single-sheet.send !->
  console.error it if it

