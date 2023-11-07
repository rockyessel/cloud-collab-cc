import StorageSubNav from "@/components/storage/subnav";
import FolderSection from "@/components/sections/folder";
import Container from "@/components/reusables/container";
import StorageFilesList from "@/components/storage/storage-list";
import StorageTypeSection from "@/components/storage/storage-type";

const StoragePage = () => {
  return (
    <Container className="flex flex-col gap-4 pb-10 relative">
      <StorageSubNav />
      <StorageTypeSection />
      <FolderSection folders={[]} />
      <StorageFilesList files={[]} />
    </Container>
  );
};

export default StoragePage;
