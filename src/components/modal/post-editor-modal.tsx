import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState } from "react";

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();

  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCloseModal = () => {
    close();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    textareaRef?.current?.focus();
    setContent(""); // Reset Content when modal is closed
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>Create Post</DialogTitle>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-30 focus:outline-none"
          placeholder="Share your story"
        />
        <Button variant={"outline"} className="cursor-pointer">
          <ImageIcon />
          Add Image
        </Button>
        <Button className="cursor-pointer">Save</Button>
      </DialogContent>
    </Dialog>
  );
}
