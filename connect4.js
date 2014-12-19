window.onload = function () {

  var createColumns=function(){
    var columns = document.querySelectorAll(".board>div")
    for (i in columns){
      columns[i].className="column" + (i*1+1);

    }
  }

  var createID=function(){
    var cells = document.querySelectorAll('[class^=column]>div')
    for (i in cells){
      cells[i].id=i*1;
      cells[i].className="empty"
      cells[i].innerHTML=i*1;
    }
  }

  var dropCell=function(id){
    document.getElementById(id).style.top="0";
  }

createColumns();
createID();


  var findEmptyCell = function() {
    $( '[class^=column]' ).click(function() {
      var emptyCell = $(this).find(".empty").last().attr("id");
      return emptyCell;
  });
  }

}

