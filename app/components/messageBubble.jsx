export default function MessageBubble({ role, text }) {
  return (
    <div
      className={`max-w-xl ${
        role === "user" ? "ml-auto text-right" : "mr-auto"
      }`}
    >
      <div
        className={`inline-block px-4 py-2 rounded-xl ${
          role === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
