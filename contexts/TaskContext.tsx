import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

export type Task = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

type TaskFilter = 'all' | 'completed' | 'incomplete';

type TaskContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  addTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Tarefa de demonstração 1',
      description: 'Esta é uma tarefa de exemplo para demonstração da interface',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '1'
    },
    {
      id: '2',
      title: 'Tarefa de demonstração 2',
      description: 'Esta tarefa está marcada como concluída',
      isCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '1'
    }
  ]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filtra as tarefas com base no filtro selecionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'incomplete') return !task.isCompleted;
    return true;
  });

  // Adiciona uma nova tarefa
  const addTask = async (title: string, description?: string) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      isCompleted: false,
      createdAt: now,
      updatedAt: now,
      userId: user?.id || '1',
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Atualiza uma tarefa existente
  const updateTask = async (id: string, data: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...data, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  // Alterna o status de conclusão de uma tarefa
  const toggleTaskCompletion = async (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  // Remove uma tarefa
  const deleteTask = async (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        isLoading,
        filter,
        setFilter,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
};
