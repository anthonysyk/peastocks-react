

export default function SearchStock({ data }) {
    // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`${process.env.API_URL}/stock/AMZN/balance-sheet?token=${process.env.API_KEY}`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}
