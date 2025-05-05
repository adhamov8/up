export default function InputField({ label, ...props }) {
    return (
      <label className="mb-4 block">
        <span className="mb-1 block text-sm text-gray-600">{label}</span>
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring focus:border-blue-500"
          {...props}
        />
      </label>
    );
  }