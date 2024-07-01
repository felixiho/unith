import ItemPage from "@/features/item";

type Props = {
  params: { id: string };
};
export default function Item({ params: { id } }: Props) {
  return (
    <main className="p-3 sm:p-6">
      <h1 className="text-3xl text-center mb-3 font-bold">Image Details</h1>
      <ItemPage index={parseInt(id)} />
    </main>
  );
}
