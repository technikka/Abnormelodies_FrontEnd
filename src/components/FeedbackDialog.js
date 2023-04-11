import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormHelperText,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";

const FeedbackDialog = (props) => {
  const [feedbackText, setFeedbackText] = useState("");

  const [error, setError] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    props.setOpen(false);
    setError(false);
    setCharCount(0);
    props.toggleAppMenu();
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    props.setOpen(false);
    setCharCount(0);
  };

  const validateMaxChars = () => {
    if (charCount >= 3000) {
      setError(true);
      setErrorDisplay("Maximum characters exceeded. 3000 character limit.");
    } else {
      setError(false);
      setErrorDisplay("");
    }
  };

  const validateMinChars = () => {
    if (charCount === 0) {
      setError(true);
      setErrorDisplay("Cannot leave blank.");
    } else if (charCount < 2) {
      setError(true);
      setErrorDisplay("Requires at least 2 characters.");
    } else {
      return true;
    }
  };

  const handleChange = (event) => {
    setFeedbackText(event.target.value);
    setCharCount(event.target.value.length);
    validateMaxChars();
  };

  const handleSubmit = () => {
    if (validateMinChars() &&!error) {
      console.log("char count: " + charCount + "error: " + error)
      props.sendFeedback(feedbackText);
      setSuccess(true);
    }
  };

  return (
    <div>
      {!success && (
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Found a bug? Suggestions for improvement? Corrections on my use of
              music theory? Features you'd like to see added? All feedback is
              welcome!
            </DialogContentText>
            <TextField
              id="feedback-text"
              onPaste={handleChange}
              onCut={handleChange}
              onChange={handleChange}
              variant="outlined"
              autoFocus
              multiline
              fullWidth
              rows={6}
              error={error}
            />
            {error && <FormHelperText role="alert" aria-live="assertive" error>{errorDisplay}</FormHelperText>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Send</Button>
          </DialogActions>
        </Dialog>
      )}
      {success && (
        <Dialog open={props.open} onClose={handleSuccessClose}>
          <Alert
            role="alert" 
            aria-live="polite"
            severity="success"
            variant="outlined"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleSuccessClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Feedback Sent!</AlertTitle>
            Thank you for taking a moment to help improve this app.
          </Alert>
        </Dialog>
      )}
    </div>
  );
};

export default FeedbackDialog;
