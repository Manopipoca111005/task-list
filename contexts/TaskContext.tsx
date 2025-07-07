import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
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
  addTask: (title: string, description?: string, isCompleted?: boolean) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
};


const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Carrega as tarefas do usuário
  const loadedTasks = async () => {
    if (!user?.id) return;
    const q = query(collection(db, "tasks"), where("userId", "==", user.id));
    const querySnapshot = await getDocs(q);
    setTasks(querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        isCompleted: Boolean(data.isCompleted),
      };
    }) as Task[]);
  };

  useEffect(() => {
    loadedTasks();
    // Recarrega as tarefas sempre que o usuário mudar
  }, [user?.id]);

  // Filtra as tarefas com base no filtro selecionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'incomplete') return !task.isCompleted;
    return true;
  });

  // Adiciona uma nova tarefa
  const addTask = async (title: string, description?: string, isCompleted?: boolean) => {
    if (!user?.id) throw new Error('Usuário não autenticado');
    const now = new Date().toISOString();
    const taskData = {
      title,
      description,
      isCompleted: isCompleted ?? false,
      createdAt: now,
      updatedAt: now,
      userId: user.id,
    };
    setIsLoading(true);
    const docRef = await addDoc(collection(db, "tasks"), taskData);
    const newTask: Task = { ...taskData, id: docRef.id };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setIsLoading(false);
  };

  // Atualiza uma tarefa existente
  const updateTask = async (id: string, data: Partial<Task>) => {
    await updateDoc(doc(db, "tasks", id), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
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
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updatedTask = {
      isCompleted: !task.isCompleted,
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(doc(db, "tasks", id), updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id
          ? { ...t, ...updatedTask }
          : t
      )
    );
  };

  // Remove uma tarefa
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
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
