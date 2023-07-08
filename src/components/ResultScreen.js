import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "../ag-grid/ag-grid.css";
import "../ag-grid/ag-theme-alpine.css";
import "./resultScreen.css";

const ResultScreen = ({
  matchedTrades,
  matchedStatements,
  unmatchedTrades,
  unmatchedStatements,
}) => {
  const tradeColumnDefs = [
    { headerName: "CashFlow Id", field: "cashflowid" },
    { headerName: "Trade ID", field: "tradeid" },
    { headerName: "Spec ID", field: "specid" },
    { headerName: "source", field: "source" },
    { headerName: "Trader Name", field: "tradername" },
    { headerName: "Settlement ID", field: "settlementid" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Counterparty", field: "counterparty" },
    { headerName: "Currency", field: "currency" },
  ];

  const statementColumnDefs = [
    { headerName: "Entry ID", field: "entryid" },
    { headerName: "Reference 1", field: "reference1" },
    { headerName: "Reference 2", field: "reference2" },
    { headerName: "Reference 3", field: "reference3" },
    { headerName: "Source", field: "source" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Currency", field: "currency" },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: "textFilter",
      floatingFilter: true,
    }),
    []
  );

  const [showMatched, setShowMatched] = useState(true);

  const handleToggleChange = () => {
    setShowMatched(!showMatched);
  };
  return (
    <div style={{ display: "flex", height: "100vh", flexWrap: "wrap" }}>
      {/* Checkbox to toggle between Matched and Unmatched */}
      <div className="checkbox-parent-wrapper">
        <div className="checkbox-wrapper-8">
          <input
            type="checkbox"
            id="cb3-8"
            class="tgl tgl-skewed"
            checked={showMatched}
            onChange={handleToggleChange}
          />
          <label
            for="cb3-8"
            data-tg-on="Matched"
            data-tg-off="Unmatched"
            className="tgl-btn"
          ></label>
        </div>
      </div>

      {/* Display based on the matched/unmatched state */}
      {showMatched ? (
        <>
          <div style={{ width: "100vw" }}>
            <h2>Matched Ledgers:</h2>
            <div
              className="ag-theme-alpine"
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowData={matchedTrades}
                columnDefs={tradeColumnDefs}
                pagination={true}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                animateRows={true}
                rowGroupPanelShow="always"
                enableRowGroup={true}
              ></AgGridReact>
            </div>
          </div>
          <div style={{ width: "100vw" }}>
            <h2>Matched Statements:</h2>
            <div
              className="ag-theme-alpine"
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowData={matchedStatements}
                columnDefs={statementColumnDefs}
                pagination={true}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                animateRows={true}
                rowGroupPanelShow="always"
                enableRowGroup={true}
              ></AgGridReact>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ width: "100vw" }}>
            <h2>Unmatched Ledgers:</h2>
            <div
              className="ag-theme-alpine"
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowData={unmatchedTrades}
                columnDefs={tradeColumnDefs}
                pagination={true}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                animateRows={true}
                rowGroupPanelShow="always"
                enableRowGroup={true}
              ></AgGridReact>
            </div>
          </div>
          <div style={{ width: "100vw" }}>
            <h2>Unmatched Statements:</h2>
            <div
              className="ag-theme-alpine"
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowData={unmatchedStatements}
                columnDefs={statementColumnDefs}
                pagination={true}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                animateRows={true}
                rowGroupPanelShow="always"
                enableRowGroup={true}
              ></AgGridReact>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultScreen;
