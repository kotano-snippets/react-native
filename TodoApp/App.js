import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Heading from './src/Heading';
import Input from './src/Input';
import Button from './src/Button';
import TodoList from './src/TodoList';
import TabBar from './src/TabBar';

let todoIndex = 0;

export default class App extends Component {
  state = {
    inputValue: '',
    todos: [],
    type: 'All',
  };

  setType = type => {
    this.setState({ type });
  };

  inputChange = inputValue => {
    console.log(' Input value: ', inputValue);
    this.setState({ inputValue });
  };

  submitTodo = () => {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }
    const todo = {
      title: this.state.inputValue,
      todoIndex,
      complete: false,
    };
    todoIndex++;
    const todos = [...this.state.todos, todo];
    this.setState({ todos, inputValue: '' }, () => {
      console.log('State: ', this.state);
    });
  };

  deleteTodo = toDoIndex => {
    let { todos } = this.state;
    todos = todos.filter(todo => todo.todoIndex !== toDoIndex);
    this.setState({ todos });
  };

  toggleComplete = toDoIndex => {
    let { todos } = this.state;
    todos.forEach(todo => {
      if (todo.todoIndex === toDoIndex) {
        todo.complete = !todo.complete;
      }
    });
    this.setState({ todos });
    console.log(todos);
  };

  render() {
    const { inputValue, todos, type } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <View>
            <Heading />
            <Input inputValue={inputValue} inputChange={this.inputChange} />
            <Button submitTodo={this.submitTodo} />
            <TodoList
              todos={todos}
              type={type}
              toggleComplete={this.toggleComplete}
              deleteTodo={this.deleteTodo}
            />
          </View>
        </ScrollView>
        <TabBar type={type} setType={this.setType} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
});
