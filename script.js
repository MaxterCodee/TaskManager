$(document).ready(function() {
    // Cargar datos desde localStorage al cargar la página
    loadTasksFromLocalStorage();
  
    $(document).on("submit", "#task-form", function(event) {
      event.preventDefault();
  
      // Capturar los valores del formulario
      var name = $("#task-name").val() || '';
      var date = $("#task-date").val() || '';
      var time = $("#task-time").val() || '';
      var place = $("#task-place").val() || 'N/A';
      var comments = $("#task-comments").val() || 'N/A';
  
      // Crear un objeto de tarea
      var task = {
        name: name,
        date: date,
        time: time,
        place: place,
        comments: comments
      };
  
      // Obtener tareas existentes de localStorage y agregar la nueva tarea
      var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
  
      // Guardar en localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
  
      // Limpiar el formulario
      $("#task-form")[0].reset();
  
      // Actualizar la tabla
      loadTasksFromLocalStorage();
    });
  
    // Cargar tareas desde localStorage y mostrar en la tabla
    function loadTasksFromLocalStorage() {
      var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
      var tableBody = $("#task-table tbody");
      tableBody.empty();
  
      for (var i = 1; i < tasks.length; i++) {
        var task = tasks[i];
        var row = "<tr>" +
          "<td>" + i + "</td>" +
          "<td>" + task.name + "</td>" +
          "<td>" + task.date + "</td>" +
          "<td>" + task.time + "</td>" +
          "<td>" + task.place + "</td>" +
          "<td>" + task.comments + "</td>" +
          "<td><button class='btn btn-danger'>Eliminar</button></td>" +
          "</tr>";
        tableBody.append(row);
      }
    }
  
    // Eliminar tareas desde la tabla
    $(document).on("click", ".btn-danger", function() {
      var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      var rowIndex = $(this).closest("tr").index();
  
      // Eliminar la tarea de la lista
      tasks.splice(rowIndex, 1);
  
      // Actualizar en localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
  
      // Actualizar la tabla
      loadTasksFromLocalStorage();
    });
  });
  