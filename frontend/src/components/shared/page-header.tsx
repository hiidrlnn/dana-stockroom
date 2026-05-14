type Props = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>

      {description && <p className="mt-2 text-gray-400">{description}</p>}
    </div>
  );
}
