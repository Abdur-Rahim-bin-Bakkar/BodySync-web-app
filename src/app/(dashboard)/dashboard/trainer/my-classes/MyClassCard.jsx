"use client";

import { Edit, Trash2, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteClass } from "@/lib/deletes/deleteClass";
import { getClassStudents } from "@/lib/api/getClassStudents";
import UpdateClassModal from "./UpdateClassModal";
import DeleteModal from "./DeleteModal";

const MyClassCard = ({ cls }) => {
  const [openStudents, setOpenStudents] = useState(false);
  const [students, setStudents] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // 👥 VIEW STUDENTS
  const handleStudents = async () => {
    const res = await getClassStudents(cls._id);
    setStudents(res.data || []);
    setOpenStudents(true);
  };

  // 🗑 REAL DELETE LOGIC (ONLY HERE)
  const handleDelete = async () => {
    const res = await deleteClass(cls._id);

    if (res.success) {
      toast.success("Class deleted");
      window.location.reload();
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#111827] border rounded-2xl p-5 flex justify-between gap-5">

        {/* LEFT */}
        <div className="flex gap-4">
          <img
            src={cls.image}
            className="w-16 h-16 rounded-xl object-cover"
          />

          <div>
            <h2 className="font-semibold">{cls.className}</h2>

            <p className="text-sm text-gray-500">
              {cls.category} • {cls.duration} • ${cls.price}
            </p>

            <p className="text-xs mt-1 text-gray-400">
              Booking: {cls.bookingCount}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">

          <button
            onClick={handleStudents}
            className="px-3 py-2 border rounded-lg flex items-center gap-2"
          >
            <Users size={16} /> Students
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="px-3 py-2 border rounded-lg text-blue-500"
          >
            <Edit size={16} /> Edit
          </button>

          <UpdateClassModal
            cls={cls}
            isOpen={openEdit}
            onClose={() => setOpenEdit(false)}
          />

          {/* DELETE BUTTON */}
          <button
            onClick={() => setOpenDelete(true)}
            className="px-3 py-2 border rounded-lg text-red-500"
          >
            <Trash2 size={16} /> Delete
          </button>

        </div>
      </div>

      {/* STUDENTS MODAL */}
      {openStudents && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[400px]">
            <h2 className="font-bold mb-3">Enrolled Students</h2>

            {students.length === 0 ? (
              <p>No students yet</p>
            ) : (
              students.map((s, i) => (
                <div key={i} className="border-b py-2">
                  <p>{s.user?.name || "No name"}</p>
                  <p className="text-sm text-gray-500">
                    {s.user?.email}
                  </p>
                </div>
              ))
            )}

            <button
              onClick={() => setOpenStudents(false)}
              className="mt-3 px-4 py-2 bg-black text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
        title="Delete Class"
        description="Are you sure you want to delete this class? This action cannot be undone."
      />
    </>
  );
};

export default MyClassCard;