export default function Table(data) {
    console.log(data.data, "datat")

    if (data) {
        // data.data.map((res) => {
        //     console.log(res)
        //     // return (
        //     //     <table className="striped">


        //     //     </table>
        //     // )
        // })
        return (
            <table className="striped #ff8a80 red accent-1" style={{
                maxWidth: "1200px",
            }}>
                <thead>
                    <tr>
                        {
                            Object.keys(data.data).map((head) => {
                                console.log(head, "head")
                                return (
                                    <th>{head}</th>
                                )

                            })
                        }

                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {
                            Object.values(data.data).map((value) => {
                                console.log(value, "values")
                                return (
                                    <td>{value}</td>
                                )

                            })
                        }
                    </tr>

                </tbody>
            </table>
        )
    }


}