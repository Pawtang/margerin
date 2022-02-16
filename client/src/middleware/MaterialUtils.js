import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const deleteMaterial = async (materialID, addToast) => {
  try {
    const response = await fetch(`${URL_SERVER}/material/${materialID}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(ErrorHandling(res.errorCode)); //Throw puts you in catch
    }
  } catch (err) {
    addToast({
      title: "Failed to Delete",
      type: "Error",
      body: err.toString(),
    });
  }
};

export const editMaterial = async (materialID, body) => {
  try {
    const response = await fetch(`${URL_SERVER}/material/edit/${materialID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("");
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
  } catch (err) {
    console.error(err.message);
  }
};
