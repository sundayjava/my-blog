import { Modal, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Login from "./Login";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color:"black",
  outlined: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModal = (props: { open: boolean; handleClose: any }) => {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {location.pathname === "/login"? <Login />:null } */}
          <Login/>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;