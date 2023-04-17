import React from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { Target } from "./Target";
import { GithubLogo } from "./GithubLogo";

interface IGeoData {
  ip: string;
  version: string;
  city: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
}

interface IState {
  geoData?: IGeoData;
  navigatorData: {
    lang: string;
    "screen Y": string;
    "screen X": string;
  };
}

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      geoData: undefined,
      navigatorData: {
        lang: navigator.language,
        "screen Y": window.screen.height + "px",
        "screen X": window.screen.width + "px",
      },
    };
  }

  componentDidMount() {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          geoData: {
            country: data.country,
            city: data.city,
            ip: data.ip,
            latitude: data.latitude,
            longitude: data.longitude,
            region: data.region_code,
            version: data.version,
          },
        });
      });
  }

  render() {
    return (
      <div id="container">
        <span id="layer" />
        <div id="content">
          <Target />
          <div id="text-content">
            <h1 className="title">Welcome to am I trackable</h1>
            <p className="text">
              This is a simple site to check if you are trackable based on ipapi
              and some informations in your browser. This is what was found:
            </p>
          </div>

          <div id="data">
            <h2 className="title">Geo data:</h2>
            {this.state.geoData ? (
              Object.entries(this.state.geoData).map((contents) => {
                const firstLetterUppercase = contents[0]
                  .charAt(0)
                  .toUpperCase();
                const textWithoutFirstLetter = contents[0].slice(1);
                const text = firstLetterUppercase + textWithoutFirstLetter;

                return (
                  contents[0] !== "ip" &&
                  contents[0] !== "version" && (
                    <div className="box" key={`${contents[0]}:${uuid()}`}>
                      <p id="tag" className="supertext">{`${text}: `}</p>
                      <p id="info">{`${contents[1]}`}</p>
                    </div>
                  )
                );
              })
            ) : (
              <h2>Incoming data...</h2>
            )}

            {Object.entries(this.state.navigatorData).map((contents) => {
              const firstLetterUppercase = contents[0].charAt(0).toUpperCase();
              const textWithoutFirstLetter = contents[0].slice(1);
              const text = firstLetterUppercase + textWithoutFirstLetter;

              return (
                <div className="box" key={`${contents[0]}:${uuid()}`}>
                  <p id="tag" className="supertext">{`${text}: `}</p>
                  <p id="info">{`${contents[1]}`}</p>
                </div>
              );
            })}
          </div>
          <div id="warn">
            <p className="text desc">
              If some of this data is right, pay attention, you are trackable!
            </p>
            <p className="text">
              {this.state?.geoData?.ip ? (
                <>
                  <span className="supertext">IP used</span>:{" "}
                  {this.state.geoData.ip}
                </>
              ) : (
                <>
                  <span className="supertext">IP used</span>:unknown
                </>
              )}
            </p>
            <p className="text">
              {this.state?.geoData?.version ? (
                <>
                  <span className="supertext">Version</span>:{" "}
                  {this.state.geoData.version}
                </>
              ) : (
                <>
                  <span className="supertext">Version</span>: unknown
                </>
              )}
            </p>

            <div id="profile">
              <a
                id="icon"
                className="text"
                href="https://github.com/NicolasCBV"
                target="_blank"
              >
                <GithubLogo />
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
