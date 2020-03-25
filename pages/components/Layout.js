import Head from "next/head";

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
                <title>Covid-19 Tracker</title>
            </Head>
            <div className="container-fluid">
                {children}
            </div>
            <div className="credit">
                🌈 Design by <a target="_blank" href="https://github.com/mrtompkin18">mrtompkin18</a> 😍 Api By <a target="_blank" href="https://github.com/mathdroid/covid-19-api">Mathdroid</a>
            </div>
        </div>
    )
}