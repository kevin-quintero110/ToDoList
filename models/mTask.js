import db from "../config/db.js"

const mTask = {
    getAll: async (req, res) => {
        try {
          const [results] = await db.query("SELECT * FROM tasks")
          return results;
        } catch (err) {
          throw {status: 500 , message:"Error al cargar las tareas"}
        }
    },
    getOne: async (id) => {
        try {
            const [results] = await db.query("SELECT * FROM tasks WHERE ID = ?", [id])
            return results[0];
            console.log(results)
            
        } catch (err) {
            throw {
                status: 500,
                message: `Error al obetener la tarea con el id ${id}`
            }
        }
    },
    create: async (task) => {
        try {
            await db.query("INSERT INTO tasks (title) VALUES (?)" , [task.title])
          } catch (err) {
            throw {status: 500 , message:"Error al crear la tareas"}
          }
    },
    update: async (task) => {
      try {
        await db.query("UPDATE tasks SET title = ? WHERE id = ?" , [task.title, task.id])
      } catch (err) {
        throw {status: 500 , message:"Error al actualizar la tareas"}
      }
    },
    complete: async (id) => {
      try {
        await db.query("UPDATE tasks SET completed = ? WHERE id = ?" , [true, id])
      } catch (err) {
        throw {status: 500 , message:"Error al completar la tarea"}
      }
    },
    uncomplete: async (id) => {
      try {
        await db.query("UPDATE tasks SET completed = ? WHERE id = ?" , [false, id])
      } catch (err) {
        throw {status: 500 , message:"Error al descompletar la tarea"}
      }
    },
    delete: async (id) => {
      try {
        await db.query("DELETE FROM tasks WHERE id = ?" , [id])
      } catch (err) {
        throw {status: 500 , message:"Error al BORRAR la tarea"}
      }
    },

}


export default mTask;