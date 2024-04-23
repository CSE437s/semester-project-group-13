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
    ],
  },
  {
    name: "column",
    label: "Column Filters",
    type: "radio",
    options: [
      { label: "Country of Origin", value: "countryOfOrigin" },
      { label: "Current City", value: "city" },
      { label: "Completed", value: "completed" },
      { label: "N/A", value: "" },
    ],
    ignore: true

  },
  {
    name: "value",
    label: "Value of Interest",
    type: "text",
    ignore: true

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
      { label: "N/A", value: "" },
    ],
    ignore: true

  },
  {
    name: "startDate",
    label: "Select Start Date",
    type: "date",
    ignore: true

  },
  {
    name: "endDate",
    label: "Select End Date",
    type: "date",
    ignore: true

  },
  {
    name: "startIndex",
    label: "Starting Index",
    type: "number",
    ignore: true

  },
  {
    name: "limit",
    label: "Limit",
    type: "number",
    ignore: true

  }
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
    const { table, dateColumn, startDate, endDate, column, value, startIndex, limit, raw } = formData;
    let endpoint = "http://localhost:8080/statistics";

    if (!dateColumn && !startDate && !endDate && !column && !value) {
        endpoint += "/table";
    } else if (startIndex && limit){
        if(startDate && endDate && dateColumn){
            endpoint += "/somedate";
        } else {
            endpoint += "/somecategory";
        }
    } else if(startDate && endDate && dateColumn){
        endpoint += "/date";
    } else {
        endpoint += "/category";
    }

    

    axios
    .get(endpoint, {
        params: formData
    })
    .then((response) => {
        const csvData = transformToCSV(filterColumns(response.data.data, ["old_id", "user_id"]));
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

const filterColumns = (data, columnsToExclude) => {
    return data.map(obj => {
        const newObj = {};
        Object.keys(obj).forEach(key => {
            if (!columnsToExclude.includes(key)) {
                newObj[key] = obj[key];
            }
        });
        return newObj;
    });
};
