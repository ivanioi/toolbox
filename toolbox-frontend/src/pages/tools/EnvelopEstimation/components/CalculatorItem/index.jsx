import { Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function CalculatorItem({ content, isNumber = false, onClick, isEqual = false, isDisable = false }) {
    return (
        <>
            {
                isEqual ?
                    (
                        <Button
                            sx={{ minWidth: 120, p: 2 }}
                            variant={isNumber ? "outlined" : "contained"}
                            color="error"
                            onClick={onClick} >
                            <Typography variant="h6">{content}</Typography>
                        </Button >
                    ) : (

                        <Button
                            disabled={isDisable}
                            sx={{ minWidth: 120, p: 2 }}
                            variant={isNumber ? "outlined" : "contained"}
                            onClick={onClick}>
                            <Typography variant="h6">{content}</Typography>
                        </Button>
                    )
            }
        </>
    )
}