import styles from './index.module.css'
import clsx from 'clsx'
import { TextField, Autocomplete } from '@mui/material'
export default function InputAre({ onChange, units = [], onUnitChange, step: { expr, unit } }) {

    return (
        <div className={clsx(styles.container)}>
            <TextField
                sx={{ minWidth: 350 }}
                label="Expr"
                variant="standard"
                onChange={(evt) => onChange(evt.target.value)}
                value={expr}
            />

            <Autocomplete
                sx={{ minWidth: 150 }}
                options={units}
                freeSolo
                onChange={(evt, val) => onUnitChange(val)}
                renderInput={(params) => (
                    <TextField {...params} label="Unit" variant="standard" />
                )}
            />
        </div>
    )
}