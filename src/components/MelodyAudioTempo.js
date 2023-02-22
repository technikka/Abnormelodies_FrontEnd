import TooltipIcon from "../icons/TooltipIcon";
import SliderCustom from "../components/SliderCustom";
import { createRef } from "react";
import {
  FormLabel,
  Grid,
  Tooltip
} from "@mui/material";

const MelodyAudioTempo = (props) => {
  const ref = createRef();

  const tempoMin = 250;
  const tempoMax = 450;

  const sliderMarks= [
    { value: 250, label: "- -" },
    { value: 300, label: "-" },
    { value: 350, label: "|"},
    { value: 400, label: "+" },
    { value: 450, label: "++"},
  ];

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormLabel>Tempo</FormLabel>
          <Tooltip title="Change the speed of playback. Restart melody if playing to hear change." placement="top-end" disableInteractive arrow>
            <TooltipIcon ref={ref}/>
          </Tooltip>
        </Grid>

        <Grid item>
          <SliderCustom
            name="tempo"
            value={props.tempoFactor}
            min={tempoMin}
            max={tempoMax}
            step={null}
            marks={sliderMarks}
            onChange={props.handleTempoChange}
            style={{width: "230px"}}
          />
        </Grid>
    </Grid>
    </div>
  );
};

export default MelodyAudioTempo;
