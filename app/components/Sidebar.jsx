export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">My AI</h2>

      <button className="w-full bg-gray-700 py-2 rounded-lg mb-4">
        + New Chat
      </button>

      <div className="space-y-2">
        <div className="p-2 bg-gray-800 rounded-lg cursor-pointer">
          Chat 1
        </div>
        <div className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          Chat 2
        </div>
      </div>
    </aside>
  );
}
