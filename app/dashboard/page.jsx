import Overview from "@/komponenten/Overview"
import OverviewSmall from "@/komponenten/OverviewSmall"

export default function Dashboard(){
    return(
        <div>
            <div className="overview">
                <Overview/>
            </div>

            <div className="overview-small">
                <OverviewSmall/>
            </div>
        </div>
    )   
}