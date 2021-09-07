function shift() {
  var dateId = document.querySelectorAll(".border-th")
  
  dateId.forEach(function(target){
    target.addEventListener("mousedown", function(){
      if(this.getAttribute("style") == "background-color:#004e0a;"){
        this.removeAttribute("style", "background-color:#004e0a;")
      } else {
        this.setAttribute("style", "background-color:#004e0a;")
      }
    })
  })
  dateId.forEach(function(target){
    target.addEventListener("dragover", function(){
      if(this.getAttribute("style") == "background-color:#004e0a;"){
        this.removeAttribute("style", "background-color:#004e0a;")
      } else {
        this.setAttribute("style", "background-color:#004e0a;")
      }
    })
  })
}

window.addEventListener('load', shift)