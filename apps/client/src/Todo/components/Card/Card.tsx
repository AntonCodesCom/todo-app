import { Checkbox, FormControlLabel } from '@mui/material';

export default function TodoCard() {
  return (
    <li>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Something_to_do"
      />
    </li>
  );
}
