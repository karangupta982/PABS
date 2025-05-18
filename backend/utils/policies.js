export const policies = {
    admin: {
      actions: ["view", "edit", "delete"],
      dataScope: "all"
    },
    teacher: {
      actions: ["view", "edit"],
      dataScope: "assigned"
    },
    student: {
      actions: ["view"],
      dataScope: "own"
    }
  }; 
  