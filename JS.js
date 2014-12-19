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
    var cell = document.getElementById(id)
    cell.innerHTML='<img src='+ activePlayer.currentPlayer().img + '>';
    cell.style.top="0";
  }


  var player1={
    img:'',
    name:"player1"
  }

  var player2={
    img:'',
    name:"player2"
  }


  var assignChar=function(){
    var characters=document.querySelector("#characters");
    characters.addEventListener("click",grapPic);
  }

  var grapPic=function(e){
   if (player1.img===""){
    player1.img="./image/"+ e.target.id +".png"
  }else if (player2.img===""){
    player2.img="./image/" + e.target.id + ".png"
  }
  }

  var charactersText=function(){
    var text=document.querySelector("#characters > p")
    if (player1.img===""){
      text.innerHTML="Choose character for Player 1";
    }else if (player2.img===""){
      text.innerHTML="Choose character for Player 2";
    }else{
      text.innerHTML="Game Begins!!!";
    }
  }

  var activePlayer={
    lastPlayer: player2,
    currentPlayer: function(){
      if (this.lastPlayer == player2){
        this.lastPlayer=player1;
        return player1;
      }else{
        this.lastPlayer=player2;
        return player2;
      }
    }
  }

   var dropCell=function(id){
    var cell = document.getElementById(id)
    cell.innerHTML='<img src='+ activePlayer.currentPlayer().img + '>';
    cell.style.top="0";
  }

    var findEmptyCell = function() {
    $( '[class^=column]' ).click(function() {
      var emptyCell = $(this).find(".empty").last()
      var id=emptyCell.attr("id");
      dropCell(id);
      emptyCell.attr("class",activePlayer.lastPlayer.name);
  });
  }



  createColumns();
  createID();
  findEmptyCell();
  charactersText();
  assignChar();
}
