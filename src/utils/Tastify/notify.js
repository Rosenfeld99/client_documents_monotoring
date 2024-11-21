import { toast } from "react-toastify";

export const notify = (typeMsg, message) => {
  switch (typeMsg) {
    case "ERROR":
      toast.error(message, {});
      return;
    case "INFO":
      toast.info(message, {});
      return;
    case "SUCCESS":
      toast.success(message, {});
      return;
    case "WARNING":
      toast.warning(message, {});
      return;

    default:
      toast.info(message, {});
      return;
  }
};
