import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dot } from "react-animated-dots";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("latest");

  useEffect(() => {
    async function fechData() {
      let response;
      let newData;
      switch (searchTerm) {
        case "latest":
          response = await axios.get("https://covid-19-data.now.sh/latest");
          setData(response.data);
          setItems(response.data);
          break;
        case "confirmed":
          response = await axios.get("https://covid-19-data.now.sh/confirmed");
          newData = response.data.map((item, index) => {
            const array = Object.entries(item);

            return {
              ...item,
              total: array[array.length - 1][1],
              lastUpdated: array[array.length - 1][0]
            };
          });

          setData(newData);
          setItems(newData);
          break;
        case "deaths":
          response = await axios.get("https://covid-19-data.now.sh/deaths");
          newData = response.data.map(item => {
            const array = Object.entries(item);

            return {
              ...item,
              total: array[array.length - 1][1],
              lastUpdated: array[array.length - 1][0]
            };
          });

          setData(newData);
          setItems(newData);
          break;
        case "recovered":
          response = await axios.get("https://covid-19-data.now.sh/recovered");
          newData = response.data.map(item => {
            const array = Object.entries(item);

            return {
              ...item,
              total: array[array.length - 1][1],
              lastUpdated: array[array.length - 1][0]
            };
          });

          setData(newData);
          setItems(newData);
          break;
        default:
          console.log("NO VALUE");
          break;
      }
    }

    fechData();
  }, [searchTerm]);

  const renderDataLatestPoints = (item, index) => {
    return (
      item && (
        <div key={index} className="card">
          <div className="card-header">
            <h3>
              Province/State:{" "}
              {item["Province/State"] ? item["Province/State"] : "Unknown"}
            </h3>
            <p>Country/Region: {item["Country/Region"]}</p>
          </div>
          <div className="card-body">
            {searchTerm === "latest" ? (
              <>
                <p>
                  <span>Confirmed:</span> {item.Confirmed}
                </p>
                <p className="even">
                  <span>Deaths:</span> {item.Deaths}
                </p>
                <p>
                  <span>Recovered:</span> {item.Recovered}
                </p>
              </>
            ) : (
              <p>
                <span>Total:</span>{" "}
                {item.total ? (
                  item.total
                ) : (
                  <>
                    <Dot>.</Dot>
                    <Dot>.</Dot>
                    <Dot>.</Dot>
                  </>
                )}
              </p>
            )}
          </div>
          <div className="card-footer">
            {searchTerm === "latest" ? (
              <>
                <p>
                  <span>Last Updated:</span> {item["Last Update"]}
                </p>
              </>
            ) : item.lastUpdated ? (
              <>
                <p>
                  <span>Last Updated:</span> {item.lastUpdated}
                </p>
              </>
            ) : (
              <>
                <Dot>.</Dot>
                <Dot>.</Dot>
                <Dot>.</Dot>
              </>
            )}
          </div>
        </div>
      )
    );
  };

  const handleSelectChange = ev => {
    setSearchTerm(ev.target.value);
  };

  const handleFilterChange = ev => {
    let updatedList = data;
    updatedList = updatedList.filter(function(item) {
      return (
        item["Country/Region"]
          .toLowerCase()
          .search(ev.target.value.toLowerCase()) !== -1
      );
    });

    setItems(updatedList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid-19 Data</h1>
      </header>
      <div className="App-filters">
        <h3 className="status">
          {searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} cases
        </h3>
        <input
          type="text"
          placeholder="Search by country/region..."
          disabled={data.length > 0 ? false : true}
          onChange={e => handleFilterChange(e)}
        />
        <select onChange={e => handleSelectChange(e)} defaultValue="One">
          <option value="latest">Latest</option>
          <option value="confirmed">Confirmed</option>
          <option value="deaths">Deaths</option>
          <option value="recovered">Recovered</option>
        </select>
      </div>
      <div className="content">
        {items.length ? (
          items.map((item, index) => {
            return renderDataLatestPoints(item, index);
          })
        ) : (
          <>
            Loading
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
