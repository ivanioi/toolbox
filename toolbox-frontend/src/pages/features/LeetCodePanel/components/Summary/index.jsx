import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
export default function Summary() {
    return (
        <Box sx={{ marginBottom: 6 }}>
            <Typography sx={{ marginBottom: '10px' }} variant='h5'>Summary</Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <PieChart
                    colors={['#E5989B', '#FFCDB2']}
                    series={[
                        {
                            arcLabel: (item) => item.value,
                            arcLabelMinAngle: 35,
                            data: [
                                { id: 0, value: 10, label: '未完成' },
                                { id: 1, value: 15, label: '已完成' },
                            ],
                        },
                    ]}
                    width={450}
                    height={200}
                />
                <PieChart
                    colors={['#FFEFC8', '#B8D576']}
                    series={[
                        {
                            arcLabel: (item) => item.value,
                            arcLabelMinAngle: 35,
                            data: [
                                { id: 0, value: 10, label: '未完成MP' },
                                { id: 1, value: 15, label: '已完成MP' },
                            ],
                        },
                    ]}
                    width={450}
                    height={200}
                />
                <PieChart
                    colors={['#F5EFFF', '#FFF574', '#A1D6CB', '#A19AD3', '#FF8383']}
                    series={[
                        {
                            arcLabel: (item) => item.value,
                            arcLabelMinAngle: 35,
                            data: [
                                { id: 0, value: 10, label: '⭐' },
                                { id: 1, value: 15, label: '⭐⭐' },
                                { id: 2, value: 20, label: '⭐⭐⭐' },
                                { id: 3, value: 15, label: '⭐⭐⭐⭐' },
                                { id: 4, value: 20, label: '⭐⭐⭐⭐⭐' },
                            ],
                        },
                    ]}
                    width={450}
                    height={200}
                />
            </Box>
        </Box>
    )
}