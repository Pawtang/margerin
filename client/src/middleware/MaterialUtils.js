const URL_SERVER = "http://localhost:5000";

export const deleteMaterial = async (materialID) => {
  try {
    const response = await fetch(`${URL_SERVER}/material/${materialID}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      throw "DELETE not successful";
    }
  } catch (err) {
    console.error("Failed to Delete Material", err.message);
  }
};
