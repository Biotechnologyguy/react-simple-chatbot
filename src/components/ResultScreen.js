import React, { useMemo, useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { saveAs } from "file-saver";
import "../ag-grid/ag-grid.css";
import "../ag-grid/ag-theme-alpine.css";
import "./resultScreen.css";
import DownloadButton from "./DownloadButton.js";

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
  const gridApiRefMatchedTrades = useRef(null);
  const gridColumnApiRefMatchedTrades = useRef(null);
  const gridApiRefMatchedStatements = useRef(null);
  const gridColumnApiRefMatchedStatements = useRef(null);
  const gridApiRefUnmatchedTrades = useRef(null);
  const gridColumnApiRefUnmatchedTrades = useRef(null);
  const gridApiRefUnmatchedStatements = useRef(null);
  const gridColumnApiRefUnmatchedStatements = useRef(null);

  const handleToggleChange = () => {
    setShowMatched(!showMatched);
  };

  const handleDownload = useCallback(
    (fileName, rowData) => {
      let gridApiRef, gridColumnApiRef;

      if (showMatched) {
        if (rowData === matchedTrades) {
          gridApiRef = gridApiRefMatchedTrades.current;
          gridColumnApiRef = gridColumnApiRefMatchedTrades.current;
        } else if (rowData === matchedStatements) {
          gridApiRef = gridApiRefMatchedStatements.current;
          gridColumnApiRef = gridColumnApiRefMatchedStatements.current;
        }
      } else {
        if (rowData === unmatchedTrades) {
          gridApiRef = gridApiRefUnmatchedTrades.current;
          gridColumnApiRef = gridColumnApiRefUnmatchedTrades.current;
        } else if (rowData === unmatchedStatements) {
          gridApiRef = gridApiRefUnmatchedStatements.current;
          gridColumnApiRef = gridColumnApiRefUnmatchedStatements.current;
        }
      }

      if (gridApiRef && gridColumnApiRef) {
        const params = {
          allColumns: true,
          onlySelected: false,
          skipFooters: true,
          fileName: fileName,
        };

        const csvData = gridApiRef.getDataAsCsv(params);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, params.fileName);
      }
    },
    [
      showMatched,
      matchedTrades,
      matchedStatements,
      unmatchedTrades,
      unmatchedStatements,
    ]
  );

  return (
    <div style={{ display: "flex", height: "100vh", flexWrap: "wrap" }}>
      <div className="checkbox-parent-wrapper">
        <div className="checkbox-wrapper-8">
          <input
            type="checkbox"
            id="cb3-8"
            className="tgl tgl-skewed"
            checked={showMatched}
            onChange={handleToggleChange}
          />
          <label
            htmlFor="cb3-8"
            data-tg-on="Matched"
            data-tg-off="Unmatched"
            className="tgl-btn"
          ></label>
        </div>
      </div>

      {showMatched ? (
        <>
          <div style={{ width: "100vw" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ marginRight: "1rem" }}>Matched Ledgers:</h2>
              <DownloadButton
                onClick={() =>
                  handleDownload("matched_ledgers.csv", matchedTrades)
                }
                gridApiRef={gridApiRefMatchedTrades}
              />
            </div>
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
                onFirstDataRendered={(params) => {
                  gridApiRefMatchedTrades.current = params.api;
                  gridColumnApiRefMatchedTrades.current = params.columnApi;
                }}
                onGridReady={(params) => {
                  gridApiRefMatchedTrades.current = params.api;
                  gridColumnApiRefMatchedTrades.current = params.columnApi;
                }}
              ></AgGridReact>
            </div>
          </div>
          <div style={{ width: "100vw" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                justifyContent: "space-between",
              }}
            >
              <h2>Matched Statements:</h2>
              <DownloadButton
                onClick={() =>
                  handleDownload("matched_statements.csv", matchedStatements)
                }
                gridApiRef={gridApiRefMatchedStatements}
              />
            </div>
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
                onFirstDataRendered={(params) => {
                  gridApiRefMatchedStatements.current = params.api;
                  gridColumnApiRefMatchedStatements.current = params.columnApi;
                }}
                onGridReady={(params) => {
                  gridApiRefMatchedStatements.current = params.api;
                  gridColumnApiRefMatchedStatements.current = params.columnApi;
                }}
              ></AgGridReact>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ width: "100vw" }}>
          <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                justifyContent: "space-between",
              }}
            >
            <h2>Unmatched Ledgers:</h2>
            <DownloadButton
              onClick={() =>
                handleDownload("unmatched_ledgers.csv", unmatchedTrades)
              }
              gridApiRef={gridApiRefUnmatchedTrades}
            />
            </div>

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
                onFirstDataRendered={(params) => {
                  gridApiRefUnmatchedTrades.current = params.api;
                  gridColumnApiRefUnmatchedTrades.current = params.columnApi;
                }}
                onGridReady={(params) => {
                  gridApiRefUnmatchedTrades.current = params.api;
                  gridColumnApiRefUnmatchedTrades.current = params.columnApi;
                }}
              ></AgGridReact>
            </div>
          </div>
          <div style={{ width: "100vw" }}>
          <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                justifyContent: "space-between",
              }}
            >
            <h2>Unmatched Statements:</h2>
            <DownloadButton
              onClick={() =>
                handleDownload("unmatched_statements.csv", unmatchedStatements)
              }
              gridApiRef={gridApiRefUnmatchedStatements}
            />
</div>
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
                onFirstDataRendered={(params) => {
                  gridApiRefUnmatchedStatements.current = params.api;
                  gridColumnApiRefUnmatchedStatements.current =
                    params.columnApi;
                }}
                onGridReady={(params) => {
                  gridApiRefUnmatchedStatements.current = params.api;
                  gridColumnApiRefUnmatchedStatements.current =
                    params.columnApi;
                }}
              ></AgGridReact>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultScreen;
