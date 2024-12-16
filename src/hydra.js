// Scripts/createKeyPressMenu.js

function createKeyPressMenu(menuItems) {
  return new Promise((resolve) => {
    // Create and append menu elements
    const menuDiv = document.createElement("div");
    menuDiv.id = "which-key-menu";

    let menuHTML = `<div class="which-key-title">HydraShard</div><div class="which-key-items">`;
    menuItems.forEach((item) => {
      menuHTML += `<div class="which-key-item"><span class="which-key-key">${item.key}</span><span class="which-key-separator">➜</span><span class="which-key-name">${item.name}</span></div>`;
    });
    menuHTML += `</div>`;

    menuDiv.innerHTML = menuHTML;
    document.body.appendChild(menuDiv);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      #which-key-menu {
        background-color: var(--background-primary);
        color: var(--text-normal);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 33vh;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
        font-family: var(--font-interface);
      }
      .which-key-title {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 10px;
        color: var(--text-accent);
      }
      .which-key-items {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        overflow-y: auto;
      }
      .which-key-item {
        display: flex;
        align-items: center;
        background-color: var(--background-secondary);
        border-radius: 5px;
        padding: 5px 10px;
      }
      .which-key-key {
        font-weight: bold;
        color: var(--text-accent);
        margin-right: 5px;
      }
      .which-key-separator {
        color: var(--text-muted);
        margin: 0 5px;
      }
      .which-key-name {
        color: var(--text-normal);
      }
    `;
    document.head.appendChild(style);

    // Add event listener
    const handleKeydown = async (event) => {
      event.preventDefault(); // Prevent the key from being written
      const key = event.key.toLowerCase();

      cleanup();

      const selectedItem = menuItems.find(
        (item) => item.key.toLowerCase() === key,
      );

      if (selectedItem) {
        console.log(`Chosen option: ${selectedItem.name}`);
        try {
          const actionResult = await selectedItem.action();
          resolve({ item: selectedItem, result: actionResult });
        } catch (error) {
          console.error(`Error executing action: ${error}`);
          resolve({ item: selectedItem, error: error });
        }
      } else {
        console.error(`Invalid option: ${key}`);
        resolve(null);
      }
    };

    document.addEventListener("keydown", handleKeydown, { once: true });

    // Cleanup function
    const cleanup = () => {
      document.body.removeChild(menuDiv);
      document.head.removeChild(style);
      document.removeEventListener("keydown", handleKeydown);
    };
  });
}

module.exports = createKeyPressMenu;
