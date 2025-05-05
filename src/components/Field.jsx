export default function Field({ label, ...props }) {
    return (
      <label className="block mb-4">
        <span className="text-sm text-gray-600 mb-1 block">{label}</span>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          {...props}
        />
      </label>
    );
  }