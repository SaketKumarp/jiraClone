import { Navbar } from "@/components/nav-bar";
import { Sidebar } from "@/components/side-bar";
import { CreateWorkSpaceModal } from "@/features/worksapces/components/create-worksapce-modal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateWorkSpaceModal />
      <div className="flex  w-full h-full">
        <div className="fixed top-0 left-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full px-8 py-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
