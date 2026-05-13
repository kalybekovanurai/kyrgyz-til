type StatusAlertProps = {
  message: string;
};

export function StatusAlert({ message }: StatusAlertProps) {
  if (!message) return null;

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-bold text-brand-primary">
      {message}
    </div>
  );
}

