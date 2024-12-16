function getMenuItems(tp) {
  let menuitems = [
    {
      key: "f",
      name: "Create File",
      action: async () => {
        let uuid = await tp.user.someModule(tp, "Some Argument Here");
        return uuid;
      },
    },
    {
      key: "s",
      name: "Search",
      action: async () => {
        // Placeholder for search functionality
        console.log("Search action triggered");
        return "Search completed";
      },
    },
    {
      key: "n",
      name: "New Note",
      action: async () => {
        // Placeholder for new note functionality
        console.log("New note action triggered");
        return "New note created";
      },
    },
    {
      key: "t",
      name: "Add Tag",
      action: async () => {
        // Placeholder for add tag functionality
        const tag = await tp.system.prompt("Enter tag:");
        console.log(`Tag added: ${tag}`);
        return `Tag added: ${tag}`;
      },
    },
  ];
  let result = tp.user.hydra(menuitems);
  return result;
}
module.exports = getMenuItems;
