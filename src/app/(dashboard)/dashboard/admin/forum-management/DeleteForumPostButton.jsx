"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { deleteForumPost } from "@/lib/deletes/deleteForumPost";
import { toast } from "react-toastify";

export default function DeleteForumPostButton({ id, setPosts }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        const res = await deleteForumPost(id);

        if (res?.success !== false) {
            // ✅ UI update without refresh
            setPosts((prev) =>
                prev.filter((post) => post._id !== id)
            );

            toast.dark("Post deleted");
        }

        setLoading(false);
    };

    return (
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
                                Delete post permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p>
                                This action will permanently delete this post.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>

                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                onClick={handleDelete}
                                slot="close"
                                variant="danger"
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </Button>

                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}