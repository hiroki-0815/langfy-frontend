// src/components/MessageInput.tsx
import React, { useRef, useState } from "react";
import { useSendMessages } from "@/api/UseChatApi";
import { toast } from "sonner";
import { X, Image, ArrowUp } from "lucide-react";
import { Input } from "./ui/input"; // or your custom Input component

type MessageInputProps = {
  receiverId: string;
};

const MessageInput: React.FC<MessageInputProps> = ({ receiverId }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendMessage } = useSendMessages();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error("No file selected");
    }
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        receiverId,
        text: text.trim(),
        image: imagePreview || undefined,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <Input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="hidden sm:flex btn btn-circle text-zinc-600 hover:text-blue-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="bg-slate-200 hover:bg-slate-100 hover:cursor-pointer rounded-full p-[4px]"
          disabled={!text.trim() && !imagePreview}
        >
          <ArrowUp size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
