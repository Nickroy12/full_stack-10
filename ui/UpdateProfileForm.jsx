"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export function UpdateProfileForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    try {
      let imageUrl = null;

      // ১. Imgbb-তে ইমেজ আপলোড
      if (selectedFile) {
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", selectedFile);

        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 

        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imgbbFormData,
          }
        );

        const imgbbData = await imgbbResponse.json();

        if (imgbbData.success) {
          imageUrl = imgbbData.data.url;
        } else {
          throw new Error("Imgbb upload failed: " + imgbbData.error?.message);
        }
      }

      // ২. Better-Auth আপডেট অবজেক্ট
      const updateData = { name: name };
      if (imageUrl) {
        updateData.image = imageUrl;
      }

      // Better-Auth এর updateUser কল করা
      await authClient.updateUser(updateData);

      toast.success("Profile updated successfully!");
      setIsOpen(false);
      setSelectedFile(null);
      
      // ৩. পেজ রিফ্রেশ করার জন্য (যাতে নতুন নাম ও ছবি সাথে সাথে দেখা যায়)
      window.location.reload();

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button 
        onPress={() => setIsOpen(true)}
        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            
            <Modal.Header>
              <Modal.Heading>Update Profile</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update your name and profile picture below.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  {/* নাম ইনপুট */}
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" required />
                  </TextField>

                  {/* ইমেজ ইনপুট */}
                  <TextField className="w-full" type="file" variant="secondary">
                    <Label>Profile Image (Optional)</Label>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="cursor-pointer"
                    />
                  </TextField>

                  <Modal.Footer className="px-0 pb-0 pt-4">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onPress={() => setIsOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-green-600 text-white hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </Modal.Footer>

                </form>
              </Surface>
            </Modal.Body>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}