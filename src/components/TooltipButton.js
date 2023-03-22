import { IconButton } from "@mui/material";
import TooltipIcon from '../icons/TooltipIcon'

const TooltipButton = (props) => {

  return (
    <IconButton aria-label="open tool tip" color="primary" onClick={props.onClick}>
      <TooltipIcon />
    </IconButton>
  )

};

export default TooltipButton