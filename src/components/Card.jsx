export default function Card({ children }) {
    return (
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">
        {children}
      </div>
    );
  }