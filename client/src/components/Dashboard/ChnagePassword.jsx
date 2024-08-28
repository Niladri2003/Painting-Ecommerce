import  { useState } from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import { apiConnector } from "../../services/apiConnector.jsx";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
            toast({
                title: "Validation Error",
                description: "Passwords do not match or fields are empty.",
                status: "warning",
                duration: 2500,
                isClosable: true,
            });
            return;
        }

        if (newPassword === confirmPassword) {
            if (newPassword === currentPassword) {
                toast({
                    title: "Validation Error",
                    description: "New password cannot be same as current password.",
                    status: "warning",
                    duration: 2500,
                    isClosable: true,
                });
            } else {
                try {
                    await apiConnector('POST', '/reset-password', { new_password: newPassword }, null, null, true);

                    toast({
                        title: "Password Updated",
                        description: "Your password has been updated successfully.",
                        status: "success",
                        duration: 2500,
                        isClosable: true,
                    });

                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                } catch (error) {
                    toast({
                        title: "Update Failed",
                        description: "Failed to update password. Please try again.",
                        status: "error",
                        duration: 2500,
                        isClosable: true,
                    });
                }
            }
        } else {
            toast({
                title: "Validation Error",
                description: "Passwords do not match.",
                status: "warning",
                duration: 2500,
                isClosable: true,
            });
        }
    };

    return (
        <div className="w-full flex items-center justify-start font-Poppins ">
            <form onSubmit={handlePasswordChange} className="bg-white p-6  w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Current Password</label>
                    <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Confirm New Password</label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full border-2 border-black p-2 rounded-[1rem] bg-black group duration-300 hover:bg-transparent cursor-pointer"
                    colorScheme=""
                >
                    <p className="text-white group-hover:text-black duration-300">Update Password</p>
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
