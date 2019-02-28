// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            dom.addNewElement();
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let idsForDragula = []
        let boardList = '';


        for (let board of boards) {


            boardList +=
                `<div class="board-container">
                    <section class="board">
                        <div class="board-header"><span class="board-title">${board['title']}</span>
                        <button class="board-add">Add Card</button>
                         <button class="board-add">Add Board</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                        </div>`;

             let statusesFromServer = board.statuses;

             for (var i in statusesFromServer){
                 idsForDragula.push(statusesFromServer[i]['title']);
                boardList+=`
                    <div class="dropzone" id="${statusesFromServer[i]['title']}">
                     <div class="board-column" id="board" class="dropzone">
                    <div class="board-column-title">${statusesFromServer[i]['title']}</div>
                    <div class="board-column-content">`;

                 let cardsFromServer = board.statuses[i]['cards'];

                    for (var i in cardsFromServer){
                    boardList+=`
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${cardsFromServer[i]['title']}</div>
                   </div>
                `}


                    boardList+=`</div></div></div>
                        `}




               boardList+=`           
            </div>
        </section>`;
        }


        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;
       for (var i in idsForDragula){ console.log(idsForDragula[i])};
       dragula([document.getElementById('boards')]);
        this._appendToElement(document.querySelector('#boards'), outerHtml);
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
    createTestBoards: function () {
        return
    },
    loadTestBoards: function () {
        document.querySelector('#boards').innerHTML = this.createTestBoards();
    },
    addNewElement: function () {
        let addButton = document.getElementsByClassName("board-add");
        addButton[0].addEventListener("click", addCard);
        addButton[1].addEventListener("click", addBoard);

        /*function loadModal() {
          let submitButton= document.getElementById("submit-button");
            submitButton.addEventListener("click", getText);

            function getText () {
                let input = document.getElementById("text-input");
                let inputText = input.innerHTML;
                 addCard(inputText)
            }
        }*/

        function addCard() {
            let url = '/insert-card';
            let data = {cardName: "Old is the new New"};

            fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
                }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
        }
        function addBoard() {
             let url = '/insert-board';
             let data = {boardName: 'New Board'};

             fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
                }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));

        }
    }
};
