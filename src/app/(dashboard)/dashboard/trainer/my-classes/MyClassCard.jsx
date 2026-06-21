"use client";

import { Edit, Trash2, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteClass } from "@/lib/deletes/deleteClass";
import { getClassStudents } from "@/lib/api/getClassStudents";
import UpdateClassModal from "./UpdateClassModal";
import DeleteModal from "./DeleteModal";

const MyClassCard = ({ cls, onUpdate }) => {
  const [openStudents, setOpenStudents] = useState(false);
  const [students, setStudents] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // 👥 Students
  const handleStudents = async () => {
    try {
      const res = await getClassStudents(cls._id);
      setStudents(res.data || []);
      setOpenStudents(true);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  // 🗑 Delete
  const handleDelete = async () => {
    const res = await deleteClass(cls._id);

    if (res.success) {
      toast.success("Class deleted");

      if (onUpdate) onUpdate(); // refresh parent list
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white dark:bg-[#111827] border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4">

        {/* LEFT */}
        <div className="flex gap-4 items-center">
          <img
            src={cls.image}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover"
          />

          <div>
            <h2 className="font-semibold text-sm sm:text-base">
              {cls.className}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500">
              {cls.category} • {cls.duration} • ${cls.price}
            </p>

            <p className="text-xs text-gray-400">
              Booking: {cls.bookingCount}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">

          <button
            onClick={handleStudents}
            className="px-3 py-2 border rounded-lg flex items-center gap-2 text-xs sm:text-sm"
          >
            <Users size={16} /> Students
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="px-3 py-2 border rounded-lg text-blue-500 flex items-center gap-2 text-xs sm:text-sm"
          >
            <Edit size={16} /> Edit
          </button>

          <button
            onClick={() => setOpenDelete(true)}
            className="px-3 py-2 border rounded-lg text-red-500 flex items-center gap-2 text-xs sm:text-sm"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* ================= STUDENTS MODAL ================= */}
      {openStudents && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-5 max-h-[80vh] overflow-y-auto">

            <h2 className="text-lg font-bold mb-4">
              Enrolled Students
            </h2>

            {students.length === 0 ? (
              <p className="text-gray-500">No students yet</p>
            ) : (
              <div className="space-y-3">
                {students.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 border-b pb-2">
                    <img
                      src={s.user?.image || "https://via.placeholder.com/40"}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-medium text-sm">
                        {s.user?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {s.user?.email || "No email"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setOpenStudents(false)}
              className="mt-4 w-full bg-black text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      <UpdateClassModal
        cls={cls}
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={() => {
          setOpenEdit(false);
          if (onUpdate) onUpdate();
        }}
      />

      {/* ================= DELETE MODAL ================= */}
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