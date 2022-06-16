import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import Modale from "../modale/Modale";

function ViewOneFixture() {
  const [loading, setLoading] = useState(true);
  const [fixture, setFixture] = useState();
  const [selectedFixture, setSelectedFixture] = useState();
  const [selectedTeam, setSelectedTeam] = useState();
  const [selectedTeamId, setSelectedTeamId] = useState();
  const [odds, setOdds] = useState();
  const [selectedOdds, setSelectedOdds] = useState();
  const [startCount, setStartCount] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [disableIncrement, setDisableIncrement] = useState(true);
  const [disableOdd, setDisableOdd] = useState(false);
  const [disableStart, setDisableStart] = useState(false);
  const [openModale, setOpenModale] = useState(false);
  const [scoreExt, setScoreExt] = useState(0);
  const [scoreHome, setScoreHome] = useState(0);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/displayonefixture/${id}`).then((res) => {
      if (res.status === 200) {
        setFixture(res.data.fixture);
        console.log(res.data.fixture);
        setOdds({
          home: res.data.fixture.cote[0].cote,
          away: res.data.fixture.cote[1].cote,
        });
      }
      setLoading(false);
    });
  }, []);

  // Timer
  useEffect(() => {
    if (startCount) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        setDisableIncrement(false);
        if (seconds === 9) {
          setStartCount(false);
          setSeconds(0);
          setDisableIncrement(true);
          setDisableOdd(true);
          setDisableStart(true);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startCount, seconds]);

  const addOneGoalHome = () => {
    setScoreHome((home) => home + 1);
    setOdds((prevState) => ({
      ...prevState,
      home: (prevState.home * 0.8).toFixed(2),
    }));
  };

  const addOneGoalExt = () => {
    setScoreExt((ext) => ext + 1);
    setOdds((prevState) => ({
      ...prevState,
      away: (prevState.away * 0.8).toFixed(2),
    }));
  };

  if (loading) {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>Loading Match selected...</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Navbar />
          <div className="container px-4">
            <div className="card mt-4">
              <div className="card-header bg-dark text-light">
                <h4>Match Selectionné</h4>
              </div>
              <div className="card-body">
                <table className="table table-bordered text-center">
                  <thead className="bg-dark text-light">
                    <tr>
                      <td>Equipe Domicile</td>
                      <td>Equipe Exterieur</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{fixture.equipe_home.name}</td>

                      <td>{fixture.equipe_exterieur.name}</td>

                      <td>{fixture.dateDebut}</td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          onClick={() => {
                            setOpenModale(true);
                            setSelectedOdds(odds.home);
                            setSelectedTeam(fixture.equipe_home.name);
                            setSelectedTeamId(fixture.equipe_home.idEquipeAPI);
                            setSelectedFixture(fixture.idMatchAPI);
                          }}
                          className="btn btn-warning"
                          disabled={disableOdd}
                        >
                          {odds.home}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setOpenModale(true);
                            setSelectedOdds(odds.away);
                            setSelectedTeam(fixture.equipe_exterieur.name);
                            setSelectedTeamId(
                              fixture.equipe_exterieur.idEquipeAPI
                            );
                            setSelectedFixture(fixture.idMatchAPI);
                          }}
                          className="btn btn-warning"
                          disabled={disableOdd}
                        >
                          {odds.away}
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-dark text-light">
                      <td>Score Domicile</td>
                      <td>Score Exterieur</td>
                    </tr>
                    <tr>
                      <td>{scoreHome}</td>
                      <td>{scoreExt}</td>
                      <td>
                        <button
                          id="counter"
                          onClick={() => setStartCount(true)}
                          disabled={disableStart}
                          className="btn btn-success m-1"
                        >
                          {seconds > 0 ? seconds : "Start"}
                        </button>
                        <button
                          disabled={disableIncrement}
                          id="button-home"
                          onClick={addOneGoalHome}
                          className="btn btn-primary m-1"
                        >
                          Score Home +1
                        </button>
                        <button
                          disabled={disableIncrement}
                          id="button-ext"
                          onClick={addOneGoalExt}
                          className="btn btn-primary m-1"
                        >
                          Score Exterieur +1
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <>
          {openModale && (
            <Modale
              closeModale={setOpenModale}
              odds={selectedOdds}
              team={selectedTeam}
              teamId={selectedTeamId}
              fixture={selectedFixture}
            ></Modale>
          )}
        </>
      </>
    );
  }
}

export default ViewOneFixture;
