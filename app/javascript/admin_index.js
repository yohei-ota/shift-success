function shift() {
  if (location.pathname.match(`groups/${gon.admin.group_id}/admin_posts`)){ // シフト編集ページでのみ実行
    let timeId = [...document.querySelectorAll(".border-th")] // 表部分
    
    for(let f = 0; f < gon.users.length; f++){
      let user = gon.users[f]
      for(let i = 0; i < gon.works.length; i++){
        let work = gon.works[i]
        if(work.holiday_actual === false ){
          timeId.forEach(function(target){ // 入時間から終時間までのセルを色付け
            let trName = target.parentElement.firstElementChild.textContent // セルの行の氏名
            let timeIn = ((target.id / 2) - 0.5) * 100 // 希望入時間(0分)の数値 12:34 => 1234
            let timeInMinute = ((target.id / 2) * 100) - 70 // 希望入時間(30分)の数値
            let timeOut = (target.id / 2) * 100 // 希望終時間(時)の数値
            let timeOutMinute = timeOut - 20 // 希望終時間(分)の数値
            if((user.name == trName) && (user.id === work.user_id)){ // ループしてるユーザー名と各行のユーザー名が一致した時のみ実行
              if((timeIn >= work.datetime_in_actual) || (timeInMinute >= work.datetime_in_actual)){
                target.setAttribute("style", "background-color:#004e0a;")
              }
              if(timeOutMinute > work.datetime_out_actual){
                target.removeAttribute("style", "background-color:#004e0a;")
              }
            }
          })
        }
      }
    }
  }
}

window.addEventListener('load', shift)