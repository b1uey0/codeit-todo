import DetailPage from "@/components/pages/DetailPage";

// "/items/[id]" 경로 - 할 일 상세/수정 페이지
// params가 Promise로 넘어오는 최신 Next.js 방식이라 await로 풀어서 id만 꺼내 쓰는 방법을 택했습니다.
export default async function Page(props: PageProps<"/items/[id]">) {
  const { id } = await props.params;
  return <DetailPage id={id} />;
}
