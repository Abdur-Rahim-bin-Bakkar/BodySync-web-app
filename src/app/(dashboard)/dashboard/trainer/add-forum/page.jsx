import AddForumPostForm from "./AddForumPostForm";

const AddForumPostPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F14] p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add Forum Post
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Share your knowledge with the community
        </p>
      </div>

      <AddForumPostForm />
    </div>
  );
};

export default AddForumPostPage;