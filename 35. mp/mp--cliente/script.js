const mp = new MercadoPago("123456", {
  locale: "es-AR",
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
  try {
    //paso los datos del producto
    const orderData = {
      title: "Patito",
      quantity: 1,
      price: 10,
    };
    const response = await fetch("http://localhost:8080/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    const preference = await response.json();
    createCheckoutButton(preference.id);
  } catch (error) {
    alert("error ");
  }
});

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();
  //correccion para evitar que se dupliquen los botones
  if (window.createCheckoutButton) window.createCheckoutButton.unmount();

  const renderComponent = async () => {
    await bricksBuilder.create("wallet", "wallet-container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });
  };
};
