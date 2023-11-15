import StorageSubNav from "@/components/storage/subnav";
import FolderSection from "@/components/sections/folder";
import Container from "@/components/reusables/container";
import StorageFilesList from "@/components/storage/storage-list";
import StorageTypeSection from "@/components/storage/storage-type";
import { revalidatePath } from "next/cache";

const StoragePage = async ({ params }: { params: { id: string } }) => {
  revalidatePath("/");
  const response = await fetch(
    `http://localhost:3000/api/organisation/files?orgId=${params.id}`,
    { next: { revalidate: 0 } }
  );
  const data = await response.json();

  const responseFolder = await fetch(
    `http://localhost:3000/api/folder?orgId=${params.id}`,
    { next: { revalidate: 0 }}
  );

  const dataFolders = await responseFolder.json();
  return (
    <Container className="overflow-y-auto pb-10 flex flex-col gap-16">
      <StorageSubNav pageId={params.id} />
      <StorageTypeSection />
      <FolderSection pageId={params.id} folders={dataFolders.data} />
      <StorageFilesList files={data.data} />
    </Container>
  );
};

export default StoragePage;
