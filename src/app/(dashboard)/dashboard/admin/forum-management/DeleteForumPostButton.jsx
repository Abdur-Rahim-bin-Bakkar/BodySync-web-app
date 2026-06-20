"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog, Button } from "@heroui/react";
import { deleteForumPost } from "@/lib/deletes/deleteForumPost";

export default function DeleteForumPostButton({ id }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        // if (!confirm("Delete this post?")) return;
        setLoading(true);
        const deleteResult = await deleteForumPost(id)
        router.refresh();
        setLoading(false);
    };

    return (
        <>
      
            <AlertDialog>
                <Button variant="danger">Delete Project</Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete <strong>My Awesome Project</strong> and all of its
                                    data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={handleDelete} slot="close" variant="danger">
                                    Delete 
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>

        </>

    );
}