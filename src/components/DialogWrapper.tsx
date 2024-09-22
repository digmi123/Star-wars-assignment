import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface DialogWrapperProps {
  children: ReactNode;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title: string;
  description: string;
}

export default function DialogWrapper({
  children,
  modalOpen,
  setModalOpen,
  title,
  description,
}: DialogWrapperProps) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
