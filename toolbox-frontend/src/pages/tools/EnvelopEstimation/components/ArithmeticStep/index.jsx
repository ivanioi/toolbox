import { Chip, TextField, Typography, IconButton } from "@mui/material";
import styles from './index.module.css'
import clsx from "clsx";
import DeleteIcon from '@mui/icons-material/Delete';
export default function ArithmeticStep({ value: { id, expr, opr, unit, desc }, onDelete, onChangeDesc }) {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.leftContainer)}>
                <Typography variant="h6">{expr}</Typography>
                {
                    unit ? <Chip sx={{ minWidth: 50 }} label={unit} color="success" variant="outlined" /> : ''
                }
                <TextField
                    label="Desc"
                    multiline
                    maxRows={4}
                    variant="standard"
                    onChange={(evt) => { onChangeDesc(id, evt.target.value) }}
                    value={desc ? desc : ''}
                />
            </div>
            <div>
                <Chip sx={{ minWidth: 50 }} label={opr} color="primary" />
                <IconButton aria-label="delete" size="large" onClick={() => onDelete(id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}