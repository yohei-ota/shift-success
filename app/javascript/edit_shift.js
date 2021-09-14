function shift() {
  if (location.pathname.match(`groups/${gon.admin.group_id}/actual_works/${gon.admin.group_id}/edit`)){
    let date = document.getElementById("calender") //カレンダーから日付選択
    let tableRow = document.getElementById("table").rows // 一行
    let timeId = [...document.querySelectorAll(".border-th")] // 表部分
    let form = document.getElementById("shift-form")
    // let userId = document.getElementById("user-id") // 入力フォームのユーザーID
    // let workDate = document.getElementById("work-date") // 入力フォームの日付
    // let inTime = document.getElementById("in-time") // 入力フォームの入時間
    // let outTime = document.getElementById("out-time") // 入力フォームの終時間
    // let holiday = document.getElementById("holiday") // 入力フォームの休み有無
    // let shift = document.getElementById("shift") // その日のシフト希望一覧を表示するdiv要素
    // const btn = document.getElementById("btn") // 保存ボタン
    const mode = document.getElementById("over-early-mode")
    let greenCell = [] // 色付きのセル
    let pinkCell = []
    
    form.setAttribute("style","display:none")
    
    mode.addEventListener("click", () =>{
      if(mode.getAttribute("style") === "background-color:#9acd32;"){ // 黄緑
        mode.setAttribute("style", "background-color:#f8b1f2;") // ピンク
        mode.textContent = "残業・早上がりモード解除"
      } else {
        mode.setAttribute("style", "background-color:#9acd32;")
        mode.textContent = "残業・早上がりモード"
      }
    })

    
    timeId.forEach(function(target){
      target.addEventListener("mousedown", function(){
        if(mode.getAttribute("style") === "background-color:#9acd32;"){
          if(this.getAttribute("style") === "background-color:#004e0a;"){
            this.removeAttribute("style", "background-color:#004e0a;")
          } else {
            this.setAttribute("style", "background-color:#004e0a;")
          }
        } else if(mode.getAttribute("style") === "background-color:#f8b1f2;"){
          if(this.getAttribute("style") === "background-color:#f8b1f2;"){
            this.removeAttribute("style", "background-color:#f8b1f2;")
          } else {
            this.setAttribute("style", "background-color:#f8b1f2;")
          }
        }
        for (let i = 0; i < gon.users.length; i++){ // ユーザーの名前を取得してループしてユーザー名のフォームに代入
          let user = gon.users[i]
          greenCell = [] // 色づいてるセルの情報をリセット
          pinkCell = []
          for(let f = 0; f < 50; f++){ //色づいてるセルの情報を取得
            let cell = tableRow[i+1].children[f]
            if(cell.getAttribute("style") === "background-color:#004e0a;"){
              greenCell.push(cell.id)
            } else if(cell.getAttribute("style") === "background-color:#f8b1f2;"){
              pinkCell.push(cell.id)
            }
          }
          for(let f = 0; f < gon.works.length; f++){ // ユーザー一人のシフト希望を取得してループ
            let work = gon.works[f]
            if(work["date"] === date.value){
              let startWork = Math.min.apply(null, greenCell) //colorCellから入時間を取得 // id
              let endWork = Math.max.apply(null, greenCell) //colorCellから終時間を取得 // id
              let overWork = (pinkCell.length / 2)
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
              let userId = document.getElementById(`user-id${f}`)
              let inActual = document.getElementById(`in-time${f}`)
              let outActual = document.getElementById(`out-time${f}`)
              let overTime = document.getElementById(`over-early-time${f}`)
              let holidayActual = document.getElementById(`holiday${f}`)
              let holidayCheck = document.getElementById(`holiday-check${f}`)
              if((userId.value === user["name"]) &&(work["date"] === date.value)){
                if((greenCell.length === 0) && (pinkCell.length === 0) && (overWork === 0)){
                  inActual.setAttribute("type","hidden")
                  outActual.setAttribute("type","hidden")
                  overTime.setAttribute("type","hidden")
                  holidayCheck.textContent = "休みを取り消す"
                  holidayActual.checked = true
                } else {
                  inActual.removeAttribute("type","hidden")
                  outActual.removeAttribute("type","hidden")
                  overTime.removeAttribute("type","hidden")
                  inActual.value = startTime
                  outActual.value = endTime
                  overTime.value = overWork
                  holidayCheck.textContent = "休みにする"
                  holidayActual.checked = false
                }
              }
            }
          }
        }
      })
    })

   


 
    
    date.addEventListener("input", ()=>{
      form.removeAttribute("style","display:none")
      timeId.forEach(function(target){ // 背景色をリセット
        target.removeAttribute("style", "background-color:#004e0a")
      })
      for(let f = 0; f < gon.users.length; f++){ // 申請希望を出しているユーザーの名前を取得してループ
        let user = gon.users[f]
      for(let i = 0; i < gon.works.length; i++){ // ユーザー一人のシフト希望を取得してループ
        let work = gon.works[i]
          let userId = document.getElementById(`user-id${i}`)
          let inActual = document.getElementById(`in-time${i}`)
          let outActual = document.getElementById(`out-time${i}`)
          let overTime = document.getElementById(`over-early-time${i}`)
          let holidayActual = document.getElementById(`holiday${i}`)
          let holidayCheck = document.getElementById(`holiday-check${i}`)
          if(work["user_id"] === user["id"]){
            userId.removeAttribute("type","hidden")
            inActual.removeAttribute("type","hidden")
            outActual.removeAttribute("type","hidden")
            overTime.removeAttribute("type","hidden")
            holidayCheck.removeAttribute("style", "display:none")
            holidayCheck.textContent = "休みにする"
            holidayActual.removeAttribute("style", "display:none")
            if(work["date"] !== date.value){ // カレンダーで選択した日付のシフト希望表示
              userId.setAttribute("type","hidden")
              inActual.setAttribute("type","hidden")
              outActual.setAttribute("type","hidden")
              overTime.setAttribute("type","hidden")
              holidayCheck.setAttribute("style", "display:none")
              holidayActual.setAttribute("style", "display:none")
            } else if(work["date"] === date.value) {
              if(work["holiday_actual"] === true ){
                inActual.setAttribute("type","hidden")
                outActual.setAttribute("type","hidden")
                overTime.setAttribute("type","hidden")
                holidayCheck.textContent = "休みを取り消す"
                holidayActual.checked = true
              } else if(work["holiday_actual"] === false ){
                userId.removeAttribute("type","hidden")
                inActual.removeAttribute("type","hidden")
                outActual.removeAttribute("type","hidden")
                overTime.removeAttribute("type","hidden")
                holidayCheck.removeAttribute("style", "display:none")
                holidayActual.checked = false
              }
            }
          }
          holidayActual.addEventListener("click", ()=>{
            if(holidayCheck.textContent === "休みにする"){
              inActual.setAttribute("type","hidden")
              outActual.setAttribute("type","hidden")
              overTime.setAttribute("type","hidden")
              holidayCheck.textContent = "休みを取り消す"
              timeId.forEach(function(target){ // 入時間から終時間までのセルを色付け
                let trName = target.parentElement.firstElementChild.textContent // セルの行の氏名
                if((userId.value === trName) &&(work["date"] === date.value)){ // ループしてるユーザー名と各行のユーザー名が一致した時のみ実行
                  target.removeAttribute("style", "background-color:#004e0a;")
                }
              })
            } else if(holidayCheck.textContent === "休みを取り消す"){
              inActual.removeAttribute("type","hidden")
              outActual.removeAttribute("type","hidden")
              overTime.removeAttribute("type","hidden")
              holidayCheck.textContent = "休みにする"
              timeId.forEach(function(target){ // 入時間から終時間までのセルを色付け
                let trName = target.parentElement.firstElementChild.textContent // セルの行の氏名
                let timeIn = ((target.id / 2) - 0.5) * 100 // 希望入時間(0分)の数値 12:34 => 1234
                let timeInMinute = ((target.id / 2) * 100) - 70 // 希望入時間(30分)の数値
                let timeOut = (target.id / 2) * 100 // 希望終時間(時)の数値
                let timeOutMinute = timeOut - 20 // 希望終時間(分)の数値
                if((userId.value === trName) &&(work["date"] === date.value)){ // ループしてるユーザー名と各行のユーザー名が一致した時のみ実行
                  if((timeIn >= inActual.value) || (timeInMinute >= inActual.value)){
                    target.setAttribute("style", "background-color:#004e0a;")
                  }
                  if(timeOutMinute > outActual.value){
                    target.removeAttribute("style", "background-color:#004e0a;")
                  }
                }
              })
            }
          })
          if(holidayActual.checked === false ){ // 休み希望がtrueなら予定休みを表示
            timeId.forEach(function(target){ // 入時間から終時間までのセルを色付け
              let trName = target.parentElement.firstElementChild.textContent // セルの行の氏名
              let timeIn = ((target.id / 2) - 0.5) * 100 // 希望入時間(0分)の数値 12:34 => 1234
              let timeInMinute = ((target.id / 2) * 100) - 70 // 希望入時間(30分)の数値
              let timeOut = (target.id / 2) * 100 // 希望終時間(時)の数値
              let timeOutMinute = timeOut - 20 // 希望終時間(分)の数値
              if((userId.value === trName) &&(work["date"] === date.value)){ // ループしてるユーザー名と各行のユーザー名が一致した時のみ実行
                if((timeIn >= inActual.value) || (timeInMinute >= inActual.value)){
                  target.setAttribute("style", "background-color:#004e0a;")
                }
                if(timeOutMinute > outActual.value){
                  target.removeAttribute("style", "background-color:#004e0a;")
                }
              }
            })
          }
        }
      }
    })
    


    // function form() { // 表の色づいているセルを元に一人ずつの勤務予定をフォームに入力して送信
    //   let formResult = document.getElementById("shift-form") // 入力フォーム 
    //   for (let i = 0; i < gon.users.length; i++){ // ユーザーの名前を取得してループしてユーザー名のフォームに代入
    //     let user = gon.users[i]
    //     userId.value = user.id
    //     colorCell = [] // 色づいてるセルの情報をリセット
    //     for(let f = 0; f < 50; f++){ //色づいてるセルの情報を取得
    //       let cell = tableRow[i+1].children[f]
    //       if(cell.getAttribute("style", "background-color:#004e0a;")){
    //         colorCell.push(cell.id)
    //       }
    //     }
    //     let startWork = Math.min.apply(null, colorCell) //colorCellから入時間を取得
    //     let endWork = Math.max.apply(null, colorCell) //colorCellから終時間を取得
    //     let startTime = "" // 入時間の情報を定義しリセット
    //     let endTime = "" // 終時間の情報を定義しリセット
    //     if(startWork % 2 === 0){
    //       startTime = ( '000' + (((startWork / 2) * 100) -70)).slice( -4 ) // 入時間を4桁数値に変換 12:34 => 1234
    //     } else if(startWork % 2 === 1){
    //       startTime = ( '000' + (((startWork / 2) - 0.5) * 100)).slice( -4 ) // 入時間を4桁数値に変換 12:34 => 1234
    //     }
    //     if(endWork % 2 === 0){
    //       endTime = ( '000' + ((endWork / 2) * 100)).slice( -4 ) // 終時間を4桁数値に変換 12:34 => 1234
    //     } else if(endWork % 2 === 1){
    //       endTime = ( '000' + (((endWork / 2) * 100) - 20)).slice( -4 ) // 終時間を4桁数値に変換 12:34 => 1234
    //     }
    //     workDate.value = date.value // 選択している日付をフォームに代入
    //     inTime.value = startTime // 入時間をフォームに代入
    //     outTime.value = endTime // 終時間をフォームに代入
    //     if((inTime.value == "") || (outTime.value == "")){ // 表の色がないところは休みをtrueで代入
    //       holiday.checked = true
    //     }
    //     let formData = new FormData(formResult) // フォームデータを定義
    //     let XHR = new XMLHttpRequest()
    //     XHR.open("POST",`/groups/${user.group_id}/actual_works`, true) // 紐づくグループのcreateアクションにPOST
    //     XHR.send(formData) // 送信
    //     userId.value = "" // 各データリセット
    //     workDate.value = ""
    //     inTime.value = ""
    //     outTime.value = ""
    //     holiday.checked = false
    //   }
    // }
    
    // btn.addEventListener("click", (e) =>{ // 保存ボタンがクリックされたらイベント発火
    //   e.preventDefault()
    //   form()
    //   alert("保存されました！")
    // })
  }
}

window.addEventListener('load', shift)