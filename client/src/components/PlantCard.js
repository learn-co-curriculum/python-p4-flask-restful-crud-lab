import { useState } from "react";

function PlantCard({ plant, handleUpdatePlant, handleDeletePlant  }) {
  const { id, name, image, price, is_in_stock } = plant;
  const [updatedPrice, setUpdatedPrice] = useState(price)


  const handleClick = () => {
    const updatedPlant = {...plant, is_in_stock: !is_in_stock}
    handleUpdate(updatedPlant)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlant = {...plant, price: e.target.price.value}
    handleUpdate(updatedPlant)
  }

  const handleUpdate = async (updatedPlant) => {
    const response = await fetch(`/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlant),
    })
    const data = await response.json();
    handleUpdatePlant(data)

  }

  const handleDeleteClick = async () => {

      const response = await fetch(`/plants/${id}`, {
      method: "DELETE",
    });
      if (response.ok) {
        handleDeletePlant(id);
        alert("Deleted Successfully 🌼")
      }
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="New price..."
          name="price"
          value={updatedPrice}
          onChange={e => setUpdatedPrice(parseFloat(e.target.value))}
        />
        <button type="submit">Update Price</button>
      </form>
      <div className="btn-group">
      {is_in_stock ? (
        <button name="is_in_stock" className="primary" onClick={handleClick}> In Stock </button>
      ) : (
        <button name="is_in_stock" onClick={handleClick}> Out of Stock </button>
      )}
      <button onClick={handleDeleteClick}> Delete </button>
      </div>
    </li>
  );
}

export default PlantCard;
