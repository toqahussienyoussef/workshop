import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

type ToastType = "error" | "info";

export function useToaster(type: ToastType, msg: string) {
  switch (type) {
    case "error":
      toast.error(msg, {
        position: toast.POSITION.TOP_LEFT,
      });
      break;
    default:
      toast.info(msg, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
  }
}
