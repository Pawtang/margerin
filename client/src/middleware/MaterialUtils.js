import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const deleteMaterial = async (materialID, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/material/${materialID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to delete material");
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
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to edit material");
  }
};
