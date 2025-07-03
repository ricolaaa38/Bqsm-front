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

export async function addFiltres(filtre) {
  try {
    const response = await fetch("http://localhost:8080/api/filtres/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtre),
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Erreur lors de l'ajout du filtre");
    }
  } catch (error) {
    console.error("Erreur lors de la requête d'ajout du filtre", error);
  }
}

export async function updateFiltres(filtre) {
  try {
    const response = await fetch("http://localhost:8080/api/filtres/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtre),
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Erreur lors de la mise à jour du filtre");
    }
  } catch (error) {
    console.error("Erreur lors de la requête de mise à jour du filtre", error);
  }
}

export async function deleteFiltres(id) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/filtres/delete?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      return await response.text();
    } else {
      console.error("Erreur lors de la suppression du filtre");
    }
  } catch (error) {
    console.error("Erreur lors de la requête de suppression du filtre", error);
    return "Erreur lors de la suppression du filtre";
  }
}

export async function getBreveById(id) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/breves/id?id=${id}`
    );
    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      return [];
    } else {
      console.error("Erreur lors de la récupération de la brève");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la requête de la brève", error);
    return [];
  }
}

export async function updateBreveById(id, updatedBreve) {
  console.log("Payload envoyé :", JSON.stringify(updatedBreve, null, 2));

  try {
    const response = await fetch(
      `http://localhost:8080/api/breves/update?id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBreve),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Erreur de mise à jour :", response.status);
      return null;
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    return null;
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

export async function getAllBreveCoords(filters = {}) {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );
    const response = await fetch(
      `http://localhost:8080/api/breves/all-coords?${queryParams.toString()}`
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error(
      "Erreur lors de la requete des coordonnées des brèves",
      error
    );
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

export async function getPicturesByBreveId(breveId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/pictures/?breveId=${breveId}`
    );
    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      return [];
    } else {
      console.error("Erreur lors de la récupération des images");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la requête des images", error);
    return [];
  }
}

export async function addPictureForBreve(name, id, file) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("breveId", id);
  formData.append("imageFile", file);
  try {
    const response = await fetch(`http://localhost:8080/api/pictures/create`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la photo: ", error.message);
    throw error;
  }
}

export async function getIntervenantsByBreveId(breveId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/intervenants/?breveId=${breveId}`
    );
    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      return [];
    } else {
      console.error("erreur lors de la récupération des intervenants");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la requête", error);
    return [];
  }
}
export async function addIntervenantForBreve(id, name) {
  try {
    const params = new URLSearchParams({ id, name });
    const url = `http://localhost:8080/api/intervenants/create?${params}`;

    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      console.error(
        "Erreur lors de la création de l'intervenant :",
        response.status
      );
      return null;
    }
  } catch (error) {
    console.error("Erreur réseau lors de l'ajout de l'intervenant: ", error);
    return null;
  }
}

export async function getContributeursByBreveId(breveId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/contributeurs/?breveId=${breveId}`
    );
    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      return [];
    } else {
      console.error("erreur lors de la récupération des contributeurs");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la requête", error);
    return [];
  }
}

export async function addNewBrevesFromFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch("http://localhost:8080/api/breves/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.text();
      console.log("réponse du serveur :", data);
      return data;
    } else {
      throw new Error(`Http error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'upload des breves: ", error);
    return `Error uploading breves: ${error.message}`;
  }
}

export async function addNewDossier(dossier) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/arborescence/create-folder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dossier),
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Erreur lors de la création du dossier: ", error);
    throw error;
  }
}

export async function updateDossier(dossier) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/arborescence/update-folder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dossier),
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Erreur lors de la création du dossier: ", error);
    throw error;
  }
}

export async function deleteFolder(id) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/arborescence/delete-folder?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.text();
  } catch (error) {
    console.error("Erreur lors de la suppression du dossier :", error.message);
    throw error;
  }
}

export async function addNewFile(parentId, name, file) {
  try {
    const formData = new FormData();
    formData.append("parentId", parentId);
    formData.append("name", name);
    formData.append("file", file);

    const response = await fetch(
      "http://localhost:8080/api/arborescence/create-file",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création du fichier :", error.message);
    throw error;
  }
}

export async function updateFile(parentId, name, file) {
  try {
    const formData = new FormData();
    formData.append("parentId", parentId);
    formData.append("name", name);
    formData.append("file", file);
    const response = await fetch(
      "http://localhost:8080/api/arborescence/update-file",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création du fichier :", error.message);
    throw error;
  }
}

export async function deleteFile(id) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/arborescence/delete-file?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.text();
  } catch (error) {
    console.error("Erreur lors de la suppression du dossier :", error.message);
    throw error;
  }
}

export async function getFolderChildren(parentId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/arborescence/child?parentId=${parentId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des enfants :",
      error.message
    );
    throw error;
  }
}

export async function getAllFolders() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/arborescence/dossiers",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des enfants :",
      error.message
    );
    throw error;
  }
}

export async function getAllFiles() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/arborescence/files",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des enfants :",
      error.message
    );
    throw error;
  }
}

export async function getOneFile(fileId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/arborescence/get-file/${fileId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des enfants :",
      error.message
    );
    throw error;
  }
}
