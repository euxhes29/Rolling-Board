import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskPopup from "../Popup/TaskPopup";
import "./TaskCards.scss";
import { useParams } from "react-router-dom";
import TaskService from "../../service/TaskService";
import CreateTask from "../Popup/CreateTask";
import CreateColumn from "../Popup/CreateColumn";

const TaskCards = () => {
  const [columns, setColumns] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const { id } = useParams();
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [addcolumnPopup, setaddColumnPopup] = useState(false);

  const openPopup = (task) => {
    if (!task) {
      console.error("Gabim: Nuk u dërgua asnjë task!");
      return;
    }
    console.log("Hapja e popup-it për task ID:", task.id);

    setCurrentTaskId(task.id);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddTaskClick = (columnId) => {
    console.log("Popup hapet për kolonën me ID:", columnId);
    setSelectedColumnId(columnId);
    setIsCreatePopupOpen(true);
  };

  const closeAddTask = () => {
    setIsCreatePopupOpen(false);
  };

  const handleSaveTask = (updatedTask) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        ),
      }))
    );
  };

  const openColumnPopup = () => {
    setaddColumnPopup(true);
  };

  const closeColumnPopup = () => {
    setaddColumnPopup(false);
  };

  const addNewColumn = async (columnName) => {
    console.log("addNewColumn u ekzekutua!");

    const newColumnData = {
      name: columnName,
      projectId: Number(id),
    };

    try {
      const response = await TaskService.postColumn(newColumnData);
      console.log("Përgjigja nga serveri:", response.data);

      if (response.status === 200) {
        console.log("Kolona u shtua me sukses!", response.data);
        const createdColumn = response.data.data;
        const newColumn = {
          ...createdColumn,
          tasks: createdColumn.tasks || [],
        };
        setColumns((prevColumns) => [...prevColumns, newColumn]);

        closeColumnPopup();
      }
    } catch (error) {
      console.error(
        "Gabim gjatë shtimit të kolonës:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await TaskService.getColumns(id);

        if (response.status === 200) {
          console.log("Kolonat e marra nga API:", response.data.data.statuses);
          setColumns(response.data.data.statuses);
        }
      } catch (error) {
        console.error("Gabim gjatë tërheqjes së kolonave:", error.message);
      }
    };

    fetchColumns();
  }, [id]);

  const deleteColumn = async (columnId) => {
    try {
      const response = await TaskService.deleteColumn(columnId);

      if (response.status === 200) {
        console.log("Kolona me ID", columnId, "u fshi me sukses!");

        setColumns((prevColumns) =>
          prevColumns.filter((column) => column.id !== columnId)
        );
      } else {
        console.error("Fshirja e kolonës ka dështuar");
      }
    } catch (error) {
      console.error("Gabim gjatë fshirjes së kolonës:", error.message);
    }
  };

  const addNewTask = async (columnId, taskName, description, assignedTo) => {
    console.log(`Task duhet të shtohet në kolonën me ID: ${columnId}`);
    const newTask = {
      name: taskName,
      description: description,
      dueDate: new Date().toISOString(),
      assignedId: Number(assignedTo),
      statusId: columnId,
    };

    console.log("Të dhënat që po dërgohen:", newTask);

    try {
      const response = await TaskService.postTask(newTask);

      if (response.status === 200 || response.status === 201) {
        console.log("Detyra u shtua me sukses:", response.data);

        const createdTask = response.data.data;

        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column.id === columnId
              ? { ...column, tasks: [...column.tasks, createdTask] }
              : column
          )
        );

        closeAddTask();
      }
    } catch (error) {
      console.error(
        "Gabim gjatë dërgimit të detyrës:",
        error.response?.data || error.message
      );
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await TaskService.deleteTask(taskId);

      if (response.status === 200) {
        console.log("Tasku me ID", taskId, "u fshi me sukses!");

        setColumns((prevColumns) =>
          prevColumns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          }))
        );
      } else {
        console.error("Fshirja e taskut ka dështuar");
      }
    } catch (error) {
      console.error("Gabim gjatë fshirjes së taskut:", error.message);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceColumn = columns.find(
      (col) => col.id === parseInt(source.droppableId)
    );
    const destColumn = columns.find(
      (col) => col.id === parseInt(destination.droppableId)
    );

    if (!sourceColumn || !destColumn) return;

    const movedTask = sourceColumn.tasks.find(
      (task) => task.id === parseInt(draggableId)
    );
    if (!movedTask) return;

    let updatedColumns;

    if (sourceColumn.id === destColumn.id) {
      const reorderedTasks = Array.from(sourceColumn.tasks);
      const [movedItem] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, movedItem);

      updatedColumns = columns.map((col) =>
        col.id === sourceColumn.id ? { ...col, tasks: reorderedTasks } : col
      );
    } else {
      const updatedSourceTasks = sourceColumn.tasks.filter(
        (task) => task.id !== movedTask.id
      );
      const updatedDestTasks = [
        ...destColumn.tasks,
        { ...movedTask, statusId: destColumn.id },
      ];

      updatedColumns = columns.map((col) => {
        if (col.id === sourceColumn.id)
          return { ...col, tasks: updatedSourceTasks };
        if (col.id === destColumn.id)
          return { ...col, tasks: updatedDestTasks };
        return col;
      });
    }

    setColumns(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));

    try {
      const response = await TaskService.updateDragAndDrop(movedTask, {
        statusId: destColumn.id,
        newPosition: destination.index,
      });

      console.log("Dërgimi i statusId dhe newPosition:", {
        statusId: destColumn.id,
        newPosition: destination.index,
      });
      console.log("Përgjigja nga serveri:", response.data);
    } catch (error) {
      console.error(
        "Gabim gjatë përditësimit të taskut:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="tasks-container">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <Droppable
            key={column.id}
            droppableId={column.id ? column.id.toString() : ""}
          >
            {(provided) => (
              <div
                className="column-tasks"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="backlog">
                  <h3>{column.name}</h3>

                  <img
                    className="delete-column"
                    src="/assets/images/x.png"
                    alt="Delete Column"
                    onClick={() => deleteColumn(column.id)}
                  />
                </div>
                <div className="tasks">
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id ? task.id.toString() : ""}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => openPopup(task)}
                        >
                          <p>{task.name}</p>
                          <img
                            className="delete-task"
                            src="/assets/images/x.png"
                            alt="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask(task.id);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>

                <div
                  className="add-task"
                  onClick={() => handleAddTaskClick(column.id)}
                >
                  <img src="/assets/images/plus.png" alt="Add" />
                  <h3>Add task</h3>
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <div className="add-column" onClick={openColumnPopup}>
        <img src="/assets/images/plus.png" alt="Add" />
        <p>Add column</p>
      </div>

      {isPopupOpen && (
        <TaskPopup
          closePopup={closePopup}
          currentTaskId={currentTaskId}
          handleSaveTask={handleSaveTask}
        />
      )}

      {addcolumnPopup && (
        <CreateColumn
          closeColumnPopup={closeColumnPopup}
          addNewColumn={addNewColumn}
        />
      )}

      {isCreatePopupOpen && (
        <CreateTask
          closeAddTask={closeAddTask}
          addNewTask={addNewTask}
          columnId={selectedColumnId}
        />
      )}
    </div>
  );
};

export default TaskCards;
