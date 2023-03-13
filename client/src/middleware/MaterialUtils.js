const URL_SERVER = "http://localhost:5000";

export const deleteMaterial = async (materialID, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/material/${materialID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(response.json());
    }
  } catch (err) {
    if ((err.errorCode = "23503")) {
      throw new Error(
        "Could not delete the material because it is referenced in an existing transaction"
      );
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

//Use this model!
export const editMaterial = async (materialID, body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/material/edit/${materialID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    console.log("");
    if (!response.ok) {
      throw new Error(response.json());
    }
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to edit material");
  }
};
