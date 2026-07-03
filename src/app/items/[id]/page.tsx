import DetailPage from "@/components/pages/DetailPage";

export default async function Page(props: PageProps<"/items/[id]">) {
  const { id } = await props.params;
  return <DetailPage id={id} />;
}
