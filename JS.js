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
    var text=document.querySelector("#characters > p")
    if (player1.img===""){
      player1.img="./image/"+ e.target.className +".png"
      player1.name=e.target.className;
      text.innerHTML="Choose character for Player 2";
    }
    else if (player2.img===""){
      player2.img="./image/" + e.target.className + ".png"
      player2.name=e.target.className;
      text.innerHTML="Game Begins!!!";
    }
  }

  // var charactersText=function(){
  //   var text=document.querySelector("#characters > p")
  //   if (player1.img===""){
  //     text.innerHTML="Choose character for Player 1";
  //   }else if (player2.img===""){
  //     text.innerHTML="Choose character for Player 2";
  //   }else{
  //     text.innerHTML="Game Begins!!!";
  //   }
  // }

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
      updateBoard(id);
      checkWinner(activePlayer.lastPlayer.name);
  });
  }

    var updateBoard=function(id){
      board[id*1]=activePlayer.lastPlayer.name;
    };

  var createBoard = function(){
    var arr = [],
      i=0
    while (i<42){
      arr.push(i);
      i++;
    }
    return arr;
  }

  var checkAllColumns = function(board_arr,player){
    var range = [0,6],
      test=false;
    while (range[0] < board_arr.length && test === false){
      var col = board_arr.slice(range[0],range[1]);
      console.log(col);
      if (connectFour(col,player)){test = true};
      range = range.map(function(num){return num+6;});
    }
    return test;
  }

  // var checkAllRows = function(board_arr,player){
  //   var rowNum=0,
  //     test=false;
  //   while (rowNum < 6 && test === false){
  //     var row = [];
  //     for (i in board_arr){ if (i%6 === rowNum){row.push(board_arr[i])};};
  //     if (connectFour(row,player)){test=true};
  //     rowNum++;
  //   }
  //   return test;
  // }


  var checkAllRows = function(board_arr,player){
    var rowNum=1,
        test=false;
    while (rowNum < 7 && test === false){
      var row = getIdsFromRow(board_arr,rowNum);
      if (connectFour(row,player)){test=true};
      rowNum++;
    }
    return test;
  }

  // return Ids from a Row Number
  var getIdsFromRow = function(board,rowNum){
    var arr = []
    for (var i = 1; i <= 7; i++){
        arr.push(board[getIdsFromColumn(i)[rowNum-1]]);
      }
    return(arr);
  }

  var checkAllDiag = function(board_arr,player){
    var id=[1,2,3,4,5,11,17,23,29,35],
        id2=[35,29,23,17,11,5,36,37,38,39,40,41]
      index=0,
      n=id[index],
      test=false;
    while (index <= id.length && test === false){
      var diag=[],
        min=Math.floor(id[index]/6)*6+5;
      while (min <= n+5 && n < 42){
        diag.push(board_arr[n]);
        n+=5;
        min+=6;
      }
      index+=1;
      n=id[index];
      min=Math.floor(id[index]/6)*6+5;
      if (connectFour(diag,player)){test = true};
      console.log(diag);
    }
    return test
  }

  var all=function(array,match){ // return true if all element in array == match
    var test=true,
      i=0;
    while (i < array.length){
      if (array[i]!==match){
        test= false;
      }
      i++;
    }
    return test;
  }

  var connectFour=function(array,player){ // check each set of 4
    var i = 0,
      test=false;
    while (i+4 <= array.length){
      if (all(array.slice(i,i+4), player)){ test=true};
      i++;
    }
    return test;
  }

  var board = createBoard();

  var checkWinner=function(player){
    if (checkAllRows(board,player) === true){
      winnerAnimation();
    }else if (checkAllColumns(board,player)===true){
      winnerAnimation();
    }else if (checkAllDiag(board,player)===true){
      winnerAnimation();
    }
  };

  var winnerAnimation=function(){
    document.querySelector("#message").style.zIndex="1";
    var popup = document.querySelector("#popup")
        popup.style.right="0";
        var name=activePlayer.lastPlayer.name
        popup.innerHTML="Mic drop!!! " + name.replace(name[0],name[0].toUpperCase()) + " WON!!..<br> Yeah....."
        // winningShit();
        textAnimate();
        setInterval(textAnimate(),1200)
        alert("I'm blocking yo text mang");
        location.reload ();
  }

  // var winningShit = function(){
  //   textAnimate();
  //   location.reload();
  // }

   // return Ids from a Column Number
  var getIdsFromColumn = function(colNum){
    var selector = ".column" + colNum + " div";
    var childObjects = document.querySelectorAll(selector);
    var arr = [];
    for (var i = 0; i < childObjects.length; i++){
      arr.push(childObjects[i].id*1)
    }
    return(arr);
  }


    var times = 2;
    function textAnimate(){
      var popup=document.querySelector("#popup")
          popup.style.fontSize=times*40+"px";
          popup.style.paddingTop="20%";
      if (times > 10) {clearInterval(textAnimate)};
      times++;

    }

  createColumns();
  createID();
  findEmptyCell();
  // charactersText();
  // charactersText();
  assignChar();



