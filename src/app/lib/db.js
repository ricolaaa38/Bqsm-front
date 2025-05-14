export async function getFiltres() {
  try {
    const response = await fetch("http://localhost:8080/api/filtres/", {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Erreur lors de la récuperation des filtres");
    }
  } catch (error) {
    console.error("Erreur lors de la requête des filtres", error);
    return [];
  }
}

export async function getAllBreves(page = 0, size = 10, filters = {}) {
  try {
    const queryParams = new URLSearchParams({
      page,
      size,
      ...Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== undefined && value !== null
        )
      ),
    });
    const response = await fetch(
      `http://localhost:8080/api/breves/filtered?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Erreur lors de la récuperation des brèves");
    }
  } catch (error) {
    console.error("Erreur lors de la requête des brèves", error);
  }
}

export async function getBreves() {
  try {
    const response = await fetch("http://localhost:8080/api/breves/", {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Erreur lors de la récuperation des brèves");
    }
  } catch (error) {
    console.error("Erreur lors de la requête des brèves", error);
  }
}
