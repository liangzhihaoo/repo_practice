import { useEffect, useState } from 'react'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
import type { Todo } from '../types/todo'
import { ThemeProvider } from "@/components/theme-provider"
import { supabase } from '../lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import TodoInput from '@/components/TodoInput'
import { LoaderCircle, TriangleAlert } from 'lucide-react'
import { toast } from '@/components/ui/toast'

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [todosError, setTodosError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    async function getTodos() {
      setTodosLoading(true);
      setTodosError(null);

      const { data, error } = await supabase
        .from('todos')
        .select()
        .order('created_at', { ascending: true });

      if (error) {
        setTodosError('Failed to fetch todos: ' + error);
        setTodosLoading(false);
        return;
      }

      if (data) {
        setTodos(data);
        setTodosLoading(false);
      }
    }

    getTodos();
  }, [])

  async function addTodo(title: string) {
    const { data, error } = await supabase
      .from('todos')
      .insert({
        title,
        completed: false,
        user_id: session?.user.id,
      })
      .select()
      .single();

    if (error) {
      toast.add({
        type: "error",
        description: 'Failed to add todo: ' + error,
      })
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
      toast.add({
        type: "error",
        description: 'Failed to delete todo: ' + error,
      })
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
      toast.add({
        type: "error",
        description: 'Failed to update todo: ' + error,
      })
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
    <ThemeProvider storageKey="vite-ui-theme">
      <div className='min-h-screen flex flex-col bg-background text-foreground'>
        <Header />
        <div className="flex-1 text-center px-4 sm:p-6 md:p-8">
          <h1 className="mt-5 text-3xl">Todo List</h1>
          <h3 className='text-muted-foreground'>Stay organized and get things done.</h3>
          <div className="mx-auto mt-5 max-w-xl rounded-lg border bg-card p-2.5 shadow-lg">
            <TodoInput addTodo={addTodo} />
            {
              todosLoading ? (
                <TodosLoading />
              ) : todosError ? (
                <TodosError error={todosError} />
              ) : (
                <TodoList todos={sortedTodos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
              )
            }
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

function TodosLoading() {
  return (
    <div className='w-full min-h-40 flex items-center justify-center'>
      <LoaderCircle className='size-8 m-auto animate-spin' />
    </div>
  );
}

function TodosError({ error }: { error: string | null }) {
  return (
    <div className='w-full min-h-40 flex flex-col justify-center items-center'>
      <TriangleAlert className='size-8 text-red-500' />
      <p className="text-sm text-red-500">{error}</p>
    </div>
  )
}

export default TodoPage;