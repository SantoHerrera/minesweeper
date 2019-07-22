"use strict";

var board = {
  boxes: [],
  sizeOfBoard: function (widthHieght) {
    //creates an array of arrays thats widthHieght x widthHieght

    if (this.boxes.length > 0) {
      return;
    };

    for (let i = 0; i < widthHieght; i++) {
      this.boxes.push([]);
      for (let j = 0; j < widthHieght; j++) {
        let trueFalse = this.randomTrueFalse();

        this.boxes[i].push({
          boxId: i + "" + j,
          xPos: i,
          yPos: j,
          hypotheticalNearbyIds: board.getNearbyIds(i + "" + j),
          trueOrFalse: trueFalse
        });
      }
    }
  },
  getNearbyIds: function (theId) {
    //bug given id 00 it will output [0, 9]
    //[0, 9] is nowhere near 00
    const mathToGetNearbyId = [1, 11, 10, 9, -1, -11, -10, -9];
    let nearbyIds = [];

    for (let i = 0; i < mathToGetNearbyId.length; i++) {
      let finalAnswer = parseInt(theId) + mathToGetNearbyId[i];

      let randomTest = [];

      if (finalAnswer <= -1) { continue; }

      if (finalAnswer < 10) {

        randomTest.push([0 , finalAnswer]);

        nearbyIds.push([0 , finalAnswer]);
      } else {
        let biggerThan10 = finalAnswer.toString(10).split("").map(function(t) {
          
           return parseInt(t)
        });
        randomTest.push(biggerThan10);
        board.aTestNearbyIds(randomTest);

        nearbyIds.push(biggerThan10);

      }

      if(randomTest.length === 0) { continue; }
      //console.log(randomTest);
    }
    return nearbyIds;
  },
  aTestNearbyIds: function(localID) {

    //console.log("test", localID);
    let xPos = localID[0];
    let yPos = localID[1];

    //console.log(board.boxes);

    //let anotherTest = typeof board.boxes[xPos][yPos];


  },
  randomTrueFalse: function () {
    var randomNum = Math.random();

    if (randomNum >= 0.5) {
      return true;
    } else {
      return false;
    }
  },
  countBombsV4: function(idsNearby) {
    let counter = 0;
    for(let i = 0; i < idsNearby.length; i++) {
      for(let j = 0; j < idsNearby[i].length; j++) {
        //console.log(aTest);
        if(idsNearby[i][j]["trueOrFalse"]) { 
          continue;
         }
        
        idsNearby[i][j]["hypotheticalNearbyIds"].forEach(function(localId) {
          let xPos = localId[0];
          let yPos = localId[1];
          
          if (!idsNearby[xPos] || !idsNearby[xPos][yPos]) {
            return;
          } 
          
          console.log(localId, idsNearby[i][j]);
          if(idsNearby[xPos][yPos]["trueOrFalse"]) {
            counter++;
          };
          //console.log(idsNearby[xPos][yPos], counter);
          
          //console.log(aTest);

        });
      }
    }
  },
  resetBoxes: function() {
    this.boxes = [];
  }
}

var howHtmlLooks = {
  createBoard: function (arrayOfArrays) {
    var table = document.createElement("table");
    
    document.body.appendChild(table);

    arrayOfArrays.forEach(function (row) {
      var tr = table.insertRow(); //Create a new row

      row.forEach(function (column) {
        var td = tr.insertCell();
        td.innerText = column.trueOrFalse; // Take string from placeholder variable and append it to <tr> node
        td.id = "" + column.xPos + column.yPos;
      });
    })
  },
  changeInnerText: function (theId, newText) {
    const currentId = document.getElementById(theId);

    currentId.innerText = newText;
  },
  deleteTable: function() {
    let theTable = document.getElementsByTagName("table")[0];

    theTable.parentNode.removeChild(theTable);
  }
}


var handlers = {
  sizeOfBoard: function (widthHieght) {
    //creates an array of object size = widthHieght * widthHieght
    //the createBoard creates a board from each indiviual item in the array
    board.sizeOfBoard(widthHieght);
    
    howHtmlLooks.createBoard(board.boxes);
    //checks if the object belonging to html box is true or false
    //if false counts nearby bombs 
    
    board.countBombsV4(board.boxes);
    /*
    var theTable = document.getElementsByTagName("table")[0];
    theTable.addEventListener("click", function (e) {
      var theId = e.target.id;
      //board.getbox(board.idToLocation(theId));
      //let currentB = board.getNearbyIds(parseInt(theId));
    });*/
  },
  restartGame: function () {
    howHtmlLooks.deleteTable();
    board.resetBoxes();
  }
}

