// Call backend API from frontend
function openTool(tool) {
  alert("Opening " + tool + " tool...");

  // Example: API endpoint call
  fetch(`https://api.srjahir.in/${tool}`)
    .then(res => res.json())
    .then(data => {
      console.log("API Response:", data);
      alert("Tool Loaded: " + JSON.stringify(data));
    })
    .catch(err => {
      console.error(err);
      alert("Error loading tool: " + tool);
    });
}
