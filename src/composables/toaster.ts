import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function useToaster(msg: string) {
  toast.info(`${msg}`, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
}
