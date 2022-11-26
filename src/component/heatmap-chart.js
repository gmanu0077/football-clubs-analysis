export default function Charts(data) {
    console.log(data, "charts")
    return (
        <>
            <div className="chart">
                {JSON.stringify(data, null, 2)}
            </div>
        </>
    )
}