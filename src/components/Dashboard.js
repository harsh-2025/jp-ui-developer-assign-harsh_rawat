import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import React, { useState } from "react";
import Progress from "rsuite/Progress";
import ProgressBar from "@ramonak/react-progress-bar";
import WorldMap from "react-svg-worldmap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import { DotIcon } from "lucide-react";
import useThemeStore from "../store/useThemestore";
import { dataactvspro,data2,data3,cityData,topsellingdata } from "../data/data";
const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const datapie = {
  labels: ["Direct", "Affiliate", "Sponsored", "E-mail"],
  datasets: [
    {
      data: [300.56, 135.18, 154.02, 48.96],
      backgroundColor: ["#1C1C1C", "#b4e3b5", "#9b9bff", "#b4e7ff"],
      // borderWidth: 0, // Disable borders

      // borderColor: '#ffffff', // Background color visible through the gap
      // borderWidth: 2,        // Create space between segments
      // borderRadius: 20,       // Rounded edges for start and end of each segment
      // borderJoinStyle: 'round', // Ensures the corners are rounded
    },
  ],
};
const { labels, datasets } = datapie;
const { data, backgroundColor } = datasets[0];
const options = {
  plugins: {
    legend: {
      display: false, // Disable default legend
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: $${context.raw.toFixed(2)}`,
      },
    },
  },
  cutout: "70%", // Create the hollow effect in the center
  // responsive: true,
  // maintainAspectRatio: false
};

function Dashboard() {
  const [hoveredCity, setHoveredCity] = useState(null);
  const { darkMode, setDarkMode } = useThemeStore(); // Access the state and setter

  return (
    <>
      <div className="py-[5rem] px-[2rem] space-y-4 min-w-[1000px]">
        <div className="text-card_heading font-high_heading text-element_color px-2 dark:text-dark_color">
          eCommerce
        </div>
        <div className="flex flex-row space-x-4  ">
          <div className="w-1/4 flex flex-col  space-y-4 text-mid_heading text-element_color px-2 dark:text-element_color">
            <div className="flex flex-row h-1/2">
              <div className="px-8 py-4 bg-[#e3f5ff] w-full grid grid-cols-2 grid-rows-2 gap-4 rounded-xl ">
                <div className="text-start font-top_heading ">Customer</div>
                <div className="text-center"></div>
                <div className="text-start text-3xl font-semibold ">3,781</div>
                <div className="text-center flex items-center justify-center">
                  <span className="text-xs">+11.01%</span>
                  <span className="ml-1 text-xs">
                    <FaArrowTrendUp className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row h-1/2 text-mid_heading ">
              <div className="px-8 py-4 bg-gray_color dark:text-dark_color dark:bg-dark_color_new w-full grid grid-cols-2 grid-rows-2 gap-4 rounded-xl ">
                <div className="text-start font-top_heading">Revenue</div>
                <div className="text-center"></div>
                <div className="text-start  text-3xl font-bold ">$695</div>
                <div className="text-center flex items-center justify-center">
                  <span className="text-xs">+15.03%</span>
                  <span className="ml-1 text-xs">
                    <FaArrowTrendUp className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 flex flex-col space-y-4 text-element_color px-2 dark:text-element_color">
            <div className="flex flex-row h-1/2">
              <div className="px-8 py-4 bg-gray_color dark:text-dark_color dark:bg-dark_color_new w-full grid grid-cols-2 grid-rows-2 gap-4 rounded-xl ">
                <div className="text-start font-top_heading">Orders</div>
                <div className="text-center"></div>
                <div className="text-start text-3xl font-bold">1,219</div>
                <div className="text-center flex items-center justify-center">
                  <span className="text-xs">-0.03%</span>
                  <span className="ml-1 text-xs">
                    <FaArrowTrendDown className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row h-1/2">
              <div className="px-8 py-4 bg-[#e5ecf6] w-full grid grid-cols-2 grid-rows-2 gap-4 rounded-xl">
                <div className="text-start font-top_heading">Growth</div>
                <div className="text-center"></div>
                <div className="text-start text-3xl font-bold">
                  30.1<span className="text-xl">%</span>
                </div>
                <div className="text-center flex items-center justify-center">
                  <span className="text-xs">+6.08%</span>
                  <span className="ml-1 text-xs">
                    <FaArrowTrendUp className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>{" "}
          </div>
          <div className="w-1/2 ">
            <div
              className="dark:bg-dark_color_new bg-gray_color"
              style={{
                width: "100%",
                height: 300,
                padding: "20px",
                paddingBottom: "40px",
                borderRadius: "12px",
                paddingTop: "16px",
                paddingLeft: "32px",
              }}
            >
              <h3
                style={{ textAlign: "left", marginBottom: "20px" }}
                className="text-mid_heading font-top_heading dark:text-dark_color"
              >
                Projections vs Actuals
              </h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={dataactvspro}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* First Bar: Actual */}
                  <Bar
                    dataKey="actual"
                    fill="#a9c5da"
                    barSize={40}
                    stackId="a"
                  />
                  {/* Second Bar: Projected (stacked on top of actual) */}
                  <Bar
                    dataKey="projected"
                    fill="rgba(207,224,235,255)"
                    barSize={40}
                    stackId="a"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col w-3/4  dark:bg-dark_color_new bg-gray_color rounded-xl">
            <div
              className="dark:bg-dark_color_new bg-gray_color"
              style={{
                width: "100%",
                height: 400,
                padding: "16px",
                borderRadius: "12px",
              }}
            >
              <div className="flex flex-row">
                <div
                  style={{ textAlign: "left", marginBottom: "10px" }}
                  className="w-1/5 text-mid_heading font-top_heading pl-4 dark:text-dark_color"
                >
                  Revenue
                </div>
                <div className="w-1/8">|</div>
                <div className=" flex w-1/3 pl-8">
                  <DotIcon className="text-element_color" /> Current Week{" "}
                  <span className="font-bold px-2"> $58,211</span>
                </div>
                <div className=" flex w-1/3 pl-8">
                  <DotIcon className="text-dark_blue_color" /> Previous Week{" "}
                  <span className="font-bold px-2"> $68,768</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data2}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  {/* Line for Current Week */}
                  {/* <Line type="monotone" dataKey="current" stroke="#334621" strokeWidth={3} strokeDasharray="500" dot={false} /> */}
                  <Line
                    type="monotone"
                    dataKey="current" // Same data key
                    stroke={darkMode ? "#A78BFA" : "#333333"}
                    strokeWidth={3}
                    strokeDasharray="450,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20" // Dashed style for the rest
                    dot={false}
                    data={data.slice(10)} // Plot from the desired start point for the dash
                  />
                  {/* Line for Previous Week */}
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#a9c5da"
                    strokeWidth={3}
                    dot={false}
                  />
                  {/* <Line type="monotone" dataKey="current" stroke="#333333" strokeWidth={3} strokeDasharray="10" dot={false} tooltipType="none"/> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-1/4">
            <div className="dark:bg-dark_color_new bg-gray_color p-5 pt-4 pl-8 rounded-xl">
              <div className="font-top_heading text-mid_heading pb-4">
                Revenue by Location
              </div>
              <div>
                <MapContainer
                  center={[11.49, 14.65]}
                  zoom={0}
                  style={{ height: "200px", width: "100%" }}
                >
                  {/* OpenStreetMap TileLayer */}
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {/* Map over city data and create a marker for each */}
                  {cityData.map((city, index) => (
                    <Marker
                      key={index}
                      position={city.position}
                      icon={customIcon}
                      eventHandlers={{
                        mouseover: () => setHoveredCity(city.name),
                        mouseout: () => setHoveredCity(null),
                      }}
                    >
                      <Popup>{city.data}</Popup>
                    </Marker>
                  ))}

                  {/* Display hover info (optional) */}
                  {hoveredCity && (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        padding: "10px",
                        background: "white",
                        borderRadius: "8px",
                      }}
                    >
                      <h3>{hoveredCity}</h3>
                    </div>
                  )}
                </MapContainer>
              </div>
              <div className="space-y-4 pt-4">
                {cityData.map((city) => (
                  <>
                    <div>
                      <div className="flex flex-row text-mid_heading">
                        <div className="w-3/4">{city.name}</div>
                        <div className="w-1/4 ">{city.revenue}</div>
                      </div>
                      <ProgressBar
                        completed={city.percent}
                        height="3px"
                        customLabel=" "
                        bgColor="#a9c5da"
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-4 ">
          <div className=" w-3/4 ">
            <div className=" rounded-xl p-4 space-y-4 h-full pl-8 dark:bg-dark_color_new bg-gray_color">
              <div className="text-mid_heading font-top_heading">
                Top Selling Product
              </div>
              <div className="flex flex-row text-gray_color">
                <div className="w-1/3">Name</div>
                <div className="flex flex-row w-2/3">
                  <div className="w-1/3">Price</div>
                  <div className="w-1/3">Quantity</div>
                  <div className="w-1/3">Amount</div>
                </div>
              </div>
              <div className="h-[1px] bg-gray-400"></div>
              <div className="space-y-4 text-element_color dark:text-dark_color">
                {topsellingdata.map((value) => (
                  <div className="flex flex-row text-mid_heading ">
                    <div className="w-1/3">{value.name}</div>
                    <div className="flex flex-row w-2/3">
                      <div className="w-1/3">{value.price}</div>
                      <div className="w-1/3">{value.quantity}</div>
                      <div className="w-1/3">{value.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/4 ">
            <div className="dark:bg-dark_color_new bg-gray_color rounded-xl pb-8">
              <div style={{ width: "200px", margin: "auto" }}>
                <h3 className="py-4 text-mid_heading font-top_heading">
                  Total Sales
                </h3>
                <Pie data={datapie} options={options} />
                <div className="pt-4">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "left",
                    }}
                  >
                    <tbody className="text-mid_heading ">
                      {labels.map((label, index) => (
                        <tr key={index}>
                          <td>
                            <span
                              style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                backgroundColor: backgroundColor[index],
                                borderRadius: "50%",
                                marginRight: "8px",
                              }}
                            ></span>
                          </td>
                          <td>{label}</td>
                          <td>${data[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
