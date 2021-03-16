import React from 'react';
import { View } from 'react-native';

import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, toggleComplete, type }) => {
  const getVisibleTodos = (todos_, type_) => {
    switch (type_) {
      case 'All':
        return todos_;
      case 'Complete':
        return todos_.filter(t => t.complete);
      case 'Active':
        return todos_.filter(t => !t.complete);
      default:
        return todos_;
    }
  };
  todos = getVisibleTodos(todos, type);
  todos = todos.map((todo, i) => {
    return (
      <Todo
        key={todo.todoIndex}
        todo={todo}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
    );
  });
  return <View>{todos}</View>;
};

export default TodoList;
