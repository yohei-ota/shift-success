function shift() {
  var date = document.getElementById("calender") //カレンダーから日付選択
  var groupId = [...document.querySelectorAll(".row-group")] //テーブルのボディ全体
  var timeList = [...document.querySelectorAll(".time-list")] // 横行一列毎
  var oneTimeList = timeList.firstElementChild
  var tableRow = document.getElementById("table").rows // 一行
  var timeId = [...document.querySelectorAll(".border-th")] // 表部分
  var userName = [...document.querySelectorAll(".table-user")] // 氏名部分
  const test = document.getElementById("user-name")
  const inTime = document.getElementById("in-time")
  const outTime = document.getElementById("out-time")
  const holiday = document.getElementById("holiday")
  var shift = document.getElementById("shift")
  var idList = [] // 各行の色付きのセル情報の配列
  let s = ""
  let e = ""
  

  
  date.addEventListener("input", () => {
    shift.innerHTML = "" // 表示されているシフト希望をリセット
    timeId.forEach(function(target){ // 背景色をリセット
      target.removeAttribute("style", "background-color:#004e0a")
    })
    for(let f = 0; f < gon.users.length; f++){ // 申請希望を出しているユーザーの名前を取得
      var user = gon.users[f]
      for(let i = 0; i < gon.schedules.length; i ++){
        var schedule = gon.schedules[i]
        if((schedule["datetime_in"].substr(0,10) === date.value) && (schedule["user_id"] === user["id"]) ){ // カレンダーで選択した日付のシフト希望表示
          if(schedule["holiday"] === true ){
            var html = `
            <div>
            ${user["name"]}の予定 休み
            </div>
            `
            shift.insertAdjacentHTML("beforeend", html)
          } else {
            var html = `
            <div>
            ${user["name"]}の予定
            ${schedule["datetime_in"].substr(5,2)}月
            ${schedule["datetime_in"].substr(8,2)}日
            ${schedule["datetime_in"].substr(11,2)} : 
            ${schedule["datetime_in"].substr(14,2)} ~ 
            ${schedule["datetime_out"].substr(11,2)} : 
            ${schedule["datetime_out"].substr(14,2)}
            ${schedule["add_request"]}
            </div>
            `
            shift.insertAdjacentHTML("beforeend", html)
            var startCell = Number(schedule["datetime_in"].substr(11,2) + schedule["datetime_in"].substr(14,2)) // 表示されている希望時間の数値 12:34 => 1234
            var endCell = Number(schedule["datetime_out"].substr(11,2) + schedule["datetime_out"].substr(14,2))// 表示されている希望時間の数値
            timeId.forEach(function(target){
              var trName = target.parentElement.firstElementChild.textContent // セルの行の氏名
              var timeIn = ((target.id / 2) - 0.5) * 100 // 希望入時間(0分)の数値 12:34 => 1234
              var timeInMinute = ((target.id / 2) * 100) - 70 // 希望入時間(30分)の数値
              var timeOut = (target.id / 2) * 100 // 希望終時間(時)の数値
              var timeOutMinute = timeOut - 20 // 希望終時間(分)の数値
              if(user["name"] === trName){ // シフト希望の時間のセルの色付け
                if((timeIn >= startCell) || (timeInMinute >= startCell)){
                  target.setAttribute("style", "background-color:#004e0a;")
                }
                if(timeOutMinute > endCell){
                  target.removeAttribute("style", "background-color:#004e0a;")
                }
              }
            })
          }
        }
      }
    }
  })
  
  
  timeId.forEach(function(target){ // セルがクリックされたら色がつくor消え、idListに追加or削除される
    target.addEventListener("mousedown", function(){
      console.log(target.parentElement.firstElementChild.textContent) // クリックされた行のuserの名前
      console.log(target.id) // クリックされたセルのid
      if(target.getAttribute("style") === "background-color:#004e0a;"){
        this.removeAttribute("style", "background-color:#004e0a;")
        var idListBefore = idList.filter(id => id != this.id)
        idList = idListBefore
        console.log(idList)
      } else {
        this.setAttribute("style", "background-color:#004e0a;")
        idList.push(this.id)
        console.log(idList)
      }
    })
  })
  
  // timeId.forEach(function(target){
  //   target.addEventListener("dragenter", function(){
  //     if(this.getAttribute("style") === "background-color:#004e0a;"){
  //       this.removeAttribute("style", "background-color:#004e0a;")
  //       var idListBefore = idList.filter(id => id != this.id)
  //       idList = idListBefore
  //       console.log(idList)
  //     } else {
  //       this.setAttribute("style", "background-color:#004e0a;")
  //       idList.push(this.id)
  //       console.log(idList)
  //     }
  //   })
  // })
  
  // timeId.forEach(function(target){
  //   target.addEventListener("mouseup", function(){
  //     var max = Math.max.apply(null, idList)
  //     var min = Math.min.apply(null, idList)
  //     console.log(max)
  //     console.log(min)
  //   })
  // })
  
  
}

window.addEventListener('load', shift)






// <input id="target">
// document.getElementById( "target" ).value = "SYNCER" ;






// timeId.forEach(function(target){
  //   target.addEventListener("mousedown", function(){
    //     if(this.getAttribute("style") == "background-color:#004e0a;"){
      //       this.removeAttribute("style", "background-color:#004e0a;")
      //     } else {
        //       this.setAttribute("style", "background-color:#004e0a;")
        //     }
        //   })
        // })
        // timeId.forEach(function(target){
          //   target.addEventListener("dragover", function(){
            //     if(this.getAttribute("style") == "background-color:#004e0a;"){
              //       this.removeAttribute("style", "background-color:#004e0a;")
              //     } else {
                //       this.setAttribute("style", "background-color:#004e0a;")
                //     }
                //   })
                // })