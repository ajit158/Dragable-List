import "./App.css";
import React, { useState } from "react";
import data from "./data/data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

function App() {
  const [list, setList] = useState(data);
  console.log(list);

  const onDrgEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={onDrgEnd}>
        <h1>List Items</h1>
        <Droppable droppableId="1234">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {list.map((item, index) => {
                return (
                  <Draggable
                    draggableId={item.id.toString()}
                    index={index}
                    key={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="list-item">{item.name}</div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
