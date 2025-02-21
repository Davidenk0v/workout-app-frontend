import Swal from "sweetalert2";
import { Workout } from "../types/workout";
import { idUser } from "../types/user";

export const deleteWorkoutSwal = (
  id: number,
  onDelete: (id: number) => void
) => {
  Swal.fire({
    title: "¿Estás seguro de eliminar el entrenamiento?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(id);
    }
  });
};

export const newWorkoutSwal = (
  newWorkout: (workout: Workout) => void,
  getUserId: () => number
): void => {
  Swal.fire({
    title: "Nuevo Entrenamiento",
    html: `<input id="swal-input1" class="swal2-input" placeholder="Nombre" required>
      <input id="swal-input2" class="swal2-input" placeholder="Descripción" required>
      <input id="swal-input4" class="swal2-input" placeholder="Resultado" required>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
    preConfirm: () => {
      const name = (document.getElementById("swal-input1") as HTMLInputElement)
        .value;
      const description = (
        document.getElementById("swal-input2") as HTMLInputElement
      ).value;
      const result = (
        document.getElementById("swal-input4") as HTMLInputElement
      ).value;
      return {
        name,
        description,
        date: new Date(),
        result,
        user: getUserId(),
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      newWorkout(result.value);
    }
  });
};

export const deleteUserSwal = (
  id: idUser,
  deleteUser: (id: idUser) => void
) => {
  console.log(id);
  Swal.fire({
    title: "¿Estás seguro de eliminar el usuario?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(id);
    }
  });
};
