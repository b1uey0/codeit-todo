interface DetailPageProps {
  id: string;
}

export default function DetailPage({ id }: DetailPageProps) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <h1>DetailPage</h1>
      <p>id: {id}</p>
    </div>
  );
}
