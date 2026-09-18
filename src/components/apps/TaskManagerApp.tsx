// components/apps/TaskManagerApp.tsx
'use client';

type Category = 'Project' | 'Game' | 'Show' | 'Work';

type TaskEntry = {
  name: string;
  category: Category;
  status: string;
  priority: 'Low' | 'Normal' | 'High';
};

const tasks: TaskEntry[] = [
  { name: 'RexOS 98', category: 'Project', status: 'In Progress', priority: 'High' },
  { name: 'Stardew Valley', category: 'Game', status: 'Playing', priority: 'Normal' },
  { name: 'Genshin Impact', category: 'Game', status: 'Playing', priority: 'Low' },   
  { name: 'One Piece', category: 'Show', status: 'Watching — Ep. 700', priority: 'Normal' },
  { name: 'Teach You a Lesson', category: 'Show', status: 'Watching — Ep. 1', priority: 'Low' },
  { name: 'BPSO Ticketing Assistant', category: 'Work', status: 'Active', priority: 'High' },
  { name: 'Learning Photography', category: 'Project', status: 'On Hold', priority: 'Low' },
];

const categoryColor: Record<Category, string> = {
  Project: '#000080',
  Game: '#800080',
  Show: '#804000',
  Work: '#006000',
};

export default function TaskManagerApp() {
  return (
    <div className="w-full text-xs select-none" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* decorative menu bar, matching the reference chrome */}
      <div className="flex gap-3 px-2 py-1 border-b border-gray-500 text-xs">
        <span>Processes</span>
      </div>

      {/* table */}
      <div className="p-1">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#c0c0c0' }}>
              <th className="text-left px-2 py-1 border border-gray-500 font-normal">Task Name</th>
              <th className="text-left px-2 py-1 border border-gray-500 font-normal">Category</th>
              <th className="text-left px-2 py-1 border border-gray-500 font-normal">Status</th>
              <th className="text-left px-2 py-1 border border-gray-500 font-normal">Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.name} style={{ background: '#ffffff' }}>
                <td className="px-2 py-1 border border-gray-300">{task.name}</td>
                <td
                  className="px-2 py-1 border border-gray-300 font-bold"
                  style={{ color: categoryColor[task.category] }}
                >
                  {task.category}
                </td>
                <td className="px-2 py-1 border border-gray-300">{task.status}</td>
                <td className="px-2 py-1 border border-gray-300">{task.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* status bar */}
      <div
        className="flex justify-between px-2 py-1 mt-1 text-xs"
        style={{ borderTop: '1px solid #808080' }}
      >
        <span>Processes: {tasks.length}</span>
        <span>Status: All systems nominal</span>
      </div>
    </div>
  );
}