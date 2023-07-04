import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import tradeData from "../data/trade.json";
import statementData from "../data/statements.json";

import ResultScreen from "./ResultScreen";

const theme = {
  background: "#dde6ed",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerBgColor: "#27374d",
  headerFontColor: "white",
  headerFontSize: "20pxpx",
  botBubbleColor: "#526d82",
  botFontColor: "wheite",
  userBubbleColor: "#9db2 ",
  userFontColor: "#4a4a4a",
};

const config = {
  floating: true,
  headerTitle: "BankBot",
  userDelay: 1000,
};

// Define options for the source menu
const sourceMenuOptions = [
  { value: "source1", label: "Source 1", trigger: "sourceSelected1" },
  { value: "source2", label: "Source 2", trigger: "sourceSelected2" },
  { value: "source3", label: "Source 3", trigger: "sourceSelected2" },
  { value: "source4", label: "Source 4", trigger: "sourceSelected2" },
  { value: "source5", label: "Source 5", trigger: "sourceSelected2" },
  { value: "source6", label: "Source 6", trigger: "sourceSelected2" },
  { value: "source7", label: "Source 7", trigger: "sourceSelected2" },
  { value: "source8", label: "Source 8", trigger: "sourceSelected2" },
];

const Chatbot = () => {
  const [amount, setAmount] = useState(null);
  const [matchedTrades, setMatchedTrades] = useState([]);
  const [matchedStatements, setMatchedStatements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  useEffect(() => {
    if (matchedTrades.length > 0 && matchedStatements.length > 0) {
      navigate("/results");
    }
  }, [matchedTrades, matchedStatements, navigate]);

  const handleAmountInput = (value) => {
    // Validate the input as a number
    const parsedAmount = parseFloat(value);

    if (isNaN(parsedAmount)) {
      // Invalid input, show an error message
      return "Please enter a valid number for the amount.";
    }

    // Store the amount
    setAmount(parsedAmount);
    return true;
  };

  const handleReferenceBasedMatch = () => {
    const matchedTrades = [];
    const matchedStatements = [];

    // Iterate over the trade and statement data to perform the matching
    tradeData.forEach((trade) => {
      statementData.forEach((statement) => {
        if (trade.specid === statement.reference1) {
          matchedTrades.push(trade);
          matchedStatements.push(statement);
        }
      });
    });

    // Set the matched data

    setMatchedTrades(matchedTrades);
    setMatchedStatements(matchedStatements);
  };

  const steps = [
    {
      id: "1",
      message: "Please choose the Source Name:",
      trigger: "sourceMenu",
    },
    {
      id: "sourceMenu",
      options: sourceMenuOptions,
    },
    {
      id: "sourceSelected1",
      message: "You have selected: {previousValue}",
      trigger: "ruleOptions1",
    },
    {
      id: "sourceSelected2",
      message: "You have selected: {previousValue}",
      trigger: "ruleOptions2",
    },
    {
      id: "ruleOptions1",
      options: [
        {
          value: "rule1",
          label: "Reference Based Match",
          trigger: "referenceBasedMatch",
        },
        {
          value: "rule2",
          label: "Match on Amount",
          trigger: "thanks",
        },
        {
          value: "rule3",
          label: "Match With tolerance",
          trigger: "ruleMatchWithTolerance",
        },
        {
          value: "rule4",
          label: "Ledger to Ledger Match",
        },
        {
          value: "rule5",
          label: "Netted Match",
          trigger: "thanks",
        },
      ],
    },
    {
      id: "ruleOptions2",
      options: [
        {
          value: "rule1",
          label: "Reference Based Match",
          trigger: "thanks",
        },
        {
          value: "rule2",
          label: "Match on Amount",
          trigger: "thanks",
        },
        {
          value: "rule3",
          label: "Match With tolerance",
          trigger: "ruleMatchWithTolerance",
        },
        {
          value: "rule4",
          label: "Ledger to Ledger Match",
        },
      ],
    },
    {
      id: "ruleMatchWithTolerance",
      message: "Please enter the amount:",
      trigger: "amountInput",
    },
    {
      id: "amountInput",
      user: true,
      validator: (value) => handleAmountInput(value),
      trigger: "thanks",
    },
    {
      id: "referenceBasedMatch",
      message: "Performing Reference Based Match...",
      trigger: "processReferenceBasedMatch",
    },
    {
      id: "processReferenceBasedMatch",
      message: "Performing Reference Based Match...",
      trigger: () => {
        handleReferenceBasedMatch();
        return "displayResults";
      },
    },
    {
      id: "displayResults",
      message: "Matched trades and statements found!",
      end: true,
    },
    {
      id: "thanks",
      message: "Want to add another Rule?",
      trigger: "sourceMenu",
    },
  ];

  return (
<ThemeProvider theme={theme}>
  <ChatBot steps={steps} {...config} />
  {matchedTrades.length > 0 && matchedStatements.length > 0 ? (
    <ResultScreen
      matchedTrades={matchedTrades}
      matchedStatements={matchedStatements}
      title1={"Matched Trades : "}
      title2={"Matched Statements : "}
    />
  ) : (
    <ResultScreen
      matchedTrades={tradeData}
      matchedStatements={statementData}
      title1={"UnMatched Trades : "}
      title2={"UnMatched Statements : "}
    />
  )}
</ThemeProvider>
  );
};

export default Chatbot;
