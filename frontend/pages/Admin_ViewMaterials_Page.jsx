import { useParams } from "react-router-dom";

const Admin_ViewMaterials_Page = () => {
  const { storyId } = useParams();

  return(
    <section className="bg-white min-h-screen w-full justify-center items-center flex flex-col p-20">
         {storyId}
        </section>
      )
}
export default Admin_ViewMaterials_Page;