import { useParams } from "react-router-dom";

function TrackerSummary() {

    const { distance, duration, coordinates } = useParams()
    return (
      <>
      <div>{distance}</div>
      <div>{duration}</div>
      <div>{coordinates}</div>
      <img id="image"/>
      </>
    );
  }


export default TrackerSummary;
