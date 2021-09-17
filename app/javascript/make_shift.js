function shift() {
  if (location.pathname.match(`groups/${gon.users[1].group_id}/actual_works/new`)){
    let date = document.getElementById("calender") //カレンダーから日付選択
    let tableRow = document.getElementById("table").rows // 一行
    let timeId = [...document.querySelectorAll(".border-th")] // 表部分
    let userId = document.getElementById("user-id") // 入力フォームのユーザーID
    let workDate = document.getElementById("work-date") // 入力フォームの日付
    let inTime = document.getElementById("in-time") // 入力フォームの入時間
    let outTime = document.getElementById("out-time") // 入力フォームの終時間
    let holiday = document.getElementById("holiday") // 入力フォームの休み有無
    let shift = document.getElementById("shift") // その日のシフト希望一覧を表示するdiv要素
    const shiftForm = document.getElementById("shift-form") // フォーム
    const calender = document.getElementById("calender-comment") // カレンダーの横のコメント
    const btn = document.getElementById("btn") // 保存ボタン
    let colorCell = [] // 色付きのセル
    
    shift.setAttribute("style", "display:none")
    shiftForm.setAttribute("style","display:none")
    
    date.addEventListener("input", () => {
      shift.innerHTML = "" // 表示されているシフト希望をリセット
      shiftForm.removeAttribute("style","display:none")
      shift.removeAttribute("style", "display:none")
      calender.setAttribute("style", "display:none")
      timeId.forEach(function(target){ // 背景色をリセット
        target.removeAttribute("style", "background-color:#004e0a")
      })
      for(let f = 0; f < gon.users.length; f++){ // 申請希望を出しているユーザーの名前を取得してループ
        let user = gon.users[f]
        for(let i = 0; i < gon.schedules.length; i++){ // ユーザー一人のシフト希望を取得してループ
          let schedule = gon.schedules[i]
          if((schedule["datetime_in"].substr(0,10) === date.value) && (schedule["user_id"] === user["id"]) ){ // カレンダーで選択した日付のシフト希望表示
            if(schedule["holiday"] === true ){ // 休み希望がtrueなら予定休みを表示
              let html = `
              <div class="shift-one">
              ${user["name"]}の予定 休み
              </div>
              `
              shift.insertAdjacentHTML("beforeend", html)
            } else { //  休み希望がfalseならその日の希望時間を表示
              var html = `
                <div class="today-shift-day">
                  <div class="shift-one">
                    ${user["name"]}の予定
                    ${schedule["datetime_in"].substr(5,2)}月
                    ${schedule["datetime_in"].substr(8,2)}日
                    ${schedule["datetime_in"].substr(11,2)} : 
                    ${schedule["datetime_in"].substr(14,2)} ~ 
                    ${schedule["datetime_out"].substr(11,2)} : 
                    ${schedule["datetime_out"].substr(14,2)}
                    ${schedule["add_request"]}
                  </div>
                </div>
              `
              shift.insertAdjacentHTML("beforeend", html)
              let startCell = Number(schedule["datetime_in"].substr(11,2) + schedule["datetime_in"].substr(14,2)) // 表示されている希望時間の数値 12:34 => 1234
              let endCell = Number(schedule["datetime_out"].substr(11,2) + schedule["datetime_out"].substr(14,2))// 表示されている希望時間の数値
              timeId.forEach(function(target){ // 入時間から終時間までのセルを色付け
                let trName = target.parentElement.firstElementChild.textContent // セルの行の氏名
                let timeIn = ((target.id / 2) - 0.5) * 100 // 希望入時間(0分)の数値 12:34 => 1234
                let timeInMinute = ((target.id / 2) * 100) - 70 // 希望入時間(30分)の数値
                let timeOut = (target.id / 2) * 100 // 希望終時間(時)の数値
                let timeOutMinute = timeOut - 20 // 希望終時間(分)の数値
                if(user["name"] === trName){ // ループしてるユーザー名と各行のユーザー名が一致した時のみ実行
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
    
    
    timeId.forEach(function(target){ // セルがクリックされたら色がつくor消える
      target.addEventListener("mousedown", function(){
        if(target.getAttribute("style") === "background-color:#004e0a;"){
          this.removeAttribute("style", "background-color:#004e0a;")
        } else {
          this.setAttribute("style", "background-color:#004e0a;")
        }
      })
    })
    
    function form() { // 表の色づいているセルを元に一人ずつの勤務予定をフォームに入力して送信
      let formResult = document.getElementById("shift-form") // 入力フォーム 
      for (let i = 0; i < gon.users.length; i++){ // ユーザーの名前を取得してループしてユーザー名のフォームに代入
        let user = gon.users[i]
        userId.value = user.id
        colorCell = [] // 色づいてるセルの情報をリセット
        for(let f = 0; f < 50; f++){ //色づいてるセルの情報を取得
          let cell = tableRow[i+1].children[f]
          if(cell.getAttribute("style", "background-color:#004e0a;")){
            colorCell.push(cell.id)
          }
        }
        let startWork = Math.min.apply(null, colorCell) //colorCellから入時間を取得
        let endWork = Math.max.apply(null, colorCell) //colorCellから終時間を取得
        let startTime = "" // 入時間の情報を定義しリセット
        let endTime = "" // 終時間の情報を定義しリセット
        if(startWork % 2 === 0){
          startTime = ( '000' + (((startWork / 2) * 100) -70)).slice( -4 ) // 入時間を4桁数値に変換 12:34 => 1234
        } else if(startWork % 2 === 1){
          startTime = ( '000' + (((startWork / 2) - 0.5) * 100)).slice( -4 ) // 入時間を4桁数値に変換 12:34 => 1234
        }
        if(endWork % 2 === 0){
          endTime = ( '000' + ((endWork / 2) * 100)).slice( -4 ) // 終時間を4桁数値に変換 12:34 => 1234
        } else if(endWork % 2 === 1){
          endTime = ( '000' + (((endWork / 2) * 100) - 20)).slice( -4 ) // 終時間を4桁数値に変換 12:34 => 1234
        }
        workDate.value = date.value // 選択している日付をフォームに代入
        inTime.value = startTime // 入時間をフォームに代入
        outTime.value = endTime // 終時間をフォームに代入
        if((inTime.value == "") || (outTime.value == "")){ // 表の色がないところは休みをtrueで代入
          holiday.checked = true
        }
        let formData = new FormData(formResult) // フォームデータを定義
        let XHR = new XMLHttpRequest()
        XHR.open("POST",`/groups/${user.group_id}/actual_works`, true) // 紐づくグループのcreateアクションにPOST
        XHR.send(formData) // 送信
        userId.value = "" // 各データリセット
        workDate.value = ""
        inTime.value = ""
        outTime.value = ""
        holiday.checked = false
      }
    }
    
    btn.addEventListener("click", (e) =>{ // 保存ボタンがクリックされたらイベント発火
      e.preventDefault()
      form()
      alert("保存されました！")
    })
  }
}

window.addEventListener('load', shift)