export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[75svh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">{children} </div>
      </div>
    </div>
  );
}
