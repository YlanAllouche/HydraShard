function getMenuItems(tp) {
  return [
    {
      key: "f",
      name: "Create File",
      action: async () => {
        try {
          let uuid = await tp.user.someModule(tp, "Argumenthere");
          return uuid;
        } catch (error) {
          console.error(`Error creating file: ${error.message}`);
          return `Error: ${error.message}`;
        }
      },
    },
    {
      key: "s",
      name: "Search",
      action: async () => {
        // Anything here
        console.log("Search action triggered");
        return "Search completed";
      },
    },
    {
      key: "n",
      name: "New Note",
      action: async () => {
        // Anything here
        console.log("New note action triggered");
        return "New note created";
      },
    },
    {
      key: "t",
      name: "Add Tag",
      action: async () => {
        // Anything here
        const tag = await tp.system.prompt("Enter tag:");
        console.log(`Tag added: ${tag}`);
        return `Tag added: ${tag}`;
      },
    },
  ];
}

module.exports = getMenuItems;
