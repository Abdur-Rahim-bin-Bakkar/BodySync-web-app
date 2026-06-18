// import AddClassForm from "@/components/trainer/AddClassForm";

import AddClassForm from "./AddClassForm";

export default function AddClassPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add New Class
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create a new class. All classes will be marked as <b>Pending</b> by default.
        </p>
      </div>

      {/* Client Form Component */}
      <AddClassForm />
    </div>
  );
}