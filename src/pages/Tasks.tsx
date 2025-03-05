
import { useState } from 'react';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/ui/Transitions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, CheckCircle2, Clock, Edit3, Plus, Trash2, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  completed: boolean;
  category: 'patient' | 'admin' | 'personal';
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review lab results for John Smith',
    description: 'Analyze blood work results and update patient records',
    dueDate: '2023-06-16',
    priority: 'high',
    assignedTo: 'Dr. Carter',
    completed: false,
    category: 'patient'
  },
  {
    id: '2',
    title: 'Schedule follow-up with Emily Johnson',
    description: 'Need to discuss treatment progress and next steps',
    dueDate: '2023-06-17',
    priority: 'medium',
    assignedTo: 'Dr. Carter',
    completed: false,
    category: 'patient'
  },
  {
    id: '3',
    title: 'Complete monthly reports',
    description: 'Finalize documentation for hospital administration',
    dueDate: '2023-06-20',
    priority: 'medium',
    assignedTo: 'Dr. Carter',
    completed: false,
    category: 'admin'
  },
  {
    id: '4',
    title: 'Order new medical supplies',
    description: 'Check inventory and place orders for necessary items',
    dueDate: '2023-06-18',
    priority: 'low',
    assignedTo: 'Nurse Johnson',
    completed: true,
    category: 'admin'
  },
  {
    id: '5',
    title: 'Attend medical conference',
    description: 'Virtual conference on cardiovascular advancements',
    dueDate: '2023-06-25',
    priority: 'medium',
    assignedTo: 'Dr. Carter',
    completed: false,
    category: 'personal'
  }
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'patient' | 'admin' | 'personal'>('all');
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    assignedTo: 'Dr. Carter',
    category: 'patient'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(task => task.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task marked as pending" : "Task completed",
        description: task.title,
        variant: task.completed ? "default" : "success",
      });
    }
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }
    
    const taskToAdd: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false
    };
    
    setTasks([taskToAdd, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      assignedTo: 'Dr. Carter',
      category: 'patient'
    });
    
    toast({
      title: "Task added",
      description: taskToAdd.title,
      variant: "success",
    });
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: taskToDelete.title,
        variant: "default",
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    
    // Filter by category
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    
    // Filter by search query
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryIcon = (category: 'patient' | 'admin' | 'personal') => {
    switch (category) {
      case 'patient': return <User size={14} />;
      case 'admin': return <CheckCircle2 size={14} />;
      case 'personal': return <Calendar size={14} />;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your daily tasks and responsibilities
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>
                    Create a new task with details and assignment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select 
                        value={newTask.priority} 
                        onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask({...newTask, priority: value})}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="assignedTo">Assigned To</Label>
                      <Input
                        id="assignedTo"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                        placeholder="Enter assignee name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={newTask.category} 
                        onValueChange={(value: 'patient' | 'admin' | 'personal') => setNewTask({...newTask, category: value})}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="admin">Administrative</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddTask}>Add Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('all')}
            >
              All Categories
            </Button>
            <Button
              variant={categoryFilter === 'patient' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('patient')}
              className="flex items-center gap-1"
            >
              <User size={14} /> Patient
            </Button>
            <Button
              variant={categoryFilter === 'admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('admin')}
              className="flex items-center gap-1"
            >
              <CheckCircle2 size={14} /> Administrative
            </Button>
            <Button
              variant={categoryFilter === 'personal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('personal')}
              className="flex items-center gap-1"
            >
              <Calendar size={14} /> Personal
            </Button>
          </div>

          {filteredTasks.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No tasks found</p>
            </Card>
          ) : (
            <StaggerChildren staggerDelay={0.05} className="space-y-4">
              {filteredTasks.map((task) => (
                <StaggerItem key={task.id}>
                  <div className={`p-4 rounded-lg border ${task.completed ? 'bg-muted/50' : 'bg-card'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleTaskComplete(task.id)}
                          className="mt-1"
                        />
                        <div>
                          <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock size={12} />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User size={12} />
                              {task.assignedTo}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            <span className="flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                              {getCategoryIcon(task.category)}
                              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <Edit3 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </div>
        
        <div className="lg:col-span-4">
          <Card className="sticky top-20">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Task Summary</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span>Total Tasks</span>
                <span className="font-medium">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="font-medium">{tasks.filter(t => t.completed).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-medium">{tasks.filter(t => !t.completed).length}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%`,
                  }}
                />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">By Priority</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      High
                    </span>
                    <span>{tasks.filter(t => t.priority === 'high').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Medium
                    </span>
                    <span>{tasks.filter(t => t.priority === 'medium').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Low
                    </span>
                    <span>{tasks.filter(t => t.priority === 'low').length}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">By Category</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      Patient
                    </span>
                    <span>{tasks.filter(t => t.category === 'patient').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Administrative
                    </span>
                    <span>{tasks.filter(t => t.category === 'admin').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      Personal
                    </span>
                    <span>{tasks.filter(t => t.category === 'personal').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
