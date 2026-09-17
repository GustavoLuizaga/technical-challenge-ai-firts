
export default function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-9xl px-6 lg:px-8">
      {children}
    </div>
  );
}
