import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useState } from "react";

const Modal = ({
    closeModal,
    modalTitle,
    title,
    description,
    badge,
    action,
    value,
    isCreate,
    isEdit,
    isDelete,
}: {
    modalTitle: string;
    isCreate?: boolean;
    isDelete?: boolean;
    isEdit?: boolean;
    value: string;
    action: (formData: FormData) => Promise<void>;
    title?: string;
    closeModal: () => void;
    description?: string;
    badge?: string;
}) => {
    const [_title, setTitle] = useState(title);
    const [_description, setDescription] = useState(description);
    const [_badge, setBadge] = useState(badge);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        if (isCreate) {
            toast.success("New Post Created");
        } else if (isEdit) {
            toast.success("Post Has Been Updated");
        } else if (isDelete) {
            toast.success("Post Has Been Deleted");
        }

        await action(formData);
        closeModal();
    };

    return (
        <div
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
            onClick={closeModal}
        >
            <div
                className="bg-gray-700 rounded-lg p-6 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
                <div className="flex justify-center">
                    <form onSubmit={submitHandler}>
                        <Input
                            type="hidden"
                            name="postId"
                            value={value}
                        />
                        {isEdit && (
                            <>
                                <Input
                                    type="text"
                                    name="title"
                                    placeholder="Enter new post title"
                                    fullWidth
                                    value={_title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    fullWidth
                                    value={_description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    name="badge"
                                    placeholder="Badge"
                                    fullWidth
                                    value={_badge}
                                    onChange={(e) => setBadge(e.target.value)}
                                />
                            </>
                        )}
                        {isCreate && (
                            <>
                                <Input
                                    type="text"
                                    name="title"
                                    placeholder="Enter post title"
                                    fullWidth
                                />
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    fullWidth
                                />
                                <Input
                                    type="text"
                                    name="badge"
                                    placeholder="Badge"
                                    fullWidth
                                />
                                <Input
                                    type="hidden"
                                    value={value}
                                    name="boardId"
                                />
                            </>
                        )}
                        <div className="mt-5 flex gap-5">
                            <Button
                                confirmButton
                                text="Confirm"
                                type="submit"
                                buttonSize="lg"
                            />
                            <Button
                                text="Cancel"
                                onClick={closeModal}
                                buttonSize="lg"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
