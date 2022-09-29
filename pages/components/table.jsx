import { useState } from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const key = "Base";

export const Table = ({ data_offhire }) => {
  const theme = useTheme(getTheme());

  const [search, setSearch] = useState("");
  const data = {
    nodes: data_offhire.filter((item) =>
      item.customer.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const COLUMNS = [
    {
      label: "Order Date",
      renderCell: (item) =>
        new Date(item.order_date).toLocaleDateString("en-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    { label: "Customer", renderCell: (item) => item.customer },
    { label: "Container No", renderCell: (item) => item.unit_no },
    { label: "Survey Type", renderCell: (item) => item.survey_type },
    { label: "Depot", renderCell: (item) => item.depot },
    {
      label: "Long Idle",
      renderCell: (item) => {
        const order_date = new Date(item.order_date);
        const now = new Date();
        const diffDay = Math.round(
          (now - order_date) / (1000 * 60 * 60 * 24) - 1
        );
        return order_date !== now ? `${diffDay} days` : "-";
        // return
      },
    },
    // {
    //   label: "Complete",
    //   renderCell: (item) => item.isComplete.toString(),
    // },
    // { label: "Tasks", renderCell: (item) => item.nodes?.length },
  ];

  // console.log(data[0]);
  return (
    <div className="w-8/12 text-center mx-auto">
      <label htmlFor="search">
        Search by Customer:
        <input id="search" type="text" onChange={handleSearch} />
      </label>
      <CompactTable
        className="text-center"
        columns={COLUMNS}
        data={data}
        theme={theme}
      />
    </div>
  );
};
