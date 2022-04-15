import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const getTransactionData = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get transaction data");
  }
};

export const deleteTransaction = async (transactionID, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/transaction/${transactionID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete transaction");
  }
};

export const newTransaction = async (body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to load units");
  }
};

export const editTransaction = async (transactionID, body, token) => {
  try {
    const response = await fetch(
      `${URL_SERVER}/transaction/edit/${transactionID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to load units");
  }
};
