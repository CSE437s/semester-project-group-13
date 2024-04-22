import axios from "axios";

export const exportDataFields = [
  {
    name: "table",
    label: "Select Table",
    type: "dropdown",
    options: [
      { label: "Refugees", value: "refugees" },
      { label: "Donators", value: "donators" },
      { label: "Donation", value: "donations" },
      { label: "Requests", value: "requests" },
      { label: "Families", value: "families" },
      { label: "Good Neighbors", value: "goodNeighbors" },
      { label: "Users", value: "users" },
    ],
  },
  {
    name: "column",
    label: "Column Filters",
    type: "radio",
    options: [
      { label: "Country of Origin", value: "countryOfOrigin" },
      { label: "Current City", value: "city" },
    ],
  },
  {
    name: "value",
    label: "Value of Interest",
    type: "text",
  },
  {
    name: "dateColumn",
    label: "Date Filters",
    type: "radio",
    options: [
      { label: "DOB", value: "birthday" },
      { label: "Arrival to US", value: "ArrivalDate" },
      { label: "Intake", value: "DateCreated" },
      { label: "Last Visit", value: "LatestDateAtOasis" },
    ],
  },
  {
    name: "startDate",
    label: "Select Start Date",
    type: "date",
  },
  {
    name: "endDate",
    label: "Select End Date",
    type: "date",
  },
];

export async function handleDatatoCSV(formData) {

    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
        if (formData[key] === undefined) {
            formData[key] = null;
        }
        }
    }
    console.log(formData)
    const { table, dateColumn, startDate, endDate, column, value } = formData;
    let endpoint = "http://localhost:8080/statistics";

    if (startDate && endDate && dateColumn) {
        endpoint += "/date";
    } else {
        endpoint += "/category";
    }

    axios
    .get(endpoint, {
        params: formData
    })
    .then((response) => {
      const csvData = transformToCSV(response.data.data);
      downloadCSV(csvData);
    })
    .catch((error) => {
      console.error("Error handling data to CSV:", error);
    });
};

const transformToCSV = (data) => {
    console.log(data)
  if (!data || data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]);

  const csvRows = [];
  csvRows.push(headers.join(","));

  data.forEach((object) => {
    const values = headers.map((header) => {
      let value = object[header];
      if (typeof value === "string") {
        value = value.replace(/"/g, '""');
        if (value.includes(",") || value.includes('"')) {
          value = `"${value}"`;
        }
      }
      return value;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
};

const downloadCSV = (csvData) => {
  const blob = new Blob([csvData], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "exported_data.csv";
  a.click();
};
