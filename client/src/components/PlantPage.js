import { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // no need to use http://localhost:5555 here
    fetch("/plants")
      .then((r) => r.json())
      .then((plantsArray) => {
        setPlants(plantsArray);
      });
  }, []);

  const handleAddPlant = (newPlant) => {
    const updatedPlantsArray = [...plants, newPlant];
    setPlants(updatedPlantsArray);
  }

  const handleUpdatePlant = (updatedPlant) => {
    const updatedPlantsArray = plants.map(plant => {
      if (plant.id === updatedPlant.id) return updatedPlant
      else return plant;  
    });
    setPlants(updatedPlantsArray);
  }

  const handleDeletePlant = (id) => {
    const updatedPlantsArray = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlantsArray);
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={displayedPlants} handleUpdatePlant={handleUpdatePlant} handleDeletePlant={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
