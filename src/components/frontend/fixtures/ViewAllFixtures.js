import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../layouts/frontend/Footer";
import dayjs from "dayjs";

function ViewAllFixtures() {
  const [loading, setLoading] = useState(true);
  const [fixturelist, setFixtureList] = useState([]);

  useEffect(() => {
    axios.get(`/api/displayfixture`).then((res) => {
      // console.log(res.data.fixture);
      if (res.status === 200) {
        setFixtureList(res.data.fixture);
      }
      setLoading(false);
    });
  }, []);

  var viewallfixture_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading matchs...</h4>;
  } else {
    viewallfixture_HTMLTABLE = fixturelist.map((item) => {
      return (
        <tr key={item.id}>
          <td className="fw-bolder">{item.equipe_home.name}</td>

          <td className="fw-bolder">{item.equipe_exterieur.name}</td>

          <td>{dayjs(item.dateDebut).format("dddd, MMMM D YYYY")}</td>
          <td>
            <Link
              to={`displayonefixture/${item.id}`}
              className="btn btn-warning btn-sm"
            >
              Voir ce Match
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header">
            <h4>Liste Matchs</h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped text-center">
              <tbody>{viewallfixture_HTMLTABLE}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="footerHome">
        <Footer />
      </div>
    </div>
  );
}

export default ViewAllFixtures;
