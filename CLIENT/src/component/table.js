export default function Table(data) {

    if (data) {

        return (
            <table className="striped #ff8a80 red accent-1 " style={{ width: '400px' }}>
                <thead>
                    <tr>
                        {
                            Object.keys(data.data).map((head) => {
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