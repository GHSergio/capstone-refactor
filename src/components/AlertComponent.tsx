import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearAlert } from "../slice/userSlice";

const AlertComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: RootState) => state.user.alert
  );

  const handleAlertClose = () => {
    dispatch(clearAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={handleAlertClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
