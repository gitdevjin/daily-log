import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useAlertModal } from "@/store/alert-modal";

export default function AlertModal() {
  const store = useAlertModal();
  if (!store.isOpen) return null;

  const handleCancel = () => {
    if (store.onNegative) store.onNegative();
    store.actions.close();
  };
  const handleAction = () => {
    if (store.onPositive) store.onPositive();
    store.actions.close();
  };
  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription>{store.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
