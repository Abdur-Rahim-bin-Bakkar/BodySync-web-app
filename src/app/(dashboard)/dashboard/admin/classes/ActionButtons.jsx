"use client";

import { approveClass, rejectClass, deleteClass } from "@/lib/api/classActions";
import { Button, AlertDialog } from "@heroui/react";
import { toast } from "react-toastify";

export default function ActionButtons({ id, setClasses }) {

    const handleAction = async (action) => {

        if (action === "approve") {
            await approveClass(id);
            toast.success('class approved')

            setClasses((prev) =>
                prev.map((c) =>
                    c._id === id
                        ? { ...c, status: "approved" }
                        : c
                )
            );
        }

        if (action === "reject") {
            await rejectClass(id);
            toast.warning('class approved')


            setClasses((prev) =>
                prev.map((c) =>
                    c._id === id
                        ? { ...c, status: "rejected" }
                        : c
                )
            );
        }

        if (action === "delete") {

            const deleteResult = await deleteClass(id);
            console.log(deleteResult,'delete result')
            if (deleteResult?.success > 0) {
                toast.warning("Class deleted successfully.");
            }

            setClasses((prev) =>
                prev.filter((c) => c._id !== id)
            );
        }
    };

    return (
        <div className="flex gap-2">

            <Button
                onClick={() => handleAction("approve")}
                className="btn btn-xs bg-success"
            >
                Approve
            </Button>

            <Button
                onClick={() => handleAction("reject")}
                className="btn btn-xs bg-warning"
            >
                Reject
            </Button>

            <AlertDialog>
                <Button variant="danger">
                    Delete Project
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">

                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                    Delete project permanently?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete this class and all of its data.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>

                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() => handleAction("delete")}
                                    className="btn btn-xs bg-error"
                                    slot="close"
                                    variant="danger"
                                >
                                    Delete
                                </Button>

                            </AlertDialog.Footer>

                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>

            </AlertDialog>

        </div>
    );
}