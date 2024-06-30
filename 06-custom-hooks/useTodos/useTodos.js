import { useEffect, useReducer } from "react";

import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])


    const handleNewTodo = (todo) => {
        const action = {
            type: "[TODO] Add Todo",
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            payload: id,
            type: "[TODO] Remove Todo"
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            payload: id,
            type: "[TODO] Toggle Todo"
        });
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter((todo) => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}