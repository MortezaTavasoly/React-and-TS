import { useState, useEffect } from "react";
import AddLinkIcon from "@mui/icons-material/AddLink";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useTranslation } from "react-i18next";
import "./todos.css";

type TodoObjectType = {
  title: string;
  completed: boolean;
};

type TodoListType = [TodoObjectType];

const getTodoValues = () => {
  const storedValues = localStorage.getItem("todos");
  if (!storedValues) {
    return [{ title: "this is an example #1", completed: false }];
  }
  return JSON.parse(storedValues);
};

export default function Todos() {
  const [todoList, setTodoList] = useState(getTodoValues);
  const { t } = useTranslation();
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
    localStorage.getItem("todos");
  }, [todoList]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (e.target.firstElementChild.value.trim() !== "") {
      const todoObject: TodoObjectType = {
        title: e.target.firstElementChild.value,
        completed: false,
      };
      setTodoList((prevList: TodoListType) => {
        return [...prevList, todoObject];
      });
      localStorage.setItem("todos", JSON.stringify(todoList));
      e.target.firstElementChild.value = "";
    }
  };
  
  const handleCompleted = (itemTitle: string) => {
    setTodoList((prev: TodoListType) => {
      return prev.map((item: TodoObjectType) => {
        localStorage.setItem("todos", JSON.stringify(todoList));
        if (item.title === itemTitle && item.completed) {
          return { ...item, completed: false };
        } else if (item.title === itemTitle && !item.completed) {
          return { ...item, completed: true };
        } else {
          return item;
        }
      });
    });
  };
  
  const handleRemove = (obj: TodoObjectType) => {
    const itemName = obj.title;

    setTodoList((prevList: TodoListType) => {
      return prevList.filter((item: TodoObjectType) => {
        return item.title !== itemName;
      });
    });
  };
  return (
    <div className="todos" data-testid="todos">
      <form
        className="todo-form"
        onSubmit={handleSubmit}
        data-testid="todo-form"
      >
        <input type="text" data-testid="todo-input" />
        <button>
          <AddLinkIcon />
        </button>
      </form>
      <div className="todo-list">
        {todoList.length === 0 && <h2 className="empty">{t("empty")}</h2>}
        {todoList.map((item: TodoObjectType, index: number) => {
          return (
            <div
              key={index}
              className="items"
              onClick={() => handleCompleted(item.title)}
            >
              <h3 className={item.completed ? "title completed" : "title"}>
                {item.title}
              </h3>
              <div className="btns">
                {item.completed && (
                  <button className="active circle">
                    <DoneIcon />
                  </button>
                )}
                {!item.completed && (
                  <button className=" circle">
                    <DoneIcon />
                  </button>
                )}

                <DeleteIcon
                  fontSize="small"
                  onClick={() => handleRemove(item)}
                  className="delete-btn"
                  data-testid="delete-btn"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
