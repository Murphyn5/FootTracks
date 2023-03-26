import { useParams } from "react-router-dom";

function TrackerSummary() {

    const { distance, duration, coordinates, elevation } = useParams()
    return (
      <>
      <div>{distance}</div>
      <div>{duration}</div>
      <div>{coordinates}</div>
      <div>{elevation}</div>
      <img id="image"/>
      </>
    );
  }


export default TrackerSummary;
