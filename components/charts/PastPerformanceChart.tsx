import {VictoryChart, VictoryBar, VictoryAxis, VictoryTheme} from 'victory';


export default function PastPerformanceChart({data}) {
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
        >
            <VictoryBar
                colorScale={"warm"}
                data={data}
                x="quarter.fmt"
                y="epsActual.fmt"
            />
        </VictoryChart>
    )
}