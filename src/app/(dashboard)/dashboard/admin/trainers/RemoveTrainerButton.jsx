"use client";

import Swal from "sweetalert2";
import { removeTrainerRole } from "@/lib/api/removeTrainerRole";

export default function RemoveTrainerButton({
    trainerId,
    onSuccess,
}) {
    const handleRemove = async () => {
        const result = await Swal.fire({
            title: "Remove Trainer?",
            text: "This trainer will become a normal user.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Remove",
        });

        if (!result.isConfirmed) return;

        const res = await removeTrainerRole(trainerId);

        if (res.success) {
            Swal.fire(
                "Success",
                "Trainer role removed",
                "success"
            );

            onSuccess?.();
        }
    };

    return (
        <button
            onClick={handleRemove}
            className="btn btn-error btn-sm"
        >
            Demote To User
        </button>
    );
}