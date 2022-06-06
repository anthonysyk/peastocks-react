// @ts-ignore
import {useRouter} from "next/router";
import stockData from "../../public/aapl.json"
import {Card, Col, Container, Row} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import PastPerformanceChart from "../../components/charts/PastPerformanceChart";

export default function Ticker({chart, stockData}) {
    const router = useRouter()
    const {ticker} = router.query

    return (
        <>
            <Container>
                <Card className="mt-3 mb-3">
                    <Card.Header>{stockData.quoteType.shortName} ({ticker})</Card.Header>
                    <Card.Body style={{backgroundColor: '#fff'}}>
                        <Card.Title> {chart.meta.regularMarketPrice} {chart.meta.currency}</Card.Title>
                        <Card.Text>
                            Market Cap: {stockData.summaryDetail.marketCap.fmt}<br/>
                            Enterprise Value: {stockData.defaultKeyStatistics.enterpriseValue.fmt}<br/>
                            Shares Outstanding: {stockData.defaultKeyStatistics.sharesOutstanding.fmt}<br/>
                        </Card.Text>
                        <Row>
                            <Col>
                                <h4>Results</h4>
                                - Revenue + Earnings<br/>
                                - EPS + Estimates<br/>

                                <div style={{width: '350px'}}>
                                    <PastPerformanceChart data={stockData.earningsHistory.history}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>Value Investing</h4>
                                Dividend Yield: {stockData.summaryDetail.dividendYield.fmt}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>Short Term Investing</h4>
                                Shares Short: {stockData.defaultKeyStatistics.sharesShort.fmt}<br/>
                                Shares Short Prior
                                Month: {stockData.defaultKeyStatistics.sharesShortPriorMonth.fmt}<br/>
                                Shares Ratio: {stockData.defaultKeyStatistics.shortRatio.raw}
                            </Col>
                        </Row>
                        <CompanyInformationSection assetProfile={stockData.assetProfile}/>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )

}

// This gets called on every request
export async function getServerSideProps({query}) {
    const {ticker} = query;

    // Fetch data from external API
    const requestOptions = {}
    const res = await fetch(`${process.env.YQUERY_URL}/v8/finance/chart/${ticker}`, requestOptions)
    const data = await res.json()

    // Pass data to the page via props
    return {props: {chart: data.chart.result[0], stockData}}
}

function CompanyInformationSection({assetProfile}) {
    return (
        <>
            <Row>
                <Col>
                    <h4 className="mb-3">Company Information</h4>
                    <Row className="mb-3">
                        <Col>
                            {assetProfile.address1}<br/>
                            {assetProfile.city}, {assetProfile.state} {assetProfile.zip}<br/>
                            {assetProfile.country}<br/>
                            {assetProfile.website}<br/>
                        </Col>
                        <Col>
                            Sector: {assetProfile.sector}<br/>
                            Industry: {assetProfile.industry}<br/>
                            Fulltime employees: {assetProfile.fullTimeEmployees}<br/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            {assetProfile.longBusinessSummary}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}