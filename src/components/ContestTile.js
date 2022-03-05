import React from "react";
import { Link } from "gatsby";
import Countdown from "./Countdown";
import { getDates } from "../utils/time";
import SponsorLink from './SponsorLink';
import ClientOnly from "./ClientOnly";

const ContestTile = ({ contest: { node }, updateContestStatus }) => {
  const {
    sponsor,
    title,
    league,
    amount,
    details,
    start_time,
    end_time,
    findingsRepo,
    fields,
  } = node;
  const { submissionPath, contestPath } = fields;
  
  const t = getDates(start_time, end_time);
  
  return (
    <div className={"wrapper-contest " + t.contestStatus}>
      <SponsorLink sponsor={sponsor}/>
      <div className="wrapper-contest-content">
        {league === "cosmos" ? (
          <Link to="/cosmos">
            <div className="contest-league">
              <img src="/images/cosmos-icon.svg" alt="Cosmos Logo" />
              Cosmos League
            </div>
          </Link>
        ) : (
          ""
        )}
        <h4>
          {amount ? amount : ""} {title}
        </h4>
        <h5><a href={"/sponsors/"+sponsor.name}>{sponsor.name}</a></h5>
        <p>{details}</p>
        {t.contestStatus !== "active" ? (
          <p className="days-duration">{t.daysDuration} day contest</p>
        ) : null}
        {t.contestStatus === "soon" || t.contestStatus === "active" ? (
          <Countdown
            state={t.contestStatus}
            start={start_time}
            end={end_time}
            isPreview={findingsRepo === ""}
            updateContestStatus={updateContestStatus}
          />
        ) : (
          <p>
            Contest ran {t.startDay}-{t.endDay}
          </p>
        )}
        <ClientOnly>
          <Link
            to={contestPath}
            className="contest-repo button button-small cta-button primary"
          >
            {`${findingsRepo === "" ? "Preview" : "View"} Contest`}
          </Link>
          {t.contestStatus === "active" && findingsRepo && submissionPath ? (
            <Link
              to={submissionPath}
              className="button button-small cta-button secondary"
            >
              Submit Finding
            </Link>
          ) : (
            ""
          )}
        </ClientOnly>
      </div>
    </div>
  );
};

export default ContestTile;
