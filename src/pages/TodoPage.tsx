import { useEffect, useState } from 'react'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
import type { Todo } from '../types/todo'
import { ThemeProvider } from "@/components/theme-provider"
import { supabase } from '../lib/supabase'

function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodos() {
      const { data, error } = await supabase
        .from('todos')
        .select()
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Failed to fetch todos: ', error);
        return;
      }

      if (data) {
        setTodos(data);
      }
    }

    getTodos();
  }, [])

  async function addTodo(title: string) {
    const { data, error } = await supabase
      .from('todos')
      .insert({
        title,
        completed: false
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to add todo: ', error);
      return;
    }

    setTodos(prev => [...prev, data]);
  }

  async function deleteTodo(id: number) {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Failed to delete todo: ', error);
      return;
    }

    setTodos(prev => prev.filter(todo => todo.id !== data.id));
  }

  async function updateTodo(newTodo: Todo) {
    const { data, error } = await supabase
      .from('todos')
      .update({
        title: newTodo.title,
        completed: newTodo.completed,
      })
      .eq('id', newTodo.id)
      .select()
      .single();

    if (error) {
      console.error('Failed to update todo: ', error);
      return;
    }
    setTodos(prev => prev.map(todo => {
      if (todo.id === newTodo.id) {
        return data;
      }
      return todo;
    }));
  }

  const sortedTodos = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='min-h-screen flex flex-col bg-background text-foreground'>
        <Header />
        <TodoList todos={sortedTodos} addTodo={addTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      </div>
    </ThemeProvider>
  )
}

export default TodoPage;