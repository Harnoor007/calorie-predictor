import Plot from "react-plotly.js";

function GraphCard({ figure, title, description }) {

    if (!figure) return null;

    return (

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h2 className="text-2xl font-bold mb-2">
                {title}
            </h2>

            <p className="text-slate-400 mb-5">
                {description}
            </p>

            <Plot
                data={figure.data}
                layout={{
                    ...figure.layout,
                    paper_bgcolor:"rgba(0,0,0,0)",
                    plot_bgcolor:"rgba(0,0,0,0)",
                    font:{
                        color:"white"
                    },
                    autosize:true
                }}
                config={{
                    responsive:true
                }}
                style={{
                    width:"100%",
                    height:"420px"
                }}
            />

        </div>

    );

}

export default GraphCard;