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
  { value: "source1", label: "Source 1", trigger: "sourceSelected" },
  { value: "source2", label: "Source 2", trigger: "sourceSelected" },
  { value: "source3", label: "Source 3", trigger: "sourceSelected" },
  { value: "source4", label: "Source 4", trigger: "sourceSelected" },
  { value: "source5", label: "Source 5", trigger: "sourceSelected" },
  { value: "source6", label: "Source 6", trigger: "sourceSelected" },
  { value: "source7", label: "Source 7", trigger: "sourceSelected" },
  { value: "source8", label: "Source 8", trigger: "sourceSelected" },
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
        if (trade.source === statement.source && trade.specid === statement.reference1) {
          matchedTrades.push(trade);
          matchedStatements.push(statement);
        }
      });
    });

    // Set the matched data
    setMatchedTrades(matchedTrades);
    setMatchedStatements(matchedStatements);
  };

  const getUnmatchedTrades = () => {
    return tradeData.filter((trade) => !matchedTrades.includes(trade));
  };

  const getUnmatchedStatements = () => {
    return statementData.filter((statement) => !matchedStatements.includes(statement));
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
      id: "sourceSelected",
      message: "You have selected: {previousValue}",
      trigger: "ruleOptions",
    },
    {
      id: "ruleOptions",
      options: [
        {
          value: "rule1",
          label: "Reference Based Match",
          trigger: "referenceBasedMatch",
        },
        {
          value: "rule2",
          label: "Match on Amount",
          trigger: "add-another-rule",
        },
        {
          value: "rule3",
          label: "Match With tolerance",
          trigger: "yet-to-implement",
        },
        {
          value: "rule4",
          label: "Ledger to Ledger Match",
          trigger: "yet-to-implement",
        },
        {
          value: "rule5",
          label: "Netted Match",
          trigger: "yet-to-implement",
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
      trigger: "add-another-rule",
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
      trigger: "add-another-rule",
    },
    {
      id: "add-another-rule",
      message: "Want to add another Rule?",
      trigger: "add-rule-yes-no",
    },
    {
      id: "add-rule-yes-no",
      options: [
        {
          value: "yes",
          label: "yes",
          trigger: "1",
        },
        {
          value: "no",
          label: "no",
          trigger: "thanks",
        },
      ]
    },
    {
      id: "thanks",
      message: "Thanks For Using BankBot",
      end: true,
    },
    {
      id: "yet-to-implement",
      message: "This rule is not implemented as of now. Please try reference based or amount based match",
      trigger: "add-another-rule",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />
      {matchedTrades.length > 0 && matchedStatements.length > 0 ? (
        <ResultScreen
          matchedTrades={matchedTrades}
          matchedStatements={matchedStatements}
          unmatchedTrades={getUnmatchedTrades()}
          unmatchedStatements={getUnmatchedStatements()}
        />
      ) : <ResultScreen
      matchedTrades={[]}
      matchedStatements={[]}
      unmatchedTrades={tradeData}
      unmatchedStatements={statementData}
    />}
    </ThemeProvider>
  );
};

export default Chatbot;