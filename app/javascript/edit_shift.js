function shift() {
  if (location.pathname.match(`groups/${gon.admin.group_id}/actual_works/${gon.admin.group_id}/edit`)){ // シフト編集ページでのみ実行
    let date = document.getElementById("calender") //カレンダーから日付選択
    let tableRow = document.getElementById("table").rows // 一行
    let timeId = [...document.querySelectorAll(".border-th")] // 表部分
    const btn = document.getElementById("btn") // 保存ボタン
    const mode = document.getElementById("over-early-mode") // モード変更ボタン
    let greenCell = [] // 黄緑色付きのセル
    let pinkCell = [] // ピンク色付きのセル
    

    for(let f = 0; f < gon.users.length; f++){ // ページを読み込んだ時はシフトを非表示
      let user = gon.users[f]
      for(let i = 0; i < gon.works.length; i++){
        let work = gon.works[i]
        if(work.user_id === user.id){
          let form = document.getElementById(`shift-form${i}`)
          form.setAttribute("style","display:none")
        }
      }
    }
    
    mode.addEventListener("click", () =>{ // モード切り替え
      if(mode.getAttribute("style") === "background-color:#9acd32;"){ // 黄緑
        mode.setAttribute("style", "background-color:#f8b1f2;") // ピンク
        mode.textContent = "残業モード解除"
      } else {
        mode.setAttribute("style", "background-color:#9acd32;")
        mode.textContent = "残業モード"
      }
    })

    
    timeId.forEach(function(target){
      target.addEventListener("mousedown", function(){ // モードによってクリックした時の背景色が変わる
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
        for (let i = 0; i < gon.users.length; i++){
          let user = gon.users[i]
          greenCell = [] // 色づいてるセルの情報をリセット
          pinkCell = []
          for(let f = 0; f < 50; f++){ //色づいてるセルの情報を取得
            let cell = tableRow[i+1].children[f]
            if(cell.getAttribute("style") === "background-color:#004e0a;"){ // 黄緑セルを取得
              greenCell.push(cell.id)
            } else if(cell.getAttribute("style") === "background-color:#f8b1f2;"){ // ピンクセルを取得
              pinkCell.push(cell.id)
            }
          }
          for(let f = 0; f < gon.works.length; f++){
            let work = gon.works[f]
            if(work["date"] === date.value){ // 色付きのセルから入時間・終時間・残業時間を算出
              let startWork = Math.min.apply(null, greenCell)
              let endWork = Math.max.apply(null, greenCell)
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
              let userId = document.getElementById(`user-id${f}`) // 対応するフォームを取得
              let inActual = document.getElementById(`in-time${f}`)
              let outActual = document.getElementById(`out-time${f}`)
              let overTime = document.getElementById(`over-early-time${f}`)
              let holidayActual = document.getElementById(`holiday${f}`)
              let holidayCheck = document.getElementById(`holiday-check${f}`)
              if((userId.value === user["name"]) &&(work["date"] === date.value)){
                if((greenCell.length === 0) && (pinkCell.length === 0) && (overWork === 0)){ // 色付きのセルがない時はシフトを休みにして非表示
                  inActual.setAttribute("type","hidden")
                  outActual.setAttribute("type","hidden")
                  overTime.setAttribute("type","hidden")
                  holidayCheck.textContent = "休みを取り消す"
                  holidayActual.checked = true
                } else { // 色付きのセルがあるとシフトのフォームが表示
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

   


 
    
    date.addEventListener("input", ()=>{ // カレンダーで日付選択をした時に対応するシフトを表示
      timeId.forEach(function(target){ // 背景色をリセット
        target.removeAttribute("style", "background-color:#004e0a")
      })
      for(let f = 0; f < gon.users.length; f++){
        for(let i = 0; i < gon.works.length; i++){
          let work = gon.works[i]
          let userId = document.getElementById(`user-id${i}`)
          let form = document.getElementById(`shift-form${i}`)
          let inActual = document.getElementById(`in-time${i}`)
          let outActual = document.getElementById(`out-time${i}`)
          let overTime = document.getElementById(`over-early-time${i}`)
          let holidayActual = document.getElementById(`holiday${i}`)
          let holidayCheck = document.getElementById(`holiday-check${i}`)
          if(work.user_id === user.id){
            userId.removeAttribute("type","hidden")
            inActual.removeAttribute("type","hidden")
            outActual.removeAttribute("type","hidden")
            overTime.removeAttribute("type","hidden")
            holidayCheck.removeAttribute("style", "display:none")
            holidayCheck.textContent = "休みにする"
            holidayActual.removeAttribute("style", "display:none")
            if(work["date"] !== date.value){
              userId.setAttribute("type","hidden")
              inActual.setAttribute("type","hidden")
              outActual.setAttribute("type","hidden")
              overTime.setAttribute("type","hidden")
              holidayCheck.setAttribute("style", "display:none")
              holidayActual.setAttribute("style", "display:none")
            } else if(work["date"] === date.value) {
              form.removeAttribute("style","display:none")
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
          holidayActual.addEventListener("click", ()=>{ // 休みにするのチェックボックスがクリックされると表の色付けも対応して変化
            if(holidayCheck.textContent === "休みにする"){ // チェックを入れる(休みにする)と表の色が消える
              inActual.setAttribute("type","hidden")
              outActual.setAttribute("type","hidden")
              overTime.setAttribute("type","hidden")
              holidayCheck.textContent = "休みを取り消す"
              timeId.forEach(function(target){
                let trName = target.parentElement.firstElementChild.textContent // セルの行の氏名
                if((userId.value === trName) &&(work["date"] === date.value)){ // ループしてるユーザー名と各行のユーザー名が一致した時のみ実行
                  target.removeAttribute("style", "background-color:#004e0a;")
                }
              })
            } else if(holidayCheck.textContent === "休みを取り消す"){ // チェックを外す(休みを取り消す)と表に色がつく
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
    


    function update() { // フォーム送信処理
      for(let f = 0; f < gon.users.length; f++){
        let user = gon.users[f]
        for(let i = 0; i < gon.works.length; i++){
          let work = gon.works[i]
          if((work["date"] === date.value) && (user.id === work["user_id"])){
            let formResult = document.getElementById(`shift-form${i}`) // 各入力フォーム 
            let userId = document.getElementById(`user-id${i}`)
            let inActual = document.getElementById(`in-time${i}`)
            let outActual = document.getElementById(`out-time${i}`)
            let overTime = document.getElementById(`over-early-time${i}`)
            let holidayActual = document.getElementById(`holiday${i}`)
            userId.value = work["user_id"] // 表示されているフォームの名前をidに変更
            if(holidayActual.checked === true){ // 休みの時はフォームの時間をリセットして送信
              inActual.value = ""
              outActual.value = ""
              overTime.value = 0
              let formData = new FormData(formResult)
              let XHR = new XMLHttpRequest()
              XHR.open("PATCH",`/groups/${gon.admin.group_id}/actual_works/${gon.admin.group_id}`, true)
              XHR.send(formData)
            } else if(holidayActual.checked === false){ // 休みじゃない時はそのまま送信
              let formData = new FormData(formResult)
              let XHR = new XMLHttpRequest()
              XHR.open("PATCH",`/groups/${gon.admin.group_id}/actual_works/${gon.admin.group_id}`, true)
              XHR.send(formData)
            }
          }
        }
      }
    }
    
    btn.addEventListener("click", (e) =>{
      e.preventDefault()
      update()
      alert("変更を保存しました！")
    })
  }
}

window.addEventListener('load', shift)