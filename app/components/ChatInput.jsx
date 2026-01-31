export default function ChatInput() {
  return (
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 p-3 border rounded-lg"
      />
      <button className="bg-blue-600 text-white px-5 rounded-lg">
        Send
      </button>
    </div>
  );
}
