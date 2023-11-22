import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { dialogContentStyle, titleStyle, primaryButtonStyle, secondaryButtonStyle } from "../Styles/DialogBoxStyles";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  content: string;
  cancelText: string;
  deleteText: string;
  onCancel: () => void;
  onDelete: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  content,
  cancelText,
  deleteText,
  onCancel,
  onDelete,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle style={titleStyle}>{title}</DialogTitle>
      <DialogContent style={dialogContentStyle}>{content}</DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          color="primary"
          style={{ ...dialogContentStyle, ...secondaryButtonStyle }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onDelete}
          color="primary"
          style={{ ...dialogContentStyle, ...primaryButtonStyle }}
        >
          {deleteText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
